using Newtonsoft.Json;
using Store.Application.Common.Mappings;
using Store.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Store.Application.Categories.Queries.GetCategory
{
    public class CategoryTreeDto : IMapFrom<Category>
    {
       // [JsonProperty(PropertyName = "nodes")]
        public List<CategoryTreeDto> Children = new List<CategoryTreeDto>();

        //public bool ShouldSerializeChildren()
        //{
        //    return (Children.Count > 0);
        //}

        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public CategoryTreeDto Parent { get; set; }
        public long Id { get; set; }
        public long? ParentId { get; set; }

        //[JsonProperty(PropertyName = "text")]
        public string Name { get; set; }
        public string FarsiName { get; set; }
      //  public string Image { get; set; }
       // public byte[] Content { get; set; }
    }
}
