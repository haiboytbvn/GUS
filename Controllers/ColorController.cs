using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
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
    public class ColorController : Controller
    {
        #region Private Fields
        protected GUSLibraryDbContext DbContext;
        private IHostingEnvironment hostingEnv;
        #endregion Private Fields

        #region Constructor
        public ColorController(GUSLibraryDbContext context, IHostingEnvironment env)
        {
            DbContext = context;
            this.hostingEnv = env;
        }
        #endregion Constructor
        // GET: /<controller>/

        #region Attribute-based Routing
        // Get item by id
        [HttpGet("GetColorById/{id}")]
        public IActionResult GetColorbyId(Guid id)
        {
            Guid companyIdFromSearchData = Guid.Empty;
            Guid companyId = CompanyIdHelper.GetCompanyId(companyIdFromSearchData);
            var item = DbContext.Colors.Where(x => (companyId == Guid.Empty) || (x.CompanyId == companyId)).FirstOrDefault(i => i.Id == id);
            if (item != null) return new JsonResult(TinyMapper.Map<WashViewModel>(item), DefaultJsonSettings);
            return NotFound(new { Error = $"ID {id} has not been found" });
        }

        // Get item by code
        [HttpGet("GetColorbyCode/{code}")]
        public IActionResult GetColorbyCode(string code)
        {
            Guid companyIdFromSearchData = Guid.Empty;
            Guid companyId = CompanyIdHelper.GetCompanyId(companyIdFromSearchData);
            var item = DbContext.Colors.Where(x => (companyId == Guid.Empty) || (x.CompanyId == companyId)).OrderByDescending(x => x.Version).FirstOrDefault(i => i.Code == code);
            if (item != null) return new JsonResult(TinyMapper.Map<ColorViewModel>(item), DefaultJsonSettings);
            return NotFound(new { Error = $"Code {code} has not been found" });
        }

        // Get item by slug
        [HttpGet("GetColorbySlug/{slug}")]
        public IActionResult GetColorbySlug(string slug)
        {
            Guid companyIdFromSearchData = Guid.Empty;
            Guid companyId = CompanyIdHelper.GetCompanyId(companyIdFromSearchData);
            var item = DbContext.Colors.Where(x => (companyId == Guid.Empty) || (x.CompanyId == companyId)).OrderByDescending(x => x.Version).FirstOrDefault(i => i.Slug == slug);
            if (item != null) return new JsonResult(TinyMapper.Map<ColorViewModel>(item), DefaultJsonSettings);
            return NotFound(new { Error = $"Slug {slug} has not been found" });
        }

        // Get item list with searching parameter
        [HttpPost("GetColorList")]
        public IActionResult GetColorList([FromBody]SearchGeneralFilterViewModel data)
        {
            // return a HTTP Status 404 (Not Found) if we couldn't find a suitable item.
            if (data == null)
                return NotFound(new { error = String.Format("Invalid Data") });

            Guid companyIdFromSearchData = data.CompanyId == null ? Guid.Empty : data.CompanyId.Value;
            Guid companyId = CompanyIdHelper.GetCompanyId(companyIdFromSearchData);
            string name = data.Name;
            string code = data.Code;
            string buyerCode = data.BuyerCode;

            //update code to get joined data

            var lstBrand = DbContext.Brands;
            var lstDepartment = DbContext.Departments;
            var lstDivision = DbContext.Divisions;
            var lstColor = DbContext.Colors;


            var itemList = (from c in lstColor
                join b in lstBrand on c.Brand equals b.Id
                join dept in lstDepartment on c.Department equals dept.Id
                join dv in lstDivision on c.Division equals dv.Id
                select new ColorListItemViewModel
                {
                    Id = c.Id,
                    DateCreated = c.DateCreated,
                    DateModified = c.DateModified,
                    IsActive = c.IsActive,
                    CompanyId = c.CompanyId,
                    Name = c.Name,
                    Code = c.Code,
                    BuyerCode = c.BuyerCode,
                    Slug = c.Slug,
                    Version = c.Version,
                    Brand = b.Name,
                    Department = dept.Name,
                    Division = dv.Name,
                    Image = c.Image,
                    Thumbnail = c.Image.Split('|')[0],
                    IsDeleted = c.IsDeleted,
                    IsLatest = c.IsLatest,
                    Remark = c.Remark
                }

                )

                .Where(x =>
                    (companyId == Guid.Empty) || (x.CompanyId == companyId) &&
                    (string.IsNullOrEmpty(name) || x.Name.ToLower().Contains(name.Trim().ToLower())) &&
                    (string.IsNullOrEmpty(code) || x.Code.ToLower().Contains(code.Trim().ToLower())) &&
                    // todo: buyer code
                    (string.IsNullOrEmpty(buyerCode) || x.BuyerCode.ToLower().Contains(buyerCode.Trim().ToLower()))
                )
                .Where(x =>
                    (companyId == Guid.Empty) || (x.CompanyId == companyId) &&
                    (string.IsNullOrEmpty(name) || x.Name.ToLower().Contains(name.Trim().ToLower())) &&
                    (string.IsNullOrEmpty(code) || x.Code.ToLower().Contains(code.Trim().ToLower())) &&
                    // todo: buyer code
                    (string.IsNullOrEmpty(buyerCode) || x.BuyerCode.ToLower().Contains(buyerCode.Trim().ToLower()))
                )
                .Where(x => x.IsLatest && !x.IsDeleted && x.IsActive);

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
            itemList = itemList.OrderBy(x => x.Name);
            // save the total number of records
            var total = itemList.Count();
            // pass in the Model
            var result = new ColorListViewModel();
            result.Data = new List<ColorListItemViewModel>();
            result.Paging = new Pagination();
            if (data.Paging.PageNumber == 0)
            {
                // if pagenumuber ==0 , get All
                result.Data = itemList.Select(x => TinyMapper.Map<ColorListItemViewModel>(x)).ToList();
                result.Paging.PageNumber = 0;
                result.Paging.Total = total;
                result.Paging.Show = total;
                result.Paging.PageCount = new List<int>();
                result.Paging.PageSize = total;
                return new JsonResult(result, DefaultJsonSettings);
            }
            // else, do Pagination here
            var list = itemList.Skip((data.Paging.PageNumber - 1) * data.Paging.PageSize).Take(data.Paging.PageSize);
            result.Data = list.Select(x => TinyMapper.Map<ColorListItemViewModel>(x)).ToList();

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
        [HttpGet("GetColorListByCode/{code}")]
        public IActionResult GetColorListByCode(string code)
        {
            if (!string.IsNullOrEmpty(code))
            {
                Guid companyIdFromSearchData = Guid.Empty;
                Guid companyId = CompanyIdHelper.GetCompanyId(companyIdFromSearchData);
                var itemList = DbContext.Colors.Where(x =>

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
        [HttpPost("AddColor")]
        [Authorize]
        public IActionResult Add([FromBody]ColorViewModel data)
        {
            // return a HTTP Status 404 (Not Found) if we couldn't find a suitable item.
            if (data == null)
                return NotFound(new { error = String.Format("Invalid Data") });

            // Get company Id base on the user type
            Guid companyIdFromSearchData = Guid.Empty;
            Guid companyId = CompanyIdHelper.GetCompanyId(companyIdFromSearchData);

            // Get last code for current library type
            CodeHelper ch = new CodeHelper(DbContext);
            string code = ch.GetColorCode(EnumHelper.LibType.LibColor.ToString());

            // Check if slug is duplicate or not
            string slug = SlugHelper.GetSlug(data.CompanyId, DbContext, data.Name, EnumHelper.LibType.LibColor.ToString());


            var guid = Guid.NewGuid();
            var color = new LibColor()
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
                Brand = data.Brand,
                Department = data.Department,
                Division = data.Division,
                Image = data.Image,
                IsLatest = true,
                IsDeleted = false,
                Remark = data.Remark
            };

            DbContext.Colors.Add(color);

            // persist the changes into the Database.
            DbContext.SaveChanges();

            // set new id to data object
            data.Id = color.Id;
            //image uploading

            SaveImage(guid, color.Code, color.Version, data.Image);

            return new JsonResult(data, DefaultJsonSettings);
        }

        // PUT api/values/5
        [HttpPut("UpdateColor")]
        [Authorize]
        public IActionResult Update([FromBody]ColorViewModel data)
        {
            if (data != null)
            {
                var Color = DbContext.Colors.FirstOrDefault(i => i.Id.Equals(data.Id));

                if (Color != null)
                {
                    // Get company Id base on the user type
                    Guid companyIdFromSearchData = Guid.Empty;
                    Guid companyId = CompanyIdHelper.GetCompanyId(companyIdFromSearchData);

                    // Check if slug is duplicate or not
                    string slug = SlugHelper.GetSlug(data.CompanyId, DbContext, data.Name, EnumHelper.LibType.LibColor.ToString());


                    // Copy the old record's data into a new record
                    var color = new LibColor()
                    {
                        Id = Guid.NewGuid(),
                        DateCreated = Color.DateCreated,
                        DateModified = Color.DateModified,
                        IsActive = Color.IsActive,
                        CompanyId = Color.CompanyId,
                        Name = Color.Name,
                        Code = Color.Code,
                        BuyerCode = Color.BuyerCode,
                        Slug = Color.Slug,
                        Version = Color.Version,
                        Brand = Color.Brand,
                        Department = Color.Department,
                        Division = Color.Division,
                        Image = Color.Image,
                        IsLatest = false,
                        IsDeleted = Color.IsDeleted,
                        Remark = Color.Remark
                    };
                    DbContext.Colors.Add(color);


                    // Update the old record data.
                    Color.DateModified = DateTime.Now;
                    Color.IsActive = data.IsActive;
                    Color.CompanyId = companyId;
                    Color.Name = data.Name;
                    Color.Code = data.Code;
                    Color.BuyerCode = data.BuyerCode;
                    Color.Slug = slug;
                    Color.Version = Color.Version + 1;
                    Color.Brand = data.Brand;
                    Color.Department = data.Department;
                    Color.Division = data.Division;
                    Color.Image = data.Image;
                    Color.IsLatest = true;
                    Color.IsActive = true;
                    Color.IsDeleted = false;
                    Color.Remark = data.Remark;
                    DbContext.Colors.Update(Color);


                    // persist the changes into the Database.
                    DbContext.SaveChanges();
                    SaveImage(Color.Id, Color.Code, Color.Version, Color.Image);
                    return new JsonResult(data, DefaultJsonSettings);
                }
                return NotFound(new { error = "Data has not been found" });  // return a HTTP Status 404 (Not Found) if we couldn't find a suitable item.
            }
            return NotFound(new { error = "Invalid Data" });   // return a HTTP Status 404 (Not Found) if we couldn't find a suitable item.
        }

        // DELETE api/values/5
        [HttpDelete("DeleteColor/{id}")]
        [Authorize]
        public IActionResult Delete(Guid id)
        {
            var colorItem = DbContext.Colors.FirstOrDefault(i => i.Id == id);

            if (colorItem != null)
            {
                colorItem.IsDeleted = true;
                colorItem.IsLatest = false;
                DbContext.Colors.Update(colorItem);

                // then, find the nearest version to set its IsLatest to true
                var nearestitem = DbContext.Colors.Where(x => x.IsDeleted == false && x.IsActive && x.Code == colorItem.Code).OrderByDescending(x => x.Version).ToList().ElementAt(1);
                if (nearestitem != null)
                {
                    nearestitem.IsLatest = true;
                    DbContext.Colors.Update(nearestitem);

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
                var tempfolderpath = Path.Combine(hostingEnv.WebRootPath + Constants.COLORTEMPIMAGEUPLOADFOLDER);
                var exists = Directory.Exists(tempfolderpath);
                if (!exists)
                    Directory.CreateDirectory(tempfolderpath);
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
                    UploadPath = Constants.COLORTEMPIMAGEUPLOADFOLDER + uploadimage.FileName
                };

                return new JsonResult(data, DefaultJsonSettings);
            }
            return null;
        }

        public IActionResult SaveImage(Guid fabid, string code, int version, string tempfile)
        {

            var exist = System.IO.File.Exists(hostingEnv.WebRootPath + tempfile);
            if (exist)
            {

                var extension = Path.GetExtension(tempfile);
                var uploadspath = Path.Combine(hostingEnv.WebRootPath +
                                               Constants.COLORUPLOADFOLDER + Constants.COMPANYCODEFOLDER);

                var exists = Directory.Exists(uploadspath);
                if (!exists)
                    System.IO.Directory.CreateDirectory(uploadspath);
                var filename = Constants.COMPANYCODE + code + "V" + version + extension;
                System.IO.File.Copy(Path.Combine(hostingEnv.WebRootPath + tempfile), Path.Combine(uploadspath + filename));
                var di = new DirectoryInfo(hostingEnv.WebRootPath + Constants.COLORTEMPIMAGEUPLOADFOLDER);

                foreach (FileInfo file in di.GetFiles())
                {
                    file.Delete();
                }

                // update fabrics image 
                var fab = DbContext.Colors.FirstOrDefault(x => x.Id == fabid);
                if (fab != null)
                {
                    fab.Image = Constants.COLORUPLOADFOLDER + Constants.COMPANYCODEFOLDER + filename;
                    DbContext.Colors.Update(fab);
                    DbContext.SaveChanges();
                }

            }

            return null;

        }
        #endregion

        #region Private Memers

        private List<ColorViewModel> ToItemViewModelList(IEnumerable<LibColor> colors)
        {
            var result = colors.Select(TinyMapper.Map<ColorViewModel>).ToList();
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
