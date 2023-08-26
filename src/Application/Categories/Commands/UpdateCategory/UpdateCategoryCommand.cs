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
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text.Json;
using System.Threading;
using System.Threading.Tasks;
using static Microsoft.EntityFrameworkCore.DbLoggerCategory.Database;

namespace Shop.Application.Products.Commands.CreateProduct
{
    public class UpdateCategoryCommand : IRequest<long>
    {
        public long Id { get; set; }
        public string Name { get; set; }
        public string FarsiName { get; set; }
        public IFormFile ImageContent { get; set; }
        public long ParentId { get; set; }
        public string Specifications { get; set; }

    }

    public class UpdateCategoryCommandHandler : IRequestHandler<UpdateCategoryCommand, long>
    {
        private readonly IApplicationDbContext _context;
        private readonly IMediator _mediator;
        private readonly IWebHostEnvironment _hostingEnvironment;
        private CancellationToken _cancellationToken;

        public UpdateCategoryCommandHandler(IApplicationDbContext context, IMediator mediator, IWebHostEnvironment environment)
        {
            _context = context;
            _mediator = mediator;
            _hostingEnvironment = environment;
        }

        public async Task<long> Handle(UpdateCategoryCommand request, CancellationToken cancellationToken)
        {
            _cancellationToken = cancellationToken;
            var category = await _context.Categories.FirstOrDefaultAsync(x => x.Id == request.Id);
            if (category == null)
            {
                var err = new ValidationException();
                err.Errors.Add("دسته بندی", new string[] { "وجود ندارد" });
                throw err;
            }


            category.FarsiName = request.FarsiName;
            category.Image = request.ImageContent.FileName;
            category.Name = request.Name;
            category.ParentId = request.ParentId;
            using (var memoryStream = new MemoryStream())
            {
                await request.ImageContent.CopyToAsync(memoryStream);

                if (memoryStream.Length < 100000)
                {
                    category.Content = memoryStream.ToArray();
                }
            }

            _context.Categories.Update(category);
            await _context.SaveChangesAsync(cancellationToken);

            if (request.Specifications != null)
            {
                var catSpec = await _context.Specifications.Where(c => c.CategoryId == request.Id).ToListAsync();
                string[] specs = request.Specifications.Split(",");
                for (int i = 0; i < specs.Length; i++)
                {
                    var item = specs[i];
                    if (catSpec.Where(c => c.SpecificationKey == item) != null)
                    {
                        continue;
                    }
                    else
                    {
                        var spec = new Specification()
                        {
                            CategoryId = category.Id,
                            SpecificationKey = item,

                        };
                        _context.Specifications.Add(spec);
                    }
                }
            }
            await _context.SaveChangesAsync(cancellationToken);

            return category.Id;
        }





    }
}

