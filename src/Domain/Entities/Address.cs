using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Shop.Domain.Entities
{
    public class Address
    {
        public long Id { get; set; }
        public string City { get; set; }
        public string AddressDetail { get; set; }
        public string Number { get; set; }
        public string ApplicationUserId { get; set; }
        public ICollection<ShoppingCart> ShoppingCarts { get; set; }
    }
}
