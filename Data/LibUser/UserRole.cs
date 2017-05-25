using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GUSLibrary.Data
{
    public class UserRole : IdentityRole
    {
        #region Constructor
        public UserRole()
        {
        }
        public UserRole(string roleName)
        {
            Name = roleName;
            DateCreated = DateTime.Now;
            DateModified = DateTime.Now;
            IsActive = true;
        }
        #endregion Constructor

        #region Properties
        public DateTime DateCreated { get; set; }
        public DateTime DateModified { get; set; }
        public bool IsActive { get; set; }
        #endregion
    }
}
