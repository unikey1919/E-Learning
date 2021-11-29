using ElearningBLL.BLL;
using ElearningBO;
using ElearningBO.E_Learning;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Data;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace E_LearnignWebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CourseContentController : ControllerBase
    {
        private Elearning elearningBll = null;
        private readonly string AppDirectory = Path.Combine(Directory.GetCurrentDirectory(), "Content");
        private readonly ELearningDbContext _context;
        public CourseContentController(ELearningDbContext context)
        {
            elearningBll = new Elearning();
            _context = context;
        }

        // POST: api/CourseContent
        [HttpPost]
        [Route("GetContentByCourse")]
        public ApiResultMessage GetContentByCourse(SubjectContent model)
        {
            try
            {
                DataTable dt = elearningBll.GetContentByCourse(model);
                List<SubjectContent> lstSubject = new List<SubjectContent>();
                for(int i = 0; i< dt.Rows.Count; i++)
                {
                    SubjectContent obj = new SubjectContent();
                    obj.Id = Convert.ToInt32(dt.Rows[i]["id"]);
                    obj.CourseId = Convert.ToInt32(dt.Rows[i]["courseId"]);
                    obj.SubjectName = (dt.Rows[i]["subjectName"]).ToString();
                    DataTable fileData = elearningBll.GetFileBySubject(obj);
                    obj.LstFile = new List<FileModel>();
                    for (int j = 0; j < fileData.Rows.Count; j++)
                    {
                        FileModel objFile = new FileModel();
                        objFile.Id = Convert.ToInt32(fileData.Rows[j]["Id"]);
                        objFile.SubjectId = Convert.ToInt32(fileData.Rows[j]["SubjectId"]);
                        objFile.FileName = (fileData.Rows[j]["FileName"]).ToString();
                        objFile.FilePath = (fileData.Rows[j]["FilePath"]).ToString();
                        objFile.FileType = (fileData.Rows[j]["FileType"]).ToString();
                        objFile.FileExtension = (fileData.Rows[j]["FileExtention"]).ToString();
                        obj.LstFile.Add(objFile);
                    }
                    obj.Details = (dt.Rows[i]["details"]).ToString();
                    lstSubject.Add(obj);
                }
                return new ApiResultMessage { IsError = false, Message = JsonConvert.SerializeObject(lstSubject), MessageDetail = "" };
            }
            catch (Exception ex)
            {
                return new ApiResultMessage { IsError = true, Message = ex.Message, MessageDetail = ex.StackTrace };
            }
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> DownloadFile(int id)
        {
            if (!Directory.Exists(AppDirectory))
                Directory.CreateDirectory(AppDirectory);

            //getting file from inmemory obj
            //var file = fileDB?.Where(n => n.Id == id).FirstOrDefault();
            //getting file from DB
            var file = _context.FileContent.Where(n => n.Id == id).FirstOrDefault();
            var path = Path.Combine(AppDirectory, file?.FilePath);
            var memory = new MemoryStream();

            using (var stream = new FileStream(path, FileMode.Open))
            {
                await stream.CopyToAsync(memory);
            }

            memory.Position = 0;
            var contentType = "APPLICATION/octet-stream";
            var fileName = Path.GetFileName(path);

            return File(memory, contentType, fileName);
        }
    }
}
