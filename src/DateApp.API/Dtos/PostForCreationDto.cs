using System;

namespace DateApp.API.Dtos
{
    public class PostForCreationDto
    {
        public PostForCreationDto()
        {
             Created = DateTime.Now;
        }
         public int Id { get; set; }
        public string Description { get; set; }
        public DateTime Created { get; set; }
        public int UserId { get; set; }
        public string UserKnownAs { get; set; }
    }
}