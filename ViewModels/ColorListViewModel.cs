using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace GUSLibrary.ViewModels
{
    public class ColorListViewModel
    {     
      public List<ColorListItemViewModel> Data { get; set; }
      public Pagination Paging { get; set; } 
    }
}
