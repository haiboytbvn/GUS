using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using GUSLibrary.Classes;
using GUSLibrary.Data;
using GUSLibrary.ViewModels;
using Microsoft.AspNetCore.Mvc;
using Nelibur.ObjectMapper;
using Newtonsoft.Json;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc.Filters;
using Remotion.Linq.Clauses;

namespace GUSLibrary.Controllers
{
    [Route("api/[controller]")]
    public class ShippingController : Controller
    {
        #region Private Fields
        protected GUSLibraryDbContext DbContext;
        private IHostingEnvironment hostingEnv;
        #endregion Private Fields

        #region Constructor
        public ShippingController(GUSLibraryDbContext context, IHostingEnvironment env)
        {
            DbContext = context;
            this.hostingEnv = env;
        }
        #endregion Constructor

        #region Attribute-based Routing
        // GET: api/values
        [HttpPost("GetShippingList")]
        public IActionResult GetShippingsList([FromBody]SearchGeneralFilterViewModel data)
        {
            // return a HTTP Status 404 (Not Found) if we couldn't find a suitable item.
            if (data == null)
                return NotFound(new { error = "Invalid Data" });

            var companyIdFromSearchData = data.CompanyId ?? Guid.Empty;
            var companyId = CompanyIdHelper.GetCompanyId(companyIdFromSearchData);
            var name = data.Name; // should come from search data
            var code = data.Code; // should come from search data
            var buyerCode = data.BuyerCode;


            var lstshippingtype = DbContext.ShippingTypes;
            var lstendbuyer = DbContext.EndBuyers;
            var lstdepartment = DbContext.Departments;
            var lstdivision = DbContext.Divisions;
            var lstshipping = DbContext.Shippings;
            var lstbrand = DbContext.Brands;

            var result = (from sh in lstshipping
                          join stype in lstshippingtype  on sh.ShippingType equals stype.Id
                          join eb in lstendbuyer on sh.EndBuyer equals eb.Id
                         join dept in lstdepartment on sh.Department equals dept.Id
                         join div in lstdivision on sh.Division equals div.Id
                         join br in lstbrand on sh.Brand equals br.Id
                          select new ShippingListViewModel
                          {
                              Id = sh.Id,
                              DateCreated = sh.DateCreated,
                              DateModified = sh.DateModified,
                              IsActive = sh.IsActive,
                              Name = sh.Name,
                              Code = sh.Code,
                              BuyerCode = sh.BuyerCode,
                              Image = sh.Image,
                              Division = div.Name,
                              Department = dept.Name,
                              Brand = br.Name,
                              EndBuyer = eb.Name,                         
                              ShippingType = stype.Name,
                              CompanyId = sh.CompanyId,
                              IsDeleted = sh.IsDeleted,
                              IsLatest = sh.IsLatest,
                              RegName = sh.RegName,
                              SearchName = sh.SearchName,
                              PostalCode = sh.PostalCode,
                              City =sh.City,
                              Country = sh.Country,
                              Tel = sh.Tel,
                              Fax = sh.Fax,
                              Contact = sh.Contact,
                              Email = sh.Email,
                              Remark = sh.Remark,
                              Version = sh.Version
                          }).ToList()
                .Where(x =>
                  (companyId == Guid.Empty) || (x.CompanyId == companyId) &&
            (string.IsNullOrEmpty(name) || x.Name.ToLower().Contains(name.Trim().ToLower())) &&
            (string.IsNullOrEmpty(code) || x.Code.ToLower().Contains(code.Trim().ToLower())) &&
            (string.IsNullOrEmpty(buyerCode) || x.BuyerCode.ToLower().Contains(buyerCode.Trim().ToLower()))
            )
            .GroupBy(x => x.Code).Select(y => y.FirstOrDefault(z => z.IsActive && !z.IsDeleted && z.IsLatest)).OrderBy(x => x.Name).ToList();
            return new JsonResult(result, DefaultJsonSettings);
        }

