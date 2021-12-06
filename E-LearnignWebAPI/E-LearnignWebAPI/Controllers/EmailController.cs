using ElearningBO.E_Learning;
using ElearningBO.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace E_LearnignWebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EmailController : ControllerBase
    {
        private readonly iMailService _mailService;
        public EmailController(iMailService mailService)
        {
            _mailService = mailService;
        }

        [HttpPost("Send")]
        public async Task<IActionResult> Send ([FromForm] MailRequest request)
        {
            try
            {
                await _mailService.SendEmailAsync(request);
                return Ok();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}
