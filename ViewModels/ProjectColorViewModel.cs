using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Newtonsoft.Json;

namespace GUSLibrary.ViewModels
{
    [JsonObject(MemberSerialization.OptOut)]
    public class ProjectColorViewModel
    {
        #region Constructor
        public ProjectColorViewModel()
        {
            
        }
        #endregion Constructor

        #region Properties
        public Nullable<Guid> Id { get; set; }
        public Nullable<DateTime> DateCreated { get; set; }
        public Nullable<DateTime> DateModified { get; set; }
        public Nullable<Guid> ProProjectId { get; set; }
        public Nullable<Guid> LibColorId { get; set; }
        public Nullable<Guid> LibDivisionId { get; set; }
        public Nullable<Guid> LibBrandId { get; set; }
        public Nullable<Guid> LibDepartmentId { get; set; }
        public Nullable<Guid> LibYearId { get; set; }
        public Nullable<Guid> LibSeasonId { get; set; }
        public Nullable<int> Version { get; set; }


        public string ColorCode { get; set; }
        public string BrandName { get; set; }
        public string DepartmentName { get; set; }
        public string DivisionName { get; set; }
        public string SeasonName { get; set; } //=>
        public string YearName { get; set; } //=>
        public string ColorName { get; set; }
        public string BuyerColorCode { get; set; }

        #endregion Properties
    }
}
