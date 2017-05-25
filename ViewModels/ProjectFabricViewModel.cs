using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Newtonsoft.Json;

namespace GUSLibrary.ViewModels
{
    [JsonObject(MemberSerialization.OptOut)]
    public class ProjectFabricViewModel
    {
        #region Constructor
        public ProjectFabricViewModel()
        {

        }
        #endregion Constructor

        #region Properties
        public Nullable<Guid> Id { get; set; }
        public Nullable<DateTime> DateCreated { get; set; }
        public Nullable<DateTime> DateModified { get; set; }
        public Nullable<int> Version { get; set; }


        public Nullable<Guid> ProProjectId { get; set; }
        public Nullable<Guid> LibBrandId { get; set; }
        public Nullable<Guid> LibDepartmentId { get; set; }
        public Nullable<Guid> LibDivisionId { get; set; }
        public Nullable<Guid> LibYearId { get; set; }
        public Nullable<Guid> LibFabricId { get; set; }
        public Nullable<Guid> LibFabricsCategoryId { get; set; }
        public Nullable<Guid> LibFabricsDescId { get; set; }
        public Nullable<Guid> LibFabricsFibreContentId { get; set; }
        public Nullable<Guid> LibFabricsFinishingId { get; set; }
        public Nullable<Guid> LibFabricsYarnCountId { get; set; }
        public Nullable<Guid> LibProductTypeId { get; set; }

        public string FabricCode { get; set; }
        public string BuyerFabricCode { get; set; }
        public string FabricType { get; set; }
        public string FabricCategory { get; set; }
        public string ProductName { get; set; }
        public string Description { get; set; }
        public string BrandName { get; set; }
        public string DepartmentName { get; set; }
        public string DivisionName { get; set; }
        public string YarnCount { get; set; }
        public string FibreContent { get; set; }
        public string ProductType { get; set; }
        public string Finishing { get; set; }
        public Nullable<double> FabricWeight { get; set; }
        public Nullable<Guid> Application { get; set; }
        public string Supplier { get; set; }
        public string SupplierRefcCode { get; set; }
        public string ItemImage { get; set; }//=>

        #endregion Properties
    }
}
