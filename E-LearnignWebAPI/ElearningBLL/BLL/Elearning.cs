using ElearningBO.E_Learning;
using ElearningDAO.Elearning;
using Microsoft.AspNetCore.Http;
using OfficeOpenXml;
using System;
using System.Collections.Generic;
using System.Data;
using System.IO;
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

        public DataTable GetAllCode()
        {
            try
            {
                DataTable dt = objElDAO.GetAllCode();
                return dt;
            }
            catch (Exception ex)
            {
                throw new Exception("Elearning > GetAllCode Error: " + ex.Message);
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

        //Lấy danh sách học sinh theo khóa học
        public DataTable GetStudentByCourse(int courseid)
        {
            try
            {
                DataTable dt = objElDAO.GetStudentByCourse(courseid);
                return dt;
            }
            catch (Exception ex)
            {
                throw new Exception("Elearning > GetStudentByCourse Error: " + ex.Message);
            }
        }

        //Lấy danh sách học sinh theo khóa học
        public DataTable GetStudentNotInCourse(int courseid)
        {
            try
            {
                DataTable dt = objElDAO.GetStudentNotInCourse(courseid);
                return dt;
            }
            catch (Exception ex)
            {
                throw new Exception("Elearning > GetStudentNotInCourse Error: " + ex.Message);
            }
        }

        //xóa học sinh từ khóa học
        public void DeleteStudentFromCourse(EnrollmentModel model)
        {
            try
            {
                objElDAO.DeleteStudentFromCourse(model);
            }
            catch (Exception ex)
            {
                throw new Exception("DeliveryLoad > DeleteStudentFromCourse Error: " + ex.Message);
            }
        }

        //xóa danh sách học sinh từ khóa học
        public void DeleteListStudentFromCourse(List<String> listEnrollment)
        {
            try
            {
                objElDAO.DeleteListStudentFromCourse(listEnrollment);
            }
            catch (Exception ex)
            {
                throw new Exception("DeliveryLoad > DeleteListStudentFromCourse Error: " + ex.Message);
            }
        }

        //Thêm học sinh vào khóa học
        public void AddStudentToCourse(AddEnrollment addEnrollment)
        {
            try
            {
                objElDAO.AddStudentToCourse(addEnrollment);
            }
            catch (Exception ex)
            {
                throw new Exception("DeliveryLoad > AddStudentToCourse Error: " + ex.Message);
            }
        }

        //Thêm khóa học bằng excel
        public void AddCourseByExcel(List<CourseModelExcel> listExcel)
        {
            try
            {
                for (int i = 0; i < listExcel.Count; i++)
                {
                    CourseModel courseModel = new CourseModel();
                    courseModel.Id = listExcel[i].Id;
                    courseModel.InstructorId = listExcel[i].InstructorId;
                    courseModel.Code = listExcel[i].Code;
                    courseModel.Coursename = listExcel[i].CourseName;
                    courseModel.Description = listExcel[i].Description;
                    courseModel.Details = listExcel[i].Details;
                    objElDAO.AddCourse(courseModel);
                }
            }
            catch (Exception ex)
            {
                throw new Exception("DeliveryLoad > AddStudentToCourse Error: " + ex.Message);
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
        #endregion
    }
}
