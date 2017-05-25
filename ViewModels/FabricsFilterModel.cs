﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Newtonsoft.Json;

namespace GUSLibrary.ViewModels
{
    [JsonObject(MemberSerialization.OptOut)]
    public class FabricsFilterModel
    {
        #region Constructor
        public FabricsFilterModel()
        {

        }
        #endregion Constructor

        #region Properties
        public string Name { get; set; }
        public string Code { get; set; }
        public string BuyerCode { get; set; }
        public string CateId { get; set; }
        public string TypeId { get; set; }
        public string ProductNameId { get; set; }
        public string Keyword { get; set; }
        public Guid? CompanyId { get; set; }
        public Pagination Paging { get; set; }
        #endregion Properties
    }
}
