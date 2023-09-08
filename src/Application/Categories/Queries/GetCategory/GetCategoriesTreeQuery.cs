using AutoMapper;
using AutoMapper.QueryableExtensions;
using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
using Shop.Application.Common.Interfaces;
using Shop.Application.Common.Models;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace Shop.Application.Categories.Queries.GetCategory
{
    public class GetCategoriesTreeQuery : IRequest<IEnumerable<TreeItem<CategoryDto>>>
    {
    }

    public class GetCategoryListQueryHandler : IRequestHandler<GetCategoriesTreeQuery, IEnumerable<TreeItem<CategoryDto>>>
    {
        private readonly IApplicationDbContext _context;
        private readonly IMapper _mapper;

        public GetCategoryListQueryHandler(IApplicationDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task<IEnumerable<TreeItem<CategoryDto>>> Handle(GetCategoriesTreeQuery request, CancellationToken cancellationToken)
        {
            try
            {

                var categoriesObj = await _context.Categories.OrderBy(x => x.Id)
                              .ProjectTo<CategoryDto>(_mapper.ConfigurationProvider).ToListAsync();
                var root = categoriesObj.GenerateTree(c => c.Id, c => c.ParentId,0);

                //var catRoot = new RootCategory() {
                //    Id = "root",
                //    FarsiName= "دسته بندی"
                //};
                //var cat = new CategoryVm()
                //{
                //    Children = root,
                //    Item=catRoot
                //};
                    
                    return root;
            }
            catch (Exception e)
            {

                throw;
            }
        }
        static void Test(IEnumerable<TreeItem<CategoryDto>> categories, int deep = 0)
        {
            foreach (var c in categories)
            {
                Console.WriteLine(new String('\t', deep) + c.Item.Name);
                Test(c.Children, deep + 1);
            }
        }
    }
}

