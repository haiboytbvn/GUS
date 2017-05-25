using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Newtonsoft.Json;

namespace GUSLibrary.ViewModels
{
    [JsonObject(MemberSerialization.OptOut)]
    public class ApplicationUserViewModel
    {
        #region Constructor
        public ApplicationUserViewModel()
        {

        }
        #endregion Constructor

        #region Properties
        public Guid? Id { get; set; }
        public DateTime? LastAccess { get; set; }
        public DateTime? DateCreated { get; set; }
        public DateTime? DateModified { get; set; }
        public bool IsActive { get; set; }

        public string UserName { get; set; }
        public string Email { get; set; }
        public string UserCode { get; set; }
        public string Slug { get; set; }
        public Guid? CompanyId { get; set; }
        public Guid? RoleId { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        #endregion Properties
    }
}
