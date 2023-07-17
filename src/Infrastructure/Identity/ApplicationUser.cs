using Microsoft.AspNetCore.Identity;
using Shop.Domain.Entities;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace Shop.Infrastructure.Identity
{
    public class ApplicationUser : IdentityUser
    {
        public string FirstName  { get; set; }
        public string LastName { get; set; }

        [ForeignKey("ApplicationUserId")]
        public ICollection<Address> Addresses { get; set; }
    }
}
