using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace GUSLibrary.Data
{
    public class ProColor
    {
        #region Constructor
        public ProColor()
        {
        }
        #endregion Constructor
        #region Properties
        [Key]
        [Required]
        public Nullable<Guid> Id { get; set; }
        public Nullable<DateTime> DateCreated { get; set; }
        public Nullable<DateTime> DateModified { get; set; }


        public Nullable<Guid> ProProjectId { get; set; }
        public Nullable<Guid> LibColorId { get; set; }
        public Nullable<Guid> LibDivisionId { get; set; }
        public Nullable<Guid> LibBrandId { get; set; }
        public Nullable<Guid> LibDepartmentId { get; set; }
        public Nullable<int> Version { get; set; }

        public string ColorCode { get; set; }
        public string BrandName { get; set; }
        public string DepartmentName { get; set; }
        public string DivisionName { get; set; }
        public string ColorName { get; set; }
        public string BuyerColorCode { get; set; }
        #endregion Properties

        #region Related Properties
        public virtual List<ProColorwayFabric> ProColorwayFabricItem { get; set; }
        public virtual List<ProColorwayAccessory> ProColorwayAccessoryItem { get; set; }
        public virtual List<ProColorwayPrint> ProColorwayPrintItem { get; set; }
        public virtual List<ProColorwayEmbroidery> ProColorwayEmbroideryItem { get; set; }

        [ForeignKey("ProProjectId")]
        public virtual ProProject ProProjectItem { get; set; }

        [ForeignKey("LibColorId")]
        public virtual LibColor LibColorItem { get; set; }
        #endregion Related Properties
    }
}
