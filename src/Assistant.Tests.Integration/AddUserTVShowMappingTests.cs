using Assistant.DataAccess;
using Assistant.DataAccess.DataHandlers.Commands;
using Assistant.DataAccess.DataHandlers.ContextActionHandlers;
using Assistant.DataAccess.DataHandlers.Queries;
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
    public class AddUserTVShowMappingTests
    {
        private ApplicationDbContext _context;
        private string _userId;
        private UserTVShowMapping _mapping;
        private Mock<ILogger> _logger;
        private CommandActionHandlers _commandActionHandlers;
        private AddUserTVShowMapping _addUserTVShowMapping;

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
                    ShowName = "Show Show"
                }
            };

            _context.AddRange(_mapping);
            _context.SaveChanges();
            _logger = new Mock<ILogger>();
            _commandActionHandlers = new CommandActionHandlers(_context);
            _addUserTVShowMapping = new AddUserTVShowMapping(_commandActionHandlers, _logger.Object);
        }

        [Test]
        public async Task Add_Should_Successfully_Add_Mapping()
        {
            //Arrange
            var mapping = new UserTVShowMapping
            {
                UserId = _userId,
                TvShow = new TvShow
                {
                    ShowKey = "show-show_show",
                    ShowName = "Show Show Show"
                }
            };

            //Act
            var response = await _addUserTVShowMapping.Add(mapping);

            //Assert
            Assert.True(response.WasSuccessful);
            var savedRecord = await _context.Set<UserTVShowMapping>().Include(x => x.TvShow).FirstOrDefaultAsync(x => x.Id == response.Result.Id);
            Assert.AreEqual(mapping.UserId, savedRecord.UserId);
            Assert.AreEqual(mapping.TvShow.ShowKey, savedRecord.TvShow.ShowKey);
            Assert.AreEqual(mapping.TvShow.ShowName, savedRecord.TvShow.ShowName);
        }

        [Test]
        public async Task Add_Should_Successfully_Add_Mapping_Without_Duplicating_TvShow()
        {
            //Arrange
            var mapping = new UserTVShowMapping
            {
                UserId = _userId,
                TvShow = new TvShow
                {
                    ShowKey = "show-show",
                    ShowName = "Show Show"
                }
            };

            //Act
            var response = await _addUserTVShowMapping.Add(mapping);

            //Assert
            Assert.True(response.WasSuccessful);
            var savedRecord = await _context.Set<UserTVShowMapping>().Include(x => x.TvShow).FirstOrDefaultAsync(x => x.Id == response.Result.Id);
            Assert.AreEqual(_mapping.TvShow.TVShowId, savedRecord.TvShow.TVShowId);
        }
    }
}
