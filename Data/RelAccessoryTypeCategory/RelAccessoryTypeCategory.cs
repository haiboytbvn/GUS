using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace GUSLibrary.Data
{
    public class RelAccessoryTypeCategory
    {
        #region Constructor
        public RelAccessoryTypeCategory()
        {
        }
        #endregion Constructor

        #region Properties
        [Key]
        [Required]
        public Guid Id { get; set; }
        public Guid CompanyId { get; set; }
        public DateTime DateCreated { get; set; }

        public Guid TypeId { get; set; }        // AccessoryType Id
        public Guid CategoryId { get; set; }    // AccessoryCategory Id
        public bool IsLatest { get; set; }

        #endregion Properties
    }
}
