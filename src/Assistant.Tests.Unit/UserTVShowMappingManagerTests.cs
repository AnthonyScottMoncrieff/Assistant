using Assistant.DataAccess.DataHandlers.Interfaces;
using Assistant.Domain;
using Assistant.Domain.Interfaces;
using Assistant.Models;
using Assistant.Models.Entities;
using AutoFixture;
using Moq;
using NUnit.Framework;
using System.Linq;
using System.Threading.Tasks;

namespace Assistant.Tests.Unit
{
    [TestFixture]
    public class UserTVShowMappingManagerTests
    {
        private Mock<IUserContextManager> _userContextManager;
        private UserTVShowMappingManager _userTVShowMappingManager;
        private Fixture _fixture;
        private Mock<IAddUserTVShowMapping> _addUserTVShowMapping;

        [SetUp]
        public void Setup()
        {
            _userContextManager = new Mock<IUserContextManager>();
            _userContextManager.Setup(x => x.GetUserIdFromContext()).Returns("userId");

            _fixture = new Fixture();
            _fixture.Behaviors.OfType<ThrowingRecursionBehavior>().ToList()
                .ForEach(b => _fixture.Behaviors.Remove(b));
            _fixture.Behaviors.Add(new OmitOnRecursionBehavior());
            var mapping = _fixture.Create<UserTVShowMapping>();

            _addUserTVShowMapping = new Mock<IAddUserTVShowMapping>();
            _addUserTVShowMapping.Setup(x => x.Add(It.IsAny<UserTVShowMapping>())).ReturnsAsync(new ActionResponse<UserTVShowMapping> { Result = mapping, WasSuccessful = true });
            _userTVShowMappingManager = new UserTVShowMappingManager(_userContextManager.Object, _addUserTVShowMapping.Object);
        }

        [Test]
        public async Task ManageAsync_Should_Call_Correct_Dependencies()
        {
            //Arrange
            var tvShow = _fixture.Create<TvShow>();

            //Act
            await _userTVShowMappingManager.ManageAsync(tvShow);

            //Assert
            _userContextManager.Verify(x => x.GetUserIdFromContext(), Times.Once);
            _addUserTVShowMapping.Verify(x => x.Add(It.IsAny<UserTVShowMapping>()), Times.Once);
        }
    }
}