using Microsoft.EntityFrameworkCore.Migrations;

namespace E_LearnignWebAPI.Migrations
{
    public partial class reply5 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Answer_Answer_answerId",
                table: "Answer");

            migrationBuilder.RenameColumn(
                name: "answerId",
                table: "Answer",
                newName: "AnswersId");

            migrationBuilder.RenameIndex(
                name: "IX_Answer_answerId",
                table: "Answer",
                newName: "IX_Answer_AnswersId");

            migrationBuilder.AddForeignKey(
                name: "FK_Answer_Answer_AnswersId",
                table: "Answer",
                column: "AnswersId",
                principalTable: "Answer",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Answer_Answer_AnswersId",
                table: "Answer");

            migrationBuilder.RenameColumn(
                name: "AnswersId",
                table: "Answer",
                newName: "answerId");

            migrationBuilder.RenameIndex(
                name: "IX_Answer_AnswersId",
                table: "Answer",
                newName: "IX_Answer_answerId");

            migrationBuilder.AddForeignKey(
                name: "FK_Answer_Answer_answerId",
                table: "Answer",
                column: "answerId",
                principalTable: "Answer",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
