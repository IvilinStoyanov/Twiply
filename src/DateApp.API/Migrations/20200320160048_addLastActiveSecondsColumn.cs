using Microsoft.EntityFrameworkCore.Migrations;

namespace DateApp.API.Migrations
{
    public partial class addLastActiveSecondsColumn : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "LastActiveSeconds",
                table: "Users",
                nullable: false,
                defaultValue: 0);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "LastActiveSeconds",
                table: "Users");
        }
    }
}
