using Shop.Application.Common.Exceptions;
using Shop.Application.Common.Security;
using Shop.Application.TodoLists.Commands.CreateTodoList;
using Shop.Application.TodoLists.Commands.PurgeTodoLists;
using Shop.Application.TodoLists.Queries.ExportTodos;
using Shop.Domain.Entities;
using FluentAssertions;
using NUnit.Framework;
using System;
using System.Threading.Tasks;

namespace Shop.Application.IntegrationTests.TodoLists.Commands
{
    using static Testing;

    public class PurgeTodoListsTests : TestBase
    {
        [Test]
        public async Task ShouldDenyAnonymousUser()
        {
            var command = new PurgeTodoListsCommand();

            command.GetType().Should().BeDecoratedWith<AuthorizeAttribute>();

            await FluentActions.Invoking(() =>
                SendAsync(command)).Should().ThrowAsync<UnauthorizedAccessException>();
        }

        [Test]
        public async Task ShouldDenyNonAdministrator()
        {
            await RunAsDefaultUserAsync();

            var command = new PurgeTodoListsCommand();

           await FluentActions.Invoking(() =>
                SendAsync(command)).Should().ThrowAsync<ForbiddenAccessException>();
        }

        [Test]
        public async Task ShouldAllowAdministrator()
        {
            await RunAsAdministratorAsync();

            var command = new PurgeTodoListsCommand();

           await FluentActions.Invoking(() => SendAsync(command))
                .Should().NotThrowAsync<ForbiddenAccessException>();
        }

        [Test]
        public async Task ShouldDeleteAllLists()
        {
            await RunAsAdministratorAsync();

            await SendAsync(new CreateTodoListCommand
            {
                Title = "New List #1"
            });

            await SendAsync(new CreateTodoListCommand
            {
                Title = "New List #2"
            });

            await SendAsync(new CreateTodoListCommand
            {
                Title = "New List #3"
            });

            await SendAsync(new PurgeTodoListsCommand());

            var count = await CountAsync<TodoList>();

            count.Should().Be(0);
        }
    }
}
