using System.Text.Json.Serialization;

namespace Assistant.Models.Entities
{
    public class UserTVShowMapping
    {
        [JsonIgnore]
        public int Id { get; set; }
        [JsonIgnore]
        public string UserId { get; set; }
        [JsonIgnore]
        public int TVShowId { get; set; }
        public TvShow TvShow { get; set; }
    }
}