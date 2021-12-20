using Microsoft.EntityFrameworkCore.Migrations;

namespace E_LearnignWebAPI.Migrations
{
    public partial class baithi3 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Result_Enrollments_EnrollmentId",
                table: "Result");

            migrationBuilder.RenameColumn(
                name: "TimeSpent",
                table: "Result",
                newName: "StudentId");

            migrationBuilder.RenameColumn(
                name: "EnrollmentId",
                table: "Result",
                newName: "CourseId");

            migrationBuilder.RenameIndex(
                name: "IX_Result_EnrollmentId",
                table: "Result",
                newName: "IX_Result_CourseId");

            migrationBuilder.AlterColumn<string>(
                name: "Answer",
                table: "Question",
                type: "nvarchar(max)",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.CreateIndex(
                name: "IX_Result_StudentId",
                table: "Result",
                column: "StudentId");

            migrationBuilder.AddForeignKey(
                name: "FK_Result_Courses_CourseId",
                table: "Result",
                column: "CourseId",
                principalTable: "Courses",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Result_Students_StudentId",
                table: "Result",
                column: "StudentId",
                principalTable: "Students",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Result_Courses_CourseId",
                table: "Result");

            migrationBuilder.DropForeignKey(
                name: "FK_Result_Students_StudentId",
                table: "Result");

            migrationBuilder.DropIndex(
                name: "IX_Result_StudentId",
                table: "Result");

            migrationBuilder.RenameColumn(
                name: "StudentId",
                table: "Result",
                newName: "TimeSpent");

            migrationBuilder.RenameColumn(
                name: "CourseId",
                table: "Result",
                newName: "EnrollmentId");

            migrationBuilder.RenameIndex(
                name: "IX_Result_CourseId",
                table: "Result",
                newName: "IX_Result_EnrollmentId");

            migrationBuilder.AlterColumn<int>(
                name: "Answer",
                table: "Question",
                type: "int",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)",
                oldNullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_Result_Enrollments_EnrollmentId",
                table: "Result",
                column: "EnrollmentId",
                principalTable: "Enrollments",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
