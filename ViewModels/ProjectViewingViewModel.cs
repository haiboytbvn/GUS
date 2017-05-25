using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Newtonsoft.Json;

namespace GUSLibrary.ViewModels
{
    [JsonObject(MemberSerialization.OptOut)]
    public class ProjectViewingViewModel
    {
        #region Constructor
        public ProjectViewingViewModel()
        {

        }
        #endregion Constructor

        #region Properties
        public Nullable<Guid> Id { get; set; }
        public DateTime DateCreated { get; set; }
        public Nullable<DateTime> DateModified { get; set; }
        public Nullable<Guid> ProjectId { get; set; }
        public Nullable<Guid> UserId { get; set; }
        
        #endregion Properties
    }
}
