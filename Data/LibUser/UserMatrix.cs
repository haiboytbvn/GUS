using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace GUSLibrary.Data
{
    public class UserMatrix
    {
        #region Constructor
        public UserMatrix()
        {
        }
        public UserMatrix(Guid userRoleId, string matrixName, int premissionLevel)
        {
            Id = Guid.NewGuid();
            DateCreated = DateTime.Now;
            DateModified = DateTime.Now;
            IsActive = true;

            UserRoleId = userRoleId;
            Name = matrixName;
            PremissionLevel = premissionLevel;
        }
        #endregion Constructor
        #region Properties
        [Key]
        [Required]
        public Guid Id { get; set; }
        public DateTime DateCreated { get; set; }
        public DateTime DateModified { get; set; }
        public bool IsActive { get; set; }

        public Guid UserRoleId { get; set; }
        public string Name { get; set; }
        public int PremissionLevel { get; set; }
        #endregion Properties
    }
}
