using Shop.Domain.Common;
using Shop.Domain.Entities;

namespace Shop.Domain.Events
{
    public class TodoItemDeletedEvent : DomainEvent
    {
        public TodoItemDeletedEvent(TodoItem item)
        {
            Item = item;
        }

        public TodoItem Item { get; }
    }
}
