using Assistant.DataAccess;
using Assistant.DataAccess.DataHandlers.Commands;
using Assistant.DataAccess.DataHandlers.ContextActionHandlers;
using Assistant.Logging.Interfaces;
using Assistant.Models.Entities;
using IdentityServer4.EntityFramework.Options;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using Moq;
using NUnit.Framework;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Assistant.Tests.Integration
{
    [TestFixture]
    public class DeleteUserTvShowMappingTests
    {
        private ApplicationDbContext _context;
        private string _userId;
        private UserTVShowMapping _mapping;
        private Mock<ILogger> _logger;
        private CommandActionHandlers _commandActionHandlers;
        private DeleteUserTvShowMapping _deleteUserTvShowMapping;

        [SetUp]
        public void Setup()
        {
            var contextOptions = new DbContextOptionsBuilder<ApplicationDbContext>()
                .UseInMemoryDatabase(databaseName: $"AssistantDB{Guid.NewGuid()}")
                .Options;
            var operationalOptions = Options.Create(new OperationalStoreOptions());

            _context = new ApplicationDbContext(contextOptions, operationalOptions);

            _userId = Guid.NewGuid().ToString();
            _mapping = new UserTVShowMapping
            {
                Id = 1,
                UserId = _userId,
                TVShowId = 1,
                TvShow = new TvShow
                {
                    TVShowId = 1,
                    ShowKey = "show-show",
                    ShowName = "Show Show",
                    ThumbnailUrl = "URL",
                    Summary = "Summary"
                }
            };

            _context.AddRange(_mapping);
            _context.SaveChanges();
            _logger = new Mock<ILogger>();
            _commandActionHandlers = new CommandActionHandlers(_context);
            _deleteUserTvShowMapping = new DeleteUserTvShowMapping(_commandActionHandlers, _logger.Object);
        }

        [Test]
        public async Task Delete_Should_Successfully_Delete()
        {
            //Arrange
            var entry = await _context.Set<UserTVShowMapping>().Include(x => x.TvShow).FirstOrDefaultAsync(x => x.Id == 1);

            //Act
            var response = await _deleteUserTvShowMapping.Delete(entry.UserId, entry.TvShow.ShowKey);

            //Assert
            var postDeleteEntry = await _context.Set<UserTVShowMapping>().Include(x => x.TvShow).FirstOrDefaultAsync(x => x.Id == 1);
            Assert.IsNull(postDeleteEntry);
        }
    }
}
