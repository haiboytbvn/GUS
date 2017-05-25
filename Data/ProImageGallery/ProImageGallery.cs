using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace GUSLibrary.Data
{
    public class ProImageGallery
    {
        #region Constructor
        public ProImageGallery()
        {
        }
        #endregion Constructor
        #region Properties
        [Key]
        [Required]
        public Nullable<Guid> Id { get; set; }
        public Nullable<DateTime> DateCreated { get; set; }
        public Nullable<DateTime> DateModified { get; set; }
        public Nullable<Guid> ProjectId { get; set; }
        public Nullable<Guid> UserId { get; set; }
        public string FileName { get; set; }
        public string ImageStatus { get; set; }
        #endregion Properties

        #region Related Properties
        #endregion Related Properties
    }
}
