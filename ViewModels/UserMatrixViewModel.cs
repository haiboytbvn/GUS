using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Newtonsoft.Json;

namespace GUSLibrary.ViewModels
{
    [JsonObject(MemberSerialization.OptOut)]
    public class UserMatrixViewModel
    {
        #region Constructor
        public UserMatrixViewModel()
        {

        }
        #endregion Constructor

        #region Properties
        public Guid? Id { get; set; }
        public DateTime? DateCreated { get; set; }
        public DateTime? DateModified { get; set; }
        public bool IsActive { get; set; }
        public string Name { get; set; }

        public Guid? MatrixId { get; set; }
        //public string PremissionName { get; set; }
        public string PremissionLevel { get; set; }
        #endregion Properties
    }
}
