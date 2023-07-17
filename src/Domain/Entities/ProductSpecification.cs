using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Shop.Domain.Entities
{
    public class ProductSpecification
    {
        public long Id { get; set; }
        public long SpecificationId { get; set; }
        //public Specification Specification { get; set; }
        public long ProductId { get; set; }
        public Product Product { get; set; }
        public string SpecificationValue { get; set; }
    }
}
