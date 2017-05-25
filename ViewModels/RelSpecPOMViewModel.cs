using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GUSLibrary.ViewModels
{
    public class RelSpecPOMViewModel
    {
        #region Properties
        public Guid? Id { get; set; }
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
