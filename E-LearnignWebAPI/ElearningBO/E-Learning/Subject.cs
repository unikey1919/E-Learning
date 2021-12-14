using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ElearningBO.E_Learning
{
    public class Subject
    {
        [Key]
        public int Id { get; set; }

        [ForeignKey("Course")]
        public int CourseId { get; set; }

        public string SubjectName { get; set; }
        public string Details { get; set; }
        public bool isDelete { get; set; }

        public DateTime CreateDate { get; set; }
        public virtual Course Course { get; set; }
    }

    public class SubjectContent
    {
        public int Id { get; set; }
        public int CourseId { get; set; }
        public string SubjectName { get; set; }
        public List<FileModel> LstFile { get; set; }
        public string Details { get; set; }
        public bool isDelete { get; set; }
        public List<Assignment> LstAssignment { get; set; }
        public List<Forum> LstForum { get; set; }
        public List<Video> LstVideo { get; set; }
    }

    public class StudentSubmit
    {
        public string Id { get; set; }
        public string UserName { get; set; }
        public string Email { get; set; }
        public string FullName { get; set; }
        public int StudentId { get; set; }
        public int Status { get; set; }
        public List<FileAssignment> LstAssignmentSubmit { get; set; }
    }
}
