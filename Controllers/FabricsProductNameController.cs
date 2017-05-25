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
    public class FabricsProductNameController : Controller
    {
        #region Private Fields
        protected GUSLibraryDbContext DbContext;
        #endregion Private Fields

        #region Constructor
        public FabricsProductNameController(GUSLibraryDbContext context)
        {
            DbContext = context;
        }
        #endregion Constructor
        // GET: /<controller>/

        #region Attribute-based Routing
        // Get item by id
        [HttpGet("GetFabricsProductNamebyId/{id}")]
        public IActionResult GetFabricsProductNamebyId(Guid id)
        {
            Guid companyIdFromSearchData = Guid.Empty;
            Guid companyId = CompanyIdHelper.GetCompanyId(companyIdFromSearchData);
            var item = DbContext.FabricsProductNames.Where(x => (companyId == Guid.Empty) || (x.CompanyId == companyId)).FirstOrDefault(i => i.Id == id);

            if (item != null)
            {

                // get type of this category
                var rel = DbContext.RelFabricsCategoryProductNames.FirstOrDefault(x => x.ProductNameId == item.Id && x.IsLatest);
                var result = TinyMapper.Map<FabricsProductNameViewModel>(item);
                // assign desc value
                if (rel != null) result.CategoryId = rel.CategoryId;
                return new JsonResult(result, DefaultJsonSettings);
            }
            return NotFound(new { Error = $"ID {id} has not been found" });
        }

        // Get item by code
        [HttpGet("GetFabricsProductNamebyCode/{code}")]
        public IActionResult GetFabricsProductNamebyCode(string code)
        {
            Guid companyIdFromSearchData = Guid.Empty;
            Guid companyId = CompanyIdHelper.GetCompanyId(companyIdFromSearchData);
            //var item = DbContext.FabricsProductNames.Where(x => (companyId == Guid.Empty) || (x.CompanyId == companyId)).OrderByDescending(x => x.Version).FirstOrDefault(i => i.Code == code);
            var item = DbContext.FabricsProductNames.Where(x => (companyId == Guid.Empty) || (x.CompanyId == companyId)).Where(x => x.IsLatest && !(x.IsDeleted)).FirstOrDefault(i => i.Code == code);
            if (item != null) return new JsonResult(TinyMapper.Map<FabricsProductNameViewModel>(item), DefaultJsonSettings);
            return NotFound(new { Error = $"Code {code} has not been found" });
        }

        // Get item by slug
        [HttpGet("GetFabricsProductNamebySlug/{slug}")]
        public IActionResult GetFabricsProductNamebySlug(string slug)
        {
            Guid companyIdFromSearchData = Guid.Empty;
            Guid companyId = CompanyIdHelper.GetCompanyId(companyIdFromSearchData);
            //var item = DbContext.FabricsProductNames.Where(x => (companyId == Guid.Empty) || (x.CompanyId == companyId)).OrderByDescending(x => x.Version).FirstOrDefault(i => i.Slug == slug);
            var item = DbContext.FabricsProductNames.Where(x => (companyId == Guid.Empty) || (x.CompanyId == companyId)).Where(x => x.IsLatest && !(x.IsDeleted)).FirstOrDefault(i => i.Slug == slug);
            if (item != null) return new JsonResult(TinyMapper.Map<FabricsProductNameViewModel>(item), DefaultJsonSettings);
            return NotFound(new { Error = $"Slug {slug} has not been found" });
        }

        // Get item list with searching parameter
        [HttpPost("GetFabricsProductNameList")]
        public IActionResult GetFabricsProductNameList([FromBody]SearchGeneralFilterViewModel data)
        {
            // return a HTTP Status 404 (Not Found) if we couldn't find a suitable item.
            if (data == null)
                return NotFound(new { error = "Invalid Data" });

            Guid companyIdFromSearchData = data.CompanyId ?? Guid.Empty;
            Guid companyId = CompanyIdHelper.GetCompanyId(companyIdFromSearchData);
            string name = data.Name;            // should come from search data
            string code = data.Code;            // should come from search data
            string buyerCode = data.BuyerCode;  // should come from search data


            var itemList = DbContext.FabricsProductNames.Where(x =>

            (companyId == Guid.Empty) || (x.CompanyId == companyId) &&
            (string.IsNullOrEmpty(name) || x.Name.ToLower().Contains(name.Trim().ToLower())) &&
            (string.IsNullOrEmpty(code) || x.Code.ToLower().Contains(code.Trim().ToLower())) &&
            (string.IsNullOrEmpty(buyerCode) || x.BuyerCode.ToLower().Contains(buyerCode.Trim().ToLower()))
            )
            //.GroupBy(x => x.Code).Select(y => y.FirstOrDefault(z => z.IsLatest && !(z.IsDeleted))).OrderBy(x=>x.Name);

            // Hi Zheng Xiang, Not sure why whe need GroupBy and after that FirstOrDefault here, because whe have IsLatest field, so basically we just need to get all items that have IsLatest = true
            // There is one and only one item Islatest for each item as i understand????

            .Where(z => z.IsLatest && !(z.IsDeleted) && z.IsActive).OrderBy(x => x.Name);


            // save the total number of records
            var total = itemList.Count();
            // pass in the Model
            var result = new FabricsProductNameListViewModel();
            result.Data = new List<FabricsProductNameViewModel>();
            result.Paging = new Pagination();
            if (data.Paging.PageNumber == 0)
            {
                // if pagenumuber ==0 , get All
                result.Data = itemList.Select(x => TinyMapper.Map<FabricsProductNameViewModel>(x)).ToList();
                result.Paging.PageNumber = 0;
                result.Paging.Total = total;
                result.Paging.Show = total;
                result.Paging.PageCount = new List<int>();
                result.Paging.PageSize = total;
                return new JsonResult(result, DefaultJsonSettings);
            }
            // else, do Pagination here
            var list = itemList.Skip((data.Paging.PageNumber - 1) * data.Paging.PageSize).Take(data.Paging.PageSize);
            result.Data = list.Select(x => TinyMapper.Map<FabricsProductNameViewModel>(x)).ToList();

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

        // Get item by id
        [HttpGet("GetFabProductNameByCategory/{id}")]
        public IActionResult GetFabProductNameByCategory(Guid id)
        {
            // return a HTTP Status 404 (Not Found) if we couldn't find a suitable item.
            if (id == Guid.Empty)
                return NotFound(new { error = "Invalid Data" });

            Guid companyIdFromSearchData = Guid.Empty;
            Guid companyId = CompanyIdHelper.GetCompanyId(companyIdFromSearchData);
            var itemList = (from rel in DbContext.RelFabricsCategoryProductNames
                            join pn in DbContext.FabricsProductNames on rel.ProductNameId equals pn.Id
                            join c in DbContext.FabricsCategories on rel.CategoryId equals c.Id
                            where rel.CategoryId == id && rel.IsLatest
                            select new LibFabricsProductName
                            {
                                Name = pn.Name,
                                CompanyId = pn.CompanyId,
                                Id = pn.Id,
                                IsLatest = c.IsLatest,
                                IsActive = pn.IsActive,
                                IsDeleted = pn.IsDeleted

                            }
                            ).Where(x => (companyId == Guid.Empty) || (x.CompanyId == companyId) && x.IsLatest && !x.IsDeleted && x.IsActive).ToList();


            return new JsonResult(ToItemViewModelList(itemList), DefaultJsonSettings);
        }
    
        // Get item list by code (return all version of items with same code)
        [HttpGet("GetFabricsProductNameListByCode/{code}")]
        public IActionResult GetFabricsProductNameListByCode(string code)
        {
            if (!string.IsNullOrEmpty(code))
            {
                var companyIdFromSearchData = Guid.Empty;
                var companyId = CompanyIdHelper.GetCompanyId(companyIdFromSearchData);
                var itemList = DbContext.FabricsProductNames.Where(x =>

                    ((companyId == Guid.Empty) || (x.CompanyId == companyId)) &&
                    x.Code.ToLower().Equals(code.Trim().ToLower())

                    )
                    .Where(x => !(x.IsDeleted))
                    .OrderByDescending(x => x.Version);

                return new JsonResult(ToItemViewModelList(itemList), DefaultJsonSettings);
            }
            return BadRequest(new { error = "Code is empty." });
        }


        // POST api/values
        [HttpPost("AddFabricsProductName")]
        [Authorize]
        public IActionResult Add([FromBody]FabricsProductNameViewModel data)
        {
            // return a HTTP Status 404 (Not Found) if we couldn't find a suitable item.
            if (data == null)
                return NotFound(new { error = "Invalid Data" });

            // Get company Id base on the user type
            Guid companyIdFromSearchData = Guid.Empty;
            Guid companyId = CompanyIdHelper.GetCompanyId(companyIdFromSearchData);

            // Get last code for current library type
            CodeHelper ch = new CodeHelper(DbContext);
            string code = ch.GetTypeCode(EnumHelper.LibType.LibFabricsProductName.ToString());

            // Check if slug is duplicate or not
            string slug = SlugHelper.GetSlug(data.CompanyId, DbContext, data.Name, EnumHelper.LibType.LibFabricsProductName.ToString());


            var guid = Guid.NewGuid();
            var accessory = new LibFabricsProductName()
            {
                Id = guid,
                DateCreated = DateTime.Now,
                DateModified = DateTime.Now,
                IsActive = data.IsActive,
                CompanyId = companyId,
                Name = data.Name,
                Code = code,
                BuyerCode = data.BuyerCode,
                Slug = slug,
                Version = 0,
                IsLatest = true,
                IsDeleted = false
            };

            DbContext.FabricsProductNames.Add(accessory);

            // persist the changes into the Database.
            DbContext.SaveChanges();

            // set new id to data object
            data.Id = accessory.Id;


            // Create relation record in "RelAccessoryTypeCategories"
            CreateRelFabCategoryProductName(companyId, data.CategoryId, guid, true);


            return new JsonResult(data, DefaultJsonSettings);
        }

        // PUT api/values/5
        [HttpPut("UpdateFabricsProductName")]
        [Authorize]
        public IActionResult Update([FromBody]FabricsProductNameViewModel data)
        {
            if (data != null)
            {
                var productname = DbContext.FabricsProductNames.FirstOrDefault(i => i.Id.Equals(data.Id));

                if (productname != null)
                {
                    // Get company Id base on the user type
                    Guid companyIdFromSearchData = Guid.Empty;
                    Guid companyId = CompanyIdHelper.GetCompanyId(companyIdFromSearchData);

                    // Check if slug is duplicate or not
                    string slug = SlugHelper.GetSlug(data.CompanyId, DbContext, data.Name, EnumHelper.LibType.LibFabricsProductName.ToString());

                    // get old recode Category Guid
                    var oldcategoryId =DbContext.RelFabricsCategoryProductNames?.FirstOrDefault(x => x.ProductNameId == productname.Id)?.CategoryId;
                    // Copy the old record's data into a new record
                    Guid oldDataRecordId = Guid.NewGuid();
                    var accessory = new LibFabricsProductName()
                    {
                        Id = oldDataRecordId,
                        DateCreated = productname.DateCreated,
                        DateModified = productname.DateModified,
                        IsActive = productname.IsActive,
                        CompanyId = productname.CompanyId,
                        Name = productname.Name,
                        Code = productname.Code,
                        BuyerCode = productname.BuyerCode,
                        Slug = productname.Slug,
                        Version = productname.Version,
                        IsLatest = false,
                        IsDeleted = productname.IsDeleted
                    };
                    DbContext.FabricsProductNames.Add(accessory);
                    // Create a relation for the "Old" record
                    // but "IsLatest" flag should be false.
                    // i think this part needs discuss with mc for confirm.
                    // any suggestion let me know
                    CreateRelFabCategoryProductName(companyId, oldcategoryId, oldDataRecordId, false);


                    // Update the old record data.
                    productname.DateModified = DateTime.Now;
                    productname.IsActive = data.IsActive;
                    productname.CompanyId = companyId;
                    productname.Name = data.Name;
                    productname.BuyerCode = data.BuyerCode;
                    productname.Slug = slug;
                    productname.Version = productname.Version + 1;
                    productname.IsLatest = true;
                    productname.IsDeleted = false;
                    productname.BuyerCode = data.BuyerCode;
                    DbContext.FabricsProductNames.Update(productname);

                    // save both Add and Update changes
                    DbContext.SaveChanges();


                    // Update the RelAccessoryTypeCategory
                    UpdateRelFabCategoryProductName(companyId, data.CategoryId, productname.Id);

                    return new JsonResult(data, DefaultJsonSettings);
                }
                else
                    return NotFound(new { error = String.Format("Data has not been found") });  // return a HTTP Status 404 (Not Found) if we couldn't find a suitable item.
            }
            else
                return NotFound(new { error = String.Format("Invalid Data") });   // return a HTTP Status 404 (Not Found) if we couldn't find a suitable item.
        }

        // DELETE api/values/5
        [HttpDelete("DeleteFabricsProductName/{id}")]
        [Authorize]
        public IActionResult Delete(Guid id)
        {
            // check if the item is in using or not
            var IsUsingInRel = CheckIsUsingInRel(id);
            if (IsUsingInRel)   // if the record is in using, it will reject the delete action
            {
                return BadRequest(new { error = String.Format("Data can not be deleted.") });   // this response code is coming from a old version sample code. no special meaning. you can change if you want.
            }


            var item = DbContext.FabricsProductNames.FirstOrDefault(i => i.Id.Equals(id));
            if (item != null)
            {
                item.IsDeleted = true;
                item.IsLatest = false;

                DbContext.FabricsProductNames.Update(item);
                // then, find the nearest version to set its IsLatest to true
                var nearestitem = DbContext.FabricsProductNames.Where(x => !x.IsDeleted && x.IsActive && x.Code == item.Code).OrderByDescending(x => x.Version).ToList().ElementAt(1);
                if (nearestitem != null)
                {
                    nearestitem.IsLatest = true;
                    DbContext.FabricsProductNames.Update(nearestitem);

                }
                DbContext.SaveChanges();

                return Ok();
            }
            else
                return BadRequest(new { error = String.Format("Data has not been found") });  // return a HTTP Status 404 (Not Found) if we couldn't find a suitable item.
        }
        #endregion

        #region Private Memers

        private List<FabricsProductNameViewModel> ToItemViewModelList(IEnumerable<LibFabricsProductName> accessoryCategory)
        {
            var result = accessoryCategory.Select(x=>TinyMapper.Map<FabricsProductNameViewModel>(x)).ToList();
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
        private bool CheckIsUsingInRel(Guid id)
        {
            //return DbContext.RelAccessoryTypeCategories.Where(x => x.CategoryId == id && x.IsLatest).Count() > 0;
            return DbContext.Fabrics.Any(x => x.FabProductName == id);
            // notice: here is different with the "CheckIsUsingInRel" in AccessoryType
            // check if current category is being used in Accessory, no matter it is being used in latest record or history record
        }
        private void CreateRelFabCategoryProductName(Guid companyId, Guid? cateId, Guid productNameId, bool isLatest)
        {
            var item = new RelFabricsCategoryProductName()
            {
                Id = Guid.NewGuid(),
                CompanyId = companyId,
                DateCreated = DateTime.Now,

                CategoryId = cateId.Value,
                ProductNameId = productNameId,
                IsLatest = isLatest
            };

            DbContext.RelFabricsCategoryProductNames.Add(item);
            DbContext.SaveChanges();
        }
        private void UpdateRelFabCategoryProductName(Guid companyId, Guid? categoryId, Guid productnameId)
        {
            var relationList = DbContext.RelFabricsCategoryProductNames;
            var item = relationList.SingleOrDefault(x => x.CompanyId == companyId && x.CategoryId == categoryId.Value && x.ProductNameId == productnameId && x.IsLatest);

            // if there is no same relation, then do the update.
            if (item == null)
            {
                // 1.Check if there is any relation contains current category Id and "IsLatest", if there is, then set that one flag as false
                var itemwithsameproductname = relationList.SingleOrDefault(x => x.CompanyId == companyId && x.ProductNameId == productnameId && x.IsLatest);
                if (itemwithsameproductname != null)
                {
                    itemwithsameproductname.IsLatest = false;
                    DbContext.RelFabricsCategoryProductNames.Update(itemwithsameproductname);
                    DbContext.SaveChanges();
                }

                // 2.create new relation with typeId and categoryId
                CreateRelFabCategoryProductName(companyId, categoryId, productnameId, true);
            }
        }
        #endregion
    }
}
