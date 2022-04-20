using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace Store.Models
{
    public class ApplicationUser : IdentityUser
    {
        public string IdCode { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Sheba { get; set; }
        [ForeignKey("ApplicationUserId")]
        public ICollection<Address> Addresses { get; set; }
    }
}
