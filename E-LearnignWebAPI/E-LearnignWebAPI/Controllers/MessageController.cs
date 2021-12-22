using AutoMapper;
using E_LearnignWebAPI.Hubs;
using ElearningBLL.BLL;
using ElearningBO;
using ElearningBO.E_Learning;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Data;
using System.IO;
using System.Linq;
using System.Text.RegularExpressions;
using System.Threading.Tasks;
using Twilio;
using Twilio.Rest.Api.V2010.Account;
using Twilio.Types;

namespace E_LearnignWebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MessageController : ControllerBase
    {
        private Elearning elearningBll = null;
        private readonly ELearningDbContext _context;
        private readonly IMapper _mapper;
        private readonly int FileSizeLimit;
        private readonly string[] AllowedExtensions;
        private readonly IWebHostEnvironment _environment;
        private readonly IHubContext<ChatHub> _hubContext;
        private readonly IConfiguration configruations;
        public MessageController(ELearningDbContext context, IMapper mapper, IWebHostEnvironment environment, IConfiguration configruation, IHubContext<ChatHub> hubContext)
        {
            elearningBll = new Elearning();
            _context = context;
            _mapper = mapper;
            _environment = environment;
            _hubContext = hubContext;
            //FileSizeLimit = configruation.GetSection("FileUpload").GetValue<int>("FileSizeLimit");
            //AllowedExtensions = configruation.GetSection("FileUpload").GetValue<string>("AllowedExtensions").Split(",");
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Room>> Get(int id)
        {
            var message = await _context.Message.FindAsync(id);
            if(message == null)
            {
                return NotFound();
            }
            var messageViewModel = _mapper.Map<Message, MessageViewModel>(message);
            return Ok(messageViewModel);
        }
        [HttpGet("Room/{roomName}")]
        public IActionResult GetMessages(string roomName)
        {
            var room = _context.Room.FirstOrDefault(r => r.Name == roomName);
            if (room == null)
                return BadRequest();

            var messages = _context.Message.Where(m => m.RoomId == room.Id)
                .Include(m => m.FromUser)
                .Include(m => m.Room)
                .OrderByDescending(m => m.Timestamp)
                .Take(20)
                .AsEnumerable()
                .Reverse()
                .ToList();

            var messagesViewModel = _mapper.Map<IEnumerable<Message>, IEnumerable<MessageViewModel>>(messages);

            return Ok(messagesViewModel);
        }
        [HttpPost]
        public async Task<ActionResult<Message>> Create(MessageViewModel messageViewModel)
        {
            var user = _context.Users.FirstOrDefault(u => u.UserName == User.Identity.Name);
            var room = _context.Room.FirstOrDefault(r => r.Name == messageViewModel.Room);
            if (room == null)
                return BadRequest();

            var msg = new Message()
            {
                Content = Regex.Replace(messageViewModel.Content, @"<.*?>", string.Empty),
                FromUser = user,
                Room = room,
                Timestamp = DateTime.Now
            };

            _context.Message.Add(msg);
            await _context.SaveChangesAsync();

            // Broadcast the message
            var createdMessage = _mapper.Map<Message, MessageViewModel>(msg);
            await _hubContext.Clients.Group(room.Name).SendAsync("newMessage", createdMessage);

            return CreatedAtAction(nameof(Get), new { id = msg.Id }, createdMessage);
        }
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var message = await _context.Message
                .Include(u => u.FromUser)
                .Where(m => m.Id == id && m.FromUser.UserName == User.Identity.Name)
                .FirstOrDefaultAsync();

            if (message == null)
                return NotFound();

            _context.Message.Remove(message);
            await _context.SaveChangesAsync();

            return NoContent();
        }
        #region Room
        [HttpGet]
        [Route("GetRoomMessage/{username}/{role}")]
        public async Task<ActionResult<IEnumerable<RoomViewModel>>> GetRoomMessage(string username, string role)
        {
            DataTable roomdata = new DataTable();
            if(role == "student")
                roomdata = elearningBll.GetRoomByStudent(username);
            if(role == "instructor")
                roomdata = elearningBll.GetRoomByInstructor(username);

            List<Room> rooms = new List<Room>();
            for (int i = 0; i < roomdata.Rows.Count; i++)
            {
                Room room = new Room();
                room.Id = Convert.ToInt32(roomdata.Rows[i]["Id"]);
                room.Name = roomdata.Rows[i]["Name"].ToString();
                room.CourseCode = roomdata.Rows[i]["CourseCode"].ToString();
                rooms.Add(room);
            }
            var roomsViewModel = _mapper.Map<IEnumerable<Room>, IEnumerable<RoomViewModel>>(rooms);

            return Ok(roomsViewModel);
        }
        [HttpGet]
        [Route("GetRoomMessage/{id}")]
        public async Task<ActionResult<Room>> GetRoomMessage(int id)
        {
            var room = await _context.Room.FindAsync(id);
            if (room == null)
                return NotFound();

            var roomViewModel = _mapper.Map<Room, RoomViewModel>(room);
            return Ok(roomViewModel);
        }
        [HttpPost]
        [Route("CreateRoom")]
        public async Task<ActionResult<Room>> CreateRoom(RoomViewModel roomViewModel)
        {
            if (_context.Room.Any(r => r.Name == roomViewModel.Name))
                return BadRequest("Invalid room name or room already exists");

            var user = _context.Users.FirstOrDefault(u => u.UserName == User.Identity.Name);
            var room = new Room()
            {
                Name = roomViewModel.Name,
                Admin = user,
                CourseCode = roomViewModel.CourseCode
            };

            _context.Room.Add(room);
            await _context.SaveChangesAsync();
            await _hubContext.Clients.All.SendAsync("addChatRoom", new { id = room.Id, name = room.Name });

            return CreatedAtAction(nameof(Get), new { id = room.Id }, new { id = room.Id, name = room.Name });
        }
        [HttpPut]
        [Route("EditRoom/{id}")]
        public async Task<IActionResult> EditRoom(int id, RoomViewModel roomViewModel)
        {
            if (_context.Room.Any(r => r.Name == roomViewModel.Name))
                return BadRequest("Invalid room name or room already exists");

            var room = await _context.Room
                .Include(r => r.Admin)
                .Where(r => r.Id == id && r.Admin.UserName == User.Identity.Name)
                .FirstOrDefaultAsync();

            if (room == null)
                return NotFound();

            room.Name = roomViewModel.Name;
            await _context.SaveChangesAsync();

            await _hubContext.Clients.All.SendAsync("updateChatRoom", new { id = room.Id, room.Name });

            return NoContent();
        }
        [HttpDelete]
        [Route("DeleteRoom/{id}")]
        public async Task<IActionResult> DeleteRoom(int id)
        {
            var room = await _context.Room
                .Include(r => r.Admin)
                .Where(r => r.Id == id && r.Admin.UserName == User.Identity.Name)
                .FirstOrDefaultAsync();

            if (room == null)
                return NotFound();

            _context.Room.Remove(room);
            await _context.SaveChangesAsync();

            await _hubContext.Clients.All.SendAsync("removeChatRoom", room.Id);
            await _hubContext.Clients.Group(room.Name).SendAsync("onRoomDeleted", string.Format("Room {0} has been deleted.\nYou are moved to the first available room!", room.Name));

            return NoContent();
        }
        #endregion

        [HttpGet]
        [Route("SendSms/{subjectId}")]
        public ApiResultMessage SendSms(int subjectId)
        {
            
            DataTable dataSMS = elearningBll.GetListSMSByCourse(subjectId);
            List<SMSmodel> lstSMS = new List<SMSmodel>();
            for (int i = 0; i < dataSMS.Rows.Count; i++)
            {
                SMSmodel model = new SMSmodel();
                model.PhoneNumber = dataSMS.Rows[i]["PhoneNumber"].ToString();
                model.FullName = dataSMS.Rows[i]["FullName"].ToString();
                model.Email = dataSMS.Rows[i]["Email"].ToString();
                model.CourseName = dataSMS.Rows[i]["CourseName"].ToString();
                model.Code = dataSMS.Rows[i]["Code"].ToString();
                model.SubjectName = dataSMS.Rows[i]["SubjectName"].ToString();
                lstSMS.Add(model);
                var accountSid = "AC8a44777b5fb8d6a7973734c5405ad95e";
                var authToken = "78dedc5d2a9ab6c954fa4747c8dfcc6b";
                TwilioClient.Init(accountSid, authToken);

                var to = new PhoneNumber(dataSMS.Rows[i]["PhoneNumber"].ToString());
                var from = new PhoneNumber("+12343513388");

                var message = MessageResource.Create(
                    to: to,
                    from: from,
                    body: "Hello " + dataSMS.Rows[i]["FullName"].ToString() + " Course" + dataSMS.Rows[i]["CourseName"].ToString() + " (" + dataSMS.Rows[i]["Code"].ToString() + ")" + " have one assignment to submit at " + dataSMS.Rows[i]["SubjectName"].ToString());
            }
             return new ApiResultMessage { IsError = false, Message = "Sended", MessageDetail = "" };
        }
    
    }
}
