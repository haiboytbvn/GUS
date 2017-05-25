using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Newtonsoft.Json;

namespace GUSLibrary.ViewModels
{
    [JsonObject(MemberSerialization.OptOut)]
    public class ProjectCollaboratorViewModel
    {
        #region Constructor
        public ProjectCollaboratorViewModel()
        {

        }
        #endregion Constructor

        #region Properties
        public Guid Id { get; set; }
        public Nullable<DateTime> DateCreated { get; set; }
        public Nullable<DateTime> DateModified { get; set; }
        public Nullable<Guid> ProjectId { get; set; }
        public Nullable<Guid> UserId { get; set; }
        public string Name { get; set; }
        public string Role { get; set; }
        public string Email { get; set; }
        
        
        #endregion Properties
    }
}
