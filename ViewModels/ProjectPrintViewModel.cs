using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Newtonsoft.Json;

namespace GUSLibrary.ViewModels
{
    [JsonObject(MemberSerialization.OptOut)]
    public class ProjectPrintViewModel
    {
        #region Constructor
        public ProjectPrintViewModel()
        {

        }
        #endregion Constructor

        #region Properties
        public Guid Id { get; set; }
        public Nullable<DateTime> DateCreated { get; set; }
        public Nullable<DateTime> DateModified { get; set; }
        public Nullable<int> Version { get; set; }
        public Nullable<Guid> Application { get; set; }

        public Nullable<Guid> ProProjectId { get; set; }
        public Nullable<Guid> LibGraphicId { get; set; }
        public Nullable<Guid> LibBrandId { get; set; }
        public Nullable<Guid> LibDepartmentId { get; set; }
        public Nullable<Guid> LibDivisionId { get; set; }

        public string PrintCode { get; set; }
        public string BuyerCodeGraphic { get; set; }
        public string PrintType { get; set; }
        public string PrintCategory { get; set; }
        public string PrintProductName { get; set; }
        public string PrintDescription { get; set; }
        public string BrandName { get; set; }
        public string DepartmentName { get; set; }
        public string DivisionName { get; set; }
        public string ItemSize { get; set; }
        public string Supplier { get; set; }
        public string SupplierRefCode { get; set; }


        #endregion Properties
    }
}
