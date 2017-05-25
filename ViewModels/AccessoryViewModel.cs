using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Newtonsoft.Json;

namespace GUSLibrary.ViewModels
{
    [JsonObject(MemberSerialization.OptOut)]
    public class AccessoryViewModel
    {
        #region Constructor
        public AccessoryViewModel()
        {

        }
        #endregion Constructor

        #region Properties
        public Guid? Id { get; set; }
        public DateTime? DateCreated { get; set; }
        public DateTime? DateModified { get; set; }
        public bool IsActive { get; set; }
        public Guid? CompanyId { get; set; }
        public string Name { get; set; }
        public string Code { get; set; }
        public string BuyerCode { get; set; }
        public string Slug { get; set; }
        public int Version { get; set; }
        public bool IsLatest { get; set; }
        public bool IsDeleted { get; set; }

        public Guid? AccType { get; set; }
        public Guid? AccCategory { get; set; }
        public Guid? AccProductName { get; set; }
        public string Description { get; set; }
        public Guid? Brand { get; set; }
        public Guid? Department { get; set; }
        public Guid? Division { get; set; }
        public string ItemSize { get; set; }
        public Guid? Color { get; set; }
        public Guid? Application { get; set; }
        public string Supplier { get; set; }
        public string SupplierCode { get; set; }
        public string Image { get; set; }
        public string Remark { get; set; }
        public List<string> Images { get; set; } 
        #endregion Properties
    }
}
