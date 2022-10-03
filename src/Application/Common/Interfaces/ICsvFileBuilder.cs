using Shop.Application.TodoLists.Queries.ExportTodos;
using System.Collections.Generic;

namespace Shop.Application.Common.Interfaces
{
    public interface ICsvFileBuilder
    {
        byte[] BuildTodoItemsFile(IEnumerable<TodoItemRecord> records);
    }
}
