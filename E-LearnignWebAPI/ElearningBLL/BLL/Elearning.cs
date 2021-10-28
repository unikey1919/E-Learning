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
    }
}
