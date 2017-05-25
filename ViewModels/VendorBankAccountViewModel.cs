using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Newtonsoft.Json;

namespace GUSLibrary.ViewModels
{
    [JsonObject(MemberSerialization.OptOut)]
    public class VendorBankAccountViewModel
    {
        #region Constructor
        public VendorBankAccountViewModel()
        {

        }
        #endregion Constructor

        #region Properties
        public Guid? Id { get; set; }
        public DateTime? DateCreated { get; set; }
        public DateTime? DateModified { get; set; }
        public bool IsActive { get; set; }

        public Guid? VendorId { get; set; }

        public string AccountNumber { get; set; }
        public string BankName { get; set; }
        public string IBAN { get; set; }
        public string BICSwiftCode { get; set; }
        public string Currency { get; set; }
        public string Country { get; set; }
        #endregion Properties
    }
}
