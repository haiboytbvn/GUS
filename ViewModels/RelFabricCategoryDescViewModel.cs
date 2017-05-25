using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Newtonsoft.Json;

namespace GUSLibrary.ViewModels
{
    [JsonObject(MemberSerialization.OptOut)]
    public class RelFabricCategoryDescViewModel
    {
        #region Constructor
        public RelFabricCategoryDescViewModel()
        {

        }
        #endregion Constructor

        #region Properties
        public Guid? CompanyId { get; set; }
        public Guid? CategoryId { get; set; }
        public Guid? DescId { get; set; }
        #endregion Properties
    }
}
