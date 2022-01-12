using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ElearningBO.E_Learning
{
    public class Result
    {
        [Key]
        public int Id { get; set; }
        public int QuizId { get; set; }
        public int CourseId { get; set; }
        public int StudentId { get; set; }
        public decimal Score { get; set; }
        public virtual Quiz Quiz { get; set; }
        public virtual Course Course { get; set; }
        public virtual Student Student { get; set; }
    }
}
