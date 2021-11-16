using ElearningBO.UserAuthentication;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ElearningBO.E_Learning
{
    public class Student
    {
        [Key]
        public int Id { get; set; }

        [ForeignKey("ApplicationUser")]
        public string UserId { get; set; }
        public bool isDelete { get; set; }
        public virtual ApplicationUser ApplicationUser { get; set; }
        public ICollection<Enrollment> Enrollments { get; set; }

    }
    public class StudentModel
    {
        public int Id { get; set; }
        public string UserId { get; set; }
        public string StudentName { get; set; }
        public string Email { get; set; }
        public string PhoneNumber { get; set; }
    }
}
