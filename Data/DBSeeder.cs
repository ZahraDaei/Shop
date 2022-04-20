using Microsoft.EntityFrameworkCore;
using Store.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Store.Data
{
    public class DBSeeder
    {
        public static void Seed(ApplicationDbContext context)
        {
            // context.Database.EnsureCreated() does not use migrations to create the database and therefore the database that is created cannot be later updated using migrations 
            // use context.Database.Migrate() instead
            context.Database.Migrate();

            if (context.Categories.Any())
            {
                return;
            }

            // insert dummy data
            context.AddRange(GetDummyCategoryList());
            context.SaveChanges();
        }


        public static List<Category> GetDummyCategoryList()
        {
            var Categories = new List<Category> {

             new Category(){
    ParentId= 0,
    Name= "fashion",
    FarsiName= "مد و پوشاک",
    Image= "images/sweatshirt.jpg",
  },
  new Category(){
    ParentId= 1,
    Name= "men",
    FarsiName= "مردانه",
    Image= "images/sweatshirt.jpg",
  },
  new Category(){
    ParentId= 1,
    Name= "women",
    FarsiName= "زنانه",
    Image= "images/sweatshirt.jpg",
  },
  new Category(){
    ParentId= 1,
    Name= "kids",
    FarsiName= "بچه گانه",
    Image= "images/sweatshirt.jpg",
  },
  new Category(){
    ParentId= 2,
    Name= "men-pants",
    FarsiName= "شلوار",
    Image= "images/pant.jpg",
  },
  new Category(){
    ParentId= 5,
    Name= "men-pants-casual",
    FarsiName= "شلوار راحتی",
    Image= "images/pant.jpg",
  },
  new Category(){
    ParentId= 5,
    Name= "men-pants-cotton",
    FarsiName= "شلوار کتان",
    Image= "images/pant.jpg",
  },
  new Category(){
    ParentId= 10,
    Name= "men-socks",
    FarsiName= "جوراب",
    Image= "images/socks.jpg",
  },
  new Category(){
    ParentId= 21,
    Name= "men-socks-nakhi",
    FarsiName= "جوراب نخی",
    Image= "images/socks.jpg",
  },
  new Category(){
    ParentId= 21,
    Name= "men-socks-tarhdar",
    FarsiName= "جوراب طرح دار",
    Image= "images/socks.jpg",
  },
  new Category(){
    ParentId= 10,
    Name= "men-shoes",
    FarsiName= "کفش",
    Image= "images/shoes.jpg",
  },
  new Category(){
    ParentId= 22,
    Name= "men-shoes-sport",
    FarsiName= "کفش ورزشی",
    Image= "images/shoes.jpg",
  },
  new Category(){
    ParentId= 22,
    Name= "men-shoes-edari",
    FarsiName= "کفش اداری",
    Image= "images/shoes.jpg",
  },
  new Category(){
    ParentId= 10,
    Name= "men-sweatshirt",
    FarsiName= "گرم کن",
    Image= "images/sweatshirt.jpg",
  },
  new Category(){
    ParentId= 11,
    Name= "women-manto",
    FarsiName= "مانتو",
    Image= "images/sweatshirt.jpg",
  },
  new Category(){
    ParentId= 24,
    Name= "women-manto-sonati",
    FarsiName= "مانتو سنتی",
    Image= "images/sweatshirt.jpg",
  },
  new Category(){
    ParentId= 24,
    Name= "women-manto-majlesi",
    FarsiName= "مانتو مجلسی",
    Image= "images/sweatshirt.jpg",
  },
  new Category(){
    ParentId= 24,
    Name= "women-manto-sport",
    FarsiName= "مانتو ورزشی",
    Image= "images/sweatshirt.jpg",
  },
  new Category(){
    ParentId= 11,
    Name= "women-shoes",
    FarsiName= "کفش",
    Image= "images/sweatshirt.jpg",
  },
  new Category(){
    ParentId= 25,
    Name= "women-high-heels",
    FarsiName= "کفش پاشنه بلند",
    Image= "images/sweatshirt.jpg",
  },
  new Category(){
    ParentId= 25,
    Name= "women-flat-shoes",
    FarsiName= "کفش راحتی",
    Image= "images/sweatshirt.jpg",
  },
  new Category(){
    ParentId= 11,
    Name= "women-scarf",
    FarsiName= "روسری",
    Image= "images/sweatshirt.jpg",
  },
  new Category(){
    ParentId= 11,
    Name= "women-skirt",
    FarsiName= "دامن",
    Image= "images/sweatshirt.jpg",
  },
  new Category(){
    ParentId= 27,
    Name= "women-skirt-monokrom",
    FarsiName= "دامن ساده",
    Image= "images/sweatshirt.jpg",
  },
  new Category(){
    ParentId= 27,
    Name= "women-skirt-colorful",
    FarsiName= "دامن طرح دار",
    Image= "images/sweatshirt.jpg",
  },
  new Category(){
    ParentId= 12,
    Name= "kids-kapshen",
    FarsiName= "کاپشن",
    Image= "images/sweatshirt.jpg",
  },
  new Category(){
    ParentId= 12,
    Name= "kids-sport-set",
    FarsiName= "لباس ورزشی",
    Image= "images/sweatshirt.jpg",
  },
  new Category(){
    ParentId= 12,
    Name= "kids-socks",
    FarsiName= "جوراب",
    Image= "images/sweatshirt.jpg",
  },
  new Category(){
    ParentId= 12,
    Name= "kids-shirt",
    FarsiName= "بلوز",
    Image= "images/sweatshirt.jpg",
  },


        };

            return Categories;
        }
    }
}