        // GET api/values/5
        [HttpGet("GetShippingById/{id}")]
        public IActionResult GetShippingsById(Guid id)
        {
            Guid companyIdFromSearchData = Guid.Empty;
            Guid companyId = CompanyIdHelper.GetCompanyId(companyIdFromSearchData);
            var item = DbContext.Shippings.Where(x => (companyId == Guid.Empty) || (x.CompanyId == companyId)).FirstOrDefault(i => i.Id == id);
            if (item != null) return new JsonResult(TinyMapper.Map<ShippingViewModel>(item), DefaultJsonSettings);
            return NotFound(new { Error = $"ID {id} has not been found" });
        }

        // GET api/values/slug
        [HttpGet("GetShippingsBySlug/{slug}")]
        public IActionResult GetShippingBySlug(string slug)
        {
            Guid companyIdFromSearchData = Guid.Empty;
            Guid companyId = CompanyIdHelper.GetCompanyId(companyIdFromSearchData);
            var item = DbContext.Shippings.Where(x => (companyId == Guid.Empty) || (x.CompanyId == companyId)).Where(x => x.IsLatest && !x.IsDeleted).FirstOrDefault(i => i.Slug == slug);
            if (item != null) return new JsonResult(TinyMapper.Map<ShippingViewModel>(item), DefaultJsonSettings);
            return NotFound(new { Error = $"Slug {slug} has not been found" });
        }


        // Get item by code
        [HttpGet("GetShippingByCode/{code}")]
        public IActionResult GetShippingByCode(string code)
        {
            if (!string.IsNullOrEmpty(code))
            {
                Guid companyIdFromSearchData = Guid.Empty;
                Guid companyId = CompanyIdHelper.GetCompanyId(companyIdFromSearchData);
                var itemList = DbContext.Shippings.Where(x =>

                    ((companyId == Guid.Empty) || (x.CompanyId == companyId)) &&
                    x.Code.ToLower().Equals(code.Trim().ToLower())

                    )
                    .Where(x => !(x.IsDeleted))
                    .OrderByDescending(x => x.Version);


                return new JsonResult(ToItemViewModelList(itemList), DefaultJsonSettings);
            }
            return BadRequest(new { error = "Code is empty." });
        }

        // Get item list by code (return all version of items with same code)
        [HttpGet("GetShippingListByCode/{code}")]
        public IActionResult GetShippingsListByCode(string code)
        {
            if (!string.IsNullOrEmpty(code))
            {
                Guid companyIdFromSearchData = Guid.Empty;
                Guid companyId = CompanyIdHelper.GetCompanyId(companyIdFromSearchData);

                var itemList = DbContext.Shippings.Where(x =>

                    ((companyId == Guid.Empty) || (x.CompanyId == companyId)) &&
                    x.Code.ToLower().Equals(code.Trim().ToLower())

                    )
                    .OrderByDescending(x => x.Version);

                return new JsonResult(ToItemViewModelList(itemList), DefaultJsonSettings);
            }
            return BadRequest(new { error = "Code is empty." });
        }
        // POST api/values
        [HttpPost("AddShipping")]
        [Authorize]
        public IActionResult Add([FromBody]ShippingViewModel data)
        {
            if (data == null)
                return NotFound(new { error = "Invalid Data" });
            // return a HTTP Status 404 (Not Found) if we couldn't find a suitable item.
            var companyIdFromSearchData = Guid.Empty;
            var companyId = CompanyIdHelper.GetCompanyId(companyIdFromSearchData);

            // Get last code for current library type
            var ch = new CodeHelper(DbContext);
            string code = ch.GetTypeCode(EnumHelper.LibType.LibShipping.ToString());
            string slug = SlugHelper.GetSlug(data.CompanyId, DbContext, data.Name, EnumHelper.LibType.LibShipping.ToString());
            var guid = Guid.NewGuid();
            var shippingToAdd = new LibShipping()
            {
                Id = guid,
                DateCreated = DateTime.Now,
                DateModified = DateTime.Now,
                IsActive = data.IsActive,
                CompanyId = companyId,
                Name = data.Name,
                Code = code,     //this should auto generate by system, and can not be changed
                Slug = slug,    //this should generate by some slug helper class in future.
                Version = 0,
                BuyerCode = data.BuyerCode,
                Image = data.Image,
                Brand = data.Brand,
                Department = data.Department,
                Division = data.Division,
                ShippingType = data.ShippingType,         
                Remark = data.Remark,
                IsDeleted = false,
                IsLatest = true,
                RegName = data.RegName,
                SearchName = data.SearchName,
                PostalCode = data.PostalCode,
                City = data.City,
                Country = data.Country,
                Tel = data.Tel,
                Fax = data.Fax,
                Contact = data.Contact,
                Email = data.Email,
                Address = data.Address,
                EndBuyer = data.EndBuyer

            };

            DbContext.Shippings.Add(shippingToAdd);

            // persist the changes into the Database.
            DbContext.SaveChanges();

            // set new id to data object
            data.Id = shippingToAdd.Id;

            //image uploading

            SaveImage(guid, shippingToAdd.Code, data.Version, data.Image);

            return new JsonResult(data, DefaultJsonSettings);
        }

