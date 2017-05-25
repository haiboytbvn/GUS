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
    public class AccessoryController : Controller
    {
        #region Private Fields
        protected GUSLibraryDbContext DbContext;
        private IHostingEnvironment hostingEnv;
        #endregion Private Fields

        #region Constructor
        public AccessoryController(GUSLibraryDbContext context, IHostingEnvironment env)
        {
            DbContext = context;
            this.hostingEnv = env;
        }
        #endregion Constructor
        // GET: /<controller>/

        #region Attribute-based Routing
        // Get item by id
        [HttpGet("GetAccessoryById/{id}")]
        public IActionResult GetAccessorybyId(Guid id)
        {
            Guid companyIdFromSearchData = Guid.Empty;
            Guid companyId = CompanyIdHelper.GetCompanyId(companyIdFromSearchData);
            var item = DbContext.Accessories.Where(x => (companyId == Guid.Empty) || (x.CompanyId == companyId)).FirstOrDefault(i => i.Id == id);
          
            if (item != null)
            {
                var result = TinyMapper.Map<AccessoryViewModel>(item);
                var listimage = new List<string>();

               var arr = item.Image.Split('|');
                for (var i = 0; i < arr.Length - 1;i++)
                {
                    listimage.Add(arr[i]);
                }
                result.Images = listimage;
                return new JsonResult(result, DefaultJsonSettings);
            }
            return NotFound(new { Error = $"ID {id} has not been found" });
        }

        // Get item by code
        [HttpGet("GetAccessorybyCode/{code}")]
        public IActionResult GetAccessorybyCode(string code)
        {
            Guid companyIdFromSearchData = Guid.Empty;
            Guid companyId = CompanyIdHelper.GetCompanyId(companyIdFromSearchData);
            var item = DbContext.Accessories.Where(x => (companyId == Guid.Empty) || (x.CompanyId == companyId)).OrderByDescending(x => x.Version).FirstOrDefault(i => i.Code == code);
            if (item != null) return new JsonResult(TinyMapper.Map<AccessoryViewModel>(item), DefaultJsonSettings);
            return NotFound(new { Error = $"Code {code} has not been found" });
        }

        // Get item by slug
        [HttpGet("GetAccessorybySlug/{slug}")]
        public IActionResult GetAccessorybySlug(string slug)
        {
            Guid companyIdFromSearchData = Guid.Empty;
            Guid companyId = CompanyIdHelper.GetCompanyId(companyIdFromSearchData);
            var item = DbContext.Accessories.Where(x => (companyId == Guid.Empty) || (x.CompanyId == companyId)).OrderByDescending(x => x.Version).FirstOrDefault(i => i.Slug == slug);
            if (item != null) return new JsonResult(TinyMapper.Map<AccessoryViewModel>(item), DefaultJsonSettings);
            return NotFound(new { Error = $"Slug {slug} has not been found" });
        }

        // Get item list with searching parameter
        [HttpPost("GetAccessoryList")]
        public IActionResult GetAccessoryList([FromBody]AccessoryFilterModel data)
        {
            // return a HTTP Status 404 (Not Found) if we couldn't find a suitable item.
            if (data == null)
                return NotFound(new { error = "Invalid Data" });

            Guid companyIdFromSearchData = data.CompanyId ?? Guid.Empty;
            Guid companyId = CompanyIdHelper.GetCompanyId(companyIdFromSearchData);
            string name = data.Name;
            string code = data.Code;
            string buyerCode = data.BuyerCode;

            //update code to get joined data

            var itemList = (from a in DbContext.Accessories
                join b in DbContext.Brands on a.Brand equals b.Id
                join dept in DbContext.Departments on a.Department equals dept.Id
                join dv in DbContext.Divisions on a.Division equals dv.Id
                join at in DbContext.AccessoryTypes on a.AccType equals at.Id
                join acc in DbContext.AccessoryCategories on a.AccCategory equals acc.Id
                join pn in DbContext.AccessoryProductNames on a.AccProductName equals pn.Id
                join cl in DbContext.Colors on a.Color equals cl.Id
                select new AccessoryListItemViewModel
                {
                    Id = a.Id,
                    DateCreated = a.DateCreated,
                    DateModified = a.DateModified,
                    IsActive = a.IsActive,
                    CompanyId = a.CompanyId,
                    Name = a.Name,
                    Code = a.Code,
                    BuyerCode = a.BuyerCode,
                    Slug = a.Slug,
                    Version = a.Version,
                    IsLatest = a.IsLatest,
                    IsDeleted = a.IsDeleted,
                    AccType = at.Name,
                    AccCategory = acc.Name,
                    Description = a.Description,
                    Brand = b.Name,
                    Division = dv.Name,
                    Department = dept.Name,
                    ItemSize = a.ItemSize,
                    Supplier = a.Supplier,
                    SupplierCode = a.SupplierCode,
                    Color = cl.Name,
                    Image = a.Image,
                    Remark = a.Remark,
                    AccProductName = pn.Name,
                    Thumbnail = a.Image.Split('|')[0],
                    AccTypeId = a.AccType.ToString(),
                    AccCateId = a.AccCategory.ToString(),
                    AccProductNameId = a.AccProductName.ToString()
                }).Where(x =>
                    (companyId == Guid.Empty) || (x.CompanyId == companyId) &&
                    (string.IsNullOrEmpty(name) || x.Name.ToLower().Contains(name.Trim().ToLower())) &&
                    (string.IsNullOrEmpty(code) || x.Code.ToLower().Contains(code.Trim().ToLower())) &&
                    // todo: buyer code
                    (string.IsNullOrEmpty(buyerCode) || x.BuyerCode.ToLower().Contains(buyerCode.Trim().ToLower()))
                )
                .Where(x => x.IsLatest && !x.IsDeleted && x.IsActive);

            // do the filtering by menu option

            if ( !string.IsNullOrEmpty(data.TypeId))
            {
                itemList = itemList.Where(x => x.AccTypeId == data.TypeId);
            }
            if (!string.IsNullOrEmpty(data.CateId))
            {
                itemList = itemList.Where(x => x.AccCateId == data.CateId);
            }
            if (!string.IsNullOrEmpty(data.ProductNameId))
            {
                itemList = itemList.Where(x => x.AccProductNameId == data.ProductNameId);
            }
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
                itemList = itemList.Where(x => x.Code.ToUpper().Contains(data.Code.Trim().ToUpper()));
            }
            itemList =itemList.OrderBy(x => x.BuyerCode);
            //====end filtering

            // save the total number of records
            var total = itemList.Count();
            // pass in the Model
            var result = new AccessoryListViewModel();
            result.Data = new List<AccessoryListItemViewModel>();
            result.Paging = new Pagination();
            if (data.Paging.PageNumber == 0)
            {
                // if pagenumuber ==0 , get All
                result.Data = itemList.Select(x => TinyMapper.Map<AccessoryListItemViewModel>(x)).ToList();
                result.Paging.PageNumber = 0;
                result.Paging.Total = total;
                result.Paging.Show = total;
                result.Paging.PageCount = new List<int>();
                result.Paging.PageSize = total;
                return new JsonResult(result, DefaultJsonSettings);
            }
            // else, do Pagination here
            var list = itemList.Skip((data.Paging.PageNumber - 1) * data.Paging.PageSize).Take(data.Paging.PageSize);
            result.Data = list.Select(x => TinyMapper.Map<AccessoryListItemViewModel>(x)).ToList();

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
        [HttpGet("GetAccessoryListByCode/{code}")]
        public IActionResult GetAccessoryListByCode(string code)
        {
            if (!string.IsNullOrEmpty(code))
            {
                Guid companyIdFromSearchData = Guid.Empty;
                Guid companyId = CompanyIdHelper.GetCompanyId(companyIdFromSearchData);
                var itemList = DbContext.Accessories.Where(x =>

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
        [HttpPost("AddAccessory")]
        [Authorize]
        public IActionResult Add([FromBody]AccessoryViewModel data)
        {
            // return a HTTP Status 404 (Not Found) if we couldn't find a suitable item.
            if (data == null)
                return NotFound(new { error = String.Format("Invalid Data") });

            // Get company Id base on the user type
            Guid companyIdFromSearchData = Guid.Empty;
            Guid companyId = CompanyIdHelper.GetCompanyId(companyIdFromSearchData);

            // Get last code for current library type
            CodeHelper ch = new CodeHelper(DbContext);
            string code = ch.GetTypeCode(EnumHelper.LibType.LibAccessory.ToString());

            // Check if slug is duplicate or not
            string slug = SlugHelper.GetSlug(data.CompanyId, DbContext, data.BuyerCode, EnumHelper.LibType.LibAccessory.ToString());


            var guid = Guid.NewGuid();
            var accessory = new LibAccessory()
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
                AccType = data.AccType,
                AccCategory = data.AccCategory,
                Description = data.Description,
                ItemSize = data.ItemSize,
                Supplier = data.Supplier,
                SupplierCode = data.SupplierCode,
                Color = data.Color,
                Remark = data.Remark,
                Image = data.Image,
                AccProductName = data.AccProductName

            };

            DbContext.Accessories.Add(accessory);

            // persist the changes into the Database.
            DbContext.SaveChanges();

            // set new id to data object
            data.Id = accessory.Id;
            var arrimage = data.Image.Split('|');
            var images = "";
            for(var i=0;i< arrimage.Length - 1 ; i++)
            {
               images += SaveImage(accessory.Id, accessory.Code, accessory.Version, arrimage[i]) + "|";
            }
            // update fabrics image 
            var fab = DbContext.Accessories.FirstOrDefault(x => x.Id == accessory.Id);
            if (fab != null)
            {
                fab.Image = images;
                DbContext.Accessories.Update(fab);
                DbContext.SaveChanges();
            }

            return new JsonResult(data, DefaultJsonSettings);
        }

        // PUT api/values/5
        [HttpPut("UpdateAccessory")]
        [Authorize]
        public IActionResult Update([FromBody]AccessoryViewModel data)
        {
            if (data != null)
            {
                var acc = DbContext.Accessories.FirstOrDefault(i => i.Id.Equals(data.Id));

                if (acc != null)
                {
                    // Get company Id base on the user type
                    Guid companyIdFromSearchData = Guid.Empty;
                    Guid companyId = CompanyIdHelper.GetCompanyId(companyIdFromSearchData);

                    // Check if slug is duplicate or not
                    string slug = SlugHelper.GetSlug(data.CompanyId, DbContext, data.Name, EnumHelper.LibType.LibAccessory.ToString());


                    // Copy the old record's data into a new record
                    var acctoadd = new LibAccessory()
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

                        AccType =  acc.AccType,
                        AccCategory = acc.AccCategory,
                        Description = acc.Description,
                        Brand = acc.Brand,
                        Department = acc.Department,
                        Division = acc.Division,
                        ItemSize = acc.ItemSize,
                        SupplierCode = acc.SupplierCode,
                        Supplier = acc.Supplier,
                        Color = acc.Color,
                        Remark = acc.Remark,
                        Image = acc.Image,
                        AccProductName = acc.AccProductName

                    };
                    DbContext.Accessories.Add(acctoadd);


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
                    acc.AccType = data.AccType;
                    acc.AccCategory = data.AccCategory;
                    acc.Description = data.Description;
                    acc.Brand = data.Brand;
                    acc.Department = data.Department;
                    acc.Division = data.Division;
                    acc.ItemSize = data.ItemSize;
                    acc.Supplier = data.Supplier;
                    acc.SupplierCode = data.SupplierCode;
                    acc.Image = data.Image;
                    acc.Color = data.Color;
                    acc.Remark = data.Remark;
                    acc.AccProductName = data.AccProductName;

                    DbContext.Accessories.Update(acc);


                    // persist the changes into the Database.
                    DbContext.SaveChanges();
                    SaveImage(acc.Id, acc.Code, acc.Version, acc.Image);
                    return new JsonResult(data, DefaultJsonSettings);
                }
                else
                    return NotFound(new { error = String.Format("Data has not been found") });  // return a HTTP Status 404 (Not Found) if we couldn't find a suitable item.
            }
            else
                return NotFound(new { error = String.Format("Invalid Data") });   // return a HTTP Status 404 (Not Found) if we couldn't find a suitable item.
        }

        // DELETE api/values/5
        [HttpDelete("DeleteAccessory/{id}")]
        [Authorize]
        public IActionResult Delete(Guid id)
        {
            var colorItem = DbContext.Accessories.FirstOrDefault(i => i.Id == id);

            if (colorItem != null)
            {
                colorItem.IsDeleted = true;
                colorItem.IsLatest = false;
                DbContext.Accessories.Update(colorItem);

                // then, find the nearest version to set its IsLatest to true
                var nearestitem = DbContext.Accessories.Where(x => x.IsDeleted == false && x.IsActive && x.Code == colorItem.Code).OrderByDescending(x => x.Version).ToList().ElementAt(1);
                if (nearestitem != null)
                {
                    nearestitem.IsLatest = true;
                    DbContext.Accessories.Update(nearestitem);

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
                foreach(var uploadimage in uploadimages)
                {
                    var tempfolderpath = Path.Combine(hostingEnv.WebRootPath + Constants.ACCESSORYTEMPIMAGEUPLOADFOLDER);
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
                        UploadPath = Constants.ACCESSORYTEMPIMAGEUPLOADFOLDER + uploadimage.FileName
                    };

                   result.Add(data);

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
                                               Constants.ACCESSORYUPLOADFOLDER + Constants.COMPANYCODEFOLDER);

                var exists = Directory.Exists(uploadspath);
                if (!exists)
                    System.IO.Directory.CreateDirectory(uploadspath);
                var filename = Constants.COMPANYCODE + code + "V" + version + "_" + DateTime.Now.Ticks + extension;
                System.IO.File.Copy(Path.Combine(hostingEnv.WebRootPath + tempfile), Path.Combine(uploadspath + filename));
               
            
                return Constants.ACCESSORYUPLOADFOLDER + Constants.COMPANYCODEFOLDER + filename;
            }

            return string.Empty;

        }
        #endregion

        #region Private Memers

        private List<AccessoryViewModel> ToItemViewModelList(IEnumerable<LibAccessory> colors)
        {
            var result = colors.Select(TinyMapper.Map<AccessoryViewModel>).ToList();
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
