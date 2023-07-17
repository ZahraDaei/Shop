using MediatR;
using Shop.Application.Common.Interfaces;
using Shop.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace Shop.Application.ProductCategories.Commands.CreateProductCategory
{

    public class CreateProductCategoryCommand : IRequest<long>
    {
        public long ProductId { get; set; }
        public long CategoryId { get; set; }

    }

    public class CreateProductCategoryCommandHandler : IRequestHandler<CreateProductCategoryCommand, long>
    {
        private readonly IApplicationDbContext _context;
        private readonly IMediator _mediator;

        public CreateProductCategoryCommandHandler(IApplicationDbContext context, IMediator mediator)
        {
            _context = context;
            _mediator = mediator;
        }

        public async Task<long> Handle(CreateProductCategoryCommand request, CancellationToken cancellationToken)
        {

            var entity = new ProductCategory()
            {
                CategoryId = request.CategoryId,
                ProductId = request.ProductId
            };
             _context.ProductCategories.Add(entity);
            await _context.SaveChangesAsync(cancellationToken);

            return entity.Id;
        }
    }
}

