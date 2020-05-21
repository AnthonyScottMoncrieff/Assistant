using Assistant.Models;
using Assistant.Models.Entities;
using System.Threading.Tasks;

namespace Assistant.Domain.Interfaces
{
    public interface IUserTVShowMappingManager
    {
        Task<ActionResponse<UserTVShowMapping>> ManageAsync(TvShow tvShow);
    }
}