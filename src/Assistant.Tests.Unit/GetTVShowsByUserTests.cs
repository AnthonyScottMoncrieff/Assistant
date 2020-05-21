using Assistant.DataAccess.DataHandlers.ContextActionHandlers.Interfaces;
using Assistant.DataAccess.DataHandlers.Queries;
using Assistant.Logging.Interfaces;
using Assistant.Models.Entities;
using AutoFixture;
using Moq;
using NUnit.Framework;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Assistant.Tests.Unit
{
    [TestFixture]
    public class GetTVShowsByUserTests
    {
        private Mock<ILogger> _logger;
        private Mock<IQueryActionHandlers> _queryActionHandlers;
        private GetTVShowsByUser _getTVShowsByUser;
        private Fixture _fixture;

        [SetUp]
        public void Setup()
        {
            _fixture = new Fixture();
            _fixture.Behaviors.OfType<ThrowingRecursionBehavior>().ToList()
                .ForEach(b => _fixture.Behaviors.Remove(b));
            _fixture.Behaviors.Add(new OmitOnRecursionBehavior());
            _logger = new Mock<ILogger>();
            _queryActionHandlers = new Mock<IQueryActionHandlers>();
            _getTVShowsByUser = new GetTVShowsByUser(_logger.Object, _queryActionHandlers.Object);
        }

        [Test]
        public async Task GetTvShowsByUserId_Should_Call_Correct_Dependencies_On_Happy_Path()
        {
            //Arrange
            var userTVShowMappings = _fixture.Create<IEnumerable<UserTVShowMapping>>();
            _queryActionHandlers.Setup(x => x.GetTVShowMappingsByUserId(It.IsAny<string>())).ReturnsAsync(userTVShowMappings);
            var userId = "test";

            //Act
            var response = await _getTVShowsByUser.GetTvShowsByUserId(userId);

            //Assert
            Assert.True(response.WasSuccessful);
            Assert.NotNull(response.Result);
            Assert.IsNull(response.Message);
            _logger.Verify(x => x.AddMessageDetail(It.IsAny<string>()), Times.Exactly(2));
            _logger.Verify(x => x.AddErrorDetail(It.IsAny<string>()), Times.Never);
            _logger.Verify(x => x.SubmitException(It.IsAny<Exception>()), Times.Never);
            _queryActionHandlers.Verify(x => x.GetTVShowMappingsByUserId(userId), Times.Once);
            foreach(var mapping in userTVShowMappings)
            {
                var shows = userTVShowMappings.Select(x => x.TvShow);
                Assert.True(response.Result.Contains(mapping.TvShow));
            }
        }


        [Test]
        public async Task GetTvShowsByUserId_Should_Call_Correct_Dependencies_On_Database_Exception()
        {
            //Arrange
            _queryActionHandlers.Setup(x => x.GetTVShowMappingsByUserId(It.IsAny<string>())).ThrowsAsync(new Exception("Connection Error"));
            var userId = "test";

            //Act
            var response = await _getTVShowsByUser.GetTvShowsByUserId(userId);

            //Assert
            Assert.False(response.WasSuccessful);
            Assert.IsNull(response.Result);
            Assert.NotNull(response.Message);
            _logger.Verify(x => x.AddMessageDetail(It.IsAny<string>()), Times.Once);
            _logger.Verify(x => x.AddErrorDetail(It.IsAny<string>()), Times.Once);
            _logger.Verify(x => x.SubmitException(It.IsAny<Exception>()), Times.Once);
            _queryActionHandlers.Verify(x => x.GetTVShowMappingsByUserId(userId), Times.Once);
        }
    }
}