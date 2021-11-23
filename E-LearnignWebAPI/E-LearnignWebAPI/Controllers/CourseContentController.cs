using ElearningBLL.BLL;
using ElearningBO;
using ElearningBO.E_Learning;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading.Tasks;

namespace E_LearnignWebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CourseContentController : ControllerBase
    {
        private Elearning elearningBll = null;

        public CourseContentController()
        {
            elearningBll = new Elearning();
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
    }
}
