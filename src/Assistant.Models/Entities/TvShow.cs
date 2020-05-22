using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace Assistant.Models.Entities
{
    public class TvShow
    {
        [JsonIgnore]
        public int TVShowId { get; set; }

        public string ShowName { get; set; }
        public string ShowKey { get; set; }
        public string ThumbnailUrl { get; set; }

        [JsonIgnore]
        public List<UserTVShowMapping> UserTVShowMappings { get; set; }
    }
}