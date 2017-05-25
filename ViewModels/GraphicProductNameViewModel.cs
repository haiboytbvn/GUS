﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Newtonsoft.Json;

namespace GUSLibrary.ViewModels
{
    [JsonObject(MemberSerialization.OptOut)]
    public class GraphicProductNameViewModel
    {

        #region Constructor
        public GraphicProductNameViewModel()
        {

        }
        #endregion Constructor

        #region Properties
        public Guid? Id { get; set; }
        public DateTime? DateCreated { get; set; }
        public DateTime? DateModified { get; set; }
        public bool IsActive { get; set; }
        public Guid? CompanyId { get; set; }
        public string Name { get; set; }
        public string Code { get; set; }
        public string Slug { get; set; }
        public string BuyerCode { get; set; }
        public bool IsLatest { get; set; }
        public bool IsDeleted { get; set; }
        public Guid CategoryId { get; set; }

        #endregion Properties

    }
}
