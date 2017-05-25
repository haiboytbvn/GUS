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
    public class AccessoryTypeController : Controller
    {
        #region Private Fields
        protected GUSLibraryDbContext DbContext;
        #endregion Private Fields

        #region Constructor
        public AccessoryTypeController(GUSLibraryDbContext context)
        {
            DbContext = context;
        }
        #endregion Constructor

        #region Attribute-based Routing
        // Get item by id
        [HttpGet("GetAccessoryTypebyId/{id}")]
        public IActionResult GetAccessoryTypebyId(Guid id)
        {
            Guid companyIdFromSearchData = Guid.Empty;
            Guid companyId = CompanyIdHelper.GetCompanyId(companyIdFromSearchData);
            var item = DbContext.AccessoryTypes.Where(x => (companyId == Guid.Empty) || (x.CompanyId == companyId)).FirstOrDefault(i => i.Id == id);
            if (item != null) return new JsonResult(TinyMapper.Map<AccessoryTypeViewModel>(item), DefaultJsonSettings);
            return NotFound(new { Error = $"ID {id} has not been found" });
        }

        // Get item by code
        [HttpGet("GetAccessoryTypebyCode/{code}")]
        public IActionResult GetAccessoryTypebyCode(string code)
        {
            Guid companyIdFromSearchData = Guid.Empty;
            Guid companyId = CompanyIdHelper.GetCompanyId(companyIdFromSearchData);
            //var item = DbContext.AccessoryTypes.Where(x => (companyId == Guid.Empty) || (x.CompanyId == companyId)).OrderByDescending(x => x.Version).FirstOrDefault(i => i.Code == code);
            var item = DbContext.AccessoryTypes.Where(x => (companyId == Guid.Empty) || (x.CompanyId == companyId)).Where(x => x.IsLatest && !(x.IsDeleted)).FirstOrDefault(i => i.Code == code);
            if (item != null) return new JsonResult(TinyMapper.Map<AccessoryTypeViewModel>(item), DefaultJsonSettings);
            return NotFound(new { Error = $"Code {code} has not been found" });
        }

        // Get item by slug
        [HttpGet("GetAccessoryTypebySlug/{slug}")]
        public IActionResult GetAccessoryTypebySlug(string slug)
        {
            Guid companyIdFromSearchData = Guid.Empty;
            Guid companyId = CompanyIdHelper.GetCompanyId(companyIdFromSearchData);
            //var item = DbContext.AccessoryTypes.Where(x => (companyId == Guid.Empty) || (x.CompanyId == companyId)).OrderByDescending(x => x.Version).FirstOrDefault(i => i.Slug == slug);
            var item = DbContext.AccessoryTypes.Where(x => (companyId == Guid.Empty) || (x.CompanyId == companyId)).Where(x => x.IsLatest && !(x.IsDeleted)).FirstOrDefault(i => i.Slug == slug);
            if (item != null) return new JsonResult(TinyMapper.Map<AccessoryTypeViewModel>(item), DefaultJsonSettings);
            return NotFound(new { Error = $"Slug {slug} has not been found" });
        }

        // Get item list with searching parameter
        [HttpPost("GetAccessoryTypeList")]
        public IActionResult GetAccessoryTypeList([FromBody]SearchGeneralFilterViewModel data)
        {
            // return a HTTP Status 404 (Not Found) if we couldn't find a suitable item.
            if (data == null)
                return NotFound(new { error = String.Format("Invalid Data") });

            Guid companyIdFromSearchData = data.CompanyId == null ? Guid.Empty : data.CompanyId.Value;
            Guid companyId = CompanyIdHelper.GetCompanyId(companyIdFromSearchData);
            string name = data.Name;            // should come from search data
            string code = data.Code;            // should come from search data
            string buyerCode = data.BuyerCode;  // should come from search data


            var itemList = DbContext.AccessoryTypes.Where(x =>

            (companyId == Guid.Empty) || (x.CompanyId == companyId) &&
            (string.IsNullOrEmpty(name) || x.Name.ToLower().Contains(name.Trim().ToLower())) &&
            (string.IsNullOrEmpty(code) || x.Code.ToLower().Contains(code.Trim().ToLower())) &&
            (string.IsNullOrEmpty(buyerCode) || x.BuyerCode.ToLower().Contains(buyerCode.Trim().ToLower()))
            )
            .Where(z => z.IsLatest && !(z.IsDeleted) && z.IsActive).OrderBy(x => x.Name);

            // save the total number of records
            var total = itemList.Count();
            // pass in the Model
            var result = new AccessoryTypeListViewModel();
            result.Data = new List<AccessoryTypeViewModel>();
            result.Paging = new Pagination();
            if (data.Paging.PageNumber == 0)
            {
                // if pagenumuber ==0 , get All
                result.Data = itemList.Select(x => TinyMapper.Map<AccessoryTypeViewModel>(x)).ToList();
                result.Paging.PageNumber = 0;
                result.Paging.Total = total;
                result.Paging.Show = total;
                result.Paging.PageCount = new List<int>();
                result.Paging.PageSize = total;
                return new JsonResult(result, DefaultJsonSettings);
            }
            // else, do Pagination here
            var list = itemList.Skip((data.Paging.PageNumber - 1) * data.Paging.PageSize).Take(data.Paging.PageSize);
            result.Data = list.Select(x => TinyMapper.Map<AccessoryTypeViewModel>(x)).ToList();

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

        // Get item list by code (return all version of items with same code)
        [HttpGet("GetAccessoryTypeListByCode/{code}")]
        public IActionResult GetAccessoryTypeListByCode(string code)
        {
            if (!string.IsNullOrEmpty(code))
            {
                Guid companyIdFromSearchData = Guid.Empty;
                Guid companyId = CompanyIdHelper.GetCompanyId(companyIdFromSearchData);
                var itemList = DbContext.AccessoryTypes.Where(x =>

                    ((companyId == Guid.Empty) || (x.CompanyId == companyId)) &&
                    x.Code.ToLower().Equals(code.Trim().ToLower())

                    )
                    .Where(x => !(x.IsDeleted))
                    .OrderByDescending(x => x.Version);
                // you should get all the version of the record with same code.
                // so we dont use "IsLatest" here
                // but we still get the records which is not deleted

                return new JsonResult(ToItemViewModelList(itemList), DefaultJsonSettings);
            }
            else
            {
                return BadRequest(new { error = String.Format("Code is empty.") });
            }
        }




        // POST api/values
        [HttpPost("AddAccessoryType")]
        [Authorize]
        public IActionResult Add([FromBody]AccessoryTypeViewModel data)
        {
            // return a HTTP Status 404 (Not Found) if we couldn't find a suitable item.
            if (data == null)
                return NotFound(new { error = String.Format("Invalid Data") });

            // Get company Id base on the user type
            Guid companyIdFromSearchData = Guid.Empty;
            Guid companyId = CompanyIdHelper.GetCompanyId(companyIdFromSearchData);

            // Get last code for current library type
            CodeHelper ch = new CodeHelper(DbContext);
            string code = ch.GetAccessoryTypeCode(EnumHelper.LibType.LibAccessoryType.ToString());

            // Check if slug is duplicate or not
            string slug = SlugHelper.GetSlug(data.CompanyId, DbContext, data.Name, EnumHelper.LibType.LibAccessoryType.ToString());


            var guid = Guid.NewGuid();
            var accessory = new LibAccessoryType()
            {
                Id = guid,
                DateCreated = DateTime.Now,
                DateModified = DateTime.Now,
                CompanyId = companyId,
                IsActive = data.IsActive,
                Name = data.Name,
                Code = code,
                BuyerCode = data.BuyerCode,
                Slug = slug,
                Version = 0,
                IsLatest = true,
                IsDeleted = false
            };

            DbContext.AccessoryTypes.Add(accessory);

            // persist the changes into the Database.
            DbContext.SaveChanges();

            // set new id to data object
            data.Id = accessory.Id;


            return new JsonResult(data, DefaultJsonSettings);
        }

        // PUT api/values/5
        [HttpPut("UpdateAccessoryType")]
        [Authorize]
        public IActionResult Update([FromBody]AccessoryTypeViewModel data)
        {
            if (data != null)
            {
                var AccessoryType = DbContext.AccessoryTypes.FirstOrDefault(i => i.Id.Equals(data.Id));

                if (AccessoryType != null)
                {
                    // Get company Id base on the user type
                    Guid companyIdFromSearchData = Guid.Empty;
                    Guid companyId = CompanyIdHelper.GetCompanyId(companyIdFromSearchData);

                    // Check if slug is duplicate or not
                    string slug = SlugHelper.GetSlug(data.CompanyId, DbContext, data.Name, EnumHelper.LibType.LibAccessoryType.ToString());


                    // Copy the old record's data into a new record
                    var accessory = new LibAccessoryType()
                    {
                        Id = Guid.NewGuid(),
                        DateCreated = AccessoryType.DateCreated,
                        DateModified = AccessoryType.DateModified,
                        IsActive = AccessoryType.IsActive,
                        CompanyId = AccessoryType.CompanyId,

                        Name = AccessoryType.Name,
                        Code = AccessoryType.Code,
                        BuyerCode = AccessoryType.BuyerCode,
                        Slug = AccessoryType.Slug,
                        Version = AccessoryType.Version,
                        IsLatest = false,                       // you will change this flag to false here, cause it will be an achieve record.
                        IsDeleted = AccessoryType.IsDeleted     // Actually if you can update some record, it shouldn't be deleted, but just in case I keep using the old record value.
                                                                // you can just replace the "AccessoryType.IsDeleted" with "false", let me know your suggestion
                    };
                    DbContext.AccessoryTypes.Add(accessory);


                    // Update the old record data.
                    AccessoryType.DateModified = DateTime.Now;
                    AccessoryType.IsActive = data.IsActive;
                    AccessoryType.CompanyId = companyId;
                    AccessoryType.Name = data.Name;
                    AccessoryType.BuyerCode = data.BuyerCode;
                    AccessoryType.Slug = slug;
                    AccessoryType.Version = AccessoryType.Version + 1;
                    AccessoryType.IsLatest = true;
                    AccessoryType.IsDeleted = false;        // here i use a hard code "false"


                    DbContext.AccessoryTypes.Update(AccessoryType);


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
        [HttpDelete("DeleteAccessoryType/{id}")]
        [Authorize]
        public IActionResult Delete(Guid id)
        {
            var item = DbContext.AccessoryTypes.FirstOrDefault(i => i.Id.Equals(id));
            Guid companyId = item.CompanyId;

            // check if the item is in using or not
            var IsUsingInRel = CheckIsUsingInRel(id, companyId);
            if (IsUsingInRel)   // if the record is in using, it will reject the delete action
            {
                return BadRequest(new { error = "Data can not be deleted." });   // this response code is coming from a old version sample code. no special meaning. you can change if you want.
            }


            
            if (item != null)
            {
                item.IsDeleted = true;
                item.IsLatest = false;  // just in case to set this flag to false.
                                        // bascially if you "delete" sth, you can't get it back

                DbContext.AccessoryTypes.Update(item);      // replace "Remove()" with "Update()"
                // then, find the nearest version to set its IsLatest to true
                var nearestitem = DbContext.AccessoryTypes.Where(x => !x.IsDeleted && x.IsActive && x.Code == item.Code).OrderByDescending(x => x.Version).ToList().ElementAt(1);
                if (nearestitem != null)
                {
                    nearestitem.IsLatest = true;
                    DbContext.AccessoryTypes.Update(nearestitem);

                }
                DbContext.SaveChanges();

                return Ok();
            }
            else
                return BadRequest(new { error = String.Format("Data has not been found") });  // return a HTTP Status 404 (Not Found) if we couldn't find a suitable item.
        }


        #endregion

        #region Private Memers

        private List<AccessoryTypeViewModel> ToItemViewModelList(IEnumerable<LibAccessoryType> accessoryType)
        {
            var result = accessoryType.Select(TinyMapper.Map<AccessoryTypeViewModel>).ToList();
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

        #region Helper
        private bool CheckIsUsingInRel(Guid id,Guid companyId)
        {
            return DbContext.RelAccessoryTypeCategories.Where(x => x.CompanyId == companyId && x.TypeId == id && x.IsLatest).Count() > 0;

            // this "RelAccessoryTypeCategories" is created when you create a accessoryCategory item.
            // and because of the special "Update" of this project, when you update a accessoryCategory, it will also create a new record of "RelAccessoryTypeCategories"
            // and at the same time, it will set the old "RelAccessoryTypeCategories" record the "IsLatest" flag as "false"
            // so if the "Islatest" is true, means that relation is in using.
            // this is what this checking base on
            // by the way,
            // if you want to generate dropdownlist in frontend when add or edit record
            // you will using the relation table.
            // let me know if you have any suggestion.
        }
        #endregion
    }
}
