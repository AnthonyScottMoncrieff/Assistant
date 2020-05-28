using Assistant.Models;
using Assistant.Models.Entities;
using System.Threading.Tasks;

namespace Assistant.Domain.Interfaces
{
    public interface IUserTVShowMappingManager
    {
        Task<ActionResponse<UserTVShowMapping>> ManageAdditionAsync(TvShow tvShow);
        Task<ActionResponse<UserTVShowMapping>> ManageDeletionAsync(string showKey);
    }
}