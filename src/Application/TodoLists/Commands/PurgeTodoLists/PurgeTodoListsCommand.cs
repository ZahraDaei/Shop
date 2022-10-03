using Shop.Application.Common.Interfaces;
using Shop.Application.Common.Security;
using MediatR;
using System.Threading;
using System.Threading.Tasks;

namespace Shop.Application.TodoLists.Commands.PurgeTodoLists
{
    [Authorize(Roles = "Administrator")]
    [Authorize(Policy = "CanPurge")]
    public class PurgeTodoListsCommand : IRequest
    {
    }

    public class PurgeTodoListsCommandHandler : IRequestHandler<PurgeTodoListsCommand>
    {
        private readonly IApplicationDbContext _context;

        public PurgeTodoListsCommandHandler(IApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<Unit> Handle(PurgeTodoListsCommand request, CancellationToken cancellationToken)
        {
            _context.TodoLists.RemoveRange(_context.TodoLists);

            await _context.SaveChangesAsync(cancellationToken);

            return Unit.Value;
        }
    }
}
