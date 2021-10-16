using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace E_LearnignWebAPI.Models
{
    public class ApiResultMessage
    {
        public bool IsError { get; set; }
        public string Message { get; set; }
        public Array MessageDetail { get; set; }
    }
}
