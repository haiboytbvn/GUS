using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GUSLibrary.ViewModels
{
    public class AncestorMenuItem
    {
        public string Text { get; set; }
        public string Value { get; set; }
        public List<ParentMenuItem> Items { get; set; }
    }
}
