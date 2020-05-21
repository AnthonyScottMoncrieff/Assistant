using Assistant.Controllers;
using Assistant.DataAccess.DataHandlers.Interfaces;
using Assistant.Logging.Interfaces;
using Assistant.Models;
using Assistant.Models.Entities;
using Assistant.Utilities.Interfaces;
using AutoFixture;
using Microsoft.AspNetCore.Mvc;
using Moq;
using NUnit.Framework;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Assistant.Tests.Unit
{
    [TestFixture]
    public class TvShowControllerTests
    {
        private Mock<ILogger> _logger;
        private Mock<IGetTVShowsByUser> _getTVShowsByUser;
        private Mock<IUserContextManager> _userContextManager;
        private TvShowController _showController;
        private Fixture _fixture;
        private IEnumerable<TvShow> _shows;

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

            _showController = new TvShowController(_getTVShowsByUser.Object, _logger.Object, _userContextManager.Object);
        }

        [Test]
        public async Task Get_Should_Call_Correct_Dependencies_and_Return_Correct_Type_On_Happy_Path()
        {
            //Act
            var response = await _showController.GetShows();

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
            var response = await _showController.GetShows();

            //Assert
            Assert.AreEqual(response.GetType(), typeof(BadRequestObjectResult));
            _logger.Verify(x => x.CommitAsync(), Times.Once);
            _getTVShowsByUser.Verify(x => x.GetTvShowsByUserId(It.IsAny<string>()), Times.Once);
        }
    }
}
