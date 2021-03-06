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
using System.Net;
using System.Net.Http;
using System.Text.RegularExpressions;
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
        private static List<FileRecord> fileDB = new List<FileRecord>();
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
                    //Lấy danh sách bài tập thuộc chương
                    var assignment = _context.Assignment.Where(n=>n.SubjectId == obj.Id && n.isDelete == false).ToList();
                    obj.LstAssignment = assignment;
                    //Lấy danh sách quiz thuộc chương
                    var quiz = _context.Quiz.Where(n => n.SubjectId == obj.Id && n.isDelete == false).ToList();
                    obj.LstQuiz = quiz;
                    //Lấy danh sách forum thuộc chương
                    var forum = _context.Forum.Where(n => n.SubjectId == obj.Id && n.isDelete == false).ToList();
                    obj.LstForum = forum;
                    //Lấy danh sách video thuộc chương
                    var video= _context.Video.Where(n => n.SubjectId == obj.Id && n.isDelete == false).ToList();
                    obj.LstVideo = video;
                    //Lấy danh sách file đính kèm thuộc chương
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
        [HttpGet]
        [Route("DownloadAssignment/{id}")]
        public async Task<IActionResult> DownloadAssignment(int id)
        {
            if (!Directory.Exists(AppDirectory))
                Directory.CreateDirectory(AppDirectory);

            //getting file from inmemory obj
            //var file = fileDB?.Where(n => n.Id == id).FirstOrDefault();
            //getting file from DB
            var file = _context.FileAssignment.Where(n => n.Id == id).FirstOrDefault();
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
        private void SaveToDB(FileRecord record,string subjectId)
        {
            if (record == null)
                throw new ArgumentNullException($"{nameof(record)}");

            FileContent fileData = new FileContent();
            fileData.SubjectId = Convert.ToInt32(subjectId);
            fileData.FilePath = record.FilePath;
            fileData.FileName = record.FileName;
            fileData.FileExtention = record.FileFormat;
            fileData.FileType = record.ContentType;

            _context.FileContent.Add(fileData);
            _context.SaveChanges();
        }
        private void SaveToAssignmentDB(FileRecord record, string userSubmit, string assignmentId)
        {
            if (record == null)
                throw new ArgumentNullException($"{nameof(record)}");

            FileAssignment fileData = new FileAssignment();
            fileData.AssignmentId = Convert.ToInt32(assignmentId);
            fileData.FilePath = record.FilePath;
            fileData.FileName = record.FileName;
            fileData.FileExtention = record.FileFormat;
            fileData.FileType = record.ContentType;
            fileData.UserSubmit = userSubmit;
            fileData.SubmitDate = DateTime.Now;
            _context.FileAssignment.Add(fileData);
            _context.SaveChanges();
        }
        private async Task<FileRecord> SaveFileAsync(IFormFile myFile)
        {
            FileRecord file = new FileRecord();
            if (myFile != null)
            {
                if (!Directory.Exists(AppDirectory))
                    Directory.CreateDirectory(AppDirectory);

                var fileName = myFile.FileName.Trim();
                var path = Path.Combine(AppDirectory, fileName);

                file.Id = fileDB.Count() + 1;
                file.FilePath = path;
                file.FileName = fileName;
                file.FileFormat = Path.GetExtension(myFile.FileName);
                file.ContentType = myFile.ContentType;

                using (var stream = new FileStream(path, FileMode.Create))
                {
                    await myFile.CopyToAsync(stream);
                }

                return file;
            }
            return file;
        }
        [HttpPost]
        public async Task<HttpResponseMessage> PostAsync([FromForm] FileObject files)
        {
            try
            {
                foreach (var file in files.files)
                {
                    FileRecord filerc = await SaveFileAsync(file);
                    if (files.assignmentId == "-1")
                    {
                        SaveToDB(filerc, files.subjectId);
                    }
                    else
                        SaveToAssignmentDB(filerc, files.submitUser, files.assignmentId);
                }
                return new HttpResponseMessage(HttpStatusCode.OK);

            }
            catch (Exception ex)
            {
                return new HttpResponseMessage(HttpStatusCode.InternalServerError)
                {
                    Content = new StringContent(ex.Message),
                };
            }
        }

        [HttpPost]
        [Route("AddSubject")]
        public ApiResultMessage AddSubject(Subject model)
        {
            try
            {
                elearningBll.AddSubject(model);
                return new ApiResultMessage { IsError = false, Message = "", MessageDetail = "" };
            }
            catch (Exception ex)
            {
                return new ApiResultMessage { IsError = true, Message = ex.Message, MessageDetail = ex.StackTrace };
            }
        }

        [HttpPost]
        [Route("DelFile")]
        public ApiResultMessage DelFile(FileContent model)
        {
            try
            {
                elearningBll.DelFile(model);
                return new ApiResultMessage { IsError = false, Message = "", MessageDetail = "" };
            }
            catch (Exception ex)
            {
                return new ApiResultMessage { IsError = true, Message = ex.Message, MessageDetail = ex.StackTrace };
            }
        }

        [HttpPost]
        [Route("DelFileSubmit")]
        public ApiResultMessage DelFileSubmit(FileAssignment model)
        {
            try
            {
                elearningBll.DelFileSubmit(model);
                return new ApiResultMessage { IsError = false, Message = "", MessageDetail = "" };
            }
            catch (Exception ex)
            {
                return new ApiResultMessage { IsError = true, Message = ex.Message, MessageDetail = ex.StackTrace };
            }
        }

        #region Assingment
        [HttpPost]
        [Route("AddAssignmentBySubject")]
        public ApiResultMessage AddAssignmentBySubject(Assignment model)
        {
            try
            {
                elearningBll.AddAssignmentBySubject(model);
                return new ApiResultMessage { IsError = false, Message = "", MessageDetail = "" };
            }
            catch (Exception ex)
            {
                return new ApiResultMessage { IsError = true, Message = ex.Message, MessageDetail = ex.StackTrace };
            }
        }

        [HttpGet]
        [Route("GetAssignmentBySubject/{id}")]
        public async Task<ActionResult<Assignment>> GetAssignmentBySubject(int id)
        {
            var assignment =  await _context.Assignment.FindAsync(id);
            return Ok(assignment);
        }

        [HttpGet]
        [Route("GetAssignmentSubmitStatus/{id}/{assignmentId}")]
        public IActionResult GetAssignmentSubmitStatus(string id, int assignmentId)
        {
            var assignmentSubmit =  _context.FileAssignment.Where(n=> n.isDelete == false && n.UserSubmit == id && n.AssignmentId == assignmentId).Select(n => n.SubmitDate).FirstOrDefault();
            var assignmentDue = _context.Assignment.Where(n => n.Id == assignmentId).Select(n => n.Due).FirstOrDefault();
            TimeSpan now = new TimeSpan();
            //1 / 1 / 0001 12:00:00 AM
            if (assignmentSubmit == new DateTime())
                now = assignmentDue - assignmentDue;
            else
                now = assignmentDue - assignmentSubmit;        
            return Ok(now);
        }
        [HttpGet]
        [Route("GetAssignmentSubmit/{id}/{assignmentId}")]
        public IActionResult GetAssignmentSubmit(string id, int assignmentId)
        {
            var assignment = _context.FileAssignment.Where(n => n.isDelete == false && n.UserSubmit == id && n.AssignmentId == assignmentId).ToList();
            return Ok(assignment);
        }

        [HttpGet]
        [Route("GetLstAssignmentSubmit/{assignmentId}")]
        public IActionResult GetLstAssignmentSubmit(int assignmentId)
        {
            var assignment = _context.FileAssignment.Where(n => n.isDelete == false && n.AssignmentId == assignmentId).ToList();
            return Ok(assignment);
        }

        [HttpGet]
        [Route("GetAllStudentSubmit/{courseId}/{assingmentId}")]
        public IActionResult GetAllStudentSubmit(int courseId, int assingmentId)
        {

                DataTable dt = elearningBll.GetAllStudentByCourse(courseId);
                List<StudentSubmit> lstStudent = new List<StudentSubmit>();
                for (int i = 0; i < dt.Rows.Count; i++)
                {
                    StudentSubmit obj = new StudentSubmit();
                    obj.Id = (dt.Rows[i]["Id"]).ToString();
                    obj.UserName = (dt.Rows[i]["UserName"]).ToString();
                    obj.FullName = (dt.Rows[i]["FullName"]).ToString();
                    obj.Email = (dt.Rows[i]["Email"]).ToString();
                    obj.StudentId = Convert.ToInt32(dt.Rows[i]["StudentId"]);
                //Lấy danh sách bài tập đã nộp theo từng user
                    var assignmentSubmit = _context.FileAssignment.Where(n => n.UserSubmit == obj.UserName && n.AssignmentId == assingmentId && n.isDelete == false).ToList();
                    obj.LstAssignmentSubmit = assignmentSubmit;

                //check deadline
                    var assignmentSubmitStatus = _context.FileAssignment.Where(n => n.isDelete == false && n.UserSubmit == obj.UserName && n.AssignmentId == assingmentId).Select(n => n.SubmitDate).FirstOrDefault();
                    var assignmentDue = _context.Assignment.Where(n => n.Id == assingmentId).Select(n => n.Due).FirstOrDefault();
                TimeSpan now = new TimeSpan();
                //1 / 1 / 0001 12:00:00 AM
                if (assignmentSubmitStatus == new DateTime())
                    now = assignmentDue - assignmentDue;
                else
                    now = assignmentDue - assignmentSubmitStatus;
                if (now.Ticks == 0)
                {
                    obj.Status = 0; //Chưa nộp
                }
                if (now.Ticks < 0)
                {
                    obj.Status = 1; //Nộp trễ
                }
                if (now.Ticks > 0)
                {
                    obj.Status = 2; //Nộp đúng hạn
                }
                lstStudent.Add(obj);
                }
            return Ok(lstStudent);
        }

        [HttpPost]
        [Route("DelAssignment")]
        public ApiResultMessage DelAssignment(Assignment model)
        {
            try
            {
                elearningBll.DelAssignment(model);
                return new ApiResultMessage { IsError = false, Message = "", MessageDetail = "" };
            }
            catch (Exception ex)
            {
                return new ApiResultMessage { IsError = true, Message = ex.Message, MessageDetail = ex.StackTrace };
            }
        }
        [HttpPost]
        [Route("UpdateAssignment")]
        public ApiResultMessage UpdateAssignment(Assignment model)
        {
            try
            {
                elearningBll.UpdateAssignment(model);
                return new ApiResultMessage { IsError = false, Message = "", MessageDetail = "" };
            }
            catch (Exception ex)
            {
                return new ApiResultMessage { IsError = true, Message = ex.Message, MessageDetail = ex.StackTrace };
            }
        }
        #endregion
        #region Quiz
        [HttpGet]
        [Route("GetQuizBySubject/{id}")]
        public async Task<ActionResult<Quiz>> GetQuizBySubject(int id)
        {
            var quiz = await _context.Quiz.FindAsync(id);
            return Ok(quiz);
        }

        [HttpGet]
        [Route("GetListQuestionByQuiz/{id}")]
        public IActionResult GetListQuestionByQuiz(int id)
        {
            var question = _context.Question.Where(n => n.isDelete == false && n.QuizID == id).ToList();
            var count = _context.Question.Count(n => n.isDelete == false && n.QuizID == id);
            return Ok(question);
        }

        [HttpGet]
        [Route("GetCountQuestion/{id}")]
        public IActionResult GetCountQuestion(int id)
        {
            var count = _context.Question.Count(n => n.isDelete == false && n.QuizID == id);
            return Ok(count);
        }

        [HttpGet]
        [Route("GetResult/{quizid}/{courseid}/{studentid}")]
        public IActionResult GetResult(int quizid, int courseid, int studentid)
        {
            var count = _context.Result.Where(n => n.QuizId == quizid && n.CourseId == courseid && n.StudentId == studentid).ToList();
            return Ok(count);
        }

        [HttpGet]
        [Route("GetStudentNotDoQuiz/{courseid}/{quizid}")]
        public ApiResultMessage GetStudentNotDoQuiz(int courseid, int quizid)
        {
            try
            {
                DataTable dt = elearningBll.GetStudentNotDoQuiz(courseid, quizid);
                return new ApiResultMessage { IsError = false, Message = JsonConvert.SerializeObject(dt), MessageDetail = "" };
            }
            catch (Exception ex)
            {
                return new ApiResultMessage { IsError = true, Message = ex.Message, MessageDetail = ex.StackTrace };
            }
        }

        [HttpGet]
        [Route("GetStudentDoQuiz/{courseid}/{quizid}")]
        public ApiResultMessage GetStudentDoQuiz(int courseid, int quizid)
        {
            try
            {
                DataTable dt = elearningBll.GetStudentDoQuiz(courseid, quizid);
                return new ApiResultMessage { IsError = false, Message = JsonConvert.SerializeObject(dt), MessageDetail = "" };
            }
            catch (Exception ex)
            {
                return new ApiResultMessage { IsError = true, Message = ex.Message, MessageDetail = ex.StackTrace };
            }
        }

        [HttpGet]
        [Route("GetStudentId/{username}")]
        public ApiResultMessage GetStudentId(string username)
        {
            try
            {
                DataTable dt = elearningBll.GetStudentId(username);
                return new ApiResultMessage { IsError = false, Message = JsonConvert.SerializeObject(dt), MessageDetail = "" };
            }
            catch (Exception ex)
            {
                return new ApiResultMessage { IsError = true, Message = ex.Message, MessageDetail = ex.StackTrace };
            }
        }

        [HttpPost]
        [Route("AddQuizBySubject")]
        public ApiResultMessage AddQuizBySubject(Quiz model)
        {
            try
            {
                elearningBll.AddQuizBySubject(model);
                return new ApiResultMessage { IsError = false, Message = "", MessageDetail = "" };
            }
            catch (Exception ex)
            {
                return new ApiResultMessage { IsError = true, Message = ex.Message, MessageDetail = ex.StackTrace };
            }
        }

        [HttpPost]
        [Route("UpdateQuiz")]
        public ApiResultMessage UpdateQuiz(Quiz model)
        {
            try
            {
                elearningBll.UpdateQuiz(model);
                return new ApiResultMessage { IsError = false, Message = "", MessageDetail = "" };
            }
            catch (Exception ex)
            {
                return new ApiResultMessage { IsError = true, Message = ex.Message, MessageDetail = ex.StackTrace };
            }
        }

        [HttpPost]
        [Route("DelQuiz")]
        public ApiResultMessage DelQuiz(Quiz model)
        {
            try
            {
                elearningBll.DelQuiz(model);
                return new ApiResultMessage { IsError = false, Message = "", MessageDetail = "" };
            }
            catch (Exception ex)
            {
                return new ApiResultMessage { IsError = true, Message = ex.Message, MessageDetail = ex.StackTrace };
            }
        }

        [HttpPost]
        [Route("AddQuestion")]
        public ApiResultMessage AddQuestion(Question model)
        {
            try
            {
                elearningBll.AddQuestion(model);
                return new ApiResultMessage { IsError = false, Message = "", MessageDetail = "" };
            }
            catch (Exception ex)
            {
                return new ApiResultMessage { IsError = true, Message = ex.Message, MessageDetail = ex.StackTrace };
            }
        }


        //Import file excel Question
        //Thêm câu hỏi vào bài Quiz
        [HttpPost]
        [Route("AddQuestionByExcel")]
        public ApiResultMessage AddQuestionByExcel(List<QuestionModelExcel> listExcel)
        {
            try
            {
                elearningBll.AddQuestionByExcel(listExcel);
                return new ApiResultMessage { IsError = false, Message = "", MessageDetail = "" };
            }
            catch (Exception ex)
            {
                return new ApiResultMessage { IsError = true, Message = ex.Message, MessageDetail = ex.StackTrace };
            }
        }

        [HttpPost]
        [Route("AddResult")]
        public ApiResultMessage AddResult(Result model)
        {
            try
            {
                elearningBll.AddResult(model);
                return new ApiResultMessage { IsError = false, Message = "", MessageDetail = "" };
            }
            catch (Exception ex)
            {
                return new ApiResultMessage { IsError = true, Message = ex.Message, MessageDetail = ex.StackTrace };
            }
        }

        [HttpPost]
        [Route("UpdateQuestion")]
        public ApiResultMessage UpdateQuestion(Question model)
        {
            try
            {
                elearningBll.UpdateQuestion(model);
                return new ApiResultMessage { IsError = false, Message = "", MessageDetail = "" };
            }
            catch (Exception ex)
            {
                return new ApiResultMessage { IsError = true, Message = ex.Message, MessageDetail = ex.StackTrace };
            }
        }

        [HttpPost]
        [Route("UpdateQuizShowScore")]
        public ApiResultMessage UpdateQuizShowScore(Quiz model)
        {
            try
            {
                elearningBll.UpdateQuizShowScore(model);
                return new ApiResultMessage { IsError = false, Message = "", MessageDetail = "" };
            }
            catch (Exception ex)
            {
                return new ApiResultMessage { IsError = true, Message = ex.Message, MessageDetail = ex.StackTrace };
            }
        }

        [HttpPost]
        [Route("DelQuestion")]
        public ApiResultMessage Question(Question model)
        {
            try
            {
                elearningBll.DelQuestion(model);
                return new ApiResultMessage { IsError = false, Message = "", MessageDetail = "" };
            }
            catch (Exception ex)
            {
                return new ApiResultMessage { IsError = true, Message = ex.Message, MessageDetail = ex.StackTrace };
            }
        }

        #endregion
        #region Forum
        [HttpGet]
        [Route("GetForum/{id}")]
        public async Task<ActionResult<Forum>> GetForum(int id)
        {
            var forum = await _context.Forum.FindAsync(id);

            if (forum == null)
            {
                return NotFound();
            }

            return forum;
        }
        [HttpPost]
        [Route("AddForumBySubject")]
        public ApiResultMessage AddForumBySubject(Forum model)
        {
            try
            {
                elearningBll.AddForumBySubject(model);
                return new ApiResultMessage { IsError = false, Message = "", MessageDetail = "" };
            }
            catch (Exception ex)
            {
                return new ApiResultMessage { IsError = true, Message = ex.Message, MessageDetail = ex.StackTrace };
            }
        }
        [HttpPost]
        [Route("DelForum")]
        public ApiResultMessage DelForum(Forum model)
        {
            try
            {
                elearningBll.DelForum(model);
                return new ApiResultMessage { IsError = false, Message = "", MessageDetail = "" };
            }
            catch (Exception ex)
            {
                return new ApiResultMessage { IsError = true, Message = ex.Message, MessageDetail = ex.StackTrace };
            }
        }
        [HttpPost]
        [Route("UpdateForum")]
        public ApiResultMessage UpdateForum(Forum model)
        {
            try
            {
                elearningBll.UpdateForum(model);
                return new ApiResultMessage { IsError = false, Message = "", MessageDetail = "" };
            }
            catch (Exception ex)
            {
                return new ApiResultMessage { IsError = true, Message = ex.Message, MessageDetail = ex.StackTrace };
            }
        }
        #region Discusstion
        [HttpGet]
        [Route("GetDiscussByForum/{forumId}")]
        public ApiResultMessage GetDiscussByForum(int forumId)
        {
            try
            {
                DataTable dt = elearningBll.GetDiscussByForum(forumId);
                return new ApiResultMessage { IsError = false, Message = JsonConvert.SerializeObject(dt), MessageDetail = "" };
            }
            catch (Exception ex)
            {
                return new ApiResultMessage { IsError = true, Message = ex.Message, MessageDetail = ex.StackTrace };
            }
        }
        [HttpGet]
        [Route("GetDiscuss/{forumId}/{id}")]
        public ApiResultMessage GetDiscuss(int forumId,int id)
        {
            try
            {
                DataTable dt = elearningBll.GetDiscuss(forumId,id);
                return new ApiResultMessage { IsError = false, Message = JsonConvert.SerializeObject(dt), MessageDetail = "" };
            }
            catch (Exception ex)
            {
                return new ApiResultMessage { IsError = true, Message = ex.Message, MessageDetail = ex.StackTrace };
            }
        }
        [HttpPost]
        [Route("AddDiscussBySubject")]
        public ApiResultMessage AddDiscussBySubjectForum(Discussion model)
        {
            try
            {
                model.User = _context.Users.FirstOrDefault(u => u.UserName == User.Identity.Name);
                elearningBll.AddDiscussBySubject(model);
                return new ApiResultMessage { IsError = false, Message = "", MessageDetail = "" };
            }
            catch (Exception ex)
            {
                return new ApiResultMessage { IsError = true, Message = ex.Message, MessageDetail = ex.StackTrace };
            }
        }
        [HttpPost]
        [Route("DelDiscuss")]
        public ApiResultMessage DelDiscuss(Discussion model)
        {
            try
            {
                elearningBll.DelDiscuss(model);
                return new ApiResultMessage { IsError = false, Message = "", MessageDetail = "" };
            }
            catch (Exception ex)
            {
                return new ApiResultMessage { IsError = true, Message = ex.Message, MessageDetail = ex.StackTrace };
            }
        }
        [HttpPost]
        [Route("AddAnswer")]
        public ApiResultMessage AddAnswer(Answer model)
        {
            try
            {
                model.User = _context.Users.FirstOrDefault(u => u.UserName == User.Identity.Name);
                elearningBll.AddAnswer(model);
                return new ApiResultMessage { IsError = false, Message = "", MessageDetail = "" };
            }
            catch (Exception ex)
            {
                return new ApiResultMessage { IsError = true, Message = ex.Message, MessageDetail = ex.StackTrace };
            }
        }
        #endregion
        #region Answer
        [HttpGet]
        [Route("GetAnswer/{discussId}")]
        public IActionResult GetAnswer(int discussId)
        {
            var answer = _context.Answer
                .Include(n => n.User)
                .Where(n => n.isDelete == false && n.DiscussId == discussId)
                .OrderBy(m => m.CreateDate)
                .ToList();

            return Ok(answer);
        }
        [HttpGet]
        [Route("GetAnswerReply/{id}")]
        public IActionResult GetAnswerReply(int id)
        {
            var reply = _context.Answer.Include(n => n.User).Where(n=> n.Id == id).ToList();
            return Ok(reply);
        }
        #endregion
        #endregion
        #region Video
        [HttpPost]
        [Route("AddVideoBySubject")]
        public ApiResultMessage AddVideoBySubject(VideoModel model)
        {
            try
            {
                //Cắt ID
                string YoutubeLinkRegex = "(?:.+?)?(?:\\/v\\/|watch\\/|\\?v=|\\&v=|youtu\\.be\\/|\\/v=|^youtu\\.be\\/)([a-zA-Z0-9_-]{11})+";
                var regex = new Regex(YoutubeLinkRegex, RegexOptions.Compiled);
                Match youtubeMatch = regex.Match(model.YoutubeLink);
                string id = string.Empty;

                if (youtubeMatch.Success)
                    id = youtubeMatch.Groups[1].Value;
                model.YoutubeLink = id;

                elearningBll.AddVideoBySubject(model);
                return new ApiResultMessage { IsError = false, Message = "", MessageDetail = "" };
            }
            catch (Exception ex)
            {
                return new ApiResultMessage { IsError = true, Message = ex.Message, MessageDetail = ex.StackTrace };
            }
        }
        [HttpGet]
        [Route("GetVideoInfo/{Id}")]
        public async Task<ActionResult<Video>> GetVideoInfo(int Id)
        {
            var video = await _context.Video.FindAsync(Id);

            if (video == null)
            {
                return NotFound();
            }

            return video;
        }
        [HttpPost]
        [Route("DelVideo")]
        public ApiResultMessage DelVideo(VideoModel model)
        {
            try
            {
                elearningBll.DelVideo(model);
                return new ApiResultMessage { IsError = false, Message = "", MessageDetail = "" };
            }
            catch (Exception ex)
            {
                return new ApiResultMessage { IsError = true, Message = ex.Message, MessageDetail = ex.StackTrace };
            }
        }
        [HttpPost]
        [Route("UpdateVideo")]
        public ApiResultMessage UpdateVideo(VideoModel model)
        {
            try
            {
                //Cắt ID
                string YoutubeLinkRegex = "(?:.+?)?(?:\\/v\\/|watch\\/|\\?v=|\\&v=|youtu\\.be\\/|\\/v=|^youtu\\.be\\/)([a-zA-Z0-9_-]{11})+";
                var regex = new Regex(YoutubeLinkRegex, RegexOptions.Compiled);
                Match youtubeMatch = regex.Match(model.YoutubeLink);
                string id = string.Empty;

                if (youtubeMatch.Success)
                    id = youtubeMatch.Groups[1].Value;
                model.YoutubeLink = id;

                elearningBll.UpdateVideo(model);
                return new ApiResultMessage { IsError = false, Message = "", MessageDetail = "" };
            }
            catch (Exception ex)
            {
                return new ApiResultMessage { IsError = true, Message = ex.Message, MessageDetail = ex.StackTrace };
            }
        }
        #endregion
        [HttpGet]
        [Route("GetAssignmentByEmail/{username}")]
        public IEnumerable<AssignmentByEmail> GetAssignmentByEmail(string username)
        {
            DataTable table = new DataTable();
            table = elearningBll.GetAssignmentByEmail(username);
            List<AssignmentByEmail> lstAssignment = new List<AssignmentByEmail>();
            for (int i = 0; i < table.Rows.Count; i++)
            {
                AssignmentByEmail obj = new AssignmentByEmail();
                obj.Title = table.Rows[i]["AssignmentName"].ToString().Trim() + " - " + table.Rows[i]["Code"].ToString();
                obj.Date = (DateTime)table.Rows[i]["Due"];
                lstAssignment.Add(obj);
            }
            return lstAssignment;
        }

    }
}
