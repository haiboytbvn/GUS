using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace GUSLibrary.Data
{
    public class ProProject
    {
        #region Constructor
        public ProProject()
        {
        }
        #endregion Constructor
        #region Properties
        [Key]
        [Required]
        public Guid Id { get; set; }
        public DateTime DateCreated { get; set; }
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

        #region Related Properties
        public virtual List<ProColor> ProColorItem { get; set; }
        public virtual List<ProFabric> ProFabricItem { get; set; }
        public virtual List<ProAccessory> ProAccessoryItem { get; set; }
        public virtual List<ProPrint> ProPrintItem { get; set; }
        public virtual List<ProEmbroidery> ProEmbroideryItem { get; set; }
        public virtual List<ProWash> ProWashItem { get; set; }

        [ForeignKey("LibProductTypeId")]
        public virtual LibProductType ProductTypeItem { get; set; }
        [ForeignKey("LibSeasonId")]
        public virtual LibSeason LibSeasonItem { get; set; }
        [ForeignKey("LibDepartmentId")]
        public virtual LibDepartment LibDepartmentItem { get; set; }
        [ForeignKey("LibDivisionId")]
        public virtual LibDivision LibDivisionItem { get; set; }
        [ForeignKey("LibBrandId")]
        public virtual LibBrand LibBrandItem { get; set; }
        #endregion Related Properties
    }
}
