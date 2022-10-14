using MediatR;
using Microsoft.EntityFrameworkCore;
using Shop.Application.Common.Interfaces;
using Shop.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace Shop.Application.CartProducts.Commands.DeleteCartProduct
{

    public class DeleteCartProductCommand : IRequest<Unit>
    {
        public int Id { get; set; }

    }

    public class DeleteCartProductCommandHandler : IRequestHandler<DeleteCartProductCommand, Unit>
    {
        private readonly IApplicationDbContext _context;

        public DeleteCartProductCommandHandler(IApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<Unit> Handle(DeleteCartProductCommand request, CancellationToken cancellationToken)
        {
            try
            {

                var entity = await _context.CartProducts.FindAsync(request.Id);
                if (entity == null)
                {
                    throw new EntryPointNotFoundException("محصول موجود نمی باشد");
                }


                _context.CartProducts.Remove(entity);
                await _context.SaveChangesAsync(cancellationToken);



                return Unit.Value;
            }
            catch (System.Exception e)
            {

                throw;
            }
        }
    }
}

