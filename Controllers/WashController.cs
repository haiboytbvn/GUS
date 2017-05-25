using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Security.Cryptography.X509Certificates;
using System.Threading.Tasks;
using GUSLibrary.Data;
using GUSLibrary.ViewModels;
using Microsoft.AspNetCore.Mvc;
using Nelibur.ObjectMapper;
using Newtonsoft.Json;
using Microsoft.AspNetCore.Authorization;
using GUSLibrary.Classes;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.Net.Http.Headers;

// For more information on enabling MVC for empty projects, visit http://go.microsoft.com/fwlink/?LinkID=397860

namespace GUSLibrary.Controllers
{
    [Route("api/[controller]")]
    public class WashController : Controller
    {
        #region Private Fields
        protected GUSLibraryDbContext DbContext;
        private IHostingEnvironment hostingEnv;
        #endregion Private Fields

        #region Constructor
        public WashController(GUSLibraryDbContext context, IHostingEnvironment env)
        {
            DbContext = context;
            this.hostingEnv = env;
        }
        #endregion Constructor
        // GET: /<controller>/

        #region Attribute-based Routing
        // Get item by id
        [HttpGet("GetWashById/{id}")]
        public IActionResult GetWashbyId(Guid id)
        {
            Guid companyIdFromSearchData = Guid.Empty;
            Guid companyId = CompanyIdHelper.GetCompanyId(companyIdFromSearchData);
            var item = DbContext.Washes.Where(x => (companyId == Guid.Empty) || (x.CompanyId == companyId)).FirstOrDefault(i => i.Id == id);
            if (item != null)
            {
                var result = TinyMapper.Map<WashViewModel>(item);
                var listimage = new List<string>();

                var arr = item.Image.Split('|');
                for (var i = 0; i < arr.Length - 1; i++)
                {
                    listimage.Add(arr[i]);
                }
                result.Images = listimage;
                return new JsonResult(result, DefaultJsonSettings);
            }
            return NotFound(new { Error = $"ID {id} has not been found" });
        }

        // Get item by code
        [HttpGet("GetWashbyCode/{code}")]
        public IActionResult GetWashbyCode(string code)
        {
            Guid companyIdFromSearchData = Guid.Empty;
            Guid companyId = CompanyIdHelper.GetCompanyId(companyIdFromSearchData);
            var item = DbContext.Washes.Where(x => (companyId == Guid.Empty) || (x.CompanyId == companyId)).OrderByDescending(x => x.Version).FirstOrDefault(i => i.Code == code);
            if (item != null) return new JsonResult(TinyMapper.Map<WashViewModel>(item), DefaultJsonSettings);
            return NotFound(new { Error = $"Code {code} has not been found" });
        }

        // Get item by slug
        [HttpGet("GetWashbySlug/{slug}")]
        public IActionResult GetWashbySlug(string slug)
        {
            Guid companyIdFromSearchData = Guid.Empty;
            Guid companyId = CompanyIdHelper.GetCompanyId(companyIdFromSearchData);
            var item = DbContext.Washes.Where(x => (companyId == Guid.Empty) || (x.CompanyId == companyId)).OrderByDescending(x => x.Version).FirstOrDefault(i => i.Slug == slug);
            if (item != null) return new JsonResult(TinyMapper.Map<WashViewModel>(item), DefaultJsonSettings);
            return NotFound(new { Error = $"Slug {slug} has not been found" });
        }

