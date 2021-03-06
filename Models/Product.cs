using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Store.Models
{
    public class Product
    {
        public long Id { get; set; }
        public string BrandName { get; set; }
        public string Description { get; set; }
        public string ShortDescription { get; set; }
        public string Name { get; set; }
        public string FarsiName { get; set; }
        public decimal Price { get; set; }
        public string Image { get; set; }
        public ICollection<CartProduct> CartProducts { get; set; }
        public ICollection<ProductSpecification> ProductSpecifications { get; set; }
        public ICollection<ProductCategory> ProductCategories { get; set; }

    }
}
