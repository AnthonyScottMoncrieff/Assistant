using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace Assistant.Models.Entities
{
    public class TvShow
    {
        public int TVShowId { get; set; }
        public string ShowName { get; set; }
        public string ShowKey { get; set; }

        [JsonIgnore]
        public List<UserTVShowMapping> UserTVShowMappings { get; set; }
    }
}