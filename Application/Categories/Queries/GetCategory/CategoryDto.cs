using Store.Application.Common.Mappings;
using Store.Models;
using System.Collections.Generic;

namespace Store.Application.Categories.Queries.GetCategory
{
    public class CategoryDto:IMapFrom<Category>
    {
        public long Id { get; set; }
        public string Name { get; set; }
        public string FarsiName { get; set; }
        public string Image { get; set; }
        public byte[] Content { get; set; }
        public long? ParentId { get; set; }

    }
}
