import { SPHttpClient, SPHttpClientResponse } from "@microsoft/sp-http";

interface CacheEntry {
  timestamp: number;
  data: any[];
}

export class NewsService {

  // ===== CACHING CONFIG =====
  private cache = new Map<string, CacheEntry>();
  private readonly CACHE_TTL = 2 * 60 * 1000; // 2 minutes
  private readonly MAX_RETRIES = 3;

  constructor(
    private spHttpClient: SPHttpClient,
    private siteUrl: string
  ) {}

  // Build a unique cache key per query
  private getCacheKey(
    search: string,
    page: number,
    pageSize: number,
    author?: string
  ): string {
    return `${search}|${page}|${pageSize}|${author ?? "All"}`;
  }

  async getNews(
    search: string,
    page: number,
    pageSize: number,
    author?: string
  ) {
    const cacheKey = this.getCacheKey(search, page, pageSize, author);

    // ===== CACHE HIT =====
    const cached = this.cache.get(cacheKey);
    if (cached && Date.now() - cached.timestamp < this.CACHE_TTL) {
      return cached.data;
    }

    const skip = (page - 1) * pageSize;

    let filters: string[] = ["PromotedState eq 2"];

    if (search) {
      filters.push(`substringof('${search}',Title)`);
    }

    if (author && author !== "All") {
      filters.push(`Author/Title eq '${author}'`);
    }

    const filterQuery = filters.join(" and ");

    const url =
      `${this.siteUrl}/_api/web/lists/getbytitle('Site Pages')/items` +
      `?$select=Id,Title,Created,FileRef,Author/Title` +
      `&$expand=Author` +
      `&$filter=${filterQuery}` +
      `&$orderby=Created desc` +
      `&$top=${pageSize}&$skip=${skip}`;

    const data = await this.fetchWithRetry(url);

    // ===== CACHE STORE =====
    this.cache.set(cacheKey, {
      timestamp: Date.now(),
      data
    });

    return data;
  }

  // ===== 429 HANDLING WITH BACKOFF =====
  private async fetchWithRetry(
    url: string,
    attempt: number = 1
  ): Promise<any[]> {

    const res: SPHttpClientResponse =
      await this.spHttpClient.get(url, SPHttpClient.configurations.v1);

    // ---- THROTTLED ----
    if (res.status === 429 && attempt <= this.MAX_RETRIES) {
      const retryAfterHeader = res.headers.get("Retry-After");
      const retryAfter =
        retryAfterHeader
          ? Number(retryAfterHeader) * 1000
          : Math.pow(2, attempt) * 1000; // exponential backoff

      await new Promise(resolve => setTimeout(resolve, retryAfter));

      return this.fetchWithRetry(url, attempt + 1);
    }

    // ---- HARD FAILURE / GIVE UP GRACEFULLY ----
    if (!res.ok) {
      console.warn("NewsService request failed:", res.status);
      return [];
    }

    const json = await res.json();

    return json.value.map((i: any) => ({
      id: i.Id,
      title: i.Title,
      date: i.Created,
      url: i.FileRef,
      author: i.Author?.Title
    }));
  }
}
