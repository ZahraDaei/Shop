using Shop.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using System.Threading;
using System.Threading.Tasks;

namespace Shop.Application.Common.Interfaces
{
    public interface IApplicationDbContext
    {
        DbSet<TodoList> TodoLists { get; set; }

        DbSet<TodoItem> TodoItems { get; set; }

         DbSet<Product> Products { get; set; }
         DbSet<Category> Categories { get; set; }
         DbSet<Address> Addresses { get; set; }
         DbSet<CartProduct> CartProducts { get; set; }
         DbSet<DeliveryDate> DeliveryDates { get; set; }
         DbSet<ShoppingCart> ShoppingCarts { get; set; }
         DbSet<Specification> Specifications { get; set; }
         DbSet<ProductCategory> ProductCategories { get; set; }
         DbSet<ProductSpecification> ProductSpecifications { get; set; }

        Task<int> SaveChangesAsync(CancellationToken cancellationToken);
    }
}
