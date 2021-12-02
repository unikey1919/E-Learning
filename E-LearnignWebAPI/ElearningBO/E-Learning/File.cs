using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ElearningBO.E_Learning
{
    public class FileContent
    {
        [Key]
        public int Id { get; set; }

        [ForeignKey("Subject")]
        public int SubjectId { get; set; }
        public string FileName { get; set; }
        public string FilePath { get; set; }
        public string FileType { get; set; }
        public string FileExtention { get; set; }
        public bool isDelete { get; set; }
        public virtual Subject Subject { get; set; }
    }

    public class FileModel
    {
        public int Id { get; set; }
        public int SubjectId { get; set; }
        public string FileName { get; set; }
        public string FilePath { get; set; }
        public string FileType { get; set; }
        public string FileExtension { get; set; }
        public bool isDelete { get; set; }
    }

    public class FileRecord
    {
        public int Id { get; set; }
        public string FileName { get; set; }
        public string FileFormat { get; set; }
        public string FilePath { get; set; }
        public string ContentType { get; set; }
        public string AltText { get; set; }
        public string Description { get; set; }
    }
    public class FileDropZone
    {
        public int lastModified { get; set; }
        public string name { get; set; }
        public int size { get; set; }
        public string type { get; set; }
        public string webkitRelativePath { get; set; }
    }
    public class FileObject
    {
        public FileDropZone File { get; set; }

    }
}
