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

                var products = await _context.Products.Include(q => q.Images)
                    .Include(m => m.ProductCategories)
                    .ThenInclude(f => f.Category)
                    .Select(t => new ProductCategoryDto
                    {
                        BrandName = t.BrandName,
                        LastCategoryId = t.CategoryId,
                        CategoryId = t.ProductCategories.Where(c => c.CategoryId == t.CategoryId).Select(x => x.Category.Id).FirstOrDefault(),
                        ProductId = t.Id,
                        CategoryFarsiName = t.ProductCategories.Where(c => c.CategoryId == t.CategoryId).Select(c => c.Category.FarsiName).FirstOrDefault(),
                        CategoryName = t.ProductCategories.Where(c => c.CategoryId == t.CategoryId).Select(c => c.Category.Name).FirstOrDefault(),
                        Name = t.Name,
                        FarsiName = t.FarsiName,
                        Description = t.Description,
                        Images = t.Images.Select(g => g.Name).ToList(),
                        Price = t.Price,
                        ShortDescription = t.ShortDescription,
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
