using MediatR;
using Microsoft.AspNetCore.Http;
using Newtonsoft.Json;
using Shop.Application.Categories.Queries.GetCategory;
using Shop.Application.Common.Interfaces;
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
            };

            _context.Products.Add(entity);
            await _context.SaveChangesAsync(cancellationToken);
            var category = await _mediator.Send(new GetCategoryByIdQuery() { CategoryId = request.CategoryId });
            _context.ProductCategories.Add(new ProductCategory() { CategoryId = category.Id, ProductId = entity.Id });

            var parentId = category.ParentId;

            var catEnumerable = await _mediator.Send(new GetCategoryListQuery());
            var catList = catEnumerable.CategoryDtos.ToList();
            for (int i = 0; i < catList.Count; i++)
            {
                var item = catList[i];
                if (item.Id == parentId)
                {
                    _context.ProductCategories.Add(new ProductCategory() { CategoryId = item.Id, ProductId = entity.Id });
                    parentId = item.ParentId;
                }
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

