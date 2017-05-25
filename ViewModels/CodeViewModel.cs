using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Newtonsoft.Json;

namespace GUSLibrary.ViewModels
{
    [JsonObject(MemberSerialization.OptOut)]
    public class CodeViewModel
    {
        #region Constructor
        public CodeViewModel()
        {

        }
        #endregion Constructor

        #region Properties
        public Guid? Id { get; set; }
        public string LibType { get; set; }
        public int CodeNumber { get; set; }
        #endregion Properties
    }
}
