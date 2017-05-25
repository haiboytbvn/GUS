﻿using System;
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
    public class FabricProductTypeController : Controller
    {
        #region Private Fields
        protected GUSLibraryDbContext DbContext;
        #endregion Private Fields

        #region Constructor
        public FabricProductTypeController(GUSLibraryDbContext context)
        {
            DbContext = context;
        }
        #endregion Constructor
        // GET: /<controller>/

        #region Attribute-based Routing
        // GET: api/values
        [HttpPost("GetFabricProductTypeList")]
        public IActionResult GetFabricProductTypeList([FromBody]SearchGeneralFilterViewModel data)
        {
            // return a HTTP Status 404 (Not Found) if we couldn't find a suitable item.
            if (data == null)
                return NotFound(new { error = "Invalid Data" });

            var companyIdFromSearchData = data.CompanyId ?? Guid.Empty;
            var companyId = CompanyIdHelper.GetCompanyId(companyIdFromSearchData);
            var name = data.Name; // should come from search data
            var code = data.Code; // should come from search data
            var buyerCode = data.BuyerCode; // padding
            var itemList = DbContext.FabricProductTypes.Where(x =>
            (companyId == Guid.Empty) || (x.CompanyId == companyId) &&
            (string.IsNullOrEmpty(name) || x.Name.ToLower().Contains(name.Trim().ToLower())) &&
            (string.IsNullOrEmpty(code) || x.Code.ToLower().Contains(code.Trim().ToLower())) &&
            (string.IsNullOrEmpty(buyerCode) || x.BuyerCode.ToLower().Contains(buyerCode.Trim().ToLower()))
            )
             .Where(z => z.IsLatest && !(z.IsDeleted) && z.IsActive).OrderBy(x => x.Name);

            // save the total number of records
            var total = itemList.Count();
            // pass in the Model
            var result = new FabricProductTypeListViewModel();
            result.Data = new List<FabricProductTypeViewModel>();
            result.Paging = new Pagination();
            if (data.Paging.PageNumber == 0)
            {
                // if pagenumuber ==0 , get All
                result.Data = itemList.Select(x => TinyMapper.Map<FabricProductTypeViewModel>(x)).ToList();
                result.Paging.PageNumber = 0;
                result.Paging.Total = total;
                result.Paging.Show = total;
                result.Paging.PageCount = new List<int>();
                result.Paging.PageSize = total;
                return new JsonResult(result, DefaultJsonSettings);
            }
            // else, do Pagination here
            var list = itemList.Skip((data.Paging.PageNumber - 1) * data.Paging.PageSize).Take(data.Paging.PageSize);
            result.Data = list.Select(x => TinyMapper.Map<FabricProductTypeViewModel>(x)).ToList();

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
        [HttpGet("GetFabricProductTypeById/{id}")]
        public IActionResult GetFabricProductTypeById(Guid id)
        {
            Guid companyIdFromSearchData = Guid.Empty;
            Guid companyId = CompanyIdHelper.GetCompanyId(companyIdFromSearchData);
            var item = DbContext.FabricProductTypes.Where(x => (companyId == Guid.Empty) || (x.CompanyId == companyId)).FirstOrDefault(i => i.Id == id);
            if (item != null) return new JsonResult(TinyMapper.Map<FabricProductTypeViewModel>(item), DefaultJsonSettings);
            return NotFound(new { Error = $"ID {id} has not been found" });
        }


        // GET api/values/slug
        [HttpGet("GetFabricProductTypeBySlug/{slug}")]
        public IActionResult GetFabricProductTypeBySlug(string slug)
        {
            Guid companyIdFromSearchData = Guid.Empty;
            Guid companyId = CompanyIdHelper.GetCompanyId(companyIdFromSearchData);
            var item = DbContext.FabricProductTypes.Where(x => (companyId == Guid.Empty) || (x.CompanyId == companyId)).Where(x => x.IsLatest && !x.IsDeleted).FirstOrDefault(i => i.Slug == slug);
            if (item != null) return new JsonResult(TinyMapper.Map<FabricProductTypeViewModel>(item), DefaultJsonSettings);
            return NotFound(new { Error = $"Slug {slug} has not been found" });
        }

        // Get item by code
        [HttpGet("GetFabricProductTypeByCode/{code}")]
        public IActionResult GetFabricProductTypeByCode(string code)
        {
            if (!string.IsNullOrEmpty(code))
            {
                Guid companyIdFromSearchData = Guid.Empty;
                Guid companyId = CompanyIdHelper.GetCompanyId(companyIdFromSearchData);
                var itemList = DbContext.FabricProductTypes.Where(x =>

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
        [HttpGet("GetFabricProductTypeListByCode/{code}")]
        public IActionResult GetFabricProductTypeListByCode(string code)
        {
            if (!string.IsNullOrEmpty(code))
            {
                Guid companyIdFromSearchData = Guid.Empty;
                Guid companyId = CompanyIdHelper.GetCompanyId(companyIdFromSearchData);

                var itemList = DbContext.FabricProductTypes.Where(x =>

                    ((companyId == Guid.Empty) || (x.CompanyId == companyId)) &&
                    x.Code.ToLower().Equals(code.Trim().ToLower())

                    )
                    .OrderByDescending(x => x.Version);

                return new JsonResult(ToItemViewModelList(itemList), DefaultJsonSettings);
            }
            return BadRequest(new { error = "Code is empty." });
        }


        // POST api/values
        [HttpPost("AddFabricProductType")]
        public IActionResult Add([FromBody]FabricProductTypeViewModel data)
        {
            if (data == null)
                return NotFound(new { error = "Invalid Data" });
            // return a HTTP Status 404 (Not Found) if we couldn't find a suitable item.
            // Get company Id base on the user type
            var companyIdFromSearchData = Guid.Empty;
            var companyId = CompanyIdHelper.GetCompanyId(companyIdFromSearchData);

            // Get last code for current library type
            var ch = new CodeHelper(DbContext);
            string code = ch.GetTypeCode(EnumHelper.LibType.LibFabricProductType.ToString());

            // Check if slug is duplicate or not
            string slug = SlugHelper.GetSlug(data.CompanyId, DbContext, data.Name, EnumHelper.LibType.LibFabricProductType.ToString());
            var fabptype = new LibFabricProductType()
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

            DbContext.FabricProductTypes.Add(fabptype);

            // persist the changes into the Database.
            DbContext.SaveChanges();

            // set new id to data object
            data.Id = fabptype.Id;


            return new JsonResult(data, DefaultJsonSettings);
        }

        // PUT api/values/5
        [HttpPut("UpdateFabricProductType")]
        [Authorize]
        public IActionResult Update([FromBody]FabricProductTypeViewModel data)
        {
            if (data != null)
            {
                var fabptype = DbContext.FabricProductTypes.FirstOrDefault(i => i.Id.Equals(data.Id));

                if (fabptype != null)
                {
                    // Get company Id base on the user type
                    Guid companyIdFromSearchData = Guid.Empty;
                    Guid companyId = CompanyIdHelper.GetCompanyId(companyIdFromSearchData);

                    // Check if slug is duplicate or not
                    string slug = SlugHelper.GetSlug(data.CompanyId, DbContext, data.Name, EnumHelper.LibType.LibFabricProductType.ToString());


                    // Copy the old record's data into a new record
                    var fptype = new LibFabricProductType()
                    {
                        Id = Guid.NewGuid(),
                        DateCreated = fabptype.DateCreated,
                        DateModified = fabptype.DateModified,
                        IsActive = fabptype.IsActive,
                        CompanyId = fabptype.CompanyId,
                        Name = fabptype.Name,
                        Code = fabptype.Code,
                        Version = fabptype.Version,
                        Slug = fabptype.Slug,
                        BuyerCode = fabptype.BuyerCode,
                        IsLatest = false,
                        IsDeleted = fabptype.IsDeleted
                    };
                    DbContext.FabricProductTypes.Add(fptype);


                    // Update the old record data.
                    fabptype.DateModified = DateTime.Now;
                    fabptype.IsActive = data.IsActive;
                    fabptype.CompanyId = companyId;
                    fabptype.Name = data.Name;
                    fabptype.Version = fabptype.Version + 1;
                    fabptype.Slug = slug;
                    fabptype.BuyerCode = data.BuyerCode;
                    fabptype.IsLatest = true;
                    fabptype.IsDeleted = false;
                    DbContext.FabricProductTypes.Update(fabptype);


                    // persist the changes into the Database.
                    DbContext.SaveChanges();

                    return new JsonResult(data, DefaultJsonSettings);
                }
                return NotFound(new { error = "Data has not been found" });  // return a HTTP Status 404 (Not Found) if we couldn't find a suitable item.
            }
            return NotFound(new { error = "Invalid Data" });   // return a HTTP Status 404 (Not Found) if we couldn't find a suitable item.
        }

        // DELETE api/values/5
        [HttpDelete("DeleteFabricProductType/{id}")]
        [Authorize]
        public IActionResult Delete(Guid id)
        {
            var item = DbContext.FabricProductTypes.FirstOrDefault(i => i.Id.Equals(id));
            if (item != null)
            {
                item.IsDeleted = true;
                item.IsLatest = false;
                DbContext.FabricProductTypes.Update(item);
            }
            DbContext.SaveChanges();

            return Ok();
        }
        #endregion

        #region Private Memers

        private List<FabricProductTypeViewModel> ToItemViewModelList(IEnumerable<LibFabricProductType> listtypes)
        {
            var result = Enumerable.ToList(listtypes.Select(TinyMapper.Map<FabricProductTypeViewModel>));
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
