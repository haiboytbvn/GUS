using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GUSLibrary.ViewModels
{
    public class SpecUpdateViewModel
    {
        public SpecViewModel Spec { get; set; }
        public List<RelSpecPOMViewModel> POMs { get; set; }
    }
}
