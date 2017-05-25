using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GUSLibrary.ViewModels
{
    public class AccessoryListItemViewModel
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
        public bool IsLatest { get; set; }
        public bool IsDeleted { get; set; }

        public string AccType { get; set; }
        public string AccCategory { get; set; }
        public string AccProductName { get; set; }
        public string Description { get; set; }
        public string Brand { get; set; }
        public string Department { get; set; }
        public string Division { get; set; }
        public string ItemSize { get; set; }
        public string Color { get; set; }
        public string Application { get; set; }
        public string Supplier { get; set; }
        public string SupplierCode { get; set; }
        public string Image { get; set; }
        public string Remark { get; set; }
        public string Thumbnail { get; set; }
        public string AccTypeId { get; set; }
        public string AccCateId { get; set; }
        public string AccProductNameId { get; set; }
        #endregion Properties
    }
}
