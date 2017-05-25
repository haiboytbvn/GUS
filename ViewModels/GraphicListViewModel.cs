using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GUSLibrary.ViewModels
{
    public class GraphicListViewModel
    {
        #region Properties
        public List<GraphicListItemViewModel> Data { get; set; } 
        public Pagination Paging { get; set; }
        #endregion Properties
    }
}
