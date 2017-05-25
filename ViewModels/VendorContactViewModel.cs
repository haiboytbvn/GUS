using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Newtonsoft.Json;

namespace GUSLibrary.ViewModels
{
    [JsonObject(MemberSerialization.OptOut)]
    public class VendorContactViewModel
    {
        #region Constructor
        public VendorContactViewModel()
        {

        }
        #endregion Constructor

        #region Properties
        public Guid? Id { get; set; }
        public DateTime? DateCreated { get; set; }
        public DateTime? DateModified { get; set; }
        public bool IsActive { get; set; }

        public Guid? VendorId { get; set; }

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
