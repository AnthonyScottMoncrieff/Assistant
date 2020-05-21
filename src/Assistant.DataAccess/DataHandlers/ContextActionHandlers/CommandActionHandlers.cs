using Assistant.DataAccess.DataHandlers.ContextActionHandlers.Interfaces;
using Assistant.DataAccess.Extensions;
using Assistant.Models.Entities;
using System.Threading.Tasks;

namespace Assistant.DataAccess.DataHandlers.ContextActionHandlers
{
    public class CommandActionHandlers : ICommandActionHandlers
    {
        private readonly ApplicationDbContext _applicationDbContext;

        public CommandActionHandlers(ApplicationDbContext applicationDbContext)
        {
            _applicationDbContext = applicationDbContext;
        }

        public async Task AddUserTVShowMappingAsync(UserTVShowMapping userTVShowMapping)
        {
            var show = await _applicationDbContext.Set<TvShow>().AddIfNotExists(userTVShowMapping.TvShow, x => x.ShowKey == userTVShowMapping.TvShow.ShowKey);
            userTVShowMapping.TvShow = show;
            userTVShowMapping.TVShowId = show.TVShowId;
            await _applicationDbContext.Set<UserTVShowMapping>().AddAsync(userTVShowMapping);
            await _applicationDbContext.SaveChangesAsync();
        }
    }
}