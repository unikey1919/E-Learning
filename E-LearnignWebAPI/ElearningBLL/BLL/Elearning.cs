using ElearningBO.E_Learning;
using ElearningDAO.Elearning;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ElearningBLL.BLL
{
    public class Elearning
    {
        private static ElearningDao objElDAO = null;
        public Elearning()
        {
            if (objElDAO == null)
                objElDAO = new ElearningDao();
        }
        public DataTable GetAllStudent()
        {
            try
            {
                DataTable dt = objElDAO.GetAllStudent();
                return dt;
            }
            catch (Exception ex)
            {
                throw new Exception("Elearning > GetAllStudent Error: " + ex.Message);
            }
        }
        #region Khóa học
        public DataTable GetAllCourse()
        {
            try
            {
                DataTable dt = objElDAO.GetAllCourse();
                return dt;
            }
            catch (Exception ex)
            {
                throw new Exception("Elearning > GetAllCourse Error: " + ex.Message);
            }
        }
        public void AddCourse(CourseModel model)
        {
            try
            {
                objElDAO.AddCourse(model);
            }
            catch (Exception ex)
            {
                throw new Exception("Elearning > AddCourse Error: " + ex.Message);
            }
        }

        public void UpdateCourse(CourseModel model)
        {
            try
            {
                objElDAO.UpdateCourse(model);
            }
            catch (Exception ex)
            {
                throw new Exception("Elearning > UpdateCourse Error: " + ex.Message);
            }
        }

        public void DelCourse(CourseModel model)
        {
            try
            {
                objElDAO.DelCourse(model);
            }
            catch (Exception ex)
            {
                throw new Exception("DeliveryLoad > DelCourse Error: " + ex.Message);
            }
        }

        public DataTable GetCourseByStudent(string username)
        {
            try
            {
                DataTable dt = objElDAO.GetCourseByStudent(username);
                return dt;
            }
            catch (Exception ex)
            {
                throw new Exception("Elearning > GetCourseByStudent Error: " + ex.Message);
            }
        }
        public DataTable GetCourseByTeacher(string username)
        {
            try
            {
                DataTable dt = objElDAO.GetCourseByTeacher(username);
                return dt;
            }
            catch (Exception ex)
            {
                throw new Exception("Elearning > GetCourseByTeacher Error: " + ex.Message);
            }
        }
        #endregion

        #region Instructor
        public DataTable GetAllInstructor()
        {
            try
            {
                DataTable dt = objElDAO.GetAllInstructor();
                return dt;
            }
            catch (Exception ex)
            {
                throw new Exception("Elearning > GetAllInstructor Error: " + ex.Message);
            }
        }

        public void AddInstructor(List<Object> listInstructor)
        {
            try
            {
                objElDAO.AddInstructor(listInstructor);
            }
            catch (Exception ex)
            {
                throw new Exception("Elearning > AddInstructor Error: " + ex.Message);
            }
        }

        public void UpdateInstructor(InstructorModel model)
        {
            try
            {
                objElDAO.UpdateInstructor(model);
            }
            catch (Exception ex)
            {
                throw new Exception("Elearning > UpdateInstructor Error: " + ex.Message);
            }
        }

        public void DelInstructor(InstructorModel model)
        {
            try
            {
                objElDAO.DelInstructor(model);
            }
            catch (Exception ex)
            {
                throw new Exception("DeliveryLoad > DelInstructor Error: " + ex.Message);
            }
        }

        public DataTable GetListUser()
        {
            try
            {
                DataTable dt = objElDAO.GetListUser();
                return dt;
            }
            catch (Exception ex)
            {
                throw new Exception("Elearning > GetListUser Error: " + ex.Message);
            }
        }

        public void AddSubject(Subject model)
        {
            try
            {
                objElDAO.AddSubject(model);
            }
            catch (Exception ex)
            {
                throw new Exception("Elearning > AddSubject Error: " + ex.Message);
            }
        }
        #endregion

        #region Student
        public DataTable GetAllStudent1()
        {
            try
            {
                DataTable dt = objElDAO.GetAllStudent1();
                return dt;
            }
            catch (Exception ex)
            {
                throw new Exception("Elearning > GetAllStudent Error: " + ex.Message);
            }
        }

        public void AddStudent(List<Object> listStudent)
        {
            try
            {
                objElDAO.AddStudent(listStudent);
            }
            catch (Exception ex)
            {
                throw new Exception("Elearning > AddStudent Error: " + ex.Message);
            }
        }

        public void UpdateStudent(StudentModel model)
        {
            try
            {
                objElDAO.UpdateStudent(model);
            }
            catch (Exception ex)
            {
                throw new Exception("Elearning > UpdateStudent Error: " + ex.Message);
            }
        }

        public void DelStudent(StudentModel model)
        {
            try
            {
                objElDAO.DelStudent(model);
            }
            catch (Exception ex)
            {
                throw new Exception("DeliveryLoad > DelStudent Error: " + ex.Message);
            }
        }
        #endregion

        #region CourseContent
        public DataTable GetContentByCourse(SubjectContent model)
        {
            try
            {
                DataTable dt = objElDAO.GetContentByCourse(model);
                return dt;
            }
            catch (Exception ex)
            {
                throw new Exception("Elearning > GetContentByCourse Error: " + ex.Message);
            }
        }
        public DataTable GetFileBySubject(SubjectContent model)
        {
            try
            {
                DataTable dt = objElDAO.GetFileBySubject(model);
                return dt;
            }
            catch (Exception ex)
            {
                throw new Exception("Elearning > GetFileBySubject Error: " + ex.Message);
            }
        }
        public void DelFile(FileContent model)
        {
            try
            {
                objElDAO.DelFile(model);
            }
            catch (Exception ex)
            {
                throw new Exception("DeliveryLoad > DelFile Error: " + ex.Message);
            }
        }
        public void DelFileSubmit(FileAssignment model)
        {
            try
            {
                objElDAO.DelFileSubmit(model);
            }
            catch (Exception ex)
            {
                throw new Exception("DeliveryLoad > DelFileSubmit Error: " + ex.Message);
            }
        }
        #endregion

        #region Assignment
        public void AddAssignmentBySubject(Assignment model)
        {
            try
            {
                objElDAO.AddAssignmentBySubject(model);
            }
            catch (Exception ex)
            {
                throw new Exception("Elearning > AddAssignmentBySubject Error: " + ex.Message);
            }
        }
        public DataTable GetAllStudentByCourse(int courseId)
        {
            try
            {
                DataTable dt = objElDAO.GetAllStudentByCourse(courseId);
                return dt;
            }
            catch (Exception ex)
            {
                throw new Exception("Elearning > GetAllStudentByCourse Error: " + ex.Message);
            }
        }
        public void DelAssignment(Assignment model)
        {
            try
            {
                objElDAO.DelAssignment(model);
            }
            catch (Exception ex)
            {
                throw new Exception("DeliveryLoad > DelAssignment Error: " + ex.Message);
            }
        }
        public void UpdateAssignment(Assignment model)
        {
            try
            {
                objElDAO.UpdateAssignment(model);
            }
            catch (Exception ex)
            {
                throw new Exception("Elearning > UpdateAssignment Error: " + ex.Message);
            }
        }
        #endregion
        #region Forum
        public void AddForumBySubject(Forum model)
        {
            try
            {
                objElDAO.AddForumBySubject(model);
            }
            catch (Exception ex)
            {
                throw new Exception("Elearning > AddForumBySubject Error: " + ex.Message);
            }
        }
        public void DelForum(Forum model)
        {
            try
            {
                objElDAO.DelForum(model);
            }
            catch (Exception ex)
            {
                throw new Exception("DeliveryLoad > DelForum Error: " + ex.Message);
            }
        }
        public void UpdateForum(Forum model)
        {
            try
            {
                objElDAO.UpdateForum(model);
            }
            catch (Exception ex)
            {
                throw new Exception("Elearning > UpdateForum Error: " + ex.Message);
            }
        }
        #region Discusstion
        public DataTable GetDiscussByForum(int forumId)
        {
            try
            {
                DataTable dt = objElDAO.GetDiscussByForum(forumId);
                return dt;
            }
            catch (Exception ex)
            {
                throw new Exception("Elearning > GetDiscussByForum Error: " + ex.Message);
            }
        }
        public DataTable GetDiscuss(int forumId, int id)
        {
            try
            {
                DataTable dt = objElDAO.GetDiscuss(forumId,id);
                return dt;
            }
            catch (Exception ex)
            {
                throw new Exception("Elearning > GetDiscuss Error: " + ex.Message);
            }
        }
        public void AddDiscussBySubject(Discussion model)
        {
            try
            {
                objElDAO.AddDiscussBySubject(model);
            }
            catch (Exception ex)
            {
                throw new Exception("Elearning > AddDiscussBySubject Error: " + ex.Message);
            }
        }
        public void DelDiscuss(Discussion model)
        {
            try
            {
                objElDAO.DelDiscuss(model);
            }
            catch (Exception ex)
            {
                throw new Exception("DeliveryLoad > DelDiscuss Error: " + ex.Message);
            }
        }
        public void AddAnswer(Answer model)
        {
            try
            {
                objElDAO.AddAnswer(model);
            }
            catch (Exception ex)
            {
                throw new Exception("Elearning > AddAnswer Error: " + ex.Message);
            }
        }
        #endregion
        #endregion
        #region Video
        public void AddVideoBySubject(VideoModel model)
        {
            try
            {
                objElDAO.AddVideoBySubject(model);
            }
            catch (Exception ex)
            {
                throw new Exception("Elearning > AddVideoBySubject Error: " + ex.Message);
            }
        }
        public void DelVideo(VideoModel model)
        {
            try
            {
                objElDAO.DelVideo(model);
            }
            catch (Exception ex)
            {
                throw new Exception("DeliveryLoad > DelVideo Error: " + ex.Message);
            }
        }
        public void UpdateVideo(VideoModel model)
        {
            try
            {
                objElDAO.UpdateVideo(model);
            }
            catch (Exception ex)
            {
                throw new Exception("Elearning > UpdateVideo Error: " + ex.Message);
            }
        }
        #endregion
    }
}
