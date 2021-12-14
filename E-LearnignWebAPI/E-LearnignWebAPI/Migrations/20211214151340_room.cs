using Microsoft.EntityFrameworkCore.Migrations;

namespace E_LearnignWebAPI.Migrations
{
    public partial class room : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
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

        protected override void Down(MigrationBuilder migrationBuilder)
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
        }
    }
}