        // Get item list with searching parameter
        [HttpPost("GetWashList")]
        public IActionResult GetWashList([FromBody]WashFilterModel data)
        {
            // return a HTTP Status 404 (Not Found) if we couldn't find a suitable item.
            if (data == null)
                return NotFound(new { error = "Invalid Data" });

            Guid companyIdFromSearchData = data.CompanyId == null ? Guid.Empty : data.CompanyId.Value;
            Guid companyId = CompanyIdHelper.GetCompanyId(companyIdFromSearchData);
            string name = data.Name;
            string code = data.Code;
            string buyerCode = data.BuyerCode;
            //update code to get joined data

            var itemList = (from w in DbContext.Washes
                            join b in DbContext.Brands on w.Brand equals b.Id
                          join dept in DbContext.Departments on w.Department equals dept.Id
                          join dv in DbContext.Divisions on w.Division equals dv.Id
                          join wc in DbContext.WashCategories on w.WashCategory equals wc.Id
                          join wd in DbContext.WashProductNames on w.WashProductName equals wd.Id
                          join cl in DbContext.Colors on w.Color equals cl.Id
                          join type in DbContext.WashTypes on w.WashType equals type.Id
                          select new WashListItemViewModel
                          {
                              Id = w.Id,
                              DateCreated = w.DateCreated,
                              DateModified = w.DateModified,
                              IsActive = w.IsActive,
                              CompanyId = w.CompanyId,
                              Name = w.Name,
                              Code = w.Code,
                              BuyerCode = w.BuyerCode,
                              Slug = w.Slug,
                              Version = w.Version,
                              IsLatest = w.IsLatest,
                              IsDeleted = w.IsDeleted,                          
                              Brand = b.Name,
                              Division = dv.Name,
                              Department = dept.Name,
                              Supplier = w.Supplier,
                              SupplierCode = w.SupplierCode,
                              Color = cl.Name,
                              Image = w.Image,
                              Thumbnail = w.Image.Split('|')[0],
                              Remark = w.Remark,
                              Recipe = w.Recipe,
                              Description = w.Description,
                              WashType = type.Name,
                              WashCategory = wc.Name,
                              WashProductName = wd.Name,
                              WashTypeId = w.WashType.ToString(),
                              WashCateId = w.WashCategory.ToString(),
                              WashProductNameId = w.WashProductName.ToString(),
                              

                          })

               .Where(x =>
                    (companyId == Guid.Empty) || (x.CompanyId == companyId) &&
                    (string.IsNullOrEmpty(name) || x.Name.ToLower().Contains(name.Trim().ToLower())) &&
                    (string.IsNullOrEmpty(code) || x.Code.ToLower().Contains(code.Trim().ToLower())) &&
                    // todo: buyer code
                    (string.IsNullOrEmpty(buyerCode) || x.BuyerCode.ToLower().Contains(buyerCode.Trim().ToLower()))
                )
                .Where(x => x.IsLatest && !x.IsDeleted);

            // do the filtering by menu option
            // search params
            if (!string.IsNullOrEmpty(data.Name))
            {
                itemList = itemList.Where(x => x.Name.ToUpper().Contains(data.Name.Trim().ToUpper()));
            }
            if (!string.IsNullOrEmpty(data.BuyerCode))
            {
                itemList = itemList.Where(x => x.BuyerCode.ToUpper().Contains(data.BuyerCode.Trim().ToUpper()));
            }
            if (!string.IsNullOrEmpty(data.Code))
            {
                itemList = itemList.Where(x => x.Code == data.Code);
            }
            if (!string.IsNullOrEmpty(data.TypeId))
            {
                itemList = itemList.Where(x => x.WashTypeId == data.TypeId);
            }
            if (!string.IsNullOrEmpty(data.CateId))
            {
                itemList = itemList.Where(x => x.WashCateId == data.CateId);
            }
            if (!string.IsNullOrEmpty(data.ProductNameId))
            {
                itemList = itemList.Where(x => x.WashProductNameId == data.ProductNameId);
            }

            itemList = itemList.OrderBy(x => x.BuyerCode);
            //====end filtering

            // save the total number of records
            var total = itemList.Count();
            // pass in the Model
            var result = new WashListViewModel();
            result.Data = new List<WashListItemViewModel>();
            result.Paging = new Pagination();
            if (data.Paging.PageNumber == 0)
            {
                // if pagenumuber ==0 , get All
                result.Data = itemList.Select(x => TinyMapper.Map<WashListItemViewModel>(x)).ToList();
                result.Paging.PageNumber = 0;
                result.Paging.Total = total;
                result.Paging.Show = total;
                result.Paging.PageCount = new List<int>();
                result.Paging.PageSize = total;
                return new JsonResult(result, DefaultJsonSettings);
            }
            // else, do Pagination here
            var list = itemList.Skip((data.Paging.PageNumber - 1) * data.Paging.PageSize).Take(data.Paging.PageSize);
            result.Data = list.Select(x => TinyMapper.Map<WashListItemViewModel>(x)).ToList();

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
        [HttpGet("GetWashListByCode/{code}")]
        public IActionResult GetWashListByCode(string code)
        {
            if (!string.IsNullOrEmpty(code))
            {
                Guid companyIdFromSearchData = Guid.Empty;
                Guid companyId = CompanyIdHelper.GetCompanyId(companyIdFromSearchData);
                var itemList = DbContext.Washes.Where(x =>

                    ((companyId == Guid.Empty) || (x.CompanyId == companyId)) &&
                    x.Code.ToLower().Equals(code.Trim().ToLower())

                    )
                    .OrderByDescending(x => x.Version);

                return new JsonResult(ToItemViewModelList(itemList), DefaultJsonSettings);
            }
            else
            {
                return BadRequest(new { error = String.Format("Code is empty.") });
            }
        }

        // POST api/values
        [HttpPost("AddWash")]
        [Authorize]
        public IActionResult Add([FromBody]WashViewModel data)
        {
            // return a HTTP Status 404 (Not Found) if we couldn't find a suitable item.
            if (data == null)
                return NotFound(new { error = String.Format("Invalid Data") });

            // Get company Id base on the user type
            Guid companyIdFromSearchData = Guid.Empty;
            Guid companyId = CompanyIdHelper.GetCompanyId(companyIdFromSearchData);

            // Get last code for current library type
            CodeHelper ch = new CodeHelper(DbContext);
            string code = ch.GetTypeCode(EnumHelper.LibType.LibWash.ToString());

            // Check if slug is duplicate or not
            string slug = SlugHelper.GetSlug(data.CompanyId, DbContext, data.BuyerCode, EnumHelper.LibType.LibWash.ToString());


            var guid = Guid.NewGuid();
            var wash = new LibWash()
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
                IsDeleted = false,
                Brand = data.Brand,
                Department = data.Department,
                Division = data.Division,
                Supplier = data.Supplier,
                SupplierCode = data.SupplierCode,
                Color = data.Color,
                Remark = data.Remark,
                Image = data.Image,
                Description = data.Description,
                WashProductName = data.WashProductName,
                WashCategory = data.WashCategory,
                Recipe = data.Recipe,
                WashType = data.WashType
            };

            DbContext.Washes.Add(wash);

            // set new id to data object
            data.Id = wash.Id;
            var arrimage = data.Image.Split('|');
            var images = "";
            for (var i = 0; i < arrimage.Length - 1; i++)
            {
                images += SaveImage(wash.Id, wash.Code, wash.Version, arrimage[i]) + "|";
            }
            // update fabrics image 
            var fab = DbContext.Washes.FirstOrDefault(x => x.Id == wash.Id);
            if (fab != null)
            {
                fab.Image = images;
                DbContext.Washes.Update(fab);
                DbContext.SaveChanges();
            }
            DbContext.SaveChanges();

            // set new id to data object
            data.Id = wash.Id;
            SaveImage(wash.Id, wash.Code, wash.Version, wash.Image);

            return new JsonResult(data, DefaultJsonSettings);
        }

