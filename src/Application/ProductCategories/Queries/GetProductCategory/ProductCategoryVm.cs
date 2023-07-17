using System.Collections.Generic;

namespace Shop.Application.ProductCategories.Queries.GetProductCategory
{
    public class ProductCategoryVm
    {
        public IEnumerable<ProductCategoryDto> ProductCategoryDtos { get; set; }
    }
}