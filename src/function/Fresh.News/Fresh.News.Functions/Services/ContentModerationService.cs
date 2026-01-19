using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Fresh.News.Functions.Services
{
    public class ContentModerationService
    {
        public Task<bool> IsContentSafeAsync(string content)
        {
            if (string.IsNullOrWhiteSpace(content))
                return Task.FromResult(true);

            // Example unsafe keyword check
            string[] bannedWords = { "violence", "hate", "abuse" };

            bool unsafeFound = bannedWords.Any(w =>
                content.Contains(w, StringComparison.OrdinalIgnoreCase));

            return Task.FromResult(!unsafeFound);
        }
    }

}
