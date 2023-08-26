using MediatR;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
using Shop.Application.Categories.Queries.GetCategory;
using Shop.Application.Common.Exceptions;
using Shop.Application.Common.Interfaces;
using Shop.Application.Common.Models;
using Shop.Domain.Entities;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text.Json;
using System.Threading;
using System.Threading.Tasks;
using static Microsoft.EntityFrameworkCore.DbLoggerCategory.Database;

namespace Shop.Application.Products.Commands.CreateProduct
{
    public class DeleteProductCommand : IRequest
    {
        public long Id { get; set; }
    }

    public class DeleteProductCommandHandler : IRequestHandler<DeleteProductCommand>
    {
        private readonly IApplicationDbContext _context;
        private readonly IMediator _mediator;
        private readonly IWebHostEnvironment _hostingEnvironment;

        public DeleteProductCommandHandler(IApplicationDbContext context, IMediator mediator, IWebHostEnvironment environment)
        {
            _context = context;
            _mediator = mediator;
            _hostingEnvironment = environment;
        }

        public async Task<Unit> Handle(DeleteProductCommand request, CancellationToken cancellationToken)
        {

            var product = await _context.Products.FirstOrDefaultAsync(x => x.Id == request.Id);
            if (product==null)
            {
                var err = new ValidationException();
                err.Errors.Add("محصول",new string[] { "وجود ندارد" });
                throw err;
            }

            product.IsDeleted = true;
            await _context.SaveChangesAsync(cancellationToken);
            
            return Unit.Value;
        }
    }
}

