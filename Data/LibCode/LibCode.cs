using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace GUSLibrary.Data
{
    public class LibCode
    {
        #region Constructor
        public LibCode()
        {
        }
        #endregion Constructor
        #region Properties
        [Key]
        [Required]
        public Guid Id { get; set; }
        public string LibType { get; set; }
        public int CodeNumber { get; set; }
        #endregion Properties
    }
}
