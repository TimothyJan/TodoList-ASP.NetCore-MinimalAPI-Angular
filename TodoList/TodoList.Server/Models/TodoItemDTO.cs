namespace TodoList.Server.Models
{
    public class TodoItemDTO
    {
        public int Id { get; set; }
        public bool IsComplete { get; set; }
        public string Name { get; set; }
        public string? DateAndTime { get; set; }

        public TodoItemDTO() { }
        public TodoItemDTO(TodoItem todoItem) =>
        (Id, DateAndTime, IsComplete, Name) = (todoItem.Id, todoItem.DateAndTime, todoItem.IsComplete, todoItem.Name);
    }
}
