using System.Collections.Generic;

namespace Shop.Application.Products.Queries.GetProductList
{
    public class ProductVm
    {
        public IEnumerable<ProductDto> ProductDtos { get; set; }
    }
}
