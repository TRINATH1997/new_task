using Azure.Identity;
using Microsoft.Graph;
using Microsoft.Extensions.Configuration;

public class GraphClientFactory
{
    private readonly IConfiguration _config;

    public GraphClientFactory(IConfiguration config)
    {
        _config = config;
    }

    public GraphServiceClient Create()
    {
        var credential = new ClientSecretCredential(
            _config["TenantId"],
            _config["ClientId"],
            _config["ClientSecret"]
        );

        return new GraphServiceClient(credential);
    }
}
