using AutoMapper;
using AutoMapper.QueryableExtensions;
using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
using Store.Common.Interfaces;
using Store.Models;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace Store.Application.Categories.Queries.GetCategory
{
    public class GetCategoryListQuery : IRequest<CategoryVm>
    {
    }

    public class GetCategoryListQueryHandler : IRequestHandler<GetCategoryListQuery, CategoryVm>
    {
        private readonly IApplicationDbContext _context;
        private readonly IMapper _mapper;

        public GetCategoryListQueryHandler(IApplicationDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task<CategoryVm> Handle(GetCategoryListQuery request, CancellationToken cancellationToken)
        {
            try
            {
                var categoriesObj = await _context.Categories.OrderBy(x => x.Id)
                                .ProjectTo<CategoryDto>(_mapper.ConfigurationProvider).ToListAsync();

                return new CategoryVm() { CategoryDto = categoriesObj };
            }
            catch (Exception e)
            {

                throw;
            }
           
        }

   

    }
}

