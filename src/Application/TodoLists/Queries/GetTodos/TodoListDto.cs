using Shop.Application.Common.Mappings;
using Shop.Domain.Entities;
using System.Collections.Generic;

namespace Shop.Application.TodoLists.Queries.GetTodos
{
    public class TodoListDto : IMapFrom<TodoList>
    {
        public TodoListDto()
        {
            Items = new List<TodoItemDto>();
        }

        public int Id { get; set; }

        public string Title { get; set; }

        public string Colour { get; set; }

        public IList<TodoItemDto> Items { get; set; }
    }
}
