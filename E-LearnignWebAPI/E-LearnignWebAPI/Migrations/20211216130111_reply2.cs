using Microsoft.EntityFrameworkCore.Migrations;

namespace E_LearnignWebAPI.Migrations
{
    public partial class reply2 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Reply",
                table: "Answer");

            migrationBuilder.AddColumn<int>(
                name: "ReplyId",
                table: "Answer",
                type: "int",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Answer_ReplyId",
                table: "Answer",
                column: "ReplyId");

            migrationBuilder.AddForeignKey(
                name: "FK_Answer_Answer_ReplyId",
                table: "Answer",
                column: "ReplyId",
                principalTable: "Answer",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Answer_Answer_ReplyId",
                table: "Answer");

            migrationBuilder.DropIndex(
                name: "IX_Answer_ReplyId",
                table: "Answer");

            migrationBuilder.DropColumn(
                name: "ReplyId",
                table: "Answer");

            migrationBuilder.AddColumn<int>(
                name: "Reply",
                table: "Answer",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }
    }
}
