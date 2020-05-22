using Microsoft.EntityFrameworkCore.Migrations;

namespace Assistant.DataAccess.Migrations
{
    public partial class AddedSummaryToTVShow : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Summary",
                table: "TvShow",
                nullable: false);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Summary",
                table: "TvShow");
        }
    }
}
