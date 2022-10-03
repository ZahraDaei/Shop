using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Shop.Application.Products.Commands.CreateProduct
{
    public class ProductSpecificationKeyValue
    {
        [JsonProperty("id")]
        public long Id { get; set; }
        [JsonProperty("value")]
        public string Value { get; set; }
    }
}
