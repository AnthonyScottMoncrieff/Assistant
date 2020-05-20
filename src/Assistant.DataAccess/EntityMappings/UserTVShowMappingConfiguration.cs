using Assistant.Models.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Assistant.DataAccess.EntityMappings
{
    public class UserTVShowMappingConfiguration : IEntityTypeConfiguration<UserTVShowMapping>
    {
        public void Configure(EntityTypeBuilder<UserTVShowMapping> builder)
        {
            builder.HasKey(x => x.Id);
            builder.Property(x => x.UserId).IsRequired();
            builder.HasOne(x => x.TvShow).WithMany(x => x.UserTVShowMappings).HasForeignKey(x => x.TVShowId);
        }
    }
}