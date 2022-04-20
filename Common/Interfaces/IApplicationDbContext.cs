using Microsoft.EntityFrameworkCore;
using Store.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace Store.Common.Interfaces
{
    public interface IApplicationDbContext
    {
         DbSet<Product> Products { get; set; }
         DbSet<Specification> Specifications { get; set; }
         DbSet<ProductCategory> ProductCategories { get; set; }
         DbSet<ProductSpecification> ProductSpecifications { get; set; }
         DbSet<Category> Categories { get; set; }
         DbSet<Address> Addresses { get; set; }
         DbSet<CartProduct> CartProducts { get; set; }
         DbSet<DeliveryDate> DeliveryDates { get; set; }
         DbSet<ShoppingCart> ShoppingCarts { get; set; }
        Task<int> SaveChangesAsync(CancellationToken cancellationToken);

    }
}
