using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using System;
using System.ComponentModel.DataAnnotations;

namespace GUSLibrary.Data
{
    public class Vendor : IdentityUser
    {
        #region Constructor
        public Vendor()
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


        public Guid Type { get; set; }
        public Guid ProductType { get; set; }


        //public string Name { get; set; }
        public string SearchName { get; set; }
        public string Address { get; set; }
        public string PostalCode { get; set; }
        public string City { get; set; }
        public string Country { get; set; }
        public string Tel { get; set; }
        public string Fax { get; set; }
        //public Guid Contact { get; set; }
        public string Homepage { get; set; }
        //public Guid Production { get; set; }
        //public Guid BankInfo { get; set; }
        public string PaymentTerm { get; set; }
        public string DeliveryTerm { get; set; }
        #endregion Properties
    }
}
