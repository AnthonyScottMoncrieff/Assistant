using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Assistant.DataAccess.DataHandlers.Interfaces;
using Assistant.Logging.Interfaces;
using Assistant.Utilities.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

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

        public TvShowController(IGetTVShowsByUser getTVShowsByUser, ILogger logger, IUserContextManager userContextManager)
        {
            _getTVShowsByUser = getTVShowsByUser;
            _logger = logger;
            _userContextManager = userContextManager;
        }

        [HttpGet]
        public async Task<IActionResult> GetShows()
        {
            var userId = _userContextManager.GetUserIdFromContext();
            var showsActionResponse = await _getTVShowsByUser.GetTvShowsByUserId(userId);
            if (showsActionResponse.WasSuccessful)
            {
                _ = _logger.CommitAsync();
                return Ok(showsActionResponse);
            }
            else
            {
                _ = _logger.CommitAsync();
                return BadRequest(showsActionResponse);
            }
        }
    }
}