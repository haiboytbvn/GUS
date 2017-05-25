using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using System;
using System.ComponentModel.DataAnnotations;

namespace GUSLibrary.Data.LibVendor
{
    public class VendorProduct
    {
        #region Constructor
        public VendorProduct()
        {
        }
        #endregion Constructor

        #region Properties
        public Guid Id { get; set; }
        public DateTime DateCreated { get; set; }
        public DateTime DateModified { get; set; }
        public bool IsActive { get; set; }
        public Guid VendorId { get; set; }

        public string Name { get; set; }
        public string City { get; set; }
        public string Country { get; set; }
        public string ProductionStatus { get; set; }
        public string ProductionUnitStatus { get; set; }
        public string Category { get; set; }
        #endregion Properties
    }
}
