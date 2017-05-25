using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GUSLibrary.ViewModels
{
    public class ColorListItemViewModel
    {
        #region Properties
        public Guid Id { get; set; }
        public DateTime DateCreated { get; set; }
        public DateTime DateModified { get; set; }
        public bool IsActive { get; set; }
        public Guid CompanyId { get; set; }
        public string Name { get; set; }
        public string Code { get; set; }
        public string BuyerCode { get; set; }
        public string Slug { get; set; }
        public int Version { get; set; }
        public string Brand { get; set; }
        public string Department { get; set; }
        public string Division { get; set; }
        public string ApplicationSeason { get; set; }
        public string ApplicationYear { get; set; }
        public string Image { get; set; }
        public string Thumbnail { get; set; }
        public bool IsDeleted { get; set; }
        public bool IsLatest { get; set; }
        public string Remark { get; set; }
        #endregion Properties
    }
}
