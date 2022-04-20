using MediatR;
using Microsoft.AspNetCore.Http;
using Store.Common.Interfaces;
using Store.Models;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace Store.Application.Product.Commands.CreateProduct
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
        public Dictionary<string, string> ProductSpecifications { get; set; }
        public List<string> ProductCategories { get; set; }

    }

    public class CreateProductCommandHandler : IRequestHandler<CreateProductCommand, long>
    {
        private readonly IApplicationDbContext _context;

        public CreateProductCommandHandler(IApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<long> Handle(CreateProductCommand request, CancellationToken cancellationToken)
        {
            var entity = new Models.Product()
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
            for (int i = 0; i < request.ProductCategories.Count; i++)
            {
                var item = request.ProductCategories[i];
                var category =  _context.Categories.Where(c => c.Name == item).FirstOrDefault();
                var productCategory = new ProductCategory()
                {
                    CategoryId = category.Id,
                    ProductId=entity.Id,
                };

             _context.ProductCategories.Add(productCategory);
            }


            foreach (var item in request.ProductSpecifications)
            {
                var specification = _context.Specifications.Where(s => s.SpecificationKey == item.Key).FirstOrDefault();
                var productSpecification = new ProductSpecification()
                {
                    ProductId = entity.Id,
                    SpecificationId = specification.Id,
                    SpecificationValue = item.Value,
                };
             _context.ProductSpecifications.Add(productSpecification);
            }
            

            await _context.SaveChangesAsync(cancellationToken);

            return entity.Id;
        }
    }
}

