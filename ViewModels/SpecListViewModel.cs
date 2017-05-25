using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GUSLibrary.ViewModels
{
    public class SpecListViewModel
    {
       
        #region Properties
        public Guid Id { get; set; }
        public bool IsActive { get; set; }
        public Guid? CompanyId { get; set; }
        public string Name { get; set; }
        public string Code { get; set; }
        public string Slug { get; set; }
        public string BuyerCode { get; set; }
        public string SizeRange { get; set; }
        public string GuidedSpecSize { get; set; }
        #endregion Properties
    }
}
