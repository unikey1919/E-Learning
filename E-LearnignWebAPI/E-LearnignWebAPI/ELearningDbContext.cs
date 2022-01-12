using ElearningBO.E_Learning;
using ElearningBO.UserAuthentication;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ElearningBO
{
    public class ELearningDbContext: IdentityDbContext<ApplicationUser>
    {
        public ELearningDbContext(DbContextOptions<ELearningDbContext> options) : base(options)
        {

        }
        public DbSet<ApplicationUser> ApplicationUsers { get; set; }
        public DbSet<Student> Students { get; set; }
        public DbSet<Instructor> Instructors { get; set; }
        public DbSet<Course> Courses { get; set; }
        public DbSet<Enrollment> Enrollments { get; set; }
        public DbSet<Subject> Subject { get; set; }
        public DbSet<FileContent> FileContent { get; set; }
        public DbSet<Assignment> Assignment { get; set; }
        public DbSet<FileAssignment> FileAssignment { get; set; }
        public DbSet<Forum> Forum { get; set; }
        public DbSet<Discussion> Discussion { get; set; }
        public DbSet<Video> Video { get; set; }
        public DbSet<Message> Message { get; set; }
        public DbSet<Room> Room { get; set; }
        public DbSet<Quiz> Quiz { get; set; }
        public DbSet<Question> Question { get; set; }
        public DbSet<Result> Result { get; set; }
        public DbSet<Answer> Answer { get; set; }

    }
}
