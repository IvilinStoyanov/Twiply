using System;

namespace DateApp.API.Models
{
    public class Comment
    {

        public Comment()
        {
            Created = DateTime.Now;
        }
        public int Id { get; set; }
        public string Text { get; set; }
        public DateTime Created { get; set; }
        public int UserId { get; set; }
        public User User { get; set; }
        public int PostId { get; set; }
        public Post Post { get; set; }
    }
}