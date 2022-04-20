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
    public class GetCategoriesTreeQuery : IRequest<string>
    {
    }

    public class GetCategoriesQueryHandler : IRequestHandler<GetCategoriesTreeQuery, string>
    {
        private readonly IApplicationDbContext _context;
        private readonly IMapper _mapper;

        public GetCategoriesQueryHandler(IApplicationDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task<string> Handle(GetCategoriesTreeQuery request, CancellationToken cancellationToken)
        {
            try
            {
                var categoriesObj = await _context.Categories.OrderBy(x => x.Id)
                                .ProjectTo<CategoryDto>(_mapper.ConfigurationProvider).ToListAsync();
                var categories = await _context.Categories.OrderBy(x => x.Id)
                                .ProjectTo<CategoryTreeDto>(_mapper.ConfigurationProvider).ToListAsync();

                var categoryObject = RawCollectionToTree(categories);

                string json = JsonConvert.SerializeObject(categoryObject, Formatting.Indented,
                    new JsonSerializerSettings
                    {
                        ReferenceLoopHandling = ReferenceLoopHandling.Ignore,
                        NullValueHandling = NullValueHandling.Ignore
                    });
                return json;
            }
            catch (Exception e)
            {

                throw;
            }
           
        }

   

        public IEnumerable<CategoryTreeDto> RawCollectionToTree(List<CategoryTreeDto> collection)
        {
            var treeDictionary = new Dictionary<long?, CategoryTreeDto>();

            collection.ForEach(x => treeDictionary.Add(x.Id,
                               new CategoryTreeDto {
                                   Id = x.Id,
                                   ParentId = x.ParentId,
                                   Name = x.Name ,
                                   FarsiName=x.FarsiName,
                               }));

            foreach (var item in treeDictionary.Values)
            {
                if (item.ParentId != 0)
                {
                    CategoryTreeDto proposedParent;

                    if (treeDictionary.TryGetValue(item.ParentId, out proposedParent))
                    {
                        item.Parent = proposedParent;

                        proposedParent.Children.Add(item);
                    }
                }

            }
            return treeDictionary.Values.Where(x => x.Parent == null);
        }
    }
}

