using ElearningBO.UserAuthentication;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ElearningBO.E_Learning
{
    public class Message
    {
        [Key]
        public int Id { get; set; }
        public string Content { get; set; }
        public DateTime Timestamp { get; set; }

        [ForeignKey("Room")]
        public int RoomId { get; set; }
        public virtual Room Room { get; set; }
        public ApplicationUser FromUser { get; set; }
    }
    public class Room
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string CourseCode { get; set; }
        public ApplicationUser Admin { get; set; }
        public ICollection<Message> Messages { get; set; }
    }
    public class MessageViewModel
    {
        [Required]
        public string Content { get; set; }
        public string Timestamp { get; set; }
        public string From { get; set; }
        [Required]
        public string Room { get; set; }
        //public string Avatar { get; set; }
    }
    public class RoomViewModel
    {
        public int Id { get; set; }
        [Required]
        [StringLength(100, ErrorMessage = "The {0} must be at least {2} and at max {1} characters long.", MinimumLength = 5)]
        [RegularExpression(@"^\w+( \w+)*$", ErrorMessage = "Characters allowed: letters, numbers, and one space between words.")]
        public string Name { get; set; }
        public string CourseCode { get; set; }
    }
    public class UploadViewModel
    {
        [Required]
        public int RoomId { get; set; }
        [Required]
        public IFormFile File { get; set; }
    }
    public class UserViewModel
    {
        public string Username { get; set; }
        public string FullName { get; set; }
        public string Avatar { get; set; }
        public string CurrentRoom { get; set; }
        public string Device { get; set; }
    }
    public class SMSmodel
    {
        public string PhoneNumber { get; set; }
        public string FullName { get; set; }
        public string Email { get; set; }
        public string CourseName { get; set; }
        public string Code { get; set; }
        public string SubjectName { get; set; }
    }
}
    
