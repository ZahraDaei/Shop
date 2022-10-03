using Shop.Application.Common.Exceptions;
using Shop.Application.TodoItems.Commands.CreateTodoItem;
using Shop.Application.TodoLists.Commands.CreateTodoList;
using Shop.Domain.Entities;
using FluentAssertions;
using NUnit.Framework;
using System;
using System.Threading.Tasks;

namespace Shop.Application.IntegrationTests.TodoItems.Commands
{
    using static Testing;

    public class CreateTodoItemTests : TestBase
    {
        [Test]
        public async Task ShouldRequireMinimumFields()
        {
            var command = new CreateTodoItemCommand();

            await FluentActions.Invoking(() =>
                SendAsync(command)).Should().ThrowAsync<ValidationException>();
        }

        [Test]
        public async Task ShouldCreateTodoItem()
        {
            var userId = await RunAsDefaultUserAsync();

            var listId = await SendAsync(new CreateTodoListCommand
            {
                Title = "New List"
            });

            var command = new CreateTodoItemCommand
            {
                ListId = listId,
                Title = "Tasks"
            };

            var itemId = await SendAsync(command);

            var item = await FindAsync<TodoItem>(itemId);

            item.Should().NotBeNull();
            item.ListId.Should().Be(command.ListId);
            item.Title.Should().Be(command.Title);
            item.CreatedBy.Should().Be(userId);
            item.Created.Should().BeCloseTo(DateTime.Now, TimeSpan.FromMilliseconds(10000));
            item.LastModifiedBy.Should().BeNull();
            item.LastModified.Should().BeNull();
        }
    }
}
