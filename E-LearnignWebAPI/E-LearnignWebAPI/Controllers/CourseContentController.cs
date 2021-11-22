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
                    obj.CourseId = Convert.ToInt32(dt.Rows[i]["id"]);
                    obj.CourseId = Convert.ToInt32(dt.Rows[i]["courseId"]);
                    obj.SubjectName = (dt.Rows[i]["subjectName"]).ToString();
                    obj.LstFile = new List<FileModel>();
                    for (int j = 0; j < 3; j++)
                    {
                        FileModel objFile = new FileModel();
                        objFile.FileName = j.ToString();
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
