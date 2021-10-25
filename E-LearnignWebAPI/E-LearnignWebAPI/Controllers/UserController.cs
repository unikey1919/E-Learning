
using ElearningBO;
using ElearningBO.AppSettings;
using ElearningBO.UserAuthentication;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace E_LearnignWebAPI.Controllers
{
    [Route("api/User")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private UserManager<ApplicationUser> _userManager;
        private SignInManager<ApplicationUser> _signInManager;
        private readonly ApplicationSettings _applicationSettings;
        public UserController(UserManager<ApplicationUser> userManager,SignInManager<ApplicationUser> signInManager, IOptions<ApplicationSettings> options)
        {
            _userManager = userManager;
            _signInManager = signInManager;
            _applicationSettings = options.Value;
        }

        [HttpPost]
        [Route("Register")]
        //POST : /api/user/Register
        public async Task<Object> PostApplicationUser(ApplicationUserModel model)
        {
            var applicationUser = new ApplicationUser()
            {
                UserName = model.UserName,
                Email = model.Email,
                FullName = model.FullName,
            };
            try
            {
                var result = await _userManager.CreateAsync(applicationUser, model.Password);
                return Ok(result);
                //return await Task.FromResult(result.Errors.Select(x => x.Description));
            }
            catch (Exception ex)
            {
                throw new Exception("UserController > Register Error: " + ex.Message);
            }
        }

        [HttpPost]
        [Route("Login")]
        //POST : /api/user/Login
        public async Task<IActionResult> Login(LoginModel model)
        {
            var user = await _userManager.FindByNameAsync(model.UserName);
            IdentityOptions _identityOptions = new IdentityOptions();
            if (user != null && await _userManager.CheckPasswordAsync(user, model.Password))
            {
                //Get Role assigned to the user
                var role = await _userManager.GetRolesAsync(user);
                var tokenDescriptor = new SecurityTokenDescriptor
                {
                    Subject = new ClaimsIdentity(new Claim[]
                    {
                        new Claim("UserID", user.Id.ToString()),
                        new Claim(_identityOptions.ClaimsIdentity.RoleClaimType,role.FirstOrDefault())
                    }),
                    Expires = DateTime.UtcNow.AddDays(1),
                    SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_applicationSettings.JWT_Secret)), SecurityAlgorithms.HmacSha256Signature)
                };
                var tokenHandler = new JwtSecurityTokenHandler();
                var securityToken = tokenHandler.CreateToken(tokenDescriptor);
                var token = tokenHandler.WriteToken(securityToken);
                return Ok(new { token });
            }
            else return BadRequest(new ApiResultMessage { IsError = true, Message = "Username of password is incorrect", MessageDetail = "" });
        }
    }
}
