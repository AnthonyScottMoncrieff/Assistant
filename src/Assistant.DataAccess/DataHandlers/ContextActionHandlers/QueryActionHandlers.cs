using Assistant.DataAccess.DataHandlers.ContextActionHandlers.Interfaces;
using Assistant.Models.Entities;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Assistant.DataAccess.DataHandlers.ContextActionHandlers
{
    public class QueryActionHandlers : IQueryActionHandlers
    {
        private readonly ApplicationDbContext _applicationDbContext;

        public QueryActionHandlers(ApplicationDbContext applicationDbContext)
        {
            _applicationDbContext = applicationDbContext;
        }

        public async Task<IEnumerable<UserTVShowMapping>> GetTVShowMappingsByUserId(string userId)
        {
            var result = await _applicationDbContext
                .Set<UserTVShowMapping>()
                .Include(x => x.TvShow)
                .Where(x => x.UserId == userId)
                .ToListAsync();

            return result;
        }
    }
}