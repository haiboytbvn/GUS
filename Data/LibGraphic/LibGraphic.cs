using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace GUSLibrary.Data
{
    public class LibGraphic
    {
        #region Constructor
        public LibGraphic()
        {
        }
        #endregion Constructor
        #region Properties
        [Key]
        [Required]
        public Guid Id { get; set; }
        public DateTime? DateCreated { get; set; }
        public DateTime? DateModified { get; set; }
        public bool IsActive { get; set; }
        public Guid? CompanyId { get; set; }
        public string Name { get; set; }
        public string Code { get; set; }
        public string BuyerCode { get; set; }
        public string Slug { get; set; }
        public int Version { get; set; }
        public bool IsLatest { get; set; }
        public bool IsDeleted { get; set; }

        public Guid? Brand { get; set; }
        public Guid? Division { get; set; }
        public Guid? Department { get; set; }

        public Guid? GraphicType { get; set; }
        public Guid? GraphicCategory { get; set; }
        public Guid? GraphicProductName { get; set; }
        public Guid? Color { get; set; }
        public string Description { get; set; }
        public string ItemSize { get; set; }
        public string Supplier { get; set; }
        public string SupplierCode { get; set; }
        public string Image { get; set; }
        public string Remark { get; set; }

        #endregion Properties
    }
}
