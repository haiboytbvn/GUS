using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace GUSLibrary.Data
{
    public class ProCollaborator
    {
        #region Constructor
        public ProCollaborator()
        {
        }
        #endregion Constructor
        #region Properties
        [Key]
        [Required]
        public Guid Id { get; set; }
        public Nullable<DateTime> DateCreated { get; set; }
        public Nullable<DateTime> DateModified { get; set; }
        public Nullable<Guid> ProjectId { get; set; }
        public Nullable<Guid> UserId { get; set; }
        public string Name { get; set; }
        public string Role { get; set; }
        public string Email { get; set; }
        #endregion Properties

        #region Related Properties
        #endregion Related Properties
    }
}
