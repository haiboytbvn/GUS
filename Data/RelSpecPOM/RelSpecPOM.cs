using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace GUSLibrary.Data
{
    public class RelSpecPOM
    {
        #region Constructor
        public RelSpecPOM()
        {
        }
        #endregion Constructor

        #region Properties
        [Key]
        [Required]
        public Guid Id { get; set; }
        public Guid CompanyId { get; set; }
        public DateTime DateCreated { get; set; }
        public Guid? SpecId { get; set; }    // Spec Id
        public Guid? POMId { get; set; }        // SizeRange Id
        public string TOL { get; set; }
        public string GuideSpec { get; set; }
        public string GradeSpec { get; set; }

        #endregion Properties
    }
}
