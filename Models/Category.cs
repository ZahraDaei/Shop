using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace Store.Models
{
    public class Category
    {
        public long Id { get; set; }
        public string Name { get; set; }
        public string FarsiName { get; set; }
        public string Image { get; set; }
        public byte[] Content { get; set; }
        public long ParentId { get; set; }
        public ICollection<ProductCategory> ProductCategories { get; set; }
        public ICollection<Specification> Specifications { get; set; }
    }
}
