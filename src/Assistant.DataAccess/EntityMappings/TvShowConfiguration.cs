using Assistant.Models.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Assistant.DataAccess.EntityMappings
{
    public class TvShowConfiguration : IEntityTypeConfiguration<TvShow>
    {
        public void Configure(EntityTypeBuilder<TvShow> builder)
        {
            builder.HasKey(x => x.TVShowId);
            builder.Property(x => x.ShowName).IsRequired();
            builder.Property(x => x.ShowKey).IsRequired();
            builder.Property(x => x.ThumbnailUrl).IsRequired();
        }
    }
}