using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace GUSLibrary.Data
{
    public class ProColorwayEmbroidery
    {
        #region Constructor
        public ProColorwayEmbroidery()
        {
        }
        #endregion Constructor
        #region Properties
        [Key]
        [Required]
        public Guid Id { get; set; }
        public DateTime DateCreated { get; set; }
        public Nullable<DateTime> DateModified { get; set; }
        public Nullable<Guid> ProProjectId { get; set; }
        public Nullable<Guid> ProColorId { get; set; }
        public Nullable<Guid> ProEmbroideryId { get; set; }
        public Nullable<Guid> LibColorId { get; set; }
        public string ColorCode { get; set; }
        public Nullable<int> Version { get; set; }
        public Nullable<Guid> LibGraphic { get; set; }
        #endregion Properties

        #region Related Properties
        [ForeignKey("ProProjectId")]
        public virtual ProProject ProProjectItem { get; set; }
        //[ForeignKey("ProColorId")]
        //public virtual ProColor ProColorItem { get; set; }
        //[ForeignKey("ProEmbroideryId")]
        //public virtual ProEmbroidery ProEmbroideryItem { get; set; }
        [ForeignKey("LibColorId")]
        public virtual LibColor LibColorItem { get; set; }
        #endregion Related Properties
    }
}
