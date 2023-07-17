using AutoMapper;
using AutoMapper.QueryableExtensions;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Shop.Application.Common.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace Shop.Application.ProductCategories.Queries.GetProductCategory
{

    public class GetProductCategoryListQuery : IRequest<ProductCategoryVm>
    {
    }

    public class GetProductCategoryListQueryHandler : IRequestHandler<GetProductCategoryListQuery, ProductCategoryVm>
    {
        private readonly IApplicationDbContext _context;
        private readonly IMapper _mapper;

        public GetProductCategoryListQueryHandler(IApplicationDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task<ProductCategoryVm> Handle(GetProductCategoryListQuery request, CancellationToken cancellationToken)
        {
            try
            {

                var productCategoryVm = new ProductCategoryVm();
                var product_category = await _context.ProductCategories.ToListAsync();

                var products = await _context.Products.ToListAsync();
                var categories = await _context.Categories.ToListAsync();
               

                productCategoryVm.ProductCategoryDtos = from pc in product_category
                                                        join p in products on pc.ProductId equals p.Id
                                                        join c in categories on pc.CategoryId equals c.Id
                                                        
                                                        select new ProductCategoryDto
                                                        {
                                                            BrandName = p.BrandName,
                                                            CategoryId = c.Id,
                                                            LastCategoryId = p.CategoryId,
                                                            ProductId = p.Id,
                                                            CategoryFarsiName = c.FarsiName,
                                                            CategoryName = c.Name,
                                                            Name = p.Name,
                                                            FarsiName = p.FarsiName,
                                                            Description = p.Description,
                                                            Image = p.Image,
                                                            Price = p.Price,
                                                            ShortDescription = p.ShortDescription,
                                                        };

                return productCategoryVm;


            }
            catch (Exception e)
            {

                throw;
            }
        }
    }

}
