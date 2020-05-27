using Microsoft.EntityFrameworkCore.Migrations;

namespace Assistant.DataAccess.Migrations
{
    public partial class AddedThumbnailToTVShow : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "ThumbnailUrl",
                table: "TvShow",
                nullable: false);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ThumbnailUrl",
                table: "TvShow");
        }
    }
}