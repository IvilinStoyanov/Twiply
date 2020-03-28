using System;

namespace DateApp.API.Dtos
{
    public class CommentToReturnDto
    {
        public CommentToReturnDto()
        {
            Created = DateTime.Now;
        }
        public int Id { get; set; }
        public string Text { get; set; }
        public DateTime Created { get; set; }
        public UserForCommentDto User { get; set; }
    }
}