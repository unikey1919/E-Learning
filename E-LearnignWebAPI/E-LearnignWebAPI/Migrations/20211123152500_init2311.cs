using Microsoft.EntityFrameworkCore.Migrations;

namespace E_LearnignWebAPI.Migrations
{
    public partial class init2311 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "FileExtention",
                table: "File",
                type: "nvarchar(max)",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "FileExtention",
                table: "File");
        }
    }
}
