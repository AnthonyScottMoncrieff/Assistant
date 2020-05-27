using Assistant.Models;
using Assistant.Models.Entities;
using System.Threading.Tasks;

namespace Assistant.DataAccess.DataHandlers.Interfaces
{
    public interface IDeleteUserTvShowMapping
    {
        Task<ActionResponse<UserTVShowMapping>> DeleteUserTvShowMappingAsync(string userId, string showKey);
    }
}