        // PUT api/values/5
        [HttpPut("UpdateWash")]
        [Authorize]
        public IActionResult Update([FromBody]WashViewModel data)
        {
            if (data != null)
            {
                var acc = DbContext.Washes.FirstOrDefault(i => i.Id.Equals(data.Id));

                if (acc != null)
                {
                    // Get company Id base on the user type
                    Guid companyIdFromSearchData = Guid.Empty;
                    Guid companyId = CompanyIdHelper.GetCompanyId(companyIdFromSearchData);

                    // Check if slug is duplicate or not
                    string slug = SlugHelper.GetSlug(data.CompanyId, DbContext, data.BuyerCode, EnumHelper.LibType.LibWash.ToString());


                    // Copy the old record's data into a new record
                    var acctoadd = new LibWash()
                    {
                        Id = Guid.NewGuid(),
                        DateCreated = acc.DateCreated,
                        DateModified = acc.DateModified,
                        IsActive = acc.IsActive,
                        CompanyId = acc.CompanyId,
                        Name = acc.Name,
                        Code = acc.Code,
                        BuyerCode = acc.BuyerCode,
                        Slug = acc.Slug,
                        Version = acc.Version,
                        IsLatest = false,
                        IsDeleted = acc.IsDeleted,                   
                        Brand = acc.Brand,
                        Department = acc.Department,
                        Division = acc.Division,
                        SupplierCode = acc.SupplierCode,
                        Supplier = acc.Supplier,
                        Color = acc.Color,
                        Remark = acc.Remark,
                        Image = acc.Image,
                        WashProductName = acc.WashProductName,
                        WashCategory = acc.WashCategory,
                        Description = acc.Description,
                        Recipe = acc.Recipe,
                        WashType = acc.WashType

                    };
                    DbContext.Washes.Add(acctoadd);


                    // Update the old record data.
                    acc.DateModified = DateTime.Now;
                    acc.IsActive = data.IsActive;
                    acc.CompanyId = companyId;
                    acc.Name = data.Name;
                    acc.Code = data.Code;
                    acc.BuyerCode = data.BuyerCode;
                    acc.Slug = slug;
                    acc.Version = acc.Version + 1;
                    acc.IsLatest = true;
                    acc.IsActive = true;
                    acc.IsDeleted = false;
                    acc.Brand = data.Brand;
                    acc.Department = data.Department;
                    acc.Division = data.Division;
                    acc.Supplier = data.Supplier;
                    acc.SupplierCode = data.SupplierCode;
                    acc.Image = data.Image;
                    acc.Color = data.Color;
                    acc.Remark = data.Remark;
                    acc.WashProductName = data.WashProductName;
                    acc.WashCategory = data.WashCategory;
                    acc.Description = data.Description;
                    acc.Recipe = data.Recipe;
                    acc.WashType = data.WashType;
                    DbContext.Washes.Update(acc);


                    // persist the changes into the Database.
                    DbContext.SaveChanges();
                    SaveImage(acc.Id, acc.Code, acc.Version, acc.Image);
                    return new JsonResult(data, DefaultJsonSettings);
                }
                
                    return NotFound(new { error = "Data has not been found" });  // return a HTTP Status 404 (Not Found) if we couldn't find a suitable item.
            }
            
                return NotFound(new { error = "Invalid Data" });   // return a HTTP Status 404 (Not Found) if we couldn't find a suitable item.
        }

