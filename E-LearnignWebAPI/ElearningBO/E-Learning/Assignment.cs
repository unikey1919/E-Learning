using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ElearningBO.E_Learning
{
    public class Assignment
    {
        [Key]
        public int Id { get; set; }

        [ForeignKey("Subject")]
        public int SubjectId { get; set; }
        public string AssignmentName { get; set; }      
        public string Details { get; set; }
        public DateTime Opened { get; set; }
        public DateTime? Due { get; set; }
        public bool isDelete { get; set; }
        public virtual Subject Subject { get; set; }
    }
}
