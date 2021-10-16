﻿using E_LearnignWebAPI.Models;
using E_LearnignWebAPI.Models.Authenication;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace E_LearnignWebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserProfileController : ControllerBase
    {
        private UserManager<ApplicationUser> _userManager;
        public UserProfileController(UserManager<ApplicationUser> userManager)
        {
            _userManager = userManager;
        }
        [HttpGet]
        [Authorize]
        //GET: /api/UserProfile
        public async Task<Object> GetUserProfile()
        {
            try
            {
                string userId = User.Claims.First(c => c.Type == "UserID").Value;
                var user = await _userManager.FindByIdAsync(userId);
                return new ApiResultMessage { IsError = false, Message = JsonConvert.SerializeObject(user), MessageDetail = { } };
            }
            catch (Exception ex)
            {

                return new ApiResultMessage { IsError = true, Message = ex.Message, MessageDetail = ex.StackTrace.ToArray() };
            }
        }

        [HttpGet]
        [Authorize(Roles = "Admin")]
        [Route("ForAdmin")]
        public string GetForAdmin()
        {
            return "Web method for Admin";
        }

        [HttpGet]
        [Authorize(Roles = "Instructor ")]
        [Route("ForInstructor")]
        public string GetForInstructor()
        {
            return "Web method for Instructor";
        }

        [HttpGet]
        [Authorize(Roles = "Student")]
        [Route("ForStudent")]
        public string GetForStudent()
        {
            return "Web method for Student";
        }

    }
}
