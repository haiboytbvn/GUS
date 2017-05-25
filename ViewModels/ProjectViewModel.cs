using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Newtonsoft.Json;

namespace GUSLibrary.ViewModels
{
    [JsonObject(MemberSerialization.OptOut)]
    public class ProjectViewModel
    {
        #region Constructor
        public ProjectViewModel()
        {

        }
        #endregion Constructor

        #region Properties
        public Nullable<Guid> Id { get; set; }
        public Nullable<DateTime> DateCreated { get; set; }
        public Nullable<DateTime> DateModified { get; set; }
        public string Status { get; set; }
        public string ProjectNo { get; set; }
        public string Description { get; set; }
        public Nullable<DateTime> DesignDeadline { get; set; }
        public Nullable<DateTime> SourcingDeadline { get; set; }
        public Nullable<DateTime> ProductionDeadline { get; set; }
        public Nullable<DateTime> SampleDeadline { get; set; }
        public Nullable<DateTime> FloorDeliveryDeadline { get; set; }
        public string ImageUpload { get; set; }
        public Nullable<int> Version { get; set; }
        public Nullable<Guid> CopyID { get; set; }
        public Nullable<Guid> LibProductTypeId { get; set; }
        public Nullable<Guid> LibSeasonId { get; set; }
        public Nullable<Guid> LibDepartmentId { get; set; }
        public Nullable<Guid> LibDivisionId { get; set; }
        public Nullable<Guid> LibBrandId { get; set; }
        public Nullable<Guid> LibYearId { get; set; }
        public string ReadyStatusPro { get; set; }
        public string ReadyStatusProWash { get; set; }
        public string ReadyStatusProProjectViewing { get; set; }
        public string ReadyStatusProPrint { get; set; }
        public string ReadyStatusProImageGallery { get; set; }
        public string ReadyStatusProFabric { get; set; }
        public string ReadyStatusProEmbroidery { get; set; }
        public string ReadyStatusProColorwayPrint { get; set; }
        public string ReadyStatusProColorwayFabric { get; set; }
        public string ReadyStatusProColorwayEmbroidery { get; set; }
        public string ReadyStatusProColorwayAccessory { get; set; }
        public string ReadyStatusProColor { get; set; }
        public string ReadyStatusProCollaborator { get; set; }
        public string ReadyStatusProAccessory { get; set; }
        #endregion Properties
    }
}
