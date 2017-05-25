using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Newtonsoft.Json;

namespace GUSLibrary.ViewModels
{
    [JsonObject(MemberSerialization.OptOut)]
    public class ShippingViewModel
    {
        #region Constructor
        public ShippingViewModel()
        {

        }
        #endregion Constructor

        #region Properties
        public Guid? Id { get; set; }
        public DateTime? DateCreated { get; set; }
        public DateTime? DateModified { get; set; }
        public bool IsActive { get; set; }
        public bool IsLatest { get; set; }
        public bool IsDeleted { get; set; }
        public int Version { get; set; }
        public Guid? CompanyId { get; set; }
        public string Name { get; set; }
        public string Code { get; set; }
        public string Slug { get; set; }
        public string BuyerCode { get; set; }
        public Guid? EndBuyer { get; set; }
        public Guid? Brand { get; set; }
        public Guid? Division { get; set; }
        public Guid? Department { get; set; }
        public Guid? ShippingType { get; set; }
        public string RegName { get; set; }
        public string SearchName { get; set; }
        public string Address { get; set; }
        public string PostalCode { get; set; }
        public string City { get; set; }
        public string Country { get; set; }
        public string Tel { get; set; }
        public string Fax { get; set; }
        public string Contact { get; set; }
        public string Email { get; set; }
        public string Image { get; set; }
        public string Remark { get; set; }
        #endregion Properties
    }
}
