using Assistant.DataAccess.DataHandlers.Commands;
using Assistant.DataAccess.DataHandlers.ContextActionHandlers.Interfaces;
using Assistant.Logging.Interfaces;
using Assistant.Models.Entities;
using AutoFixture;
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
    public class AddUserTVShowMappingTests
    {
        private Mock<ILogger> _logger;
        private Mock<ICommandActionHandlers> _commandActionHandlers;
        private AddUserTVShowMapping _userTVShowMapping;
        private Fixture _fixture;

        [SetUp]
        public void Setup()
        {
            _logger = new Mock<ILogger>();
            _commandActionHandlers = new Mock<ICommandActionHandlers>();
            _userTVShowMapping = new AddUserTVShowMapping(_commandActionHandlers.Object, _logger.Object);
            _fixture = new Fixture();
            _fixture.Behaviors.OfType<ThrowingRecursionBehavior>().ToList()
                .ForEach(b => _fixture.Behaviors.Remove(b));
            _fixture.Behaviors.Add(new OmitOnRecursionBehavior());
        }

        [Test]
        public async Task Add_Should_Call_Correct_Dependencies_On_Happy_Path()
        {
            //Arrange
            var mapping = _fixture.Create<UserTVShowMapping>();

            //Act
            var response = await _userTVShowMapping.Add(mapping);

            //Assert
            Assert.True(response.WasSuccessful);
            Assert.IsNull(response.Message);
            _logger.Verify(x => x.AddMessageDetail(It.IsAny<string>()), Times.Exactly(2));
            _logger.Verify(x => x.AddErrorDetail(It.IsAny<string>()), Times.Never);
            _logger.Verify(x => x.SubmitException(It.IsAny<Exception>()), Times.Never);
            _commandActionHandlers.Verify(x => x.AddUserTVShowMappingAsync(It.IsAny<UserTVShowMapping>()), Times.Once);
        }

        [Test]
        public async Task Add_Should_Call_Correct_Dependencies_On_Add_Exception()
        {
            //Arrange
            var mapping = _fixture.Create<UserTVShowMapping>();
            _commandActionHandlers.Setup(x => x.AddUserTVShowMappingAsync(It.IsAny<UserTVShowMapping>())).ThrowsAsync(new Exception("Error"));

            //Act
            var response = await _userTVShowMapping.Add(mapping);

            //Assert
            Assert.False(response.WasSuccessful);
            Assert.IsNotNull(response.Message);
            _logger.Verify(x => x.AddMessageDetail(It.IsAny<string>()), Times.Once);
            _logger.Verify(x => x.AddErrorDetail(It.IsAny<string>()), Times.Once);
            _logger.Verify(x => x.SubmitException(It.IsAny<Exception>()), Times.Once);
            _commandActionHandlers.Verify(x => x.AddUserTVShowMappingAsync(It.IsAny<UserTVShowMapping>()), Times.Once);
        }
    }
}
