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
using System.IO;
using System.Linq;
using System.Text.RegularExpressions;
using System.Threading.Tasks;

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
        [Route("GetRoomMessage")]
        public async Task<ActionResult<IEnumerable<RoomViewModel>>> GetRoomMessage()
        {

            var rooms = await _context.Room.ToListAsync();

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
                Admin = user
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
        #region UploadFile
        [HttpPost]
        //[ValidateAntiForgeryToken]
        public async Task<IActionResult> Upload([FromForm] UploadViewModel uploadViewModel)
        {
            if (ModelState.IsValid)
            {
                if (!Validate(uploadViewModel.File))
                {
                    return BadRequest("Validation failed!");
                }

                var fileName = DateTime.Now.ToString("yyyymmddMMss") + "_" + Path.GetFileName(uploadViewModel.File.FileName);
                var folderPath = Path.Combine(_environment.WebRootPath, "uploads");
                var filePath = Path.Combine(folderPath, fileName);
                if (!Directory.Exists(folderPath))
                    Directory.CreateDirectory(folderPath);

                using (var fileStream = new FileStream(filePath, FileMode.Create))
                {
                    await uploadViewModel.File.CopyToAsync(fileStream);
                }

                var user = _context.ApplicationUsers.Where(u => u.UserName == User.Identity.Name).FirstOrDefault();
                var room = _context.Room.Where(r => r.Id == uploadViewModel.RoomId).FirstOrDefault();
                if (user == null || room == null)
                    return NotFound();

                string htmlImage = string.Format(
                    "<a href=\"/uploads/{0}\" target=\"_blank\">" +
                    "<img src=\"/uploads/{0}\" class=\"post-image\">" +
                    "</a>", fileName);

                var message = new Message()
                {
                    Content = Regex.Replace(htmlImage, @"(?i)<(?!img|a|/a|/img).*?>", string.Empty),
                    Timestamp = DateTime.Now,
                    FromUser = user,
                    Room = room
                };

                await _context.Message.AddAsync(message);
                await _context.SaveChangesAsync();

                // Send image-message to group
                var messageViewModel = _mapper.Map<Message, MessageViewModel>(message);
                //   await _hubContext.Clients.Group(room.Name).SendAsync("newMessage", messageViewModel);

                return Ok();
            }

            return BadRequest();
        }

        private bool Validate(IFormFile file)
        {
            if (file.Length > FileSizeLimit)
                return false;

            var extension = Path.GetExtension(file.FileName).ToLowerInvariant();
            if (string.IsNullOrEmpty(extension) || !AllowedExtensions.Any(s => s.Contains(extension)))
                return false;

            return true;
        }

        #endregion
    }
}
