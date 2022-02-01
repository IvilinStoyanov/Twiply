using System.Collections.Generic;
using API.Entities;

namespace API.DTOs
{
    public class MessageDtoTest
    {
        public string RecipientUsername { get; set; }
        public List<Message> Messages { get; set; }
    }
}