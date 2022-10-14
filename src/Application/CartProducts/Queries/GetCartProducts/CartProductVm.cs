using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Shop.Application.CartProducts.Queries.GetCartProducts
{
    public class CartProductVm
    {
        public ICollection<CartProductDto> CartProductDtos { get; set; }
    }
}
