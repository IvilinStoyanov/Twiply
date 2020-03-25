using System;

namespace DateApp.API.Dtos
{
    public class PostForReturnDto
    {
        public PostForReturnDto()
        {
            Created = DateTime.Now;
        }
        public int Id { get; set; }
        public string Description { get; set; }
        public DateTime Created { get; set; }
        public string Author { get; set; }
        public string AuthorPhotoUrl { get; set; }
    }
}