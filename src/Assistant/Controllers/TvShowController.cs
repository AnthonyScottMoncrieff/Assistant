﻿using Assistant.DataAccess.DataHandlers.Interfaces;
using Assistant.Domain.Interfaces;
using Assistant.Logging.Interfaces;
using Assistant.Models;
using Assistant.Models.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace Assistant.Controllers
{
    [Route("api/tvshows")]
    [Authorize]
    [ApiController]
    public class TvShowController : ControllerBase
    {
        private readonly IGetTVShowsByUser _getTVShowsByUser;
        private readonly ILogger _logger;
        private readonly IUserContextManager _userContextManager;
        private readonly IUserTVShowMappingManager _userTVShowMappingManager;

        public TvShowController(IGetTVShowsByUser getTVShowsByUser, ILogger logger, IUserContextManager userContextManager, IUserTVShowMappingManager userTVShowMappingManager)
        {
            _getTVShowsByUser = getTVShowsByUser;
            _logger = logger;
            _userContextManager = userContextManager;
            _userTVShowMappingManager = userTVShowMappingManager;
        }

        [HttpGet]
        public async Task<IActionResult> GetShows()
        {
            var userId = _userContextManager.GetUserIdFromContext();
            var showsActionResponse = await _getTVShowsByUser.GetTvShowsByUserId(userId);
            return ReturnFromActionResponse(showsActionResponse);
        }

        [HttpPost]
        public async Task<IActionResult> PostShow([FromBody]TvShow tvShow)
        {
            var response = await _userTVShowMappingManager.ManageAsync(tvShow);
            return ReturnFromActionResponse(response);
        }

        private IActionResult ReturnFromActionResponse<T>(ActionResponse<T> actionResponse)
        {
            if (actionResponse.WasSuccessful)
            {
                _ = _logger.CommitAsync();
                return Ok(actionResponse);
            }
            else
            {
                _ = _logger.CommitAsync();
                return BadRequest(actionResponse);
            }
        }
    }
}