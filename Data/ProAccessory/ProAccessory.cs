using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace GUSLibrary.Data
{
    public class ProAccessory
    {
        #region Constructor
        public ProAccessory()
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
        public Nullable<Guid> Application { get; set; }

        public Nullable<Guid> ProProjectId { get; set; }
        public Nullable<Guid> LibAccessoryId { get; set; }
        public Nullable<Guid> LibLibAccessoryCategoryId { get; set; }
        public Nullable<Guid> LibLibAccessoryDescId { get; set; }
        public Nullable<Guid> LibLibAccessoryTypeId { get; set; }
        public Nullable<Guid> LibBrandId { get; set; }
        public Nullable<Guid> LibDepartmentId { get; set; }
        public Nullable<Guid> LibDivisionId { get; set; }
        
        public string AccessoriesCode  { get; set; }
        public string BuyerCodeAccessory { get; set; }
        public string AccTypeTextAccessory { get; set; }
        public string AccCategoryTextAccessory { get; set; }
        public string ProductName { get; set; }
        public string AccDescTextAccessory { get; set; }
        public string ItemSizeAccessory { get; set; }
        public string SupplierAccessory { get; set; }
        public string BrandName { get; set; }
        public string DepartmentName { get; set; }
        public string DivisionName { get; set; }
        public string SupplierRefCode { get; set; }
        public string Supplier { get; set; }
        #endregion Properties

        #region Related Properties
        [ForeignKey("ProProjectId")]
        public virtual ProProject ProProjectItem { get; set; }

        [ForeignKey("LibAccessoryId")]
        public virtual LibAccessory LibAccessoryItem { get; set; }
        #endregion Related Properties
    }
}
