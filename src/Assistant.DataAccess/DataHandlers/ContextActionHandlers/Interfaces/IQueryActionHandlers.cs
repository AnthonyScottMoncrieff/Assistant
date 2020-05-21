using Assistant.Models.Entities;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Assistant.DataAccess.DataHandlers.ContextActionHandlers.Interfaces
{
    public interface IQueryActionHandlers
    {
        Task<IEnumerable<UserTVShowMapping>> GetTVShowMappingsByUserId(string userId);
    }
}