using Microsoft.EntityFrameworkCore.Migrations;

namespace E_LearnignWebAPI.Migrations
{
    public partial class reply4 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "answerId",
                table: "Answer",
                type: "int",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Answer_answerId",
                table: "Answer",
                column: "answerId");

            migrationBuilder.AddForeignKey(
                name: "FK_Answer_Answer_answerId",
                table: "Answer",
                column: "answerId",
                principalTable: "Answer",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Answer_Answer_answerId",
                table: "Answer");

            migrationBuilder.DropIndex(
                name: "IX_Answer_answerId",
                table: "Answer");

            migrationBuilder.DropColumn(
                name: "answerId",
                table: "Answer");
        }
    }
}
