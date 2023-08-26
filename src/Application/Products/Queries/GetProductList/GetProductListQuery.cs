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

                var productDtos = await _context.Products.ToListAsync();


                var productVm = new ProductVm();
                var product_category = await _context.ProductCategories.ToListAsync();

                var products = await _context.Products.ToListAsync();
                var categories = await _context.Categories.ToListAsync();
                var product_specifications = await _context.ProductSpecifications.ToListAsync();
                var specification = await _context.Specifications.ToListAsync();

                var joined_product_specification = from ps in product_specifications
                                                   join s in specification on ps.SpecificationId equals s.Id
                                                   select new
                                                   {
                                                       ProductId = ps.ProductId,
                                                       Specification = new KeyValueSpecification() { Key = s.SpecificationKey, Value = ps.SpecificationValue },

                                                   };

                var grouped_product_specification = from jps in joined_product_specification
                                                    group jps.Specification by jps.ProductId into g
                                                    select new
                                                    { ProductId = g.Key, Specification = g.ToList() };

                productVm.ProductDtos = from p in products
                                        join gps in grouped_product_specification on p.Id equals gps.ProductId
                                        where p.IsDeleted==false
                                        select new ProductDto
                                        {
                                            BrandName = p.BrandName,
                                            Id = p.Id,
                                            Name = p.Name,
                                            FarsiName = p.FarsiName,
                                            Description = p.Description,
                                            Image = p.Image,
                                            Price = p.Price,
                                            ShortDescription = p.ShortDescription,
                                            Specifications = gps.Specification,
                                            CategoryId=p.CategoryId,
                                        };




                return productVm;
            }
            catch (Exception e)
            {

                throw;
            }
        }
    }
}

