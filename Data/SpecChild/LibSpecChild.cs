using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace GUSLibrary.Data
{
    public class LibSpecChild
    {
        #region Constructor
        public LibSpecChild()
        {
        }
        #endregion Constructor
        #region Properties
        [Key]
        [Required]
        public Guid Id { get; set; }
        public DateTime DateCreated { get; set; }
        public DateTime DateModified { get; set; }
        public bool IsActive { get; set; }
        public Guid CompanyId { get; set; }
        public string Name { get; set; }
        public string Code { get; set; }    
        public int Order { get; set; }
        #endregion Properties
    }
}
