using Assistant.Models.Entities;
using System.Threading.Tasks;

namespace Assistant.DataAccess.DataHandlers.ContextActionHandlers.Interfaces
{
    public interface ICommandActionHandlers
    {
        Task AddUserTVShowMappingAsync(UserTVShowMapping userTVShowMapping);

        Task DeleteUserTvShowMappingAsync(string userId, string showKey);
    }
}