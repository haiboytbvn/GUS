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
    public class ReasonForAbortingProjectController : Controller
    {
        #region Private Fields
        protected GUSLibraryDbContext DbContext;
        #endregion Private Fields

        #region Constructor
        public ReasonForAbortingProjectController(GUSLibraryDbContext context)
        {
            DbContext = context;
        }
        #endregion Constructor
        // GET: /<controller>/

        #region Attribute-based Routing
        // GET: api/values
        [HttpPost("GetReasonForAbortingProjectList")]
        public IActionResult GetReasonForAbortingProjectList([FromBody]SearchGeneralFilterViewModel data)
        {
            // return a HTTP Status 404 (Not Found) if we couldn't find a suitable item.
            if (data == null)
                return NotFound(new { error = "Invalid Data" });

            var companyIdFromSearchData = data.CompanyId ?? Guid.Empty;
            var companyId = CompanyIdHelper.GetCompanyId(companyIdFromSearchData);
            var name = data.Name; // should come from search data
            var code = data.Code; // should come from search data
            var buyerCode = data.BuyerCode; // padding
            var itemList = DbContext.ReasonForAbortingProjects.Where(x =>
            (companyId == Guid.Empty) || (x.CompanyId == companyId) &&
            (string.IsNullOrEmpty(name) || x.Name.ToLower().Contains(name.Trim().ToLower())) &&
            (string.IsNullOrEmpty(code) || x.Code.ToLower().Contains(code.Trim().ToLower())) &&
            (string.IsNullOrEmpty(buyerCode) || x.BuyerCode.ToLower().Contains(buyerCode.Trim().ToLower()))
            )
           .Where(z => z.IsLatest && !(z.IsDeleted) && z.IsActive).OrderBy(x => x.Name);

            // save the total number of records
            var total = itemList.Count();
            // pass in the Model
            var result = new ReasonForAbortingProjectListViewModel();
            result.Data = new List<ReasonForAbortingProjectViewModel>();
            result.Paging = new Pagination();
            if (data.Paging.PageNumber == 0)
            {
                // if pagenumuber ==0 , get All
                result.Data = itemList.Select(x => TinyMapper.Map<ReasonForAbortingProjectViewModel>(x)).ToList();
                result.Paging.PageNumber = 0;
                result.Paging.Total = total;
                result.Paging.Show = total;
                result.Paging.PageCount = new List<int>();
                result.Paging.PageSize = total;
                return new JsonResult(result, DefaultJsonSettings);
            }
            // else, do Pagination here
            var list = itemList.Skip((data.Paging.PageNumber - 1) * data.Paging.PageSize).Take(data.Paging.PageSize);
            result.Data = list.Select(x => TinyMapper.Map<ReasonForAbortingProjectViewModel>(x)).ToList();

            // pass in Pagination parmeters to show in front-end

            result.Paging.Total = total;
            result.Paging.PageSize = data.Paging.PageSize;
            result.Paging.PageNumber = data.Paging.PageNumber;
            result.Paging.Show = list.Count();
            //calculate and return pages of list
            var numberofpages = Math.Ceiling((decimal)total / data.Paging.PageSize);
            result.Paging.PageCount = new List<int>();
            if (data.Paging.PageNumber > 1) result.Paging.PageCount.Add(data.Paging.PageNumber - 1);
            else result.Paging.PageCount.Add(0);
            for (var i = 1; i <= numberofpages; i++)
            {
                if (i >= data.Paging.PageNumber && i < data.Paging.PageNumber + 3 && i <= numberofpages)
                    result.Paging.PageCount.Add(i);
            }
            if (data.Paging.PageNumber < numberofpages) result.Paging.PageCount.Add(data.Paging.PageNumber + 1);
            else result.Paging.PageCount.Add(0);
            return new JsonResult(result, DefaultJsonSettings);
        }


        // GET by Id
        [HttpGet("GetReasonForAbortingProjectById/{id}")]
        public IActionResult GetReasonForAbortingProjectById(Guid id)
        {
            Guid companyIdFromSearchData = Guid.Empty;
            Guid companyId = CompanyIdHelper.GetCompanyId(companyIdFromSearchData);
            var item = DbContext.ReasonForAbortingProjects.Where(x => (companyId == Guid.Empty) || (x.CompanyId == companyId)).FirstOrDefault(i => i.Id == id);
            if (item != null) return new JsonResult(TinyMapper.Map<ReasonForAbortingProjectViewModel>(item), DefaultJsonSettings);
            return NotFound(new { Error = $"ID {id} has not been found" });
        }


        // GET api/values/slug
        [HttpGet("GetReasonForAbortingProjectBySlug/{slug}")]
        public IActionResult GetReasonForAbortingProjectBySlug(string slug)
        {
            Guid companyIdFromSearchData = Guid.Empty;
            Guid companyId = CompanyIdHelper.GetCompanyId(companyIdFromSearchData);
            var item = DbContext.ReasonForAbortingProjects.Where(x => (companyId == Guid.Empty) || (x.CompanyId == companyId)).Where(x => x.IsLatest && !x.IsDeleted).FirstOrDefault(i => i.Slug == slug);
            if (item != null) return new JsonResult(TinyMapper.Map<ReasonForAbortingProjectViewModel>(item), DefaultJsonSettings);
            return NotFound(new { Error = $"Slug {slug} has not been found" });
        }

        // Get item by code
        [HttpGet("GetReasonForAbortingProjectByCode/{code}")]
        public IActionResult GetReasonForAbortingProjectByCode(string code)
        {
            if (!string.IsNullOrEmpty(code))
            {
                Guid companyIdFromSearchData = Guid.Empty;
                Guid companyId = CompanyIdHelper.GetCompanyId(companyIdFromSearchData);
                var itemList = DbContext.ReasonForAbortingProjects.Where(x =>

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
        [HttpGet("GetReasonForAbortingProjectListByCode/{code}")]
        public IActionResult GetReasonForAbortingProjectListByCode(string code)
        {
            if (!string.IsNullOrEmpty(code))
            {
                Guid companyIdFromSearchData = Guid.Empty;
                Guid companyId = CompanyIdHelper.GetCompanyId(companyIdFromSearchData);

                var itemList = DbContext.ReasonForAbortingProjects.Where(x =>

                    ((companyId == Guid.Empty) || (x.CompanyId == companyId)) &&
                    x.Code.ToLower().Equals(code.Trim().ToLower())

                    )
                    .OrderByDescending(x => x.Version);

                return new JsonResult(ToItemViewModelList(itemList), DefaultJsonSettings);
            }
            return BadRequest(new { error = "Code is empty." });
        }


        // POST api/values
        [HttpPost("AddReasonForAbortingProject")]
        public IActionResult Add([FromBody]ReasonForAbortingProjectViewModel data)
        {
            if (data == null)
                return NotFound(new { error = "Invalid Data" });
            // return a HTTP Status 404 (Not Found) if we couldn't find a suitable item.
            // Get company Id base on the user type
            var companyIdFromSearchData = Guid.Empty;
            var companyId = CompanyIdHelper.GetCompanyId(companyIdFromSearchData);

            // Get last code for current library type
            var ch = new CodeHelper(DbContext);
            string code = ch.GetTypeCode(EnumHelper.LibType.LibReasonForAbortingProject.ToString());

            // Check if slug is duplicate or not
            string slug = SlugHelper.GetSlug(data.CompanyId, DbContext, data.Name, EnumHelper.LibType.LibReasonForAbortingProject.ToString());
            var reasontoupdate = new LibReasonForAbortingProject()
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

            DbContext.ReasonForAbortingProjects.Add(reasontoupdate);

            // persist the changes into the Database.
            DbContext.SaveChanges();

            // set new id to data object
            data.Id = reasontoupdate.Id;


            return new JsonResult(data, DefaultJsonSettings);
        }

        // PUT api/values/5
        [HttpPut("UpdateReasonForAbortingProject")]
        [Authorize]
        public IActionResult Update([FromBody]ReasonForAbortingProjectViewModel data)
        {
            if (data != null)
            {
                var reasontoupdate = DbContext.ReasonForAbortingProjects.FirstOrDefault(i => i.Id.Equals(data.Id));

                if (reasontoupdate != null)
                {
                    // Get company Id base on the user type
                    Guid companyIdFromSearchData = Guid.Empty;
                    Guid companyId = CompanyIdHelper.GetCompanyId(companyIdFromSearchData);

                    // Check if slug is duplicate or not
                    string slug = SlugHelper.GetSlug(data.CompanyId, DbContext, data.Name, EnumHelper.LibType.LibReasonForAbortingProject.ToString());


                    // Copy the old record's data into a new record
                    var reason = new LibReasonForAbortingProject()
                    {
                        Id = Guid.NewGuid(),
                        DateCreated = reasontoupdate.DateCreated,
                        DateModified = reasontoupdate.DateModified,
                        IsActive = reasontoupdate.IsActive,
                        CompanyId = reasontoupdate.CompanyId,
                        Name = reasontoupdate.Name,
                        Code = reasontoupdate.Code,
                        Version = reasontoupdate.Version,
                        Slug = reasontoupdate.Slug,
                        BuyerCode = reasontoupdate.BuyerCode,
                        IsLatest = false,
                        IsDeleted = reasontoupdate.IsDeleted
                    };
                    DbContext.ReasonForAbortingProjects.Add(reason);


                    // Update the old record data.
                    reasontoupdate.DateModified = DateTime.Now;
                    reasontoupdate.IsActive = data.IsActive;
                    reasontoupdate.CompanyId = companyId;
                    reasontoupdate.Name = data.Name;
                    reasontoupdate.Version = reasontoupdate.Version + 1;
                    reasontoupdate.Slug = slug;
                    reasontoupdate.BuyerCode = data.BuyerCode;
                    reason.IsLatest = true;
                    reason.IsDeleted = false;
                    DbContext.ReasonForAbortingProjects.Update(reasontoupdate);


                    // persist the changes into the Database.
                    DbContext.SaveChanges();

                    return new JsonResult(data, DefaultJsonSettings);
                }
                return NotFound(new { error = "Data has not been found" });  // return a HTTP Status 404 (Not Found) if we couldn't find a suitable item.
            }
            return NotFound(new { error = "Invalid Data" });   // return a HTTP Status 404 (Not Found) if we couldn't find a suitable item.
        }

        // DELETE api/values/5
        [HttpDelete("DeleteReasonForAbortingProject/{id}")]
        [Authorize]
        public IActionResult Delete(Guid id)
        {
            var item = DbContext.ReasonForAbortingProjects.FirstOrDefault(i => i.Id.Equals(id));
            if (item != null)
            {
                item.IsDeleted = true;
                item.IsLatest = false;
                DbContext.ReasonForAbortingProjects.Update(item);
            }
            DbContext.SaveChanges();

            return Ok();
        }
        #endregion

        #region Private Memers

        private List<ReasonForAbortingProjectViewModel> ToItemViewModelList(IEnumerable<LibReasonForAbortingProject> accessoryDesc)
        {
            var result = Enumerable.ToList(accessoryDesc.Select(TinyMapper.Map<ReasonForAbortingProjectViewModel>));
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
