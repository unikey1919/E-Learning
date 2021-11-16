﻿using System;
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

        public DataTable GetCourseByStudent(string username)
        {
            DataTable dt = new DataTable();
            try
            {
                string a = ConfigurationManager.ConnectionStrings["DevConnection"].ConnectionString;
                SqlConnection conn = new SqlConnection(ConfigurationManager.ConnectionStrings["DevConnection"].ConnectionString);
                conn.Open();
                SqlCommand cmd = new SqlCommand("SELECT * FROM EL_GetCourseByStudent(@p_username)", conn);
                cmd.Parameters.AddWithValue("@p_username", username);
                SqlDataAdapter adapter = new SqlDataAdapter(cmd);
                adapter.Fill(dt);
            }
            catch (Exception ex)
            {
                throw new Exception("ElearningDao > GetCourseByStudent Error: " + ex.Message);
            }

            return dt;
        }
        #endregion
        #region Instructor
        public DataTable GetAllInstructor()
        {
            DataTable dt = new DataTable();
            try
            {
                string a = ConfigurationManager.ConnectionStrings["DevConnection"].ConnectionString;
                SqlConnection conn = new SqlConnection(ConfigurationManager.ConnectionStrings["DevConnection"].ConnectionString);
                conn.Open();
                SqlCommand cmd = new SqlCommand("SELECT * FROM EL_GetAllInstructor()", conn);
                SqlDataAdapter adapter = new SqlDataAdapter(cmd);
                adapter.Fill(dt);
            }
            catch (Exception ex)
            {
                throw new Exception("ElearningDao > GetAllInstructor Error: " + ex.Message);
            }

            return dt;
        }

        public void AddInstructor(List<Object> listInstructor)
        {
            try
            {
                for (int i = 0; i < listInstructor.Count; i++)
                {
                    string a = ConfigurationManager.ConnectionStrings["DevConnection"].ConnectionString;
                    SqlConnection conn = new SqlConnection(ConfigurationManager.ConnectionStrings["DevConnection"].ConnectionString);
                    SqlCommand cmd = new SqlCommand("EL_AddInstructor", conn);
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("@p_userid", Convert.ToString(listInstructor[i]));
                    //cmd.Parameters.AddWithValue("@p_instructorid", model.InstructorId);
                    conn.Open();
                    cmd.ExecuteNonQuery();
                    conn.Close();
                }
            }
            catch (Exception ex)
            {
                throw new Exception("ElearningDao > AddInstructor Error: " + ex.Message);
            }

        }

        public void UpdateInstructor(InstructorModel model)
        {
            try
            {
                string a = ConfigurationManager.ConnectionStrings["DevConnection"].ConnectionString;
                SqlConnection conn = new SqlConnection(ConfigurationManager.ConnectionStrings["DevConnection"].ConnectionString);
                SqlCommand cmd = new SqlCommand("EL_UpdateInstructor", conn);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@p_instructionname", model.InstructionName);
                cmd.Parameters.AddWithValue("@p_email", model.Email);
                cmd.Parameters.AddWithValue("@p_phonenumber", model.PhoneNumber);
                cmd.Parameters.AddWithValue("@p_intructoruserid", model.UserId);
                conn.Open();
                cmd.ExecuteNonQuery();
                conn.Close();
            }
            catch (Exception ex)
            {
                throw new Exception("ElearningDao > UpdateInstructor Error: " + ex.Message);
            }

        }

        public void DelInstructor(InstructorModel model)
        {
            try
            {
                string a = ConfigurationManager.ConnectionStrings["DevConnection"].ConnectionString;
                SqlConnection conn = new SqlConnection(ConfigurationManager.ConnectionStrings["DevConnection"].ConnectionString);
                SqlCommand cmd = new SqlCommand("EL_DeleteInstructor", conn);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@p_instructorid", model.Id);
                conn.Open();
                cmd.ExecuteNonQuery();
                conn.Close();
            }
            catch (Exception ex)
            {
                throw new Exception("ElearningDao > DelInstructor Error: " + ex.Message);
            }

        }
        public DataTable GetListUser()
        {
            DataTable dt = new DataTable();
            try
            {
                string a = ConfigurationManager.ConnectionStrings["DevConnection"].ConnectionString;
                SqlConnection conn = new SqlConnection(ConfigurationManager.ConnectionStrings["DevConnection"].ConnectionString);
                conn.Open();
                SqlCommand cmd = new SqlCommand("SELECT * FROM EL_GetListUser()", conn);
                SqlDataAdapter adapter = new SqlDataAdapter(cmd);
                adapter.Fill(dt);
            }
            catch (Exception ex)
            {
                throw new Exception("ElearningDao > GetListUser Error: " + ex.Message);
            }

            return dt;
        }
        #endregion
    }
}
