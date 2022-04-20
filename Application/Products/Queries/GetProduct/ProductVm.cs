using Store.ModelDTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Store.ModelVM
{
    public class ProductVm
    {
        public IEnumerable<ProductDto> ProductDtos { get; set; }
    }
}
