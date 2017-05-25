using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Newtonsoft.Json;

namespace GUSLibrary.ViewModels
{
    [JsonObject(MemberSerialization.OptOut)]
    public class ProjectEmbroideryViewModel
    {
        #region Constructor
        public ProjectEmbroideryViewModel()
        {

        }
        #endregion Constructor

        #region Properties
        public Nullable<Guid> Id { get; set; }
        public Nullable<DateTime> DateCreated { get; set; }
        public Nullable<DateTime> DateModified { get; set; }
        public Nullable<int> Version { get; set; }
        
        public Nullable<Guid> LibGraphicId { get; set; }
        public Nullable<Guid> ProProjectId { get; set; }
        public Nullable<Guid> LibBrandId { get; set; }
        public Nullable<Guid> LibDepartmentId { get; set; }
        public Nullable<Guid> LibDivisionId { get; set; }

        public string EmbroideryCode { get; set; }
        public string BuyerEmbroideryCode { get; set; }
        public string EmbroideryType { get; set; }
        public string EmbroideryCategory { get; set; }
        public string EmbroideryProductName { get; set; }
        public string EmbroideryDescription { get; set; }
        public string BrandName { get; set; }
        public string DepartmentName { get; set; }
        public string DivisionName { get; set; }
        public string ItemSize { get; set; }
        public Nullable<Guid> Application { get; set; }

        #endregion Properties
    }
}
