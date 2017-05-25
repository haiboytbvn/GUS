using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Newtonsoft.Json;

namespace GUSLibrary.ViewModels
{
    [JsonObject(MemberSerialization.OptOut)]
    public class VendorViewModel
    {
        #region Constructor
        public VendorViewModel()
        {

        }
        #endregion Constructor

        #region Properties
        public Guid? Id { get; set; }
        public DateTime? LastAccess { get; set; }
        public DateTime? DateCreated { get; set; }
        public DateTime? DateModified { get; set; }
        public bool IsActive { get; set; }

        public string UserName { get; set; }
        public string Email { get; set; }

        public string SearchName { get; set; }
        public string Address { get; set; }
        public string PostalCode { get; set; }
        public string City { get; set; }
        public string Country { get; set; }
        public string Tel { get; set; }
        public string Fax { get; set; }
        public string Homepage { get; set; }
        public string PaymentTerm { get; set; }
        public string DeliveryTerm { get; set; }

        public Guid? Type { get; set; }
        public Guid? ProductType { get; set; }
        #endregion Properties
    }
}
