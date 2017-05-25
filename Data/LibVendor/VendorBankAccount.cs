using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using System;
using System.ComponentModel.DataAnnotations;

namespace GUSLibrary.Data.LibVendor
{
    public class VendorBankAccount
    {
        #region Constructor
        public VendorBankAccount()
        {
        }
        #endregion Constructor

        #region Properties
        public Guid Id { get; set; }
        public DateTime DateCreated { get; set; }
        public DateTime DateModified { get; set; }
        public bool IsActive { get; set; }
        public Guid VendorId { get; set; }

        public string AccountNumber { get; set; }
        public string BankName { get; set; }
        public string IBAN { get; set; }
        public string BICSwiftCode { get; set; }
        public string Currency { get; set; }
        public string Country { get; set; }
        #endregion Properties
    }
}
