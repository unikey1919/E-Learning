using Microsoft.EntityFrameworkCore.Migrations;

namespace E_LearnignWebAPI.Migrations
{
    public partial class dc : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Answer_Answer_AnswersId",
                table: "Answer");

            migrationBuilder.DropIndex(
                name: "IX_Answer_AnswersId",
                table: "Answer");

            migrationBuilder.DropColumn(
                name: "AnswersId",
                table: "Answer");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "AnswersId",
                table: "Answer",
                type: "int",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Answer_AnswersId",
                table: "Answer",
                column: "AnswersId");

            migrationBuilder.AddForeignKey(
                name: "FK_Answer_Answer_AnswersId",
                table: "Answer",
                column: "AnswersId",
                principalTable: "Answer",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
