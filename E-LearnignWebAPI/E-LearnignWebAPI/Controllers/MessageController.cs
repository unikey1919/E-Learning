﻿using AutoMapper;
using ElearningBLL.BLL;
using ElearningBO;
using ElearningBO.E_Learning;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
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
        public MessageController(ELearningDbContext context, IMapper mapper, IWebHostEnvironment environment, IConfiguration configruation)
        {
            elearningBll = new Elearning();
            _context = context;
            _mapper = mapper;
            _environment = environment;
            FileSizeLimit = configruation.GetSection("FileUpload").GetValue<int>("FileSizeLimit");
            AllowedExtensions = configruation.GetSection("FileUpload").GetValue<string>("AllowedExtensions").Split(",");
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
                .OrderByDescending(m => m.TimeStamp)
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
                    TimeStamp = DateTime.Now,
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