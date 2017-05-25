using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GUSLibrary.ViewModels
{
    public class ImageListViewModel
    {
        public string MainImage { get; set; }

        public string MainAlt { get; set; }

        public List<ImageDataViewModel> Images { get; set; }
    }
}
