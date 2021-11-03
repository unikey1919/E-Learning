using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ElearningBO.E_Learning
{
    public class Course
    {
        [Key]
        public int Id { get; set; }

        [ForeignKey("Instructor")]
        public int InstructorId { get; set; }
        public string Code { get; set; }
        public string FullName { get; set; }
        public string Description { get; set; }
        public string Details { get; set; }
        public virtual Instructor Instructor { get; set; }
        public ICollection<Enrollment> Enrollments { get; set; }
    }

    public class CourseModel
    {
        public int Id { get; set; }
        public int InstructorId { get; set; }
        public string Code { get; set; }
        public string FullName { get; set; }
        public string Description { get; set; }
        public string Details { get; set; }
    }


}
