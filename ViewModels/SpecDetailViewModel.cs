using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GUSLibrary.ViewModels
{
    public class SpecDetailViewModel
    {
        public SpecViewModel Spec { get; set; }
        public List<POMofSpecViewModel> POMs { get; set; }
    }
}
