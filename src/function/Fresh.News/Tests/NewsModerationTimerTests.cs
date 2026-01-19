using Microsoft.VisualStudio.TestTools.UnitTesting;
using Moq;
using Microsoft.Extensions.Logging.Abstractions;
using Microsoft.Azure.Functions.Worker;

[TestClass]
public class NewsModerationTimerTests
{
    [TestMethod]
    public async Task Unsafe_Page_Should_Be_Unpublished()
    {
        // Arrange
        var spServiceMock = new Mock<SharePointService>(null, null);
        var moderationMock = new Mock<ContentModerationService>();

        moderationMock
            .Setup(m => m.IsContentSafeAsync(It.IsAny<string>()))
            .ReturnsAsync(false);

        spServiceMock
            .Setup(s => s.GetRecentNewsPagesAsync())
            .ReturnsAsync(new List<SharePointPage>
            {
                new SharePointPage
                {
                    Id = "1",
                    Title = "Bad News",
                    Content = "violence"
                }
            });

        var function = new NewsModerationTimer(
            spServiceMock.Object,
            moderationMock.Object,
            NullLoggerFactory.Instance
        );

        // Act
        await function.Run(null);

        // Assert
        spServiceMock.Verify(
            s => s.UnpublishPageAsync("root", "1"),
            Times.Once
        );
    }
}
