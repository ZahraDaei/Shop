using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Shop.Domain.Entities
{
    public class ProductImage
    {
        public long Id { get; set; }
        public string Name { get; set; }
        public Product Product { get; set; }
        public long ProductId { get; set; }
    }
}
