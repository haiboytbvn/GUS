using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GUSLibrary.ViewModels
{
    public class POMofSpecViewModel
    {
        public Guid Id { get; set; }

        public Guid SpecId { get; set; }

        public Guid POMId { get; set; }
        public string Name { get; set; }
        public string Code { get; set; }
        public string TOL { get; set; }
        public string GuidSpec { get; set; }
        public string GradeSpec { get; set; }
    }
}
