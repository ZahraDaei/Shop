using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Shop.Domain.Entities
{
    public class DeliveryDate
    {
        public long Id { get; set; }
        public String Day { get; set; }
        public string Time { get; set; }
        public int TotalCapacity { get; set; }
        public int UsedCapacity { get; set; }
        public ICollection<ShoppingCart> ShoppingCarts { get; set; }
    }
}
