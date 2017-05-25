using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using GUSLibrary.Classes;
using GUSLibrary.Data;
using GUSLibrary.ViewModels;
using Microsoft.AspNetCore.Mvc;
using Nelibur.ObjectMapper;
using Newtonsoft.Json;
using Microsoft.AspNetCore.Authorization;
using Microsoft.EntityFrameworkCore;

namespace GUSLibrary.Controllers
{
    [Route("api/[controller]")]
    public class RelAccessoryTypeCategoryController : Controller
    {
        #region Private Fields
        protected GUSLibraryDbContext DbContext;
        #endregion Private Fields

        #region Constructor
        public RelAccessoryTypeCategoryController(GUSLibraryDbContext context)
        {
            DbContext = context;
        }
        #endregion Constructor

        #region Attribute-based Routing
        [HttpGet("GetRelAccessoryTypeCategoryByCategoryId/{id}")]
        public IActionResult GetRelAccessoryTypeCategoryByCategoryId(Guid id)
        {
            Guid companyIdFromSearchData = Guid.Empty;
            Guid companyId = CompanyIdHelper.GetCompanyId(companyIdFromSearchData);

            var item = DbContext.RelAccessoryTypeCategories.Where(x =>

            ((companyId == Guid.Empty) || (x.CompanyId == companyId)) &&
            x.CategoryId == id &&
            x.IsLatest

            ).FirstOrDefault();

            if (item != null)
                return new JsonResult(TinyMapper.Map<AccessoryTypeViewModel>(item), DefaultJsonSettings);
            return NotFound(new { Error = $"ID {id} has not been found" });
        }

        [HttpGet("GetRelAccessoryTypeCategoryListByTypeId/{id}")]
        public IActionResult GetRelAccessoryTypeCategoryListByTypeId(Guid id)
        {
            Guid companyIdFromSearchData = Guid.Empty;
            Guid companyId = CompanyIdHelper.GetCompanyId(companyIdFromSearchData);

            var itemList = DbContext.RelAccessoryTypeCategories.Where(x =>

            ((companyId == Guid.Empty) || (x.CompanyId == companyId)) &&
            x.TypeId == id &&
            x.IsLatest

            );

            if (itemList != null)
                return new JsonResult(TinyMapper.Map<AccessoryTypeViewModel>(itemList), DefaultJsonSettings);
            return NotFound(new { Error = $"ID {id} has not been found" });
        }
        #endregion

        #region Private Memers

        private List<RelAccessoryTypeCategoryViewModel> ToItemViewModelList(IEnumerable<RelAccessoryTypeCategory> accessoryType)
        {
            var result = accessoryType.Select(TinyMapper.Map<RelAccessoryTypeCategoryViewModel>).ToList();
            return result;
        }

        #endregion

        #region Common Properties
        /// <summary>
        /// Returns a suitable JsonSerializerSettings object 
        /// that can be used to generate the JsonResult return value 
        /// for this Controller's methods.
        /// </summary>
        protected JsonSerializerSettings DefaultJsonSettings => new JsonSerializerSettings()
        {
            Formatting = Formatting.Indented
        };

        #endregion Common Properties
    }
}
