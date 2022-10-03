using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Shop.Domain.Entities
{
    public class Specification
    {
        public long Id { get; set; }
        public string SpecificationKey { get; set; }
        public long CategoryId { get; set; }
        public Category Category { get; set; }
        public ICollection<ProductSpecification> ProductSpecifications { get; set; }
    }
}
