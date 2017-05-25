using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Newtonsoft.Json;

namespace GUSLibrary.ViewModels
{
    [JsonObject(MemberSerialization.OptOut)]
    public class SearchGeneralFilterViewModel
    {
        #region Constructor
        public SearchGeneralFilterViewModel()
        {

        }
        #endregion Constructor

        #region Properties
        public string Name { get; set; }
        public string Code { get; set; }
        public string BuyerCode { get; set; }
        public Guid? CompanyId { get; set; }
        public Pagination Paging { get; set; }
        #endregion Properties
    }
}
