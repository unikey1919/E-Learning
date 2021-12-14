using Microsoft.EntityFrameworkCore.Migrations;

namespace E_LearnignWebAPI.Migrations
{
    public partial class init231111 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_File_Subject_SubjectId",
                table: "File");

            migrationBuilder.DropPrimaryKey(
                name: "PK_File",
                table: "File");

            migrationBuilder.RenameTable(
                name: "File",
                newName: "FileContent");

            migrationBuilder.RenameIndex(
                name: "IX_File_SubjectId",
                table: "FileContent",
                newName: "IX_FileContent_SubjectId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_FileContent",
                table: "FileContent",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_FileContent_Subject_SubjectId",
                table: "FileContent",
                column: "SubjectId",
                principalTable: "Subject",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_FileContent_Subject_SubjectId",
                table: "FileContent");

            migrationBuilder.DropPrimaryKey(
                name: "PK_FileContent",
                table: "FileContent");

            migrationBuilder.RenameTable(
                name: "FileContent",
                newName: "File");

            migrationBuilder.RenameIndex(
                name: "IX_FileContent_SubjectId",
                table: "File",
                newName: "IX_File_SubjectId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_File",
                table: "File",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_File_Subject_SubjectId",
                table: "File",
                column: "SubjectId",
                principalTable: "Subject",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
