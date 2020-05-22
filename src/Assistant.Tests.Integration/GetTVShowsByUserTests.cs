using Assistant.DataAccess;
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
using System.Linq;
using System.Threading.Tasks;

namespace Assistant.Tests.Integration
{
    [TestFixture]
    public class GetTVShowsByUserTests
    {
        private ApplicationDbContext _context;
        private Mock<ILogger> _logger;
        private QueryActionHandlers _queryActionHandlers;
        private GetTVShowsByUser _getTVShowsByUser;
        private string _userId;
        private UserTVShowMapping _mapping;

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
            _queryActionHandlers = new QueryActionHandlers(_context);
            _getTVShowsByUser = new GetTVShowsByUser(_logger.Object, _queryActionHandlers);
        }

        [Test]
        public async Task GetTvShowsByUserId_Should_Get_TvShows()
        {
            //Act
            var response = await _getTVShowsByUser.GetTvShowsByUserId(_userId);

            //Assert
            Assert.True(response.WasSuccessful);
            Assert.AreEqual(response.Result.First().ShowKey, _mapping.TvShow.ShowKey);
            Assert.AreEqual(response.Result.First().ShowName, _mapping.TvShow.ShowName);
            Assert.AreEqual(response.Result.First().TVShowId, _mapping.TvShow.TVShowId);
        }

        [Test]
        public async Task GetTvShowsByUserId_Should_Return_Empty_Collection_On_No_Match()
        {
            //Act
            var response = await _getTVShowsByUser.GetTvShowsByUserId("No Match");

            //Assert
            Assert.True(response.WasSuccessful);
            Assert.AreEqual(response.Result.Count(), 0);
        }
    }
}