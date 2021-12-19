using Microsoft.EntityFrameworkCore.Migrations;

namespace E_LearnignWebAPI.Migrations
{
    public partial class _1215 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "UserName",
                table: "Discussion");

            migrationBuilder.AddColumn<string>(
                name: "UserIdId",
                table: "Discussion",
                type: "nvarchar(450)",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Discussion_UserIdId",
                table: "Discussion",
                column: "UserIdId");

            migrationBuilder.AddForeignKey(
                name: "FK_Discussion_AspNetUsers_UserIdId",
                table: "Discussion",
                column: "UserIdId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Discussion_AspNetUsers_UserIdId",
                table: "Discussion");

            migrationBuilder.DropIndex(
                name: "IX_Discussion_UserIdId",
                table: "Discussion");

            migrationBuilder.DropColumn(
                name: "UserIdId",
                table: "Discussion");

            migrationBuilder.AddColumn<string>(
                name: "UserName",
                table: "Discussion",
                type: "nvarchar(max)",
                nullable: true);
        }
    }
}
