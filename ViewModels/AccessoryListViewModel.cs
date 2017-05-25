using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Newtonsoft.Json;

namespace GUSLibrary.ViewModels
{
    [JsonObject(MemberSerialization.OptOut)]
    public class AccessoryListViewModel
    {
        public List<AccessoryListItemViewModel> Data;
        public Pagination Paging;
    }
}
