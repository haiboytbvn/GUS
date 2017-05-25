using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace GUSLibrary.Data
{
    public class RelGraphicCategoryProductName
    {
        #region Constructor
        public RelGraphicCategoryProductName()
        {
        }
        #endregion Constructor

        #region Properties
        [Key]
        [Required]
        public Guid Id { get; set; }
        public Guid CompanyId { get; set; }
        public DateTime DateCreated { get; set; }

        public Guid CategoryId { get; set; }    // FabricCategory Id
        public Guid ProductNameId { get; set; }        // FabricDesc Id
        public bool IsLatest { get; set; }

        #endregion Properties
    }
}
