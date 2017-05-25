using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace GUSLibrary.Data
{
    public class ProEmbroidery
    {
        #region Constructor
        public ProEmbroidery()
        {
        }
        #endregion Constructor
        #region Properties
        [Key]
        [Required]
        public Nullable<Guid> Id { get; set; }
        public Nullable<DateTime> DateCreated { get; set; }
        public Nullable<DateTime> DateModified { get; set; }
        public Nullable<int> Version { get; set; }
        
        public Nullable<Guid> LibGraphicId { get; set; }
        public Nullable<Guid> ProProjectId { get; set; }
        public Nullable<Guid> LibBrandId { get; set; }
        public Nullable<Guid> LibDepartmentId { get; set; }
        public Nullable<Guid> LibDivisionId { get; set; }

        public string EmbroideryCode { get; set; }
        public string BuyerEmbroideryCode { get; set; }
        public string EmbroideryType { get; set; }
        public string EmbroideryCategory { get; set; }
        public string EmbroideryProductName { get; set; }
        public string EmbroideryDescription { get; set; }
        public string BrandName { get; set; }
        public string DepartmentName { get; set; }
        public string DivisionName { get; set; }
        public string ItemSize { get; set; }
        public Nullable<Guid> Application { get; set; }
        
        #endregion Properties

        #region Related Properties
        [ForeignKey("ProProjectId")]
        public virtual ProProject ProProjectItem { get; set; }

        //[ForeignKey("LibEmbroideryId")]
        //public virtual LibEmbroidery LibEmbroideryItem { get; set; }
        #endregion Related Properties
    }
}
