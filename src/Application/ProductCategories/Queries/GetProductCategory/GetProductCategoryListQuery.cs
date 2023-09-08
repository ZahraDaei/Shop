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

                productCategoryVm.ProductCategoryDtos = await _context.ProductCategories.Include(q => q.Product)
                    .ThenInclude(f => f.Images)
                    .Include(m => m.Category)
                    .Select(t => new ProductCategoryDto
                    {
                        BrandName =t.Product.BrandName,
                        LastCategoryId = t.Product.CategoryId,
                        CategoryId = t.CategoryId,
                        ProductId = t.ProductId,
                        CategoryFarsiName = t.Category.FarsiName,
                        CategoryName = t.Category.Name,
                        Name = t.Product.Name,
                        FarsiName = t.Product.FarsiName,
                        Description = t.Product.FarsiName,
                        Images = t.Product.Images.Select(g => g.Name).ToList(),
                        Price = t.Product.Price,
                        ShortDescription = t.Product.ShortDescription,
                    })
                    .ToListAsync();
                return productCategoryVm;
            }
            catch (Exception e)
            {

                throw;
            }
        }
    }

}
