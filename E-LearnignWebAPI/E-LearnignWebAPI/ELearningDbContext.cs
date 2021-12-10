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
    public class ELearningDbContext: IdentityDbContext
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
    }
}
