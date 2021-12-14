using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ElearningBO.E_Learning
{
    public class Video
    {
        [Key]
        public int Id { get; set; }

        [ForeignKey("Subject")]
        public int SubjectId { get; set; }
        public string YoutubeLink { get; set; }
        public string Title { get; set; }
        public string Tags { get; set; }
        public DateTime CreateDate { get; set; }
        public bool isDelete { get; set; }
        public virtual Subject Subject { get; set; }
    }

    public class VideoModel
    {
        public int Id { get; set; }
        public int SubjectId { get; set; }
        public string YoutubeLink { get; set; }
        public string Title { get; set; }
        public string Tags { get; set; }
    }
}
