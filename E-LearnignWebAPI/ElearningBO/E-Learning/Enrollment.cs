using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ElearningBO.E_Learning
{
    public class Enrollment
    {
        [Key]
        public int Id { get; set; }
        public int StudentId { get; set; }
        public int CourseId { get; set; }
        public DateTime DateEnrollment { get; set; }
        public DateTime DateCompletion { get; set; }
        public string Details { get; set; }
        public bool isDelete { get; set; }
        public virtual Student Student { get; set; }
        public virtual Course Course { get; set; }
    }

    public class EnrollmentModel
    {
        public int EnrollmentID { get; set; }
        public int Id { get; set; }
        public string UserId { get; set; }
        public string StudentName { get; set; }
        public string Email { get; set; }
        public string PhoneNumber { get; set; }
        public DateTime DateEnrollment { get; set; }
        public DateTime DateCompletion { get; set; }

    }

    public class AddEnrollment
    {
        public List<int> listStudent { get; set; }
        public int courseid { get; set; }
        public string dateenrollment { get; set; }
        public string datecompletion { get; set; }
    }
}
