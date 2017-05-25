using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Newtonsoft.Json;

namespace GUSLibrary.ViewModels
{
    [JsonObject(MemberSerialization.OptOut)]
    public class ProjectColorwayAccessoryViewModel
    {
        #region Constructor
        public ProjectColorwayAccessoryViewModel()
        {

        }
        #endregion Constructor

        #region Properties
        public Nullable<Guid> Id { get; set; }
        public Nullable<DateTime> DateCreated { get; set; }
        public Nullable<DateTime> DateModified { get; set; }
        public Nullable<Guid> ProProjectId { get; set; }
        public Nullable<Guid> ProColorId { get; set; }
        public Nullable<Guid> ProAccessoryId { get; set; }
        public Nullable<Guid> LibColorId { get; set; }
        public string ColorCode { get; set; }
        public Nullable<int> Version { get; set; }
        
        #endregion Properties
    }
}
