using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ElearningBO
{
    public class ApiResultMessage
    {
        public bool IsError { get; set; }
        public string Message { get; set; }
        public string MessageDetail { get; set; }
    }
}
