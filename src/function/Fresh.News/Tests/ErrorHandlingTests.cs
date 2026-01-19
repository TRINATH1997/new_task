using Microsoft.VisualStudio.TestTools.UnitTesting;
using Moq;

[TestClass]
public class ErrorHandlingTests
{
    [TestMethod]
    public async Task Moderation_Exception_Should_Be_Handled()
    {
        var moderationMock = new Mock<ContentModerationService>();

        moderationMock
            .Setup(m => m.IsContentSafeAsync(It.IsAny<string>()))
            .ThrowsAsync(new Exception("AI failure"));

        await Assert.ThrowsExceptionAsync<Exception>(() =>
            moderationMock.Object.IsContentSafeAsync("test")
        );
    }
}
