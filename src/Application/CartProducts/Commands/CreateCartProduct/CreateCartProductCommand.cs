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

namespace Shop.Application.CartProducts.Commands.CreateCartProduct
{

    public class CreateCartProductCommand : IRequest<long>
    {
        public int Amount { get; set; }
        public long ProductId { get; set; }
    }

    public class CreateCartProductCommandHandler : IRequestHandler<CreateCartProductCommand, long>
    {
        private readonly IApplicationDbContext _context;

        public CreateCartProductCommandHandler(IApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<long> Handle(CreateCartProductCommand request, CancellationToken cancellationToken)
        {
            try
            {

                var product = await _context.Products.Where(p => p.Id == request.ProductId).FirstOrDefaultAsync();
                if (product == null)
                {
                    throw new EntryPointNotFoundException("محصول موجود نمی باشد");
                }
                var entity = new CartProduct()
                {
                    Amount = request.Amount,
                    ProductId = request.ProductId
                };



                _context.CartProducts.Add(entity);
                await _context.SaveChangesAsync(cancellationToken);



                return entity.Id;
            }
            catch (System.Exception e)
            {

                throw;
            }
        }
    }
}

