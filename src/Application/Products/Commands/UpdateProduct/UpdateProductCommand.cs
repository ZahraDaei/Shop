﻿using MediatR;
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
    public class UpdateProductCommand : IRequest<long>
    {
        public long Id { get; set; }
        public string BrandName { get; set; }
        public string Description { get; set; }
        public string ShortDescription { get; set; }
        public string Name { get; set; }
        public string FarsiName { get; set; }
        public decimal Price { get; set; }
        public IFormFile Image { get; set; }
        public string ProductSpecifications { get; set; }
        public long CategoryId { get; set; }

    }

    public class UpdateProductCommandHandler : IRequestHandler<UpdateProductCommand, long>
    {
        private readonly IApplicationDbContext _context;
        private readonly IMediator _mediator;
        private readonly IWebHostEnvironment _hostingEnvironment;
        private CancellationToken _cancellationToken;

        public UpdateProductCommandHandler(IApplicationDbContext context, IMediator mediator, IWebHostEnvironment environment)
        {
            _context = context;
            _mediator = mediator;
            _hostingEnvironment = environment;
        }

        public async Task<long> Handle(UpdateProductCommand request, CancellationToken cancellationToken)
        {
            _cancellationToken = cancellationToken;
            var product = await _context.Products.FirstOrDefaultAsync(x => x.Id == request.Id);
            if (product == null)
            {
                var err = new ValidationException();
                err.Errors.Add("محصول", new string[] { "وجود ندارد" });
                throw err;
            }
            await UpdateImage(product, request);
            product.BrandName = request.BrandName;
            product.Description = request.Description;
            product.FarsiName = request.FarsiName;
            product.Image = request.Image.FileName;
            product.Name = request.Name;
            product.Price = request.Price;
            product.ShortDescription = request.ShortDescription;

            await _context.SaveChangesAsync(cancellationToken);

            await RemoveCategoryList(product);
            await AddCategoryList(request, product);

            await RemoveProductSpecifications(product);
            await AddProductSpecifications(product, request);

            return product.Id;
        }

        private async Task UpdateImage(Product product, UpdateProductCommand request)
        {
            string imagesPath = Path.Combine(_hostingEnvironment.WebRootPath, "images");
            var files = Directory.GetFiles(imagesPath);
            var file = request.Image;
            var imgName = file.FileName;
            foreach (var item in files)
            {
                if (item.Contains($"\\{imgName}")&& imgName != product.Image)
                {
                    var err = new ValidationException();
                    err.Errors.Add("محصول", new string[] { "نام عکس تکراری است" });
                    throw err;
                }
                else if (item.Contains($"\\{imgName}") && imgName == product.Image)
                {
                    File.Delete(item);
                    break;
                }
            }
            string filePath = Path.Combine(imagesPath, imgName);
            if (file.Length > 0)
            {
                using (Stream fileStream = new FileStream(filePath, FileMode.Create))
                {
                    await file.CopyToAsync(fileStream);
                }

                using (Stream fileStream = new FileStream(filePath, FileMode.Create))
                {
                    await file.CopyToAsync(fileStream);
                }
            }
        }

        private async Task RemoveProductSpecifications(Product product)
        {
            var productSpecification = await _context.ProductSpecifications.Where(p => p.ProductId == product.Id).ToListAsync();
            if (productSpecification != null)
            {
                foreach (var item in productSpecification)
                {
                    _context.ProductSpecifications.Remove(item);
                }
                await _context.SaveChangesAsync(_cancellationToken);
            }
        }

        private async Task RemoveCategoryList(Product product)
        {
            var catList = await _context.ProductCategories.Where(c => c.ProductId == product.Id).ToListAsync();
            if (catList != null)
            {
                foreach (var item in catList)
                {
                    _context.ProductCategories.Remove(item);
                }
                await _context.SaveChangesAsync(_cancellationToken);
            }
        }

        private async Task AddCategoryList(UpdateProductCommand request, Product product)
        {
            var catEnumerable = await _mediator.Send(new GetCategoryListQuery());

            var catList = new List<CategoryDto>();
            catEnumerable.CategoryDtos
                .GetAllCategorySeries(c => c.Id, c => c.ParentId, catList, request.CategoryId);
            foreach (var item in catList)
            {
                _context.ProductCategories.Add(new ProductCategory() { CategoryId = item.Id, ProductId = product.Id });
            }
            await _context.SaveChangesAsync(_cancellationToken);
        }

        private async Task AddProductSpecifications(Product product, UpdateProductCommand request)
        {
            List<ProductSpecificationKeyValue> specs =
                          JsonConvert.DeserializeObject<List<ProductSpecificationKeyValue>>(request.ProductSpecifications);
            foreach (var item in specs)
            {
                var specification = _context.Specifications.Where(s => s.Id == item.Id).FirstOrDefault();
                if (specification != null)
                {
                    var productSpecification = new ProductSpecification()
                    {
                        ProductId = product.Id,
                        SpecificationId = specification.Id,
                        SpecificationValue = item.Value,
                    };
                    _context.ProductSpecifications.Add(productSpecification);
                }
            }
            await _context.SaveChangesAsync(_cancellationToken);
        }
    }
}

