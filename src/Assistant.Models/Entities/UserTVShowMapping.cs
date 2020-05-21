namespace Assistant.Models.Entities
{
    public class UserTVShowMapping
    {
        public int Id { get; set; }
        public string UserId { get; set; }

        public int TVShowId { get; set; }
        public TvShow TvShow { get; set; }
    }
}