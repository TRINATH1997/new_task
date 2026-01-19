using Microsoft.Azure.Functions.Worker;
using Microsoft.Extensions.Logging;
using System;
using System.Threading.Tasks;

namespace Fresh.News.Functions
{
    using Fresh.News.Functions.Services;
    using Microsoft.Azure.Functions.Worker;
    using Microsoft.Extensions.Logging;

    public class NewsModerationTimer
    {
        private readonly SharePointService _spService;
        private readonly ContentModerationService _moderation;
        private readonly ILogger _logger;

        public NewsModerationTimer(
            SharePointService spService,
            ContentModerationService moderation,
            ILoggerFactory loggerFactory)
        {
            _spService = spService;
            _moderation = moderation;
            _logger = loggerFactory.CreateLogger<NewsModerationTimer>();
        }

        [Function("NewsModerationTimer")]
        public async Task Run([TimerTrigger("0 */5 * * * *")] TimerInfo timer)
        {
            _logger.LogInformation("News moderation started");

            var pages = await _spService.GetRecentNewsPagesAsync();

            foreach (var page in pages)
            {
                bool safe = await _moderation.IsContentSafeAsync(page.Content);

                if (!safe)
                {
                    await _spService.UnpublishPageAsync("root", page.Id);
                    _logger.LogWarning($"Unpublished page: {page.Title}");
                }
            }
        }
    }

}
