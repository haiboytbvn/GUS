using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace GUSLibrary.Data
{
    public class RelTrainingTrainingItem
    {
        #region Contructor
        public RelTrainingTrainingItem()
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

        
        public Guid TrainingId { get; set; }
        public Guid TrainingItemId { get; set; }
        #endregion

        #region Related Properties
        [ForeignKey("TrainingId")]
        public virtual LibTraining Training { get; set; }

        [ForeignKey("TrainingItemId")]
        public virtual LibTrainingItem TrainingItem { get; set; }
        #endregion Related Properties
    }
}
