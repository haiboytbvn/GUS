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
    public class VendorTypeController : Controller
    {
        #region Private Fields
        protected GUSLibraryDbContext DbContext;
        #endregion Private Fields

        #region Constructor
        public VendorTypeController(GUSLibraryDbContext context)
        {
            DbContext = context;
        }
        #endregion Constructor

        #region Attribute-based Routing
        // GET: api/values
        [HttpGet("GetVendorTypeList")]
        public IActionResult GetVendorTypeList()
        {
            var items = DbContext.VendorTypes.OrderBy(i => i.Name).ToArray();
            return new JsonResult(ToItemViewModelList(items), DefaultJsonSettings);
        }


        // GET api/values/5
        [HttpGet("GetVendorTypebyId/{id}")]
        public IActionResult GetVendorTypebyId(Guid id)
        {
            var item = DbContext.VendorTypes.FirstOrDefault(i => i.Id == id);
            if (item != null) return new JsonResult(TinyMapper.Map<VendorTypeViewModel>(item), DefaultJsonSettings);
            return NotFound(new { Error = $"ID {id} has not been found" });
        }


        // POST api/values
        [HttpPost("AddVendorType")]
        [Authorize]
        public IActionResult Add([FromBody]VendorTypeViewModel data)
        {
            if (data == null)
                return NotFound(new { error = "Invalid Data" });

            var itemCount = DbContext.VendorTypes.Where(x => x.Name == data.Name).Count();
            if (itemCount == 0)
            {
                Guid companyIdFromSearchData = Guid.Empty;
                Guid companyId = CompanyIdHelper.GetCompanyId(companyIdFromSearchData);

                var VendorType = new VendorType
                {
                    Id = Guid.NewGuid(),
                    DateCreated = DateTime.Now,
                    DateModified = DateTime.Now,
                    IsActive = data.IsActive,
                    CompanyId = companyId,

                    Name = data.Name
                };

                DbContext.VendorTypes.Add(VendorType);
                DbContext.SaveChanges();

                data.Id = VendorType.Id;

                return new JsonResult(data, DefaultJsonSettings);
            }
            else
            {
                return BadRequest(new { error = String.Format("Vendor type already exist.") });
            }
        }


        // PUT api/values/5
        [HttpPut("UpdateVendorType")]
        [Authorize]
        public IActionResult Update([FromBody]VendorTypeViewModel data)
        {
            if (data != null)
            {
                var VendorType = DbContext.VendorTypes.FirstOrDefault(i => i.Id.Equals(data.Id));

                if (VendorType != null)
                {
                    // Get company Id base on the user size
                    Guid companyIdFromSearchData = Guid.Empty;
                    Guid companyId = CompanyIdHelper.GetCompanyId(companyIdFromSearchData);

                    // Update the old record data.
                    VendorType.DateModified = DateTime.Now;
                    VendorType.IsActive = data.IsActive;
                    VendorType.CompanyId = companyId;
                    VendorType.Name = data.Name;
                    DbContext.VendorTypes.Update(VendorType);

                    // persist the changes into the Database.
                    DbContext.SaveChanges();

                    return new JsonResult(data, DefaultJsonSettings);
                }
                return NotFound(new { error = "Data has not been found" });  // return a HTTP Status 404 (Not Found) if we couldn't find a suitable item.
            }
            return NotFound(new { error = "Invalid Data" });   // return a HTTP Status 404 (Not Found) if we couldn't find a suitable item.
        }

        // DELETE api/values/5
        [HttpDelete("DeleteVendorType/{id}")]
        [Authorize]
        public IActionResult Delete(Guid id)
        {
            var item = DbContext.VendorTypes.FirstOrDefault(i => i.Id.Equals(id));
            if (item != null)
            {
                var itemCount = DbContext.Vendors.Where(x => x.Type == item.Id).Count();
                if (itemCount == 0)
                {
                    DbContext.VendorTypes.Remove(item);
                    DbContext.SaveChanges();
                    return Ok();
                }
                else
                {
                    return BadRequest(new { error = String.Format("Vendor type is in using.") });
                }
            }
            else
            {
                return NotFound(new { error = "Invalid Data" });
            }
        }
        #endregion

        #region Private Memers

        private List<VendorTypeViewModel> ToItemViewModelList(IEnumerable<VendorType> vendorType)
        {
            var result = vendorType.Select(TinyMapper.Map<VendorTypeViewModel>).ToList();
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
