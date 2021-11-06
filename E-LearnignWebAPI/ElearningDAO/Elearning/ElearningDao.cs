using System;
using System.Collections.Generic;
using Microsoft.Extensions.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Configuration;
using ElearningBO.E_Learning;

namespace ElearningDAO.Elearning
{
    public class ElearningDao
    {
        public IConfiguration Configuration { get; }
        public ElearningDao()
        {
        }
        public DataTable GetAllStudent()
        {
            DataTable dt = new DataTable();
            try
            {
                string a = ConfigurationManager.ConnectionStrings["DevConnection"].ConnectionString;
                SqlConnection conn = new SqlConnection(ConfigurationManager.ConnectionStrings["DevConnection"].ConnectionString);
                conn.Open();
                SqlCommand cmd = new SqlCommand("SELECT * FROM EL_GetAllStudent()", conn);
                SqlDataAdapter adapter = new SqlDataAdapter(cmd);
                adapter.Fill(dt);
            }
            catch(Exception ex)
            {
                throw new Exception("ElearningDao > GetAllStudent Error: " + ex.Message);
            }
            
            return dt;
        }
        #region Khóa học
        public DataTable GetAllCourse()
        {
            DataTable dt = new DataTable();
            try
            {
                string a = ConfigurationManager.ConnectionStrings["DevConnection"].ConnectionString;
                SqlConnection conn = new SqlConnection(ConfigurationManager.ConnectionStrings["DevConnection"].ConnectionString);
                conn.Open();
                SqlCommand cmd = new SqlCommand("SELECT * FROM EL_GetAllCourse()", conn);
                SqlDataAdapter adapter = new SqlDataAdapter(cmd);
                adapter.Fill(dt);
            }
            catch (Exception ex)
            {
                throw new Exception("ElearningDao > GetAllCourse Error: " + ex.Message);
            }

            return dt;
        }

        public void AddCourse(CourseModel model)
        {
            try
            {
                string a = ConfigurationManager.ConnectionStrings["DevConnection"].ConnectionString;
                SqlConnection conn = new SqlConnection(ConfigurationManager.ConnectionStrings["DevConnection"].ConnectionString);
                SqlCommand cmd = new SqlCommand("EL_AddCourse", conn);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@p_instructorid", model.InstructorId);
                cmd.Parameters.AddWithValue("@p_code", model.Code);
                cmd.Parameters.AddWithValue("@p_coursename", model.Coursename);
                cmd.Parameters.AddWithValue("@p_descripton", model.Description);
                cmd.Parameters.AddWithValue("@p_details", model.Details);
                conn.Open();
                cmd.ExecuteNonQuery();
                conn.Close();
            }
            catch (Exception ex)
            {
                throw new Exception("ElearningDao > AddCourse Error: " + ex.Message);
            }

        }

        public void UpdateCourse(CourseModel model)
        {
            try
            {
                string a = ConfigurationManager.ConnectionStrings["DevConnection"].ConnectionString;
                SqlConnection conn = new SqlConnection(ConfigurationManager.ConnectionStrings["DevConnection"].ConnectionString);
                SqlCommand cmd = new SqlCommand("EL_UpdateCourse", conn);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@p_courseid", model.Id);
                cmd.Parameters.AddWithValue("@p_instructorid", model.InstructorId);
                cmd.Parameters.AddWithValue("@p_code", model.Code);
                cmd.Parameters.AddWithValue("@p_coursename", model.Coursename);
                cmd.Parameters.AddWithValue("@p_descripton", model.Description);
                cmd.Parameters.AddWithValue("@p_details", model.Details);
                conn.Open();
                cmd.ExecuteNonQuery();
                conn.Close();
            }
            catch (Exception ex)
            {
                throw new Exception("ElearningDao > UpdateCourse Error: " + ex.Message);
            }

        }

        public void DelCourse(CourseModel model)
        {
            try
            {
                string a = ConfigurationManager.ConnectionStrings["DevConnection"].ConnectionString;
                SqlConnection conn = new SqlConnection(ConfigurationManager.ConnectionStrings["DevConnection"].ConnectionString);
                SqlCommand cmd = new SqlCommand("EL_DeleteCourse", conn);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@p_courseid", model.Id);
                conn.Open();
                cmd.ExecuteNonQuery();
                conn.Close();
            }
            catch (Exception ex)
            {
                throw new Exception("ElearningDao > DelCourse Error: " + ex.Message);
            }

        }
        #endregion
    }
}
