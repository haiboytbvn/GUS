using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace GUSLibrary.Data
{
    public class ProPrint
    {
        #region Constructor
        public ProPrint()
        {
        }
        #endregion Constructor
        #region Properties
        [Key]
        [Required]
        public Guid Id { get; set; }
        public Nullable<DateTime> DateCreated { get; set; }
        public Nullable<DateTime> DateModified { get; set; }
        public Nullable<int> Version { get; set; }
        public Nullable<Guid> Application { get; set; }

        public Nullable<Guid> ProProjectId { get; set; }
        public Nullable<Guid> LibGraphicId { get; set; }
        public Nullable<Guid> LibBrandId { get; set; }
        public Nullable<Guid> LibDepartmentId { get; set; }
        public Nullable<Guid> LibDivisionId { get; set; }

        public string PrintCode { get; set; }
        public string BuyerCodeGraphic { get; set; }
        public string PrintType { get; set; }
        public string PrintCategory { get; set; }
        public string PrintProductName { get; set; }
        public string PrintDescription { get; set; }
        public string BrandName { get; set; }
        public string DepartmentName { get; set; }
        public string DivisionName { get; set; }
        public string ItemSize { get; set; }
        public string Supplier { get; set; }
        public string SupplierRefCode { get; set; }
        #endregion Properties

        #region Related Properties
        [ForeignKey("ProProjectId")]
        public virtual ProProject ProProjectItem { get; set; }

        //[ForeignKey("LibPrintId")]
        //public virtual LibPrint LibPrintItem { get; set; }
        #endregion Related Properties
    }
}
