using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace GUSLibrary.Data
{
    public class LibTraining
    {
        #region Constructor
        public LibTraining()
        {

        }
        #endregion

        #region Properties
        [Key]
        [Required]
        public Guid Id { get; set; }
        public DateTime DateCreated { get; set; }
        public DateTime DateModified { get; set; }
        public bool IsActive { get; set; }

        [Required]
        public string Name { get; set; }
        public int Age { get; set; }
        public int Version { get; set; }
        public bool IsLatest { get; set; }
        public bool IsDeleted { get; set; }
        #endregion
    }
}
