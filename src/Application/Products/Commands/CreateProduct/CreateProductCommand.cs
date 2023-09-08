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
    public class CreateProductCommand : IRequest<long>
    {
        public string BrandName { get; set; }
        public string Description { get; set; }
        public string ShortDescription { get; set; }
        public string Name { get; set; }
        public string FarsiName { get; set; }
        public decimal Price { get; set; }
        public List<IFormFile> Images { get; set; }
        //public List<ProductSpecificationKeyValue> ProductSpecifications { get; set; }
        public string ProductSpecifications { get; set; }
        public long CategoryId { get; set; }

    }

    public class CreateProductCommandHandler : IRequestHandler<CreateProductCommand, long>
    {
        private readonly IApplicationDbContext _context;
        private readonly IMediator _mediator;
        private readonly IWebHostEnvironment _hostingEnvironment;

        public CreateProductCommandHandler(IApplicationDbContext context,
            IMediator mediator, IWebHostEnvironment environment)
        {
            _context = context;
            _mediator = mediator;
            _hostingEnvironment = environment;
        }

        public async Task<long> Handle(CreateProductCommand request, CancellationToken cancellationToken)
        {

            var product = await _context.Products.FirstOrDefaultAsync(x => x.Name == request.Name);
            if (product != null)
            {
                var err = new ValidationException();
                err.Errors.Add("محصول", new string[] { "تکراری" });
                throw err;
            }
            string images = Path.Combine(_hostingEnvironment.WebRootPath, "images/product");
            foreach (var file in request.Images)
            {
                if (file.Length > 0)
                {
                    string filePath = Path.Combine(images, file.FileName);
                    using (Stream fileStream = new FileStream(filePath, FileMode.Create))
                    {
                        await file.CopyToAsync(fileStream);
                    }
                }
            }

            var entity = new Product()
            {
                BrandName = request.BrandName,
                Description = request.Description,
                FarsiName = request.FarsiName,
                Name = request.Name,
                Price = request.Price,
                ShortDescription = request.ShortDescription,
                CategoryId = request.CategoryId
            };
            _context.Products.Add(entity);
            await _context.SaveChangesAsync(cancellationToken);

            foreach (var item in request.Images)
            {
                var imgEntity=new ProductImage() { Name = item.FileName, ProductId=entity.Id };
                _context.ProductImages.Add(imgEntity);
            }
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

