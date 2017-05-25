using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GUSLibrary.ViewModels
{
    [JsonObject(MemberSerialization.OptOut)]
    public class TrainingAndTrainingItemViewModel
    {
        #region Constructor
        public TrainingAndTrainingItemViewModel()
        {

        }
        #endregion Constructor

        #region Properties
        public Guid? Id { get; set; }
        public DateTime? DateCreated { get; set; }
        public DateTime? DateModified { get; set; }
        public bool IsActive { get; set; }
        public int Version { get; set; }
        public bool IsLatest { get; set; }
        public bool IsDeleted { get; set; }

        Guid TrainingId { get; set; }
        Guid TrainingItemId { get; set; }
        #endregion
    }
}
