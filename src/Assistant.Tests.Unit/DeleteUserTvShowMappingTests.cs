using Assistant.DataAccess.DataHandlers.Commands;
using Assistant.DataAccess.DataHandlers.ContextActionHandlers.Interfaces;
using Assistant.Logging.Interfaces;
using Moq;
using NUnit.Framework;
using System;
using System.Threading.Tasks;

namespace Assistant.Tests.Unit
{
    [TestFixture]
    public class DeleteUserTvShowMappingTests
    {
        private Mock<ICommandActionHandlers> _commandActionHandlers;
        private Mock<ILogger> _logger;
        private DeleteUserTvShowMapping _deleteUserTvShowMapping;

        [SetUp]
        public void Setup()
        {
            _commandActionHandlers = new Mock<ICommandActionHandlers>();
            _logger = new Mock<ILogger>();

            _deleteUserTvShowMapping = new DeleteUserTvShowMapping(_commandActionHandlers.Object, _logger.Object);
        }

        [Test]
        public async Task DeleteUserTvShowMappingAsync_Should_Correctly_Call_Dependencies_On_Happy_Path()
        {
            //Arrange
            var id = "id";
            var key = "key";

            //Act
            var response = await _deleteUserTvShowMapping.Delete(id, key);

            //Assert
            Assert.True(response.WasSuccessful);
            _commandActionHandlers.Verify(x => x.DeleteUserTvShowMappingAsync(id, key), Times.Once);
            _logger.Verify(x => x.AddMessageDetail(It.IsAny<string>()), Times.Exactly(2));
            _logger.Verify(x => x.AddErrorDetail(It.IsAny<string>()), Times.Never);
            _logger.Verify(x => x.SubmitException(It.IsAny<Exception>()), Times.Never);
        }

        [Test]
        public async Task DeleteUserTvShowMappingAsync_Should_Correctly_Call_Dependencies_On_Exception()
        {
            //Arrange
            var id = "id";
            var key = "key";
            _commandActionHandlers.Setup(x => x.DeleteUserTvShowMappingAsync(It.IsAny<string>(), It.IsAny<string>())).ThrowsAsync(new Exception("Exception"));

            //Act
            var response = await _deleteUserTvShowMapping.Delete(id, key);

            //Assert
            Assert.False(response.WasSuccessful);
            _commandActionHandlers.Verify(x => x.DeleteUserTvShowMappingAsync(id, key), Times.Once);
            _logger.Verify(x => x.AddMessageDetail(It.IsAny<string>()), Times.Once);
            _logger.Verify(x => x.AddErrorDetail(It.IsAny<string>()), Times.Once);
            _logger.Verify(x => x.SubmitException(It.IsAny<Exception>()), Times.Once);
        }
    }
}