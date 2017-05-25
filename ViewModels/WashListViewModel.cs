using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GUSLibrary.ViewModels
{
    public class WashListViewModel
    {

       public List<WashListItemViewModel> Data
       {
           get;
           set;
       } 
        public Pagination Paging { get; set; }
    }
}
