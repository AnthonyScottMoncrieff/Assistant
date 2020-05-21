using Assistant.DataAccess.DataHandlers.ContextActionHandlers.Interfaces;
using Assistant.DataAccess.DataHandlers.Interfaces;
using Assistant.Logging.Interfaces;
using Assistant.Models;
using Assistant.Models.Entities;
using System;
using System.Threading.Tasks;

namespace Assistant.DataAccess.DataHandlers.Commands
{
    public class AddUserTVShowMapping : IAddUserTVShowMapping
    {
        private readonly ICommandActionHandlers _commandActionHandlers;
        private readonly ILogger _logger;

        public AddUserTVShowMapping(ICommandActionHandlers commandActionHandlers, ILogger logger)
        {
            _commandActionHandlers = commandActionHandlers;
            _logger = logger;
        }

        public async Task<ActionResponse<UserTVShowMapping>> Add(UserTVShowMapping tvShowMapping)
        {
            try
            {
                if (tvShowMapping.UserId == null)
                    throw new Exception("Unable to find user");

                _logger.AddMessageDetail($"AddUserTVShowMapping: Attempting to add show mapping with Show Name: {tvShowMapping.TvShow.ShowName} and userid: {tvShowMapping.UserId}");
                await _commandActionHandlers.AddUserTVShowMappingAsync(tvShowMapping);
                _logger.AddMessageDetail($"AddUserTVShowMapping: Successfully added show with Name: {tvShowMapping.TvShow.ShowName} and userid: {tvShowMapping.UserId}");
                return GenerateResponse(tvShowMapping);
            }
            catch (Exception ex)
            {
                _logger.AddErrorDetail($"AddUserTVShowMapping: Error, could not add show mapping, error was - {ex.Message}");
                _logger.SubmitException(ex);
                return GenerateResponse(tvShowMapping, ex.Message);
            }
        }

        private ActionResponse<UserTVShowMapping> GenerateResponse(UserTVShowMapping mapping, string message = null)
        {
            var response = new ActionResponse<UserTVShowMapping>
            {
                Result = mapping,
                WasSuccessful = message == null,
                Message = message
            };

            return response;
        }
    }
}