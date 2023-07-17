using AutoMapper;
using AutoMapper.QueryableExtensions;
using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
using Shop.Application.Common.Interfaces;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace Shop.Application.Categories.Queries.GetCategory
{
    public class GetCategoryByIdQuery : IRequest<CategoryDto>
    {
        public long CategoryId { get; set; }
    }

    public class GetCategoryByIdQueryHandler : IRequestHandler<GetCategoryByIdQuery, CategoryDto>
    {
        private readonly IApplicationDbContext _context;
        private readonly IMapper _mapper;

        public GetCategoryByIdQueryHandler(IApplicationDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task<CategoryDto> Handle(GetCategoryByIdQuery request, CancellationToken cancellationToken)
        {
            try
            {

               var categoryDto = await _context.Categories.Where(c=>c.Id==request.CategoryId)
                            .ProjectTo<CategoryDto>(_mapper.ConfigurationProvider).FirstOrDefaultAsync();
               

              
                return categoryDto;
            }
            catch (Exception e)
            {

                throw;
            }
           
        }

   

    }
}

