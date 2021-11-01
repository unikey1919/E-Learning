using System;
using System.Collections.Generic;
using Microsoft.Extensions.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Configuration;

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
        #endregion
    }
}
