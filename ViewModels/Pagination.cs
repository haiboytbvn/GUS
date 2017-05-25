using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GUSLibrary.ViewModels
{
    public class Pagination
    {
        public int PageNumber { get; set; }

        public int PageSize { get; set; }

        public int Total { get; set; }

        public int Show { get; set; }

        public List<int> PageCount { get; set; }

    }
}