        // PUT api/values/5
        [HttpPut("UpdateShipping")]
        [Authorize]
        public IActionResult Update([FromBody]ShippingViewModel data)
        {
            if (data != null)
            {
                var shipping = DbContext.Shippings.FirstOrDefault(i => i.Id == data.Id);

                if (shipping != null)
                {
                    // Get company Id base on the user type
                    Guid companyIdFromSearchData = Guid.Empty;
                    Guid companyId = CompanyIdHelper.GetCompanyId(companyIdFromSearchData);

                    // Check if slug is duplicate or not
                    string slug = SlugHelper.GetSlug(data.CompanyId, DbContext, data.Name, EnumHelper.LibType.LibShipping.ToString());
                    // Copy the old record's data into a new record
                    var grap = new LibShipping()
                    {
                        Id = Guid.NewGuid(),
                        DateCreated = shipping.DateCreated,
                        DateModified = shipping.DateModified,
                        IsActive = shipping.IsActive,
                        CompanyId = shipping.CompanyId,
                        Name = shipping.Name,
                        Code = shipping.Code,
                        Version = shipping.Version,
                        Slug = shipping.Slug,
                        BuyerCode = shipping.BuyerCode,
                        IsLatest = false,
                        IsDeleted = shipping.IsDeleted,
                        Image = shipping.Image,
                        Brand = shipping.Brand,
                        Department = shipping.Department,
                        Division = shipping.Division,
                        Remark = shipping.Remark,
                        EndBuyer = shipping.EndBuyer,
                        SearchName = shipping.SearchName,
                        ShippingType = shipping.ShippingType,
                        Address = shipping.Address,
                        RegName = shipping.RegName,
                        PostalCode = shipping.PostalCode,
                        City = shipping.City,
                        Country = shipping.Country,
                        Tel = shipping.Tel,
                        Fax = shipping.Fax,
                        Contact = shipping.Contact,
                        Email = shipping.Email

                    };
                    DbContext.Shippings.Add(grap);

                    shipping.DateModified = DateTime.Now;
                    shipping.DateCreated = data.DateCreated;
                    shipping.IsActive = data.IsActive;
                    shipping.CompanyId = data.CompanyId;
                    shipping.Name = data.Name;
                    shipping.Code = data.Code;    //this should auto generate by system, and can not be changed
                    shipping.Slug = data.Slug;    //this should generate by some slug helper class in future.
                    shipping.BuyerCode = data.BuyerCode;
                    shipping.Image = data.Image;
                    shipping.Brand = data.Brand;
                    shipping.Department = data.Department;
                    shipping.Division = data.Division;
                    shipping.Remark = data.Remark;
                    shipping.Version += 1;
                    shipping.IsDeleted = false;
                    shipping.IsLatest = true;
                    shipping.ShippingType = data.ShippingType;
                    shipping.Address = data.Address;
                    shipping.RegName = data.RegName;
                    shipping.SearchName = data.SearchName;
                    shipping.Email = data.Email;
                    shipping.EndBuyer = data.EndBuyer;
                    shipping.Fax = data.Fax;
                    shipping.Tel = data.Tel;
                    shipping.City = data.City;
                    shipping.Country = data.Country;
                    shipping.PostalCode = data.PostalCode;
                    shipping.Contact = data.Contact;
                    DbContext.Shippings.Update(shipping);

                    // persist the changes into the Database.
                    DbContext.SaveChanges();

                    SaveImage(shipping.Id, shipping.Code, shipping.Version, shipping.Image);

                    return new JsonResult(data, DefaultJsonSettings);
                }
                return NotFound(new { error = "Data has not been found" });  // return a HTTP Status 404 (Not Found) if we couldn't find a suitable item.
            }
            return NotFound(new { error = "Invalid Data" });   // return a HTTP Status 404 (Not Found) if we couldn't find a suitable item.
        }

