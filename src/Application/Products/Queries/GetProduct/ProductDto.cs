using Shop.Application.Common.Mappings;
using Shop.Domain.Entities;

namespace Shop.ModelDTO
{
    public class ProductDto: IMapFrom<Product>
    {
        public long Id { get; set; }
        public string BrandName { get; set; }
        public string Description { get; set; }
        public string ShortDescription { get; set; }
        public string Name { get; set; }
        public string FarsiName { get; set; }
        public decimal Price { get; set; }
        public string Image { get; set; }
        public string CategoryName { get; set; }
        public long CategoryId { get; set; }
    }
}
