using Microsoft.EntityFrameworkCore.Migrations;

namespace E_LearnignWebAPI.Migrations
{
    public partial class fix : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Discussion_AspNetUsers_UserIdId",
                table: "Discussion");

            migrationBuilder.RenameColumn(
                name: "UserIdId",
                table: "Discussion",
                newName: "UserId");

            migrationBuilder.RenameIndex(
                name: "IX_Discussion_UserIdId",
                table: "Discussion",
                newName: "IX_Discussion_UserId");

            migrationBuilder.AddForeignKey(
                name: "FK_Discussion_AspNetUsers_UserId",
                table: "Discussion",
                column: "UserId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Discussion_AspNetUsers_UserId",
                table: "Discussion");

            migrationBuilder.RenameColumn(
                name: "UserId",
                table: "Discussion",
                newName: "UserIdId");

            migrationBuilder.RenameIndex(
                name: "IX_Discussion_UserId",
                table: "Discussion",
                newName: "IX_Discussion_UserIdId");

            migrationBuilder.AddForeignKey(
                name: "FK_Discussion_AspNetUsers_UserIdId",
                table: "Discussion",
                column: "UserIdId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
