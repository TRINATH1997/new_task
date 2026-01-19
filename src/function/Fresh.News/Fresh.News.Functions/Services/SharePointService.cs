using Azure.Identity;
using Fresh.News.Functions.Models;
using Microsoft.Extensions.Configuration;
using Microsoft.Graph;
using System.Net.Http.Headers;

public class SharePointService
{
    private readonly GraphServiceClient _graph;

    private readonly IConfiguration _config;

    public SharePointService(
        GraphClientFactory factory,
        IConfiguration config)
    {
        _graph = factory.Create();
        _config = config;
    }

    // 1️⃣ Get recent NEWS pages
    public async Task<List<SharePointPage>> GetRecentNewsPagesAsync()
    {
        var pages = await _graph
            .Sites["root"]
            .Lists["Site Pages"]
            .Items
            .GetAsync(request =>
            {
                request.QueryParameters.Filter = "fields/PromotedState eq 2";
                request.QueryParameters.Expand = new[] { "fields" };
                request.QueryParameters.Top = 20;
            });

        return pages.Value.Select(p => new SharePointPage
        {
            Id = p.Id,
            Title = p.Fields.AdditionalData["Title"]?.ToString(),
            Content = p.Fields.AdditionalData["CanvasContent1"]?.ToString()
        }).ToList();
    }

    // 2️⃣ Unpublish page
    public async Task UnpublishPageAsync(string siteId, string pageId)
    {
        var credential = new ClientSecretCredential(
            _config["TenantId"],
            _config["ClientId"],
            _config["ClientSecret"]
        );

        var token = await credential.GetTokenAsync(
            new Azure.Core.TokenRequestContext(
                new[] { "https://graph.microsoft.com/.default" }
            )
        );

        using var client = new HttpClient();
        client.DefaultRequestHeaders.Authorization =
            new AuthenticationHeaderValue("Bearer", token.Token);

        var url = $"https://graph.microsoft.com/v1.0/sites/{siteId}/pages/{pageId}/unpublish";

        var response = await client.PostAsync(url, null);

        if (!response.IsSuccessStatusCode)
        {
            throw new Exception($"Failed to unpublish page {pageId}");
        }
    }

}
