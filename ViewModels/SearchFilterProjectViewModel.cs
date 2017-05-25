using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Newtonsoft.Json;

namespace GUSLibrary.ViewModels
{
    [JsonObject(MemberSerialization.OptOut)]
    public class SearchFilterProjectViewModel
    {
        #region Constructor
        public SearchFilterProjectViewModel()
        {

        }
        #endregion Constructor

        #region Properties
        public Nullable<Guid> ProjectId { get; set; }
        public Nullable<Guid> DepartmentID { get; set; }
        public Nullable<Guid> ProductTypeID { get; set; }
        public Nullable<Guid> DivisionID { get; set; }
        public Nullable<Guid> BrandID { get; set; }
        public Nullable<Guid> SeasonID { get; set; }
        public Nullable<Guid> YearID { get; set; }
        public Nullable<Guid> StatusID { get; set; }
        public string Others { get; set; }
        #endregion Properties
    }
}
