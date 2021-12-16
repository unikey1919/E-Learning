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
        public DataTable GetCourseByTeacher(string username)
        {
            DataTable dt = new DataTable();
            try
            {
                string a = ConfigurationManager.ConnectionStrings["DevConnection"].ConnectionString;
                SqlConnection conn = new SqlConnection(ConfigurationManager.ConnectionStrings["DevConnection"].ConnectionString);
                conn.Open();
                SqlCommand cmd = new SqlCommand("SELECT * FROM EL_GetCourseByTeacher(@p_username)", conn);
                cmd.Parameters.AddWithValue("@p_username", username);
                SqlDataAdapter adapter = new SqlDataAdapter(cmd);
                adapter.Fill(dt);
            }
            catch (Exception ex)
            {
                throw new Exception("ElearningDao > GetCourseByTeacher Error: " + ex.Message);
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
        #region Student
        public DataTable GetAllStudent1()
        {
            DataTable dt = new DataTable();
            try
            {
                string a = ConfigurationManager.ConnectionStrings["DevConnection"].ConnectionString;
                SqlConnection conn = new SqlConnection(ConfigurationManager.ConnectionStrings["DevConnection"].ConnectionString);
                conn.Open();
                SqlCommand cmd = new SqlCommand("SELECT * FROM EL_GetAllStudent1()", conn);
                SqlDataAdapter adapter = new SqlDataAdapter(cmd);
                adapter.Fill(dt);
            }
            catch (Exception ex)
            {
                throw new Exception("ElearningDao > GetAllStudent Error: " + ex.Message);
            }

            return dt;
        }

        public void AddStudent(List<Object> listStudent)
        {
            try
            {
                for (int i = 0; i < listStudent.Count; i++)
                {
                    string a = ConfigurationManager.ConnectionStrings["DevConnection"].ConnectionString;
                    SqlConnection conn = new SqlConnection(ConfigurationManager.ConnectionStrings["DevConnection"].ConnectionString);
                    SqlCommand cmd = new SqlCommand("EL_AddStudent", conn);
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("@p_userid", Convert.ToString(listStudent[i]));
                    conn.Open();
                    cmd.ExecuteNonQuery();
                    conn.Close();
                }
            }
            catch (Exception ex)
            {
                throw new Exception("ElearningDao > AddStudent Error: " + ex.Message);
            }

        }

        public void UpdateStudent(StudentModel model)
        {
            try
            {
                string a = ConfigurationManager.ConnectionStrings["DevConnection"].ConnectionString;
                SqlConnection conn = new SqlConnection(ConfigurationManager.ConnectionStrings["DevConnection"].ConnectionString);
                SqlCommand cmd = new SqlCommand("EL_UpdateStudent", conn);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@p_studentname", model.StudentName);
                cmd.Parameters.AddWithValue("@p_email", model.Email);
                cmd.Parameters.AddWithValue("@p_phonenumber", model.PhoneNumber);
                cmd.Parameters.AddWithValue("@p_studentuserid", model.UserId);
                conn.Open();
                cmd.ExecuteNonQuery();
                conn.Close();
            }
            catch (Exception ex)
            {
                throw new Exception("ElearningDao > UpdateStudent Error: " + ex.Message);
            }

        }

        public void DelStudent(StudentModel model)
        {
            try
            {
                string a = ConfigurationManager.ConnectionStrings["DevConnection"].ConnectionString;
                SqlConnection conn = new SqlConnection(ConfigurationManager.ConnectionStrings["DevConnection"].ConnectionString);
                SqlCommand cmd = new SqlCommand("EL_DeleteStudent", conn);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@p_studentid", model.Id);
                conn.Open();
                cmd.ExecuteNonQuery();
                conn.Close();
            }
            catch (Exception ex)
            {
                throw new Exception("ElearningDao > DelStudent Error: " + ex.Message);
            }

        }
        #endregion
        #region CourseContent
        public DataTable GetContentByCourse(SubjectContent model)
        {
            DataTable dt = new DataTable();
            try
            {
                string a = ConfigurationManager.ConnectionStrings["DevConnection"].ConnectionString;
                SqlConnection conn = new SqlConnection(ConfigurationManager.ConnectionStrings["DevConnection"].ConnectionString);
                conn.Open();
                SqlCommand cmd = new SqlCommand("SELECT * FROM EL_GetContentByCourse(@p_courseId)", conn);
                cmd.Parameters.AddWithValue("@p_courseId", model.CourseId);
                SqlDataAdapter adapter = new SqlDataAdapter(cmd);
                adapter.Fill(dt);
            }
            catch (Exception ex)
            {
                throw new Exception("ElearningDao > GetContentByCourse Error: " + ex.Message);
            }
            return dt;
        }

        public void AddSubject(Subject model)
        {
            try
            {
                string a = ConfigurationManager.ConnectionStrings["DevConnection"].ConnectionString;
                SqlConnection conn = new SqlConnection(ConfigurationManager.ConnectionStrings["DevConnection"].ConnectionString);
                SqlCommand cmd = new SqlCommand("EL_AddSubject", conn);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@p_courseid", model.CourseId);
                cmd.Parameters.AddWithValue("@p_subjectname", model.SubjectName);
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
        public void DelFile(FileContent model)
        {
            try
            {
                string a = ConfigurationManager.ConnectionStrings["DevConnection"].ConnectionString;
                SqlConnection conn = new SqlConnection(ConfigurationManager.ConnectionStrings["DevConnection"].ConnectionString);
                SqlCommand cmd = new SqlCommand("EL_DeleteFile", conn);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@id", model.Id);
                conn.Open();
                cmd.ExecuteNonQuery();
                conn.Close();
            }
            catch (Exception ex)
            {
                throw new Exception("ElearningDao > DelFile Error: " + ex.Message);
            }
        }
        public void DelFileSubmit(FileAssignment model)
        {
            try
            {
                string a = ConfigurationManager.ConnectionStrings["DevConnection"].ConnectionString;
                SqlConnection conn = new SqlConnection(ConfigurationManager.ConnectionStrings["DevConnection"].ConnectionString);
                SqlCommand cmd = new SqlCommand("EL_DeleteFileSubmit", conn);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@p_assignmentid", model.AssignmentId);
                cmd.Parameters.AddWithValue("@p_usersubmit", model.UserSubmit);
                conn.Open();
                cmd.ExecuteNonQuery();
                conn.Close();
            }
            catch (Exception ex)
            {
                throw new Exception("ElearningDao > DelFileSubmit Error: " + ex.Message);
            }
        }
        /// <summary>
        /// File
        /// </summary>
        /// <param name="subjectId"></param>
        /// <returns></returns>
        ///
        public DataTable GetFileBySubject(SubjectContent model)
        {
            DataTable dt = new DataTable();
            try
            {
                string a = ConfigurationManager.ConnectionStrings["DevConnection"].ConnectionString;
                SqlConnection conn = new SqlConnection(ConfigurationManager.ConnectionStrings["DevConnection"].ConnectionString);
                conn.Open();
                SqlCommand cmd = new SqlCommand("SELECT * FROM EL_GetFileBySubject(@p_subjectid)", conn);
                cmd.Parameters.AddWithValue("@p_subjectid", model.Id);
                SqlDataAdapter adapter = new SqlDataAdapter(cmd);
                adapter.Fill(dt);
            }
            catch (Exception ex)
            {
                throw new Exception("ElearningDao > GetContentByCourse Error: " + ex.Message);
            }
            return dt;
        }
        #endregion
        #region Assignment
        public void AddAssignmentBySubject(Assignment model)
        {
            try
            {
                string a = ConfigurationManager.ConnectionStrings["DevConnection"].ConnectionString;
                SqlConnection conn = new SqlConnection(ConfigurationManager.ConnectionStrings["DevConnection"].ConnectionString);
                SqlCommand cmd = new SqlCommand("EL_AddAssignment", conn);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@p_subjectid", model.SubjectId);
                cmd.Parameters.AddWithValue("@p_assignmentname", model.AssignmentName);
                cmd.Parameters.AddWithValue("@p_details", model.Details);
                cmd.Parameters.AddWithValue("@p_open", model.Opened);
                cmd.Parameters.AddWithValue("@p_due", model.Due);
                conn.Open();
                cmd.ExecuteNonQuery();
                conn.Close();
            }
            catch (Exception ex)
            {
                throw new Exception("ElearningDao > UpdateCourse Error: " + ex.Message);
            }

        }
        public DataTable GetAllStudentByCourse(int courseId)
        {
            DataTable dt = new DataTable();
            try
            {
                string a = ConfigurationManager.ConnectionStrings["DevConnection"].ConnectionString;
                SqlConnection conn = new SqlConnection(ConfigurationManager.ConnectionStrings["DevConnection"].ConnectionString);
                conn.Open();
                SqlCommand cmd = new SqlCommand("SELECT * FROM EL_GetAllStudentByCourse(@p_courseId)", conn);
                cmd.Parameters.AddWithValue("@p_courseId", courseId);
                SqlDataAdapter adapter = new SqlDataAdapter(cmd);
                adapter.Fill(dt);
            }
            catch (Exception ex)
            {
                throw new Exception("ElearningDao > GetContentByCourse Error: " + ex.Message);
            }
            return dt;
        }
        public void DelAssignment(Assignment model)
        {
            try
            {
                string a = ConfigurationManager.ConnectionStrings["DevConnection"].ConnectionString;
                SqlConnection conn = new SqlConnection(ConfigurationManager.ConnectionStrings["DevConnection"].ConnectionString);
                SqlCommand cmd = new SqlCommand("EL_DeleteAssignment", conn);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@assignment_id", model.Id);
                conn.Open();
                cmd.ExecuteNonQuery();
                conn.Close();
            }
            catch (Exception ex)
            {
                throw new Exception("ElearningDao > DelAssignment Error: " + ex.Message);
            }
        }
        public void UpdateAssignment(Assignment model)
        {
            try
            {
                string a = ConfigurationManager.ConnectionStrings["DevConnection"].ConnectionString;
                SqlConnection conn = new SqlConnection(ConfigurationManager.ConnectionStrings["DevConnection"].ConnectionString);
                SqlCommand cmd = new SqlCommand("EL_UpdateAssignment", conn);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@p_assignmentid", model.Id);
                cmd.Parameters.AddWithValue("@p_assignmentname", model.AssignmentName);
                cmd.Parameters.AddWithValue("@p_opened", model.Opened);
                cmd.Parameters.AddWithValue("@p_due", model.Due);
                cmd.Parameters.AddWithValue("@p_details", model.Details); 
                conn.Open();
                cmd.ExecuteNonQuery();
                conn.Close();
            }
            catch (Exception ex)
            {
                throw new Exception("ElearningDao > UpdateAssignment Error: " + ex.Message);
            }
        }
        #endregion

        #region Forum
        public void AddForumBySubject(Forum model)
        {
            try
            {
                string a = ConfigurationManager.ConnectionStrings["DevConnection"].ConnectionString;
                SqlConnection conn = new SqlConnection(ConfigurationManager.ConnectionStrings["DevConnection"].ConnectionString);
                SqlCommand cmd = new SqlCommand("EL_AddForum", conn);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@p_subjectid", model.SubjectId);
                cmd.Parameters.AddWithValue("@p_forumname", model.ForumName);
                cmd.Parameters.AddWithValue("@p_details", model.Details);
                conn.Open();
                cmd.ExecuteNonQuery();
                conn.Close();
            }
            catch (Exception ex)
            {
                throw new Exception("ElearningDao > AddForumBySubject Error: " + ex.Message);
            }

        }
        public void DelForum(Forum model)
        {
            try
            {
                string a = ConfigurationManager.ConnectionStrings["DevConnection"].ConnectionString;
                SqlConnection conn = new SqlConnection(ConfigurationManager.ConnectionStrings["DevConnection"].ConnectionString);
                SqlCommand cmd = new SqlCommand("EL_DelForum", conn);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@p_forumid", model.Id);
                conn.Open();
                cmd.ExecuteNonQuery();
                conn.Close();
            }
            catch (Exception ex)
            {
                throw new Exception("ElearningDao > DelForum Error: " + ex.Message);
            }
        }
        public void UpdateForum(Forum model)
        {
            try
            {
                string a = ConfigurationManager.ConnectionStrings["DevConnection"].ConnectionString;
                SqlConnection conn = new SqlConnection(ConfigurationManager.ConnectionStrings["DevConnection"].ConnectionString);
                SqlCommand cmd = new SqlCommand("EL_UpdateForum", conn);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@p_forumid", model.Id);
                cmd.Parameters.AddWithValue("@p_forumname", model.ForumName);
                cmd.Parameters.AddWithValue("@p_details", model.Details);
                conn.Open();
                cmd.ExecuteNonQuery();
                conn.Close();
            }
            catch (Exception ex)
            {
                throw new Exception("ElearningDao > UpdateForum Error: " + ex.Message);
            }
        }
        #region Discusstion
        public DataTable GetDiscussByForum(int forumId)
        {
            DataTable dt = new DataTable();
            try
            {
                string a = ConfigurationManager.ConnectionStrings["DevConnection"].ConnectionString;
                SqlConnection conn = new SqlConnection(ConfigurationManager.ConnectionStrings["DevConnection"].ConnectionString);
                conn.Open();
                SqlCommand cmd = new SqlCommand("SELECT * FROM EL_GetDiscussionForum(@p_forumid)", conn);
                cmd.Parameters.AddWithValue("@p_forumid", forumId);
                SqlDataAdapter adapter = new SqlDataAdapter(cmd);
                adapter.Fill(dt);
            }
            catch (Exception ex)
            {
                throw new Exception("ElearningDao > GetDiscuss Error: " + ex.Message);
            }
            return dt;
        }
        public DataTable GetDiscuss(int forumId, int id)
        {
            DataTable dt = new DataTable();
            try
            {
                string a = ConfigurationManager.ConnectionStrings["DevConnection"].ConnectionString;
                SqlConnection conn = new SqlConnection(ConfigurationManager.ConnectionStrings["DevConnection"].ConnectionString);
                conn.Open();
                SqlCommand cmd = new SqlCommand("SELECT * FROM EL_GetDiscussion(@p_forumid, @p_id)", conn);
                cmd.Parameters.AddWithValue("@p_forumid", forumId);
                cmd.Parameters.AddWithValue("@p_id", id);
                SqlDataAdapter adapter = new SqlDataAdapter(cmd);
                adapter.Fill(dt);
            }
            catch (Exception ex)
            {
                throw new Exception("ElearningDao > GetDiscussByForum Error: " + ex.Message);
            }
            return dt;
        }
        public void AddDiscussBySubject(Discussion model)
        {
            try
            {
                string a = ConfigurationManager.ConnectionStrings["DevConnection"].ConnectionString;
                SqlConnection conn = new SqlConnection(ConfigurationManager.ConnectionStrings["DevConnection"].ConnectionString);
                SqlCommand cmd = new SqlCommand("EL_AddDiscussion", conn);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@p_forumid", model.ForumId);
                cmd.Parameters.AddWithValue("@p_discussname", model.DiscussName);
                cmd.Parameters.AddWithValue("@p_details", model.Details);
                cmd.Parameters.AddWithValue("@p_user", model.User.Id);
                conn.Open();
                cmd.ExecuteNonQuery();
                conn.Close();
            }
            catch (Exception ex)
            {
                throw new Exception("ElearningDao > AddDiscussBySubject Error: " + ex.Message);
            }

        }
        public void DelDiscuss(Discussion model)
        {
            try
            {
                string a = ConfigurationManager.ConnectionStrings["DevConnection"].ConnectionString;
                SqlConnection conn = new SqlConnection(ConfigurationManager.ConnectionStrings["DevConnection"].ConnectionString);
                SqlCommand cmd = new SqlCommand("EL_DelDiscussion", conn);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@p_discussId", model.Id);
                conn.Open();
                cmd.ExecuteNonQuery();
                conn.Close();
            }
            catch (Exception ex)
            {
                throw new Exception("ElearningDao > DelDiscuss Error: " + ex.Message);
            }
        }
        public void AddAnswer(Answer model)
        {
            try
            {
                string a = ConfigurationManager.ConnectionStrings["DevConnection"].ConnectionString;
                SqlConnection conn = new SqlConnection(ConfigurationManager.ConnectionStrings["DevConnection"].ConnectionString);
                SqlCommand cmd = new SqlCommand("EL_AddAnswer", conn);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@p_discussid", model.DiscussId);
                cmd.Parameters.AddWithValue("@p_userid", model.User.Id.Trim());
                cmd.Parameters.AddWithValue("@p_detail", model.Details);
                cmd.Parameters.AddWithValue("@p_reply", model.Reply);
                conn.Open();
                cmd.ExecuteNonQuery();
                conn.Close();
            }
            catch (Exception ex)
            {
                throw new Exception("ElearningDao > AddAnswer Error: " + ex.Message);
            }

        }
        #endregion
        #endregion
        #region Video
        public void AddVideoBySubject(VideoModel model)
        {
            try
            {
                string a = ConfigurationManager.ConnectionStrings["DevConnection"].ConnectionString;
                SqlConnection conn = new SqlConnection(ConfigurationManager.ConnectionStrings["DevConnection"].ConnectionString);
                SqlCommand cmd = new SqlCommand("EL_AddVideo", conn);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@p_subjectid", model.SubjectId);
                cmd.Parameters.AddWithValue("@p_title", model.Title);
                cmd.Parameters.AddWithValue("@p_tags", model.Tags);
                cmd.Parameters.AddWithValue("@p_url", model.YoutubeLink);
                conn.Open();
                cmd.ExecuteNonQuery();
                conn.Close();
            }
            catch (Exception ex)
            {
                throw new Exception("ElearningDao > AddVideoBySubject Error: " + ex.Message);
            }
        }
        public void DelVideo(VideoModel model)
        {
            try
            {
                string a = ConfigurationManager.ConnectionStrings["DevConnection"].ConnectionString;
                SqlConnection conn = new SqlConnection(ConfigurationManager.ConnectionStrings["DevConnection"].ConnectionString);
                SqlCommand cmd = new SqlCommand("EL_DeleteVideo", conn);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@video_id", model.Id);
                conn.Open();
                cmd.ExecuteNonQuery();
                conn.Close();
            }
            catch (Exception ex)
            {
                throw new Exception("ElearningDao > DelVideo Error: " + ex.Message);
            }
        }
        public void UpdateVideo(VideoModel model)
        {
            try
            {
                string a = ConfigurationManager.ConnectionStrings["DevConnection"].ConnectionString;
                SqlConnection conn = new SqlConnection(ConfigurationManager.ConnectionStrings["DevConnection"].ConnectionString);
                SqlCommand cmd = new SqlCommand("EL_UpdateVideo", conn);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@p_videoid", model.Id);
                cmd.Parameters.AddWithValue("@p_title", model.Title);
                cmd.Parameters.AddWithValue("@p_tags", model.Tags);
                cmd.Parameters.AddWithValue("@p_url", model.YoutubeLink);
                conn.Open();
                cmd.ExecuteNonQuery();
                conn.Close();
            }
            catch (Exception ex)
            {
                throw new Exception("ElearningDao > UpdateVideo Error: " + ex.Message);
            }
        }
        #endregion
    }
}
