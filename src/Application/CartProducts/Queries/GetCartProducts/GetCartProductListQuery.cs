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

namespace Shop.Application.CartProducts.Queries.GetCartProducts
{

    public class GetCartProductListQuery : IRequest<CartProductVm>
    {
    }

    public class GetCategoriesQueryHandler : IRequestHandler<GetCartProductListQuery, CartProductVm>
    {
        private readonly IApplicationDbContext _context;
        private readonly IMapper _mapper;

        public GetCategoriesQueryHandler(IApplicationDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task<CartProductVm> Handle(GetCartProductListQuery request, CancellationToken cancellationToken)
        {
            try
            {
                var cartProductVm = new CartProductVm()
                {
                    CartProductDtos = await _context.CartProducts.OrderBy(x => x.Id)
                            .ProjectTo<CartProductDto>(_mapper.ConfigurationProvider).ToListAsync()
                };


                return cartProductVm;
            }
            catch (Exception e)
            {

                throw;
            }
        }
    }
}

