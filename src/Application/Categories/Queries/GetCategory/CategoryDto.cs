using Shop.Application.Common.Mappings;
using Shop.Domain.Entities;
using System.Collections.Generic;

namespace Shop.Application.Categories.Queries.GetCategory
{
    public class CategoryDto : IMapFrom<Category>
    {
        public long Id { get; set; }
        public string Name { get; set; }
        public string FarsiName { get; set; }
        public string Image { get; set; }
        public byte[] Content { get; set; }
        public long? ParentId { get; set; }
        public ICollection<Specification> Specifications { get; set; }


    }
}
