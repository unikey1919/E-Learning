using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ElearningBO.E_Learning
{
    public class Question
    {
        [Key]
        public int QnID { get; set; }

        [ForeignKey("Quiz")]
        public int QuizID { get; set; }

        public string Qn { get; set; }
        public string ImageName { get; set; }
        public string Option1 { get; set; }
        public string Option2 { get; set; }
        public string Option3 { get; set; }
        public string Option4 { get; set; }
        public string Answer { get; set; }
        public bool isDelete { get; set; }
        public virtual Quiz Quiz { get; set; }
    }

    public class QuestionModelExcel
    {
        public int QuizID { get; set; }
        public string Qn { get; set; }
        public string ImageName { get; set; }
        public string Option1 { get; set; }
        public string Option2 { get; set; }
        public string Option3 { get; set; }
        public string Option4 { get; set; }
        public string Answer { get; set; }
    }
}
