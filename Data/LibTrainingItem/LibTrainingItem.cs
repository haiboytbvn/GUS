using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace GUSLibrary.Data
{
    public class LibTrainingItem
    {
        #region Constructor
        public LibTrainingItem()
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
        public int Version { get; set; }
        public bool IsLatest { get; set; }
        public bool IsDeleted { get; set; }

        [Required]
        public string Value { get; set; }

        #endregion

        #region Related Properties
        
        public virtual List<RelTrainingTrainingItem> RelTrainingTrainingItem { get; set; }

        #endregion Related Properties
    }
}
