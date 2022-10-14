﻿using AutoMapper;
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

namespace Shop.Application.Products.Queries.GetProductList
{

    public class GetProductListQuery : IRequest<ProductVm>
    {
    }

    public class GetCategoriesQueryHandler : IRequestHandler<GetProductListQuery, ProductVm>
    {
        private readonly IApplicationDbContext _context;
        private readonly IMapper _mapper;

        public GetCategoriesQueryHandler(IApplicationDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task<ProductVm> Handle(GetProductListQuery request, CancellationToken cancellationToken)
        {
            try
            {

                return new ProductVm()
                {
                    ProductDtos = await _context.Products
                        .OrderBy(x => x.Id)
                        .ProjectTo<ProductDto>(_mapper.ConfigurationProvider).ToListAsync()
                };

            }
            catch (Exception e)
            {

                throw;
            }
        }
    }
}

