using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ElearningBO;
using ElearningBO.E_Learning;
using System.Data;
using ElearningBLL.BLL;
using Newtonsoft.Json;

namespace E_LearnignWebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CoursesController : ControllerBase
    {
        private readonly ELearningDbContext _context;
        private Elearning elearningBll = null;

        public CoursesController(ELearningDbContext context)
        {
            _context = context;
            elearningBll = new Elearning();
        }

        // GET: api/Courses
        [HttpGet]
        [Route("GetAllCourse")]
        public ApiResultMessage GetAllCourse()
        {
            try
            {
                DataTable dt = elearningBll.GetAllCourse();
                return new ApiResultMessage { IsError = false, Message = JsonConvert.SerializeObject(dt), MessageDetail = "" };
            }
            catch (Exception ex)
            {
                return new ApiResultMessage { IsError = true, Message = ex.Message, MessageDetail = ex.StackTrace };
            }
        }

        [HttpPost]
        [Route("AddCourse")]
        public ApiResultMessage AddCourse(CourseModel model)
        {
            try
            {
                elearningBll.AddCourse(model);
                return new ApiResultMessage { IsError = false, Message = "", MessageDetail = "" };
            }
            catch (Exception ex)
            {
                return new ApiResultMessage { IsError = true, Message = ex.Message, MessageDetail = ex.StackTrace };
            }
        }

        [HttpPost]
        [Route("UpdateCourse")]
        public ApiResultMessage UpdateCourse(CourseModel model)
        {
            try
            {
                elearningBll.UpdateCourse(model);
                return new ApiResultMessage { IsError = false, Message = "", MessageDetail = "" };
            }
            catch (Exception ex)
            {
                return new ApiResultMessage { IsError = true, Message = ex.Message, MessageDetail = ex.StackTrace };
            }
        }

        [HttpPost]
        [Route("DelCourse")]
        public ApiResultMessage DelCourse(CourseModel model)
        {
            try
            {
                elearningBll.DelCourse(model);
                return new ApiResultMessage { IsError = false, Message = "", MessageDetail = "" };
            }
            catch (Exception ex)
            {
                return new ApiResultMessage { IsError = true, Message = ex.Message, MessageDetail = ex.StackTrace };
            }
        }




        // GET: api/Courses/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Course>> GetCourse(int id)
        {
            var course = await _context.Courses.FindAsync(id);

            if (course == null)
            {
                return NotFound();
            }

            return course;
        }       
        private bool CourseExists(int id)
        {
            return _context.Courses.Any(e => e.Id == id);
        }
    }
}
