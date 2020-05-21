using Microsoft.EntityFrameworkCore.Migrations;

namespace Assistant.DataAccess.Migrations
{
    public partial class UserIdToString : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<string>(
                name: "UserId",
                table: "UserTVShowMapping",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "int");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<int>(
                name: "UserId",
                table: "UserTVShowMapping",
                type: "int",
                nullable: false,
                oldClrType: typeof(string));
        }
    }
}