using Assistant.Models.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Text;

namespace Assistant.DataAccess.EntityMappings
{
    public class TvShowConfiguration : IEntityTypeConfiguration<TvShow>
    {
        public void Configure(EntityTypeBuilder<TvShow> builder)
        {
            builder.HasKey(x => x.TVShowId);
            builder.Property(x => x.ShowName).IsRequired();
            builder.Property(x => x.ShowKey).IsRequired();
        }
    }
}
