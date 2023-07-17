using Shop.Application.Common.Mappings;
using Shop.Domain.Entities;
using System.Collections.Generic;

namespace Shop.Application.ProductCategories.Queries.GetProductCategory
{
    public class ProductCategoryDto 
    {
        public long ProductId { get; set; }
        public string BrandName { get; set; }
        public string Description { get; set; }
        public string ShortDescription { get; set; }
        public string Name { get; set; }
        public string FarsiName { get; set; }
        public decimal Price { get; set; }
        public string Image { get; set; }
        public long LastCategoryId { get; set; }
        public long CategoryId { get; set; }
        public string CategoryName { get; set; }
        public string CategoryFarsiName { get; set; }


    }
}