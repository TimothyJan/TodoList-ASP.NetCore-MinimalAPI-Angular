using System.ComponentModel.DataAnnotations;

namespace TodoList.Server.Models
{
    public class TodoItem
    {
        public int Id { get; set; }

        [Required]
        public bool IsComplete { get; set; }

        [Required]
        public string Name { get; set; }

        public string? DateAndTime { get; set; }
        public string? Secret { get; set; }
    }
}