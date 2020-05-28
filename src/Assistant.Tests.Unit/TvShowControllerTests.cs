using Assistant.Controllers;
using Assistant.DataAccess.DataHandlers.Interfaces;
using Assistant.Domain.Interfaces;
using Assistant.Logging.Interfaces;
using Assistant.Models;
using Assistant.Models.Entities;
using AutoFixture;
using Microsoft.AspNetCore.Mvc;
using Moq;
using NUnit.Framework;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Assistant.Tests.Unit
{
    [TestFixture]
    public class TvShowControllerTests
    {
        private Mock<ILogger> _logger;
        private Mock<IGetTVShowsByUser> _getTVShowsByUser;
        private Mock<IUserContextManager> _userContextManager;
        private Mock<IUserTVShowMappingManager> _userTVShowMappingManager;
        private TvShowController _showController;
        private Fixture _fixture;
        private IEnumerable<TvShow> _shows;
        private UserTVShowMapping _mapping;

        [SetUp]
        public void Setup()
        {
            _fixture = new Fixture();
            _fixture.Behaviors.OfType<ThrowingRecursionBehavior>().ToList()
                .ForEach(b => _fixture.Behaviors.Remove(b));
            _fixture.Behaviors.Add(new OmitOnRecursionBehavior());
            _shows = _fixture.Create<IEnumerable<TvShow>>();

            _logger = new Mock<ILogger>();
            _getTVShowsByUser = new Mock<IGetTVShowsByUser>();
            _userContextManager = new Mock<IUserContextManager>();
            _userContextManager.Setup(x => x.GetUserIdFromContext()).Returns("testuser");
            _getTVShowsByUser.Setup(x => x.GetTvShowsByUserId(It.IsAny<string>())).ReturnsAsync(new ActionResponse<IEnumerable<TvShow>> { WasSuccessful = true, Result = _shows });
            _mapping = _fixture.Create<UserTVShowMapping>();
            _userTVShowMappingManager = new Mock<IUserTVShowMappingManager>();
            _userTVShowMappingManager.Setup(x => x.ManageAdditionAsync(It.IsAny<TvShow>())).ReturnsAsync(new ActionResponse<UserTVShowMapping> { WasSuccessful = true, Result = _mapping });
            _userTVShowMappingManager.Setup(x => x.ManageDeletionAsync(It.IsAny<string>())).ReturnsAsync(new ActionResponse<UserTVShowMapping> { WasSuccessful = true, Result = null });

            _showController = new TvShowController(_getTVShowsByUser.Object, _logger.Object, _userContextManager.Object, _userTVShowMappingManager.Object);
        }

        [Test]
        public async Task Get_Should_Call_Correct_Dependencies_and_Return_Correct_Type_On_Happy_Path()
        {
            //Act
            var response = await _showController.GetShowsAsync();

            //Assert
            Assert.AreEqual(response.GetType(), typeof(OkObjectResult));
            _logger.Verify(x => x.CommitAsync(), Times.Once);
            _getTVShowsByUser.Verify(x => x.GetTvShowsByUserId(It.IsAny<string>()), Times.Once);
        }

        [Test]
        public async Task Get_Should_Call_Correct_Dependencies_and_Return_Correct_Type_On_Query_Exception()
        {
            //Arrange
            _getTVShowsByUser.Setup(x => x.GetTvShowsByUserId(It.IsAny<string>())).ReturnsAsync(new ActionResponse<IEnumerable<TvShow>> { WasSuccessful = false, Result = null, Message = "Error" });

            //Act
            var response = await _showController.GetShowsAsync();

            //Assert
            Assert.AreEqual(response.GetType(), typeof(BadRequestObjectResult));
            _logger.Verify(x => x.CommitAsync(), Times.Once);
            _getTVShowsByUser.Verify(x => x.GetTvShowsByUserId(It.IsAny<string>()), Times.Once);
        }

        [Test]
        public async Task Post_Should_Call_Correct_Dependencies_and_Return_Correct_Type_On_Happy_Path()
        {
            //Arrange
            var tvShow = new TvShow { ShowKey = "test-test", ShowName = "Test Test" };

            //Act
            var response = await _showController.PostShowAsync(tvShow);

            //Assert
            Assert.AreEqual(response.GetType(), typeof(OkObjectResult));
            _logger.Verify(x => x.CommitAsync(), Times.Once);
            _userTVShowMappingManager.Verify(x => x.ManageAdditionAsync(It.IsAny<TvShow>()), Times.Once);
        }

        [Test]
        public async Task Post_Should_Call_Correct_Dependencies_and_Return_Correct_Type_On_Query_Exception()
        {
            //Arrange
            _userTVShowMappingManager.Setup(x => x.ManageAdditionAsync(It.IsAny<TvShow>())).ReturnsAsync(new ActionResponse<UserTVShowMapping> { WasSuccessful = false, Result = null, Message = "Error" });
            var tvShow = new TvShow { ShowKey = "test-test", ShowName = "Test Test" };

            //Act
            var response = await _showController.PostShowAsync(tvShow);

            //Assert
            Assert.AreEqual(response.GetType(), typeof(BadRequestObjectResult));
            _logger.Verify(x => x.CommitAsync(), Times.Once);
            _userTVShowMappingManager.Verify(x => x.ManageAdditionAsync(It.IsAny<TvShow>()), Times.Once);
        }


        [Test]
        public async Task Delete_Should_Call_Correct_Dependencies_and_Return_Correct_Type_On_Happy_Path()
        {
            //Arrange
            var showKey = "test-test";

            //Act
            var response = await _showController.DeleteShowAsync(showKey);

            //Assert
            Assert.AreEqual(response.GetType(), typeof(OkObjectResult));
            _logger.Verify(x => x.CommitAsync(), Times.Once);
            _userTVShowMappingManager.Verify(x => x.ManageDeletionAsync(showKey), Times.Once);
        }

        [Test]
        public async Task Delete_Should_Call_Correct_Dependencies_and_Return_Correct_Type_On_Query_Exception()
        {
            //Arrange
            _userTVShowMappingManager.Setup(x => x.ManageDeletionAsync(It.IsAny<string>())).ReturnsAsync(new ActionResponse<UserTVShowMapping> { WasSuccessful = false, Result = null, Message = "Error" });
            var showKey = "test-test";

            //Act
            var response = await _showController.DeleteShowAsync(showKey);

            //Assert
            Assert.AreEqual(response.GetType(), typeof(BadRequestObjectResult));
            _logger.Verify(x => x.CommitAsync(), Times.Once);
            _userTVShowMappingManager.Verify(x => x.ManageDeletionAsync(showKey), Times.Once);
        }
    }
}