using Assistant.DataAccess.DataHandlers.ContextActionHandlers.Interfaces;
using Assistant.DataAccess.DataHandlers.Interfaces;
using Assistant.Logging.Interfaces;
using Assistant.Models;
using Assistant.Models.Entities;
using System;
using System.Threading.Tasks;

namespace Assistant.DataAccess.DataHandlers.Commands
{
    public class DeleteUserTvShowMapping : IDeleteUserTvShowMapping
    {
        private readonly ICommandActionHandlers _commandActionHandlers;
        private readonly ILogger _logger;

        public DeleteUserTvShowMapping(ICommandActionHandlers commandActionHandlers, ILogger logger)
        {
            _commandActionHandlers = commandActionHandlers;
            _logger = logger;
        }

        public async Task<ActionResponse<UserTVShowMapping>> Delete(string userId, string showKey)
        {
            try
            {
                if (showKey == null)
                    throw new Exception("Unable to show");

                _logger.AddMessageDetail($"DeleteUserTvShowMapping: Attempting to delete show mapping with Show Key: {showKey} and userid: {userId}");
                showKey = showKey.Replace(" ", "%20");
                await _commandActionHandlers.DeleteUserTvShowMappingAsync(userId, showKey);
                _logger.AddMessageDetail($"DeleteUserTvShowMapping: Successfully deleted show with key: {showKey} and userid: {userId}");
                return GenerateResponse();
            }
            catch (Exception ex)
            {
                _logger.AddErrorDetail($"DeleteUserTvShowMapping: Error, could not add show mapping, error was - {ex.Message}");
                _logger.SubmitException(ex);
                return GenerateResponse(ex.Message);
            }
        }

        private ActionResponse<UserTVShowMapping> GenerateResponse(string message = null)
        {
            var response = new ActionResponse<UserTVShowMapping>
            {
                WasSuccessful = message == null,
                Message = message
            };

            return response;
        }
    }
}