using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace Assistant.Models.Entities
{
    public class TvShow
    {
        [JsonIgnore]
        public int TVShowId { get; set; }

        [JsonPropertyName("showName")]
        public string ShowName { get; set; }

        [JsonPropertyName("showKey")]
        public string ShowKey { get; set; }

        [JsonPropertyName("thumbnailUrl")]
        public string ThumbnailUrl { get; set; }

        [JsonPropertyName("summary")]
        public string Summary { get; set; }

        [JsonIgnore]
        public List<UserTVShowMapping> UserTVShowMappings { get; set; }
    }
}