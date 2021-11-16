﻿using System;
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
}