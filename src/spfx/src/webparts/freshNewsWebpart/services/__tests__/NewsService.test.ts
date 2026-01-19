import { NewsService } from "../NewsService";
import { SPHttpClient } from "@microsoft/sp-http";

describe("NewsService", () => {

  let spHttpClient: jest.Mocked<SPHttpClient>;
  let service: NewsService;

  beforeEach(() => {
    spHttpClient = {
      get: jest.fn()
    } as any;

    service = new NewsService(
      spHttpClient,
      "https://contoso.sharepoint.com/sites/test"
    );
  });

  it("builds request and returns mapped data", async () => {
    spHttpClient.get.mockResolvedValueOnce({
      ok: true,
      status: 200,
      json: async () => ({
        value: [
          {
            Id: 1,
            Title: "News 1",
            Created: "2024-01-01",
            FileRef: "/sites/test/news1",
            Author: { Title: "Admin" }
          }
        ]
      })
    } as any);

    const result = await service.getNews("", 1, 5);

    expect(result.length).toBe(1);
    expect(result[0].title).toBe("News 1");
    expect(spHttpClient.get).toHaveBeenCalledTimes(1);
  });

  it("applies search filter in query", async () => {
    spHttpClient.get.mockResolvedValueOnce({
      ok: true,
      status: 200,
      json: async () => ({ value: [] })
    } as any);

    await service.getNews("hello", 1, 5);

    const calledUrl = spHttpClient.get.mock.calls[0][0];
    expect(calledUrl).toContain("substringof");
  });

  it("applies paging using skip and top", async () => {
    spHttpClient.get.mockResolvedValueOnce({
      ok: true,
      status: 200,
      json: async () => ({ value: [] })
    } as any);

    await service.getNews("", 2, 10);

    const calledUrl = spHttpClient.get.mock.calls[0][0];
    expect(calledUrl).toContain("$skip=10");
    expect(calledUrl).toContain("$top=10");
  });

  it("uses cache for repeated calls", async () => {
    spHttpClient.get.mockResolvedValueOnce({
      ok: true,
      status: 200,
      json: async () => ({ value: [] })
    } as any);

    await service.getNews("", 1, 5);
    await service.getNews("", 1, 5);

    // Should hit API only once due to cache
    expect(spHttpClient.get).toHaveBeenCalledTimes(1);
  });

  it("retries on 429 response", async () => {
    spHttpClient.get
      .mockResolvedValueOnce({
        ok: false,
        status: 429,
        headers: { get: () => "0" }
      } as any)
      .mockResolvedValueOnce({
        ok: true,
        status: 200,
        json: async () => ({ value: [] })
      } as any);

    const result = await service.getNews("", 1, 5);

    expect(spHttpClient.get).toHaveBeenCalledTimes(2);
    expect(result).toEqual([]);
  });

  it("returns empty array on hard failure", async () => {
    spHttpClient.get.mockResolvedValueOnce({
      ok: false,
      status: 500
    } as any);

    const result = await service.getNews("", 1, 5);

    expect(result).toEqual([]);
  });
});
