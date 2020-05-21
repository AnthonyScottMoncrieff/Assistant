using Assistant.Models;
using Assistant.Models.Entities;
using System.Threading.Tasks;

namespace Assistant.DataAccess.DataHandlers.Interfaces
{
    public interface IAddUserTVShowMapping
    {
        Task<ActionResponse<UserTVShowMapping>> Add(UserTVShowMapping tvShow);
    }
}