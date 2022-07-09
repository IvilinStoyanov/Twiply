using Microsoft.EntityFrameworkCore.Migrations;

namespace API.Data.Migrations
{
    public partial class UpdateDeleteBehavior : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Connections_ChatGroups_ChatGroupName",
                table: "Connections");

            migrationBuilder.AddForeignKey(
                name: "FK_Connections_ChatGroups_ChatGroupName",
                table: "Connections",
                column: "ChatGroupName",
                principalTable: "ChatGroups",
                principalColumn: "Name",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Connections_ChatGroups_ChatGroupName",
                table: "Connections");

            migrationBuilder.AddForeignKey(
                name: "FK_Connections_ChatGroups_ChatGroupName",
                table: "Connections",
                column: "ChatGroupName",
                principalTable: "ChatGroups",
                principalColumn: "Name",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
