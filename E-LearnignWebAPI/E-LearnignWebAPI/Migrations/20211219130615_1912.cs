using Microsoft.EntityFrameworkCore.Migrations;

namespace E_LearnignWebAPI.Migrations
{
    public partial class _1912 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Room_Courses_CourseId",
                table: "Room");

            migrationBuilder.DropIndex(
                name: "IX_Room_CourseId",
                table: "Room");

            migrationBuilder.DropColumn(
                name: "CourseId",
                table: "Room");

            migrationBuilder.AddColumn<string>(
                name: "CourseCode",
                table: "Room",
                type: "nvarchar(max)",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "CourseCode",
                table: "Room");

            migrationBuilder.AddColumn<int>(
                name: "CourseId",
                table: "Room",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_Room_CourseId",
                table: "Room",
                column: "CourseId");

            migrationBuilder.AddForeignKey(
                name: "FK_Room_Courses_CourseId",
                table: "Room",
                column: "CourseId",
                principalTable: "Courses",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
