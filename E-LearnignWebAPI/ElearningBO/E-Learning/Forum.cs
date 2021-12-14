using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ElearningBO.E_Learning
{
    public class Forum
    {
        [Key]
        public int Id { get; set; }

        [ForeignKey("Subject")]
        public int SubjectId { get; set; }
        public string ForumName { get; set; }
        public string Details { get; set; }
        public DateTime CreateDate  {get; set; }
        public bool isDelete { get; set; }
        public virtual Subject Subject { get; set; }

    }
    public class Discussion
    {
        [Key]
        public int Id { get; set; }

        [ForeignKey("Forum")]
        public int ForumId { get; set; }
        public string UserName { get; set; }
        public string DiscussName { get; set; }
        public string Details { get; set; }
        public DateTime CreateDate { get; set; }
        public bool isDelete { get; set; }
        public virtual Forum Forum { get; set; }
    }
}
