using Assistant.DataAccess.DataHandlers.ContextActionHandlers.Interfaces;
using Assistant.DataAccess.DataHandlers.Interfaces;
using Assistant.Logging.Interfaces;
using Assistant.Models;
using Assistant.Models.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Assistant.DataAccess.DataHandlers.Queries
{
    public class GetTVShowsByUser : IGetTVShowsByUser
    {
        private readonly ILogger _logger;
        private readonly IQueryActionHandlers _queryActionHandlers;

        public GetTVShowsByUser(ILogger logger, IQueryActionHandlers queryActionHandlers)
        {
            _logger = logger;
            _queryActionHandlers = queryActionHandlers;
        }

        public async Task<ActionResponse<IEnumerable<TvShow>>> GetTvShowsByUserId(string userId)
        {
            try
            {
                if (userId == null)
                    throw new Exception("Unable to obtain user");
                _logger.AddMessageDetail($"GetTVShowsByUser: Getting shows for user with Id: {userId}");
                var shows = await _queryActionHandlers.GetTVShowMappingsByUserId(userId);
                _logger.AddMessageDetail($"GetTVShowsByUser: Retrieved {shows.Count()} shows for user with Id: {userId}");
                var response = GenerateResponse(shows.Select(x => x.TvShow));
                return response;
            }
            catch (Exception ex)
            {
                _logger.AddErrorDetail($"GetTVShowsByUser: Failed to retrieve shows, reason was: {ex.Message}");
                _logger.SubmitException(ex);
                var response = GenerateResponse(null, ex.Message);
                return response;
            }
        }

        private ActionResponse<IEnumerable<TvShow>> GenerateResponse(IEnumerable<TvShow> shows, string message = null)
        {
            var response = new ActionResponse<IEnumerable<TvShow>>
            {
                Result = shows,
                WasSuccessful = message == null,
                Message = message
            };

            return response;
        }
    }
}