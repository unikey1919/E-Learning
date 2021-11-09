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
        #endregion
    }
}
