using MediatR;
using Microsoft.AspNetCore.Http;
using Newtonsoft.Json;
using Shop.Application.Categories.Queries.GetCategory;
using Shop.Application.Common.Interfaces;
using Shop.Application.Common.Models;
using Shop.Domain.Entities;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json;
using System.Threading;
using System.Threading.Tasks;

namespace Shop.Application.Products.Commands.CreateProduct
{
    public class CreateProductCommand : IRequest<long>
    {
        public string BrandName { get; set; }
        public string Description { get; set; }
        public string ShortDescription { get; set; }
        public string Name { get; set; }
        public string FarsiName { get; set; }
        public decimal Price { get; set; }
        public IFormFile Image { get; set; }
        //public List<ProductSpecificationKeyValue> ProductSpecifications { get; set; }
        public string ProductSpecifications { get; set; }
        public long CategoryId { get; set; }

    }

    public class CreateProductCommandHandler : IRequestHandler<CreateProductCommand, long>
    {
        private readonly IApplicationDbContext _context;
        private readonly IMediator _mediator;

        public CreateProductCommandHandler(IApplicationDbContext context, IMediator mediator)
        {
            _context = context;
            _mediator = mediator;
        }

        public async Task<long> Handle(CreateProductCommand request, CancellationToken cancellationToken)
        {
            var entity = new Product()
            {
                BrandName = request.BrandName,
                Description = request.Description,
                FarsiName = request.FarsiName,
                Image = request.Image.FileName,
                Name = request.Name,
                Price = request.Price,
                ShortDescription = request.ShortDescription,
                CategoryId = request.CategoryId
            };

            _context.Products.Add(entity);
            await _context.SaveChangesAsync(cancellationToken);

            var catEnumerable = await _mediator.Send(new GetCategoryListQuery());

            var catList = new List<CategoryDto>();
            catEnumerable.CategoryDtos
                .GetAllCategorySeries(c => c.Id, c => c.ParentId, catList, request.CategoryId);


            foreach (var item in catList)
            {
                _context.ProductCategories.Add(new ProductCategory() { CategoryId = item.Id, ProductId = entity.Id });

            }


            List<ProductSpecificationKeyValue> specs =
               JsonConvert.DeserializeObject<List<ProductSpecificationKeyValue>>(request.ProductSpecifications);
            foreach (var item in specs)
            {
                var specification = _context.Specifications.Where(s => s.Id == item.Id).FirstOrDefault();
                if (specification != null)
                {

                    var productSpecification = new ProductSpecification()
                    {
                        ProductId = entity.Id,
                        SpecificationId = specification.Id,
                        SpecificationValue = item.Value,
                    };
                    _context.ProductSpecifications.Add(productSpecification);
                }
            }


            await _context.SaveChangesAsync(cancellationToken);

            return entity.Id;
        }
    }
}

