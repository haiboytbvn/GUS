using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace GUSLibrary.Data
{
    public class RelWashCategoryProductName
    {
        #region Constructor
        public RelWashCategoryProductName()
        {
        }
        #endregion Constructor

        #region Properties
        [Key]
        [Required]
        public Guid Id { get; set; }
        public Guid CompanyId { get; set; }
        public DateTime DateCreated { get; set; }

        public Guid CategoryId { get; set; }    
        public Guid ProductNameId { get; set; }       
        public bool IsLatest { get; set; }

        #endregion Properties
    }
}
