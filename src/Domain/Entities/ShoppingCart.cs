using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Shop.Domain.Entities
{
    public class ShoppingCart
    {
        public long Id { get; set; }
        public long ReferenceId { get; set; }
        //public DeliveryDate DeliveryDate { get; set; }
        //public long DeliveryDateId { get; set; }
        public decimal Total { get; set; }
        public Address Address{ get; set; }
        public long AddressId { get; set; }
        public ICollection<CartProduct> CartProducts { get; set; }

    }
}
