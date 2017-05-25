﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Newtonsoft.Json;

namespace GUSLibrary.ViewModels
{
    [JsonObject(MemberSerialization.OptOut)]
    public class FabricViewModel
    {
        #region Constructor
        public FabricViewModel()
        {

        }
        #endregion Constructor

        #region Properties
        public Guid? Id { get; set; }
        public DateTime? DateCreated { get; set; }
        public DateTime? DateModified { get; set; }
        public bool IsActive { get; set; }
        public Guid CompanyId { get; set; }
        public string Name { get; set; }
        public string Code { get; set; }
        public string BuyerCode { get; set; }
        public string Slug { get; set; }
        public int Version { get; set; }
        public bool IsLatest { get; set; }
        public bool IsDeleted { get; set; }

        public Guid? FabType { get; set; }
        public Guid? FabCategory { get; set; }
        public Guid? FabProductName { get; set; }
        public string Description { get; set; }
        public Guid? Brand { get; set; }
        public Guid? Department { get; set; }
        public Guid? Division { get; set; }
        public Guid? FabYarnCount { get; set; }
        public Guid? FabFibreContent { get; set; }
        public Guid? FabFinishing { get; set; }
        public Guid? Color { get; set; }
        public Guid? FabProductType { get; set; }
        public Guid? FabricWeight { get; set; }
        public string Supplier { get; set; }
        public string SupplierCode { get; set; }
        public string Remark { get; set; }
        public string Image { get; set; }
        public List<string> Images { get; set; }
        #endregion Properties
    }
}
