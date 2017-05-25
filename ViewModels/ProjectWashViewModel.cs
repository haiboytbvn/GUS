using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Newtonsoft.Json;

namespace GUSLibrary.ViewModels
{
    [JsonObject(MemberSerialization.OptOut)]
    public class ProjectWashViewModel
    {
        #region Constructor
        public ProjectWashViewModel()
        {

        }
        #endregion Constructor

        #region Properties
        public Nullable<Guid> Id { get; set; }
        public Nullable<DateTime> DateCreated { get; set; }
        public Nullable<DateTime> DateModified { get; set; }
        public Nullable<int> Version { get; set; }

        public Nullable<Guid> ProProjectId { get; set; }
        public Nullable<Guid> LibWashId { get; set; }
        public Nullable<Guid> LibLibWashDescId { get; set; }
        public Nullable<Guid> LibLibWashCategoryId { get; set; }
        public Nullable<Guid> LibBrandId { get; set; }
        public Nullable<Guid> LibDepartmentId { get; set; }
        public Nullable<Guid> LibDivisionId { get; set; }
        
        public string WashCode { get; set; }
        public string BuyerWashCode { get; set; }
        public string WashType { get; set; }
        public string WashCategory { get; set; }
        public string WashProductName { get; set; }
        public string Description { get; set; }
        public string BrandName { get; set; }
        public string DepartmentName { get; set; }
        public string DivisionName { get; set; }
        public string Receipe { get; set; }
        public string Supplier { get; set; }
        public string SupplierRefCode { get; set; }

        #endregion Properties
    }
}
