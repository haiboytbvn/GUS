using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using System;
using System.ComponentModel.DataAnnotations;

namespace GUSLibrary.Data.LibVendor
{
    public class VendorContact
    {
        #region Constructor
        public VendorContact()
        {
        }
        #endregion Constructor

        #region Properties
        public Guid Id { get; set; }
        public DateTime DateCreated { get; set; }
        public DateTime DateModified { get; set; }
        public bool IsActive { get; set; }
        public Guid VendorId { get; set; }

        public string Roles { get; set; }
        public string Name { get; set; }
        public string Function { get; set; }
        public string Email { get; set; }
        public string OfficeNo { get; set; }
        public string Mobile { get; set; }
        public string Fax { get; set; }
        public string SkypeId { get; set; }
        #endregion Properties
    }
}
