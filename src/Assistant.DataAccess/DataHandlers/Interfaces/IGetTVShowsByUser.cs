using Assistant.Models;
using Assistant.Models.Entities;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Assistant.DataAccess.DataHandlers.Interfaces
{
    public interface IGetTVShowsByUser
    {
        Task<ActionResponse<IEnumerable<TvShow>>> GetTvShowsByUserId(string userId);
    }
}