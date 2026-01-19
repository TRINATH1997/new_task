using Microsoft.VisualStudio.TestTools.UnitTesting;

[TestClass]
public class ContentModerationServiceTests
{
    [TestMethod]
    public async Task Safe_Content_Should_Return_True()
    {
        var service = new ContentModerationService();

        var result = await service.IsContentSafeAsync("This is a normal article");

        Assert.IsTrue(result);
    }

    [TestMethod]
    public async Task Unsafe_Content_Should_Return_False()
    {
        var service = new ContentModerationService();

        var result = await service.IsContentSafeAsync("This contains violence");

        Assert.IsFalse(result);
    }

    [TestMethod]
    public async Task Empty_Content_Should_Be_Considered_Safe()
    {
        var service = new ContentModerationService();

        var result = await service.IsContentSafeAsync(string.Empty);

        Assert.IsTrue(result);
    }
}
