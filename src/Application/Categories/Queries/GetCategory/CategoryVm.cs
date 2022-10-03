using Shop.Application.Common.Models;
using Shop.ModelDTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Shop.Application.Categories.Queries.GetCategory
{
    public class CategoryVm
    {
        public IEnumerable<CategoryDto> CategoryDtos { get; set; }
    }
}
