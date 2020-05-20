using System;
using System.Collections.Generic;
using System.Text;

namespace Assistant.Models.Entities
{
    public class TvShow
    {
        public int TVShowId { get; set; }
        public string ShowName { get; set; }
        public string ShowKey { get; set; }

        public List<UserTVShowMapping> UserTVShowMappings { get; set; }
    }
}
