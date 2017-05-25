using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Newtonsoft.Json;


namespace GUSLibrary.ViewModels
{
    [JsonObject(MemberSerialization.OptOut)]
    public class ProjectImageGalleryViewModel
    {
        #region Constructor
        public ProjectImageGalleryViewModel()
        {

        }

        public ProjectImageGalleryViewModel(object DateCreated, object DateModified, string projectId, string userId, string fileName, string imageStatus)
        {
            ProjectId = new Guid(projectId);
            UserId = new Guid(userId);
            ImageStatus = imageStatus;
            FileName = fileName;
        }
        #endregion Constructor

        #region Properties
        public Nullable<Guid> Id { get; set; }
        public Nullable<DateTime> DateCreated { get; set; }
        public Nullable<DateTime> DateModified { get; set; }
        public Nullable<Guid> ProjectId { get; set; }
        public Nullable<Guid> UserId { get; set; }
        public string FileName { get; set; }
        public string ImageStatus { get; set; }
        
        #endregion Properties
    }
}