        // DELETE api/values/5
        [HttpDelete("DeleteWash/{id}")]
        [Authorize]
        public IActionResult Delete(Guid id)
        {
            var colorItem = DbContext.Washes.FirstOrDefault(i => i.Id == id);

            if (colorItem != null)
            {
                colorItem.IsDeleted = true;
                colorItem.IsLatest = false;
                DbContext.Washes.Update(colorItem);

                // then, find the nearest version to set its IsLatest to true
                var nearestitem = DbContext.Washes.Where(x => x.IsDeleted == false && x.IsActive && x.Code == colorItem.Code).OrderByDescending(x => x.Version).ToList().ElementAt(1);
                if (nearestitem != null)
                {
                    nearestitem.IsLatest = true;
                    DbContext.Washes.Update(nearestitem);

                }


                DbContext.SaveChanges();
            }


            return Ok();
        }

        [HttpPost("UploadImage")]
        public IActionResult UploadImage()
        {
            //get image here
            var uploadimages = Request.Form.Files;
            var result = new List<ImageDataViewModel>();
            if (uploadimages.Any())
            {
                foreach (var uploadimage in uploadimages)
                {
                    var tempfolderpath = Path.Combine(hostingEnv.WebRootPath + Constants.WASHTEMPIMAGEUPLOADFOLDER);
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
                        UploadPath = Constants.WASHTEMPIMAGEUPLOADFOLDER + uploadimage.FileName
                    };

                    result.Add(data);

                }
                return new JsonResult(result, DefaultJsonSettings);
            }

            return null;
        }
        [HttpPost("UploadAngular")]
        public IActionResult UploadAngular()
        {
            //get image here
            var uploadimages = Request.Form.Files;
            var result = new ImageListViewModel();
            result.Images = new List<ImageDataViewModel>();
            if (uploadimages.Any())
            {
                foreach (var uploadimage in uploadimages)
                {
                    var tempfolderpath = Path.Combine(hostingEnv.WebRootPath + Constants.WASHTEMPIMAGEUPLOADFOLDER);
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
                        UploadPath = Constants.WASHTEMPIMAGEUPLOADFOLDER + uploadimage.FileName
                    };

                    result.Images.Add(data);

                }
                var imageDataViewModel = result.Images.FirstOrDefault();
                if (imageDataViewModel != null)
                {
                    result.MainImage = imageDataViewModel.UploadPath;
                    result.MainAlt = imageDataViewModel.FileName;
                }
                   
                return new JsonResult(result, DefaultJsonSettings);
            }

            return null;
        }

        public string SaveImage(Guid fabid, string code, int version, string tempfile)
        {

            var exist = System.IO.File.Exists(hostingEnv.WebRootPath + tempfile);
            if (exist)
            {

                var extension = Path.GetExtension(tempfile);
                var uploadspath = Path.Combine(hostingEnv.WebRootPath +
                                               Constants.WASHUPLOADFOLDER + Constants.COMPANYCODEFOLDER);

                var exists = Directory.Exists(uploadspath);
                if (!exists)
                    System.IO.Directory.CreateDirectory(uploadspath);
                var filename = Constants.COMPANYCODE + code + "V" + version + "_" + DateTime.Now.Ticks + extension;
                System.IO.File.Copy(Path.Combine(hostingEnv.WebRootPath + tempfile), Path.Combine(uploadspath + filename));


                return Constants.WASHUPLOADFOLDER + Constants.COMPANYCODEFOLDER + filename;
            }

            return string.Empty;

        }
        #endregion

        #region Private Memers

        private List<WashViewModel> ToItemViewModelList(IEnumerable<LibWash> colors)
        {
            var result = colors.Select(TinyMapper.Map<WashViewModel>).ToList();
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