        // DELETE api/values/5
        [HttpDelete("DeleteShipping/{id}")]
        [Authorize]
        public IActionResult Delete(Guid id)
        {
            var shippingItem = DbContext.Shippings.FirstOrDefault(i => i.Id == id);

            if (shippingItem != null)
            {
                shippingItem.IsDeleted = true;

                shippingItem.IsLatest = false;
                DbContext.Shippings.Update(shippingItem);

                // then, find the nearest version to set its IsLatest to true
                var nearestitem = DbContext.Shippings.Where(x => x.IsDeleted == false && x.IsActive && x.Code == shippingItem.Code).OrderByDescending(x => x.Version).ToList().ElementAt(1);
                if (nearestitem != null)
                {
                    nearestitem.IsLatest = true;
                    DbContext.Shippings.Update(nearestitem);
                }

                DbContext.SaveChanges();



            }


            return Ok();

        }


        [HttpPost("UploadImage")]
        public IActionResult UploadImage()
        {
            //get image here
            var uploadimage = Request.Form.Files[0];
            if (uploadimage != null)
            {
                var tempfolderpath = Path.Combine(hostingEnv.WebRootPath + Constants.SHIPPINGTEMPIMAGEUPLOADFOLDER);
                var exists = Directory.Exists(tempfolderpath);
                if (!exists)
                    System.IO.Directory.CreateDirectory(tempfolderpath);
                // save to temp folder
                using (var fileStream = new FileStream(Path.Combine(hostingEnv.WebRootPath, tempfolderpath + uploadimage.FileName), FileMode.Create))
                {
                    uploadimage.CopyTo(fileStream);
                }


                var data = new ImageDataViewModel
                {
                    FileName = uploadimage.FileName.Trim(),
                    Size = uploadimage.Length,
                    Type = uploadimage.ContentType,
                    UploadPath = Constants.SHIPPINGTEMPIMAGEUPLOADFOLDER + uploadimage.FileName
                };

                return new JsonResult(data, DefaultJsonSettings);
            }
            return null;
        }

        public IActionResult SaveImage(Guid grapid, string code, int version, string tempfile)
        {

            var exist = System.IO.File.Exists(hostingEnv.WebRootPath + tempfile);
            if (exist)
            {

                var extension = Path.GetExtension(tempfile);
                var uploadspath = Path.Combine(hostingEnv.WebRootPath +
                                               Constants.SHIPPINGUPLOADFOLDER + Constants.COMPANYCODEFOLDER);

                var exists = Directory.Exists(uploadspath);
                if (!exists)
                    System.IO.Directory.CreateDirectory(uploadspath);
                var filename = Constants.COMPANYCODE + code + "V" + version + extension;
                System.IO.File.Copy(Path.Combine(hostingEnv.WebRootPath + tempfile), Path.Combine(uploadspath + filename));
                System.IO.DirectoryInfo di = new DirectoryInfo(hostingEnv.WebRootPath + Constants.SHIPPINGTEMPIMAGEUPLOADFOLDER);

                foreach (FileInfo file in di.GetFiles())
                {
                    file.Delete();
                }

                // update shippings image 
                var grap = DbContext.Shippings.FirstOrDefault(x => x.Id == grapid);
                if (grap != null)
                {
                    grap.Image = Constants.SHIPPINGUPLOADFOLDER + Constants.COMPANYCODEFOLDER + filename;
                    DbContext.Shippings.Update(grap);
                    DbContext.SaveChanges();
                }

            }

            return null;

        }
        #endregion

        #region Private Members

        private List<ShippingViewModel> ToItemViewModelList(IEnumerable<LibShipping> shippings)
        {
            var result = shippings.Select(TinyMapper.Map<ShippingViewModel>).ToList();
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
