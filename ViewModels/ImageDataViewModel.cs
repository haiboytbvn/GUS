using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GUSLibrary.ViewModels
{
    public class ImageDataViewModel
    {
        public string FileName { get; set; }

        public long Size { get; set; }
        public string Type { get; set; }
        public string UploadPath { get; set; }
    }
}
