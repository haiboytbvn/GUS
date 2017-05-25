using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace GUSLibrary.Data
{
    public class ProWash
    {
        #region Constructor
        public ProWash()
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

        public Nullable<Guid> ProProjectId { get; set; }
        public Nullable<Guid> LibWashId { get; set; }
        public Nullable<Guid> LibLibWashDescId { get; set; }
        public Nullable<Guid> LibLibWashCategoryId { get; set; }
        public Nullable<Guid> LibBrandId { get; set; }
        public Nullable<Guid> LibDepartmentId { get; set; }
        public Nullable<Guid> LibDivisionId { get; set; }
        
        public string WashCode { get; set; }
        public string BuyerWashCode { get; set; }
        public string WashType { get; set; }
        public string WashCategory { get; set; }
        public string WashProductName { get; set; }
        public string Description { get; set; }
        public string BrandName { get; set; }
        public string DepartmentName { get; set; }
        public string DivisionName { get; set; }
        public string Receipe { get; set; }
        public string Supplier { get; set; }
        public string SupplierRefCode { get; set; }
        #endregion Properties

        #region Related Properties
        [ForeignKey("ProProjectId")]
        public virtual ProProject ProProjectItem { get; set; }

        [ForeignKey("LibWashId")]
        public virtual LibWash LibWashItem { get; set; }
        #endregion Related Properties
    }
}
