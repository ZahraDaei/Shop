using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Shop.Domain.Entities
{
    public class ProductCategory
    {
        public long Id { get; set; }
        public long ProductId { get; set; }
        public long CategoryId { get; set; }
        public Product Product { get; set; }
        public Category Category { get; set; }
    }
}
