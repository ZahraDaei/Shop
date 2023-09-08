using AutoMapper;
using AutoMapper.QueryableExtensions;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Shop.Application.Common.Interfaces;
using Shop.Application.Common.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace Shop.Application.Products.Queries.GetProductList
{

    public class GetProductListQuery : IRequest<ProductVm>
    {
    }

    public class GetProductListQueryHandler : IRequestHandler<GetProductListQuery, ProductVm>
    {
        private readonly IApplicationDbContext _context;
        private readonly IMapper _mapper;

        public GetProductListQueryHandler(IApplicationDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task<ProductVm> Handle(GetProductListQuery request, CancellationToken cancellationToken)
        {
            try
            {



                var productVm = new ProductVm();

                 productVm.ProductDtos = await _context.Products.Where(h => !h.IsDeleted)
                    .Include(q=>q.Images)
                    .Include(p => p.ProductSpecifications)
                    .ThenInclude(x => x.Specification).Select(f => new ProductDto
                    {
                        BrandName = f.BrandName,
                        Id = f.Id,
                        Name = f.Name,
                        FarsiName = f.FarsiName,
                        Description = f.Description,
                        Images = f.Images.Select(p=>p.Name).ToList(),
                        Price = f.Price,
                        ShortDescription = f.ShortDescription,
                        Specifications = f.ProductSpecifications.Select(k => 
                        new KeyValueSpecification()
                        { Key = k.Specification.SpecificationKey, Value = k.SpecificationValue }),
                        CategoryId = f.CategoryId,
                    }).ToListAsync();             
               

                return productVm;
            }
            catch (Exception e)
            {

                throw;
            }
        }
    }
}

