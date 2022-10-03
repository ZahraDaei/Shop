using Shop.Application.Common.Exceptions;
using Shop.Application.TodoLists.Commands.CreateTodoList;
using Shop.Application.TodoLists.Commands.DeleteTodoList;
using Shop.Domain.Entities;
using FluentAssertions;
using NUnit.Framework;
using System.Threading.Tasks;

namespace Shop.Application.IntegrationTests.TodoLists.Commands
{
    using static Testing;

    public class DeleteTodoListTests : TestBase
    {
        [Test]
        public async Task ShouldRequireValidTodoListId()
        {
            var command = new DeleteTodoListCommand { Id = 99 };
            await FluentActions.Invoking(() => SendAsync(command)).Should().ThrowAsync<NotFoundException>();
        }

        [Test]
        public async Task ShouldDeleteTodoList()
        {
            var listId = await SendAsync(new CreateTodoListCommand
            {
                Title = "New List"
            });

            await SendAsync(new DeleteTodoListCommand 
            { 
                Id = listId 
            });

            var list = await FindAsync<TodoList>(listId);

            list.Should().BeNull();
        }
    }
}
