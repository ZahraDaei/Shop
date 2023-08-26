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

    public class GetProductByIdQuery : IRequest<ProductDto>
    {
        public long Id { get; set; }
    }

    public class GetProductByIdQueryHandler : IRequestHandler<GetProductByIdQuery, ProductDto>
    {
        private readonly IApplicationDbContext _context;
        private readonly IMapper _mapper;

        public GetProductByIdQueryHandler(IApplicationDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task<ProductDto> Handle(GetProductByIdQuery request, CancellationToken cancellationToken)
        {
            try
            {

                var product = await _context.Products.Where(p=>p.Id==request.Id).FirstOrDefaultAsync();


                var productDto= new ProductDto();
                var product_category = await _context.ProductCategories.Where(p => p.ProductId == request.Id).ToListAsync();
                var categories = await _context.Categories.ToListAsync();
                var product_specifications = await _context.ProductSpecifications.Where(p => p.ProductId == request.Id).ToListAsync();
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

                productDto = new ProductDto
                                        {
                                            BrandName = product.BrandName,
                                            Id = product.Id,
                                            Name = product.Name,
                                            FarsiName = product.FarsiName,
                                            Description = product.Description,
                                            Image = product.Image,
                                            Price = product.Price,
                                            ShortDescription = product.ShortDescription,
                                            Specifications= grouped_product_specification.Select(x => x.Specification).FirstOrDefault(),
                                            CategoryId =product.CategoryId,
                                        };




                return productDto;
            }
            catch (Exception e)
            {

                throw;
            }
        }
    }
}

