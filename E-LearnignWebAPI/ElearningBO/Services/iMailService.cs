using ElearningBO.E_Learning;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ElearningBO.Services
{
    public interface iMailService
    {
        Task SendEmailAsync(MailRequest mailRequest);

    }
}
