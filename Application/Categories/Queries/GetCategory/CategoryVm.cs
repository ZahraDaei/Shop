using Store.ModelDTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Store.Application.Categories.Queries.GetCategory
{
    public class CategoryVm
    {
        public IEnumerable<CategoryDto> CategoryDto { get; set; }
    }
}
