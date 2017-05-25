using System;
using System.Collections.Generic;
using System.Linq;
using GUSLibrary.Classes;
using GUSLibrary.Data;
using GUSLibrary.ViewModels;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Nelibur.ObjectMapper;
using Newtonsoft.Json;

namespace GUSLibrary.Controllers
{
    [Route("api/[controller]")]
    public class ApplicationController : Controller
    {
        #region Private Fields
        protected GUSLibraryDbContext DbContext;
        #endregion Private Fields

        #region Constructor
        public ApplicationController(GUSLibraryDbContext context)
        {
            DbContext = context;
        }
        #endregion Constructor
        // GET: /<controller>/

        #region Attribute-based Routing
        // GET: api/values
        [HttpPost("GetApplicationList")]
        public IActionResult GetApplicationList([FromBody]SearchGeneralFilterViewModel data)
        {
            // return a HTTP Status 404 (Not Found) if we couldn't find a suitable item.
            if (data == null)
                return NotFound(new { error = "Invalid Data" });

            var companyIdFromSearchData = data.CompanyId ?? Guid.Empty;
            var companyId = CompanyIdHelper.GetCompanyId(companyIdFromSearchData);
            var name = data.Name; // should come from search data
            var code = data.Code; // should come from search data
            var buyerCode = data.BuyerCode; // padding
            var itemList = DbContext.Applications.Where(x =>
            (companyId == Guid.Empty) || (x.CompanyId == companyId) &&
            (string.IsNullOrEmpty(name) || x.Name.ToLower().Contains(name.Trim().ToLower())) &&
            (string.IsNullOrEmpty(code) || x.Code.ToLower().Contains(code.Trim().ToLower())) &&
            (string.IsNullOrEmpty(buyerCode) || x.BuyerCode.ToLower().Contains(buyerCode.Trim().ToLower()))
            )
            .GroupBy(x => x.Code).Select(y => y.FirstOrDefault(z => z.IsLatest && !(z.IsDeleted))).ToArray().OrderBy(x => x.Name);

            return new JsonResult(ToItemViewModelList(itemList), DefaultJsonSettings);
        }


        // GET by Id
        [HttpGet("GetApplicationById/{id}")]
        public IActionResult GetApplicationById(Guid id)
        {
            Guid companyIdFromSearchData = Guid.Empty;
            Guid companyId = CompanyIdHelper.GetCompanyId(companyIdFromSearchData);
            var item = DbContext.Applications.Where(x => (companyId == Guid.Empty) || (x.CompanyId == companyId)).FirstOrDefault(i => i.Id == id);
            if (item != null) return new JsonResult(TinyMapper.Map<ApplicationViewModel>(item), DefaultJsonSettings);
            return NotFound(new { Error = $"ID {id} has not been found" });
        }


        // GET api/values/slug
        [HttpGet("GetApplicationBySlug/{slug}")]
        public IActionResult GetApplicationBySlug(string slug)
        {
            Guid companyIdFromSearchData = Guid.Empty;
            Guid companyId = CompanyIdHelper.GetCompanyId(companyIdFromSearchData);
            var item = DbContext.Applications.Where(x => (companyId == Guid.Empty) || (x.CompanyId == companyId)).Where(x=>x.IsLatest && !x.IsDeleted).FirstOrDefault(i => i.Slug == slug);
            if (item != null) return new JsonResult(TinyMapper.Map<ApplicationViewModel>(item), DefaultJsonSettings);
            return NotFound(new { Error = $"Slug {slug} has not been found" });
        }

