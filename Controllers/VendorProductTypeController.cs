using System;
using System.Collections.Generic;
using System.Linq;
using GUSLibrary.Classes;
using GUSLibrary.Data;
using GUSLibrary.Data.LibVendor;
using GUSLibrary.ViewModels;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Nelibur.ObjectMapper;
using Newtonsoft.Json;

namespace GUSLibrary.Controllers
{
    [Route("api/[controller]")]
    public class VendorProductTypeController : Controller
    {
        #region Private Fields
        protected GUSLibraryDbContext DbContext;
        #endregion Private Fields

        #region Constructor
        public VendorProductTypeController(GUSLibraryDbContext context)
        {
            DbContext = context;
        }
        #endregion Constructor

        #region Attribute-based Routing
        // GET: api/values
        [HttpGet("GetVendorProductTypeList")]
        public IActionResult GetVendorProductTypeList()
        {
            var items = DbContext.VendorProductTypes.OrderBy(i => i.Name).ToArray();
            return new JsonResult(ToItemViewModelList(items), DefaultJsonSettings);
        }


        // GET api/values/5
        [HttpGet("GetVendorProductTypebyId/{id}")]
        public IActionResult GetVendorProductTypebyId(Guid id)
        {
            var item = DbContext.VendorProductTypes.FirstOrDefault(i => i.Id == id);
            if (item != null) return new JsonResult(TinyMapper.Map<VendorProductTypeViewModel>(item), DefaultJsonSettings);
            return NotFound(new { Error = $"ID {id} has not been found" });
        }


        // POST api/values
        [HttpPost("AddVendorProductType")]
        [Authorize]
        public IActionResult Add([FromBody]VendorProductTypeViewModel data)
        {
            if (data == null)
                return NotFound(new { error = "Invalid Data" });

            var itemCount = DbContext.VendorProductTypes.Where(x => x.Name == data.Name).Count();
            if (itemCount == 0)
            {
                Guid companyIdFromSearchData = Guid.Empty;
                Guid companyId = CompanyIdHelper.GetCompanyId(companyIdFromSearchData);

                var vendorProductType = new VendorProductType
                {
                    Id = Guid.NewGuid(),
                    DateCreated = DateTime.Now,
                    DateModified = DateTime.Now,
                    IsActive = data.IsActive,
                    CompanyId = companyId,

                    Name = data.Name
                };

                DbContext.VendorProductTypes.Add(vendorProductType);
                DbContext.SaveChanges();

                data.Id = vendorProductType.Id;

                return new JsonResult(data, DefaultJsonSettings);
            }
            else
            {
                return BadRequest(new { error = String.Format("Vendor product type already exist.") });
            }
        }


        // PUT api/values/5
        [HttpPut("UpdateVendorProductType")]
        [Authorize]
        public IActionResult Update([FromBody]VendorProductTypeViewModel data)
        {
            if (data != null)
            {
                var vendorProductType = DbContext.VendorProductTypes.FirstOrDefault(i => i.Id.Equals(data.Id));

                if (vendorProductType != null)
                {
                    // Get company Id base on the user size
                    Guid companyIdFromSearchData = Guid.Empty;
                    Guid companyId = CompanyIdHelper.GetCompanyId(companyIdFromSearchData);

                    // Update the old record data.
                    vendorProductType.DateModified = DateTime.Now;
                    vendorProductType.IsActive = data.IsActive;
                    vendorProductType.CompanyId = companyId;
                    vendorProductType.Name = data.Name;
                    DbContext.VendorProductTypes.Update(vendorProductType);

                    // persist the changes into the Database.
                    DbContext.SaveChanges();

                    return new JsonResult(data, DefaultJsonSettings);
                }
                return NotFound(new { error = "Data has not been found" });  // return a HTTP Status 404 (Not Found) if we couldn't find a suitable item.
            }
            return NotFound(new { error = "Invalid Data" });   // return a HTTP Status 404 (Not Found) if we couldn't find a suitable item.
        }

        // DELETE api/values/5
        [HttpDelete("DeleteVendorProductType/{id}")]
        [Authorize]
        public IActionResult Delete(Guid id)
        {
            var item = DbContext.VendorProductTypes.FirstOrDefault(i => i.Id.Equals(id));
            if (item != null)
            {
                var itemCount = DbContext.Vendors.Where(x => x.ProductType == item.Id).Count();
                if (itemCount == 0)
                {
                    DbContext.VendorProductTypes.Remove(item);
                    DbContext.SaveChanges();
                    return Ok();
                }
                else
                {
                    return BadRequest(new { error = String.Format("Vendor product type is in using.") });
                }
            }
            else
            {
                return NotFound(new { error = "Invalid Data" });
            }
        }
        #endregion

        #region Private Memers

        private List<VendorProductTypeViewModel> ToItemViewModelList(IEnumerable<VendorProductType> vendorProductType)
        {
            var result = vendorProductType.Select(TinyMapper.Map<VendorProductTypeViewModel>).ToList();
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
