using IdentityServer4.EntityFramework.Options;
using Microsoft.AspNetCore.ApiAuthorization.IdentityServer;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using Store.Common.Interfaces;
using Store.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Store.Data
{
    public class ApplicationDbContext : ApiAuthorizationDbContext<ApplicationUser>, IApplicationDbContext
    {
        public ApplicationDbContext(
            DbContextOptions options,
            IOptions<OperationalStoreOptions> operationalStoreOptions) : base(options, operationalStoreOptions)
        {
          
    }
        public DbSet<Product> Products { get; set; }
        public DbSet<Category> Categories { get; set; }
        public DbSet<Address> Addresses { get; set; }
        public DbSet<CartProduct> CartProducts { get; set; }
        public DbSet<DeliveryDate> DeliveryDates { get; set; }
        public DbSet<ShoppingCart> ShoppingCarts { get; set; }
        public DbSet<Specification> Specifications { get; set; }
        public DbSet<ProductCategory> ProductCategories { get; set; }
        public DbSet<ProductSpecification> ProductSpecifications { get; set; }
        #region 
        //protected override void OnModelCreating(ModelBuilder modelBuilder)
        //{
        //    modelBuilder.Entity<Category>().HasData(new Category { Id=1,FarsiName= "مد و پوشاک",Name= "fashion",Image= "sweatshirt.jpg",ParentId=0});
        //    modelBuilder.Entity<Category>().HasData(new Category { Id=10,FarsiName= "مردانه",Name= "men",Image= "sweatshirt.jpg",ParentId=1});
        //    }
        #endregion
    }
}
