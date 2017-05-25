using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GUSLibrary.ViewModels
{
    public class ParentMenuItem
    {
        public string Text { get; set; }
        public string Value { get; set; }
        public List<MenuItem> Items { get; set; }
    }
}
