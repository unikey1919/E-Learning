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
    public class Instructor
    {
        [Key]
        public int Id { get; set; }

        [ForeignKey("ApplicationUser")]
        public string UserId { get; set; }
        public bool isDelete { get; set; }
        public virtual ApplicationUser ApplicationUser { get; set; }
        public ICollection<Course> Course { get; set; }
    }

    public class InstructorModel
    {
        public int Id { get; set; }
        public string UserId { get; set; }
        public string InstructionName { get; set; }
        public string Email { get; set; }
        public string PhoneNumber { get; set; }
    }

}
