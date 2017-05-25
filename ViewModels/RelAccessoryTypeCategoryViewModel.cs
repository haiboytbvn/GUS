using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Newtonsoft.Json;

namespace GUSLibrary.ViewModels
{
    [JsonObject(MemberSerialization.OptOut)]
    public class RelAccessoryTypeCategoryViewModel
    {
        #region Constructor
        public RelAccessoryTypeCategoryViewModel()
        {

        }
        #endregion Constructor

        #region Properties
        public Guid? CompanyId { get; set; }
        public Guid? TypeId { get; set; }
        public Guid? CategoryId { get; set; }
        #endregion Properties
    }
}
