using GUSLibrary.Classes;
using GUSLibrary.Data;
using GUSLibrary.Data.User;
using GUSLibrary.ViewModels;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Nelibur.ObjectMapper;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

namespace GUSLibrary.Controllers
{
    [Route("api/[controller]")]
    public class VendorController : Controller
    {
        #region Private Fields
        protected GUSLibraryDbContext DbContext;
        private readonly UserManager<Vendor> _userManager;
        private readonly RoleManager<UserRole> _roleManager;
        #endregion Private Fields

        #region Constructor
        public VendorController(GUSLibraryDbContext context, UserManager<Vendor> userManager, RoleManager<UserRole> roleManager)
        {
            DbContext = context;
            _userManager = userManager;
            _roleManager = roleManager;
        }
        #endregion Constructor

        #region Attribute-based Routing
        // GET: api/values
        [HttpGet("GetVendorList")]
        public IActionResult GetVendorList()
        {
            var items = DbContext.Vendors.OrderBy(i => i.UserName).ToArray();
            return new JsonResult(ToItemViewModelList(items), DefaultJsonSettings);
        }

        // GET api/values/5
        [HttpGet("GetVendorbyId/{id}")]
        public IActionResult GetVendor(Guid id)
        {
            var item = DbContext.Vendors.FirstOrDefault(i => i.Id == id.ToString());
            if (item != null)
            {
                var user = new Vendor()
                {
                    Id = item.Id,
                    DateCreated = item.DateCreated,
                    DateModified = item.DateModified,
                    LastAccess = item.LastAccess,
                    IsActive = item.IsActive,

                    UserName = item.UserName,
                    Email = item.Email,

                    SearchName = item.SearchName,
                    Address = item.Address,
                    PostalCode = item.PostalCode,
                    City = item.City,
                    Country = item.Country,
                    Tel = item.Tel,
                    Fax = item.Fax,
                    Homepage = item.Homepage,
                    PaymentTerm = item.PaymentTerm,
                    DeliveryTerm = item.DeliveryTerm,

                    Type = item.Type,
                    ProductType = item.ProductType
                };

                //return new JsonResult(TinyMapper.Map<VendorViewModel>(item), DefaultJsonSettings);
                return new JsonResult(user, DefaultJsonSettings);
            }
            return NotFound(new { Error = $"ID {id} has not been found" });
        }

        // POST api/values
        [HttpPost("AddVendor")]
        [Authorize]
        public IActionResult Add([FromBody]VendorViewModel data)
        {

            if (data == null)
                return NotFound(new { error = String.Format("Invalid Data") });
            // return a HTTP Status 404 (Not Found) if we couldn't find a suitable item.

            var userCount = DbContext.Vendors.Where(x => x.UserName.ToLower() == data.UserName).Count();
            if (userCount == 0)
            {
                var user = new Vendor()
                {
                    Id = Guid.NewGuid().ToString(),
                    DateCreated = DateTime.Now,
                    DateModified = DateTime.Now,
                    LastAccess = DateTime.Now,
                    IsActive = data.IsActive,

                    UserName = data.UserName,
                    Email = data.Email,

                    SearchName = data.SearchName,
                    Address = data.Address,
                    PostalCode = data.PostalCode,
                    City = data.City,
                    Country = data.Country,
                    Tel = data.Tel,
                    Fax = data.Fax,
                    Homepage = data.Homepage,
                    PaymentTerm = data.PaymentTerm,
                    DeliveryTerm = data.DeliveryTerm,

                    Type = data.Type.Value,
                    ProductType = data.ProductType.Value
                };

                //update the user role
                var roleItem = _roleManager.FindByNameAsync("Vendor").Result;

                try
                {
                    var userCreated = _userManager.CreateAsync(user, "Pass4Admin").Result;
                }
                catch (Exception ex)
                {
                    return BadRequest(new { error = string.Format(ex.Message) });
                }
                var roleAdded = _userManager.AddToRoleAsync(user, roleItem.Name).Result;

                //DbContext.Users.Add(user);

                // persist the changes into the Database.
                DbContext.SaveChanges();

                // set new id to data object
                data.Id = new Guid(user.Id);


                return new JsonResult(data, DefaultJsonSettings);
            }
            else
            {
                return BadRequest(new { error = String.Format("User already exist.") });
            }

        }

