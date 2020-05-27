using Assistant.DataAccess.DataHandlers.ContextActionHandlers.Interfaces;
using Assistant.DataAccess.Extensions;
using Assistant.Models.Entities;
using Microsoft.EntityFrameworkCore;
using System.Linq;
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

        public async Task DeleteUserTvShowMappingAsync(string userId, string showKey)
        {
            var usertvShowMappingSet = _applicationDbContext.Set<UserTVShowMapping>();
            var userShowTvShowMapping = await usertvShowMappingSet.Include(x => x.TvShow).Where(x => x.UserId == userId && x.TvShow.ShowKey == showKey).FirstOrDefaultAsync();
            if (userShowTvShowMapping == null)
                return;

            usertvShowMappingSet.Remove(userShowTvShowMapping);
            await _applicationDbContext.SaveChangesAsync();
        }
    }
}