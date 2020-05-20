using System;
using System.Collections.Generic;
using System.Text;

namespace Assistant.Models.Entities
{
    public class UserTVShowMapping
    {
        public int Id { get; set; }
        public int UserId { get; set; }

        public int TVShowId { get; set; }
        public TvShow TvShow { get; set; }
    }
}
