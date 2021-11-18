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
                return new ApiResultMessage { IsError = false, Message = JsonConvert.SerializeObject(dt), MessageDetail = "" };
            }
            catch (Exception ex)
            {
                return new ApiResultMessage { IsError = true, Message = ex.Message, MessageDetail = ex.StackTrace };
            }
        }
    }
}
