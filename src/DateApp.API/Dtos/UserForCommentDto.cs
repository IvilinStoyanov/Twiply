using System;

namespace DateApp.API.Dtos
{
    public class UserForCommentDto
    {
       public int Id { get; set; } 
       public string KnownAs { get; set;}
       public DateTime LastActive { get; set; }
       public string City { get; set; }
       public string PhotoUrl { get; set; }
    }
}