        // Get item by code
        [HttpGet("GetApplicationByCode/{code}")]
        public IActionResult GetApplicationByCode(string code)
        {
            if (!string.IsNullOrEmpty(code))
            {
                Guid companyIdFromSearchData = Guid.Empty;
                Guid companyId = CompanyIdHelper.GetCompanyId(companyIdFromSearchData);
                var itemList = DbContext.Applications.Where(x =>

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
        [HttpGet("GetApplicationListByCode/{code}")]
        public IActionResult GetApplicationListByCode(string code)
        {
            if (!string.IsNullOrEmpty(code))
            {
                Guid companyIdFromSearchData = Guid.Empty;
                Guid companyId = CompanyIdHelper.GetCompanyId(companyIdFromSearchData);

                var itemList = DbContext.Applications.Where(x =>

                    ((companyId == Guid.Empty) || (x.CompanyId == companyId)) &&
                    x.Code.ToLower().Equals(code.Trim().ToLower())

                    )
                    .OrderByDescending(x => x.Version);

                return new JsonResult(ToItemViewModelList(itemList), DefaultJsonSettings);
            }
            return BadRequest(new { error = "Code is empty." });
        }


        // POST api/values
        [HttpPost("AddApplication")]
        public IActionResult Add([FromBody]ApplicationViewModel data)
        {
            if (data == null)
                return NotFound(new { error = "Invalid Data" });
            // return a HTTP Status 404 (Not Found) if we couldn't find a suitable item.
            // Get company Id base on the user type
            var companyIdFromSearchData = Guid.Empty;
            var companyId = CompanyIdHelper.GetCompanyId(companyIdFromSearchData);

            // Get last code for current library type
            var ch = new CodeHelper(DbContext);
            string code = ch.GetTypeCode(EnumHelper.LibType.LibApplication.ToString());

            // Check if slug is duplicate or not
            string slug = SlugHelper.GetSlug(data.CompanyId, DbContext, data.Name, EnumHelper.LibType.LibApplication.ToString());
            var app = new LibApplication()
            {
                Id = Guid.NewGuid(),
                DateCreated = DateTime.Now,
                DateModified = DateTime.Now,
                IsActive = data.IsActive,
                CompanyId = companyId,
                Name = data.Name,
                Code = code,   //this should auto generate by system, and can not be changed
                Version = 0,
                Slug = slug,    //this should generate by some slug helper class in future.
                IsLatest = true,
                IsDeleted = false,
                BuyerCode = data.BuyerCode
            };

            DbContext.Applications.Add(app);

            // persist the changes into the Database.
            DbContext.SaveChanges();

            // set new id to data object
            data.Id = app.Id;


            return new JsonResult(data, DefaultJsonSettings);
        }

        // PUT api/values/5
        [HttpPut("UpdateApplication")]
        [Authorize]
        public IActionResult Update([FromBody]ApplicationViewModel data)
        {
            if (data != null)
            {
                var app = DbContext.Applications.FirstOrDefault(i => i.Id.Equals(data.Id));

                if (app != null)
                {
                    // Get company Id base on the user type
                    Guid companyIdFromSearchData = Guid.Empty;
                    Guid companyId = CompanyIdHelper.GetCompanyId(companyIdFromSearchData);

                    // Check if slug is duplicate or not
                    string slug = SlugHelper.GetSlug(data.CompanyId, DbContext, data.Name, EnumHelper.LibType.LibApplication.ToString());


                    // Copy the old record's data into a new record
                    var application = new LibApplication()
                    {
                        Id = Guid.NewGuid(),
                        DateCreated = app.DateCreated,
                        DateModified = app.DateModified,
                        IsActive = app.IsActive,
                        CompanyId = app.CompanyId,
                        Name = app.Name,
                        Code = app.Code,
                        Version = app.Version,
                        Slug = app.Slug,
                        BuyerCode = app.BuyerCode,
                        IsLatest = false,
                        IsDeleted = app.IsDeleted
                    };
                    DbContext.Applications.Add(application);


                    // Update the old record data.
                    app.DateModified = DateTime.Now;
                    app.IsActive = data.IsActive;
                    app.CompanyId = companyId;
                    app.Name = data.Name;
                    app.Version = app.Version + 1;
                    app.Slug = slug;
                    app.BuyerCode = data.BuyerCode;
                    application.IsLatest = true;
                    application.IsDeleted = false;
                    DbContext.Applications.Update(app);


                    // persist the changes into the Database.
                    DbContext.SaveChanges();

                    return new JsonResult(data, DefaultJsonSettings);
                }
                return NotFound(new { error = "Data has not been found" });  // return a HTTP Status 404 (Not Found) if we couldn't find a suitable item.
            }
            return NotFound(new { error = "Invalid Data" });   // return a HTTP Status 404 (Not Found) if we couldn't find a suitable item.
        }

        // DELETE api/values/5
        [HttpDelete("DeleteApplication/{id}")]
        [Authorize]
        public IActionResult Delete(Guid id)
        {
            var item = DbContext.Applications.FirstOrDefault(i => i.Id.Equals(id));
            if (item != null)
            {
                item.IsDeleted = true;
                item.IsLatest = false;  
                DbContext.Applications.Update(item);
            }

            // then, find the nearest version to set its IsLatest to true
            var nearestitem = DbContext.Applications.Where(x => x.IsDeleted == false && x.IsActive && x.Code == item.Code).OrderByDescending(x => x.Version).ToList().ElementAt(1);
            if (nearestitem != null)
            {
                nearestitem.IsLatest = true;
                DbContext.Applications.Update(nearestitem);

            }
            DbContext.SaveChanges();

            return Ok();
        }
        #endregion

        #region Private Memers

        private List<ApplicationViewModel> ToItemViewModelList(IEnumerable<LibApplication> accessoryDesc)
        {
            var result = Enumerable.ToList(accessoryDesc.Select(TinyMapper.Map<ApplicationViewModel>));
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
