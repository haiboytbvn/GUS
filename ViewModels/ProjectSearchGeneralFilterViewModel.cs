using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Newtonsoft.Json;

namespace GUSLibrary.ViewModels
{
    [JsonObject(MemberSerialization.OptOut)]
    public class ProjectSearchGeneralFilterViewModel
    {
        #region Constructor
        public ProjectSearchGeneralFilterViewModel()
        {

        }
        #endregion Constructor

        #region Properties
        public Nullable<Guid> ProjectId { get; set; }
        
        #endregion Properties
    }
}
