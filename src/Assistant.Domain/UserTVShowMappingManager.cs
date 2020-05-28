using Assistant.DataAccess.DataHandlers.Interfaces;
using Assistant.Domain.Interfaces;
using Assistant.Models;
using Assistant.Models.Entities;
using System.Threading.Tasks;

namespace Assistant.Domain
{
    public class UserTVShowMappingManager : IUserTVShowMappingManager
    {
        private readonly IUserContextManager _userContextManager;
        private readonly IAddUserTVShowMapping _addUserTVShowMapping;
        private readonly IDeleteUserTvShowMapping _deleteUserTvShowMapping;

        public UserTVShowMappingManager(IUserContextManager userContextManager, IAddUserTVShowMapping addUserTVShowMapping, IDeleteUserTvShowMapping deleteUserTvShowMapping)
        {
            _userContextManager = userContextManager;
            _addUserTVShowMapping = addUserTVShowMapping;
            _deleteUserTvShowMapping = deleteUserTvShowMapping;
        }

        public async Task<ActionResponse<UserTVShowMapping>> ManageAdditionAsync(TvShow tvShow)
        {
            var userId = _userContextManager.GetUserIdFromContext();
            var mapping = new UserTVShowMapping { UserId = userId, TvShow = tvShow };
            var response = await _addUserTVShowMapping.Add(mapping);
            return response;
        }

        public async Task<ActionResponse<UserTVShowMapping>> ManageDeletionAsync(string showKey)
        {
            var userId = _userContextManager.GetUserIdFromContext();
            var response = await _deleteUserTvShowMapping.Delete(userId, showKey);
            return response;
        }
    }
}