        // PUT api/values/5
        [HttpPut("UpdateVendor")]
        [Authorize]
        public IActionResult Update([FromBody]VendorViewModel data)
        {
            if (data != null)
            {
                var Vendor = DbContext.Vendors.FirstOrDefault(i => i.Id == data.Id.ToString());

                if (Vendor != null)
                {

                    Vendor.DateModified = DateTime.Now;
                    //Vendor.LastAccess = DateTime.Now;
                    Vendor.IsActive = data.IsActive;

                    Vendor.UserName = data.UserName;
                    Vendor.Email = data.Email;

                    Vendor.SearchName = data.SearchName;
                    Vendor.Address = data.Address;
                    Vendor.PostalCode = data.PostalCode;
                    Vendor.City = data.City;
                    Vendor.Country = data.Country;
                    Vendor.Tel = data.Tel;
                    Vendor.Fax = data.Fax;
                    Vendor.Homepage = data.Homepage;
                    Vendor.PaymentTerm = data.PaymentTerm;
                    Vendor.DeliveryTerm = data.DeliveryTerm;

                    Vendor.Type = data.Type.Value;
                    Vendor.ProductType = data.ProductType.Value;

                    DbContext.Vendors.Update(Vendor);

                    // persist the changes into the Database.
                    DbContext.SaveChanges();

                    return new JsonResult(data, DefaultJsonSettings);

                }
                else
                    return NotFound(new { error = String.Format("Data has not been found") });  // return a HTTP Status 404 (Not Found) if we couldn't find a suitable item.
            }
            else
                return NotFound(new { error = String.Format("Invalid Data") });   // return a HTTP Status 404 (Not Found) if we couldn't find a suitable item.
        }

        // DELETE api/values/5
        [HttpDelete("DeleteVendor/{id}")]
        [Authorize]
        public IActionResult Delete(Guid id)
        {
            var item = DbContext.Vendors.FirstOrDefault(i => i.Id == id.ToString());

            if (item != null)
            {
                DbContext.Vendors.Remove(item);

                // persist the changes into the Database.
                DbContext.SaveChanges();

                return Ok();
            }
            else
                return BadRequest(new { error = String.Format("Data has not been found") });  // return a HTTP Status 404 (Not Found) if we couldn't find a suitable item.
        }
        #endregion

        #region Private Memers

        private List<VendorViewModel> ToItemViewModelList(IEnumerable<Vendor> Vendor)
        {
            //var result = Vendor.Select(TinyMapper.Map<VendorViewModel>).ToList();   //.Map function will return error : calling convention must be VarArgs

            List<VendorViewModel> result = new List<VendorViewModel>();

            foreach (var user in Vendor)
            {
                VendorViewModel vendorItem = new VendorViewModel();
                vendorItem.Id = (new Guid(user.Id));
                vendorItem.LastAccess = user.LastAccess;
                vendorItem.DateCreated = user.DateCreated;
                vendorItem.DateModified = user.DateModified;
                vendorItem.IsActive = user.IsActive;

                vendorItem.UserName = user.UserName;
                vendorItem.Email = user.Email;

                vendorItem.SearchName = user.SearchName;
                vendorItem.Address = user.Address;
                vendorItem.PostalCode = user.PostalCode;
                vendorItem.City = user.City;
                vendorItem.Country = user.Country;
                vendorItem.Tel = user.Tel;
                vendorItem.Fax = user.Fax;
                vendorItem.Homepage = user.Homepage;
                vendorItem.PaymentTerm = user.PaymentTerm;
                vendorItem.DeliveryTerm = user.DeliveryTerm;

                vendorItem.Type = user.Type;
                vendorItem.ProductType = user.ProductType;

                result.Add(vendorItem);
            }

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
