using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GUSLibrary.Data.User
{
    public class ApplicationUser : IdentityUser
    {
        #region Constructor
        public ApplicationUser()
        {
        }
        #endregion Constructor
        #region Properties
        //[Key]
        //[Required]
        //public string Id { get; set; }
        //[Required]
        //public string UserName { get; set; }
        //[Required]
        //public string Email { get; set; }

        [Required]
        public bool IsActive { get; set; }
        [Required]
        public DateTime LastAccess { get; set; }
        [Required]
        public DateTime DateCreated { get; set; }
        [Required]
        public DateTime DateModified { get; set; }

        public string UserCode { get; set; }
        public string Slug { get; set; }
        public int Version { get; set; }
        public Guid CompanyId { get; set; }

        public Guid RoleId { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        #endregion Properties
    }
}
