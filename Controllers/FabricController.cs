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

namespace GUSLibrary.Controllers
{
    [Route("api/[controller]")]
    public class FabricController : Controller
    {
        #region Private Fields
        protected GUSLibraryDbContext DbContext;
        private IHostingEnvironment hostingEnv;
        #endregion Private Fields

        #region Constructor
        public FabricController(GUSLibraryDbContext context, IHostingEnvironment env)
        {
            DbContext = context;
            this.hostingEnv = env;
        }
        #endregion Constructor

        #region Attribute-based Routing
        // GET: api/values
        [HttpPost("GetFabricsList")]
        public IActionResult GetFabricsList([FromBody]FabricsFilterModel data)
        {
            // return a HTTP Status 404 (Not Found) if we couldn't find a suitable item.
            if (data == null)
                return NotFound(new { error = "Invalid Data" });

            var companyIdFromSearchData = data.CompanyId ?? Guid.Empty;
            var companyId = CompanyIdHelper.GetCompanyId(companyIdFromSearchData);
            var name = data.Name; // should come from search data
            var code = data.Code; // should come from search data
            var buyerCode = data.BuyerCode;
            var itemList = (from f in DbContext.Fabrics
                            join c in DbContext.FabricsCategories on f.FabCategory equals c.Id
                            join d in DbContext.FabricsProductNames on f.FabProductName equals d.Id
                            join y in DbContext.FabricsYarnCounts on f.FabYarnCount equals y.Id
                            join ct in DbContext.FabricsFibreContents on f.FabFibreContent equals ct.Id
                            join fin in DbContext.FabricsFinishings on f.FabFinishing equals fin.Id
                            join div in DbContext.Divisions on f.Division equals div.Id
                            join dept in DbContext.Departments on f.Department equals dept.Id
                            join br in DbContext.Brands on f.Brand equals br.Id
                            join type in DbContext.FabricsTypes on f.FabType equals type.Id
                            join cl in DbContext.Colors on f.Color equals cl.Id
                            join pt in DbContext.FabricProductTypes on f.FabProductType equals pt.Id
                            join w in DbContext.FabricWeights on f.FabricWeight equals w.Id
                            select new FabricListItemViewModel
                            {
                                Id = f.Id,
                                DateCreated = f.DateCreated,
                                DateModified = f.DateModified,
                                IsActive = f.IsActive,
                                Name = f.Name,
                                Code = f.Code,
                                BuyerCode = f.BuyerCode,
                                FabCategory = c.Name,
                                FabProductName = d.Name,
                                Image = f.Image,
                                FabYarnCount = y.Name,
                                FabFibreContent = ct.Name,
                                FabFinishing = fin.Name,
                                FabricWeight = w.Name,
                                Supplier = f.Supplier,
                                Description = f.Description,
                                SupplierCode = f.SupplierCode,
                                Division = div.Name,
                                Department = dept.Name,
                                Brand = br.Name,
                                FabType = type.Name,
                                CompanyId = f.CompanyId,
                                IsDeleted = f.IsDeleted,
                                IsLatest = f.IsLatest,
                                Color = cl.Name,
                                FabProductType = pt.Name,
                                Thumbnail = f.Image.Split('|')[0],
                                FabTypeId = f.FabType.ToString(),
                                FabCateId = f.FabCategory.ToString(),
                                FabProductNameId = f.FabProductName.ToString()
                            }).ToList()
                .Where(x =>
                    (companyId == Guid.Empty) || (x.CompanyId == companyId) &&
                    (string.IsNullOrEmpty(name) || x.Name.ToLower().Contains(name.Trim().ToLower())) &&
                    (string.IsNullOrEmpty(code) || x.Code.ToLower().Contains(code.Trim().ToLower())) &&
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
            if (!string.IsNullOrEmpty(data.TypeId))
            {
                itemList = itemList.Where(x => x.FabTypeId == data.TypeId);
            }
            if (!string.IsNullOrEmpty(data.CateId))
            {
                itemList = itemList.Where(x => x.FabCateId == data.CateId);
            }
            if (!string.IsNullOrEmpty(data.ProductNameId))
            {
                itemList = itemList.Where(x => x.FabProductNameId == data.ProductNameId);
            }

            itemList = itemList.OrderBy(x => x.Name);

            // save the total number of records
            var total = itemList.Count();
            // pass in the Model
            var result = new FabricListViewModel();
            result.Data = new List<FabricListItemViewModel>();
            result.Paging = new Pagination();
            if (data.Paging.PageNumber == 0)
            {
                // if pagenumuber ==0 , get All
                result.Data = itemList.Select(x => TinyMapper.Map<FabricListItemViewModel>(x)).ToList();
                result.Paging.PageNumber = 0;
                result.Paging.Total = total;
                result.Paging.Show = total;
                result.Paging.PageCount = new List<int>();
                result.Paging.PageSize = total;
                return new JsonResult(result, DefaultJsonSettings);
            }
            // else, do Pagination here
            var list = itemList.Skip((data.Paging.PageNumber - 1) * data.Paging.PageSize).Take(data.Paging.PageSize);
            result.Data = list.Select(x => TinyMapper.Map<FabricListItemViewModel>(x)).ToList();

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

        // GET api/values/5
        [HttpGet("GetFabricsById/{id}")]
        public IActionResult GetFabricsById(Guid id)
        {
            Guid companyIdFromSearchData = Guid.Empty;
            Guid companyId = CompanyIdHelper.GetCompanyId(companyIdFromSearchData);
            var item = DbContext.Fabrics.Where(x => (companyId == Guid.Empty) || (x.CompanyId == companyId)).FirstOrDefault(i => i.Id == id);
            if (item != null)
            {
                var result = TinyMapper.Map<FabricViewModel>(item);
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

        // GET api/values/slug
        [HttpGet("GetFabricsBySlug/{slug}")]
        public IActionResult GetFabricBySlug(string slug)
        {
            Guid companyIdFromSearchData = Guid.Empty;
            Guid companyId = CompanyIdHelper.GetCompanyId(companyIdFromSearchData);
            var item = DbContext.Fabrics.Where(x => (companyId == Guid.Empty) || (x.CompanyId == companyId)).Where(x => x.IsLatest && !x.IsDeleted).FirstOrDefault(i => i.Slug == slug);
            if (item != null) return new JsonResult(TinyMapper.Map<AccessoryProductNameViewModel>(item), DefaultJsonSettings);
            return NotFound(new { Error = $"Slug {slug} has not been found" });
        }


        // Get item by code
        [HttpGet("GetFabricsByCode/{code}")]
        public IActionResult GetFabricByCode(string code)
        {
            if (!string.IsNullOrEmpty(code))
            {
                Guid companyIdFromSearchData = Guid.Empty;
                Guid companyId = CompanyIdHelper.GetCompanyId(companyIdFromSearchData);
                var itemList = DbContext.Fabrics.Where(x =>

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
        [HttpGet("GetFabricsListByCode/{code}")]
        public IActionResult GetFabricsListByCode(string code)
        {
            if (!string.IsNullOrEmpty(code))
            {
                Guid companyIdFromSearchData = Guid.Empty;
                Guid companyId = CompanyIdHelper.GetCompanyId(companyIdFromSearchData);

                var itemList = DbContext.Fabrics.Where(x =>

                    ((companyId == Guid.Empty) || (x.CompanyId == companyId)) &&
                    x.Code.ToLower().Equals(code.Trim().ToLower())

                    )
                    .OrderByDescending(x => x.Version);

                return new JsonResult(ToItemViewModelList(itemList), DefaultJsonSettings);
            }
            return BadRequest(new { error = "Code is empty." });
        }
        // POST api/values
        [HttpPost("AddFabrics")]
        [Authorize]
        public IActionResult Add([FromBody]FabricViewModel data)
        {
            if (data == null)
                return NotFound(new { error = "Invalid Data" });
            // return a HTTP Status 404 (Not Found) if we couldn't find a suitable item.
            var companyIdFromSearchData = Guid.Empty;
            var companyId = CompanyIdHelper.GetCompanyId(companyIdFromSearchData);

            // Get last code for current library type
            var ch = new CodeHelper(DbContext);
            string code = ch.GetTypeCode(EnumHelper.LibType.LibFabric.ToString());
            string slug = SlugHelper.GetSlug(data.CompanyId, DbContext, data.BuyerCode, EnumHelper.LibType.LibFabric.ToString());
            var guid = Guid.NewGuid();
            var fabricToAdd = new LibFabric()
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
                FabCategory = data.FabCategory,
                FabProductName = data.FabProductName,
                Description = data.Description,
                Image = data.Image,
                FabYarnCount = data.FabYarnCount,
                FabFibreContent = data.FabFibreContent,
                FabFinishing = data.FabFinishing,
                FabricWeight = data.FabricWeight,
                Supplier = data.Supplier,
                SupplierCode = data.SupplierCode,
                FabType = data.FabType,
                Brand = data.Brand,
                Department = data.Department,
                Division = data.Division,
                Remark = data.Remark,
                Color = data.Color,
                IsLatest = true,
                IsDeleted = false,
                FabProductType = data.FabProductType

            };

            DbContext.Fabrics.Add(fabricToAdd);

            // persist the changes into the Database.
            DbContext.SaveChanges();

            // set new id to data object
            data.Id = fabricToAdd.Id;

            //image uploading

            var arrimage = data.Image.Split('|');
            var images = "";
            for (var i = 0; i < arrimage.Length - 1; i++)
            {
                images += SaveImage(fabricToAdd.Id, fabricToAdd.Code, fabricToAdd.Version, arrimage[i]) + "|";
            }
            // update fabrics image 
            var fab = DbContext.Fabrics.FirstOrDefault(x => x.Id == fabricToAdd.Id);
            if (fab != null)
            {
                fab.Image = images;
                DbContext.Fabrics.Update(fab);
                DbContext.SaveChanges();
            }

            return new JsonResult(data, DefaultJsonSettings);
        }

        // PUT api/values/5
        [HttpPut("UpdateFabrics")]
        [Authorize]
        public IActionResult Update([FromBody]FabricViewModel data)
        {
            if (data != null)
            {
                var fabric = DbContext.Fabrics.FirstOrDefault(i => i.Id == data.Id);

                if (fabric != null)
                {
                    // Get company Id base on the user type
                    Guid companyIdFromSearchData = Guid.Empty;
                    Guid companyId = CompanyIdHelper.GetCompanyId(companyIdFromSearchData);

                    // Check if slug is duplicate or not
                    string slug = SlugHelper.GetSlug(data.CompanyId, DbContext, data.Name, EnumHelper.LibType.LibFabric.ToString());
                    // Copy the old record's data into a new record
                    var fab = new LibFabric()
                    {
                        Id = Guid.NewGuid(),
                        DateCreated = fabric.DateCreated,
                        DateModified = fabric.DateModified,
                        IsActive = fabric.IsActive,
                        CompanyId = fabric.CompanyId,
                        Name = fabric.Name,
                        Code = fabric.Code,
                        Version = fabric.Version,
                        Slug = fabric.Slug,
                        BuyerCode = fabric.BuyerCode,
                        IsLatest = false,
                        IsDeleted = fabric.IsDeleted,
                        FabCategory = fabric.FabCategory,
                        FabProductName = fabric.FabProductName,
                        Image = fabric.Image,
                        FabYarnCount = fabric.FabYarnCount,
                        FabFibreContent = fabric.FabFibreContent,
                        FabFinishing = fabric.FabFinishing,
                        FabricWeight = fabric.FabricWeight,
                        Supplier = fabric.Supplier,
                        SupplierCode = fabric.SupplierCode,
                        FabType = fabric.FabType,
                        Brand = fabric.Brand,
                        Department = fabric.Department,
                        Division = fabric.Division,
                        Remark = fabric.Remark,
                        Color = fabric.Color,
                        Description = fabric.Description,
                        FabProductType = fabric.FabProductType
                    };
                    DbContext.Fabrics.Add(fab);

                    fabric.DateModified = DateTime.Now;
                    fabric.IsActive = data.IsActive;
                    fabric.CompanyId = data.CompanyId;
                    fabric.Name = data.Name;
                    fabric.Code = data.Code;    //this should auto generate by system, and can not be changed
                    fabric.Slug = data.Slug;    //this should generate by some slug helper class in future.
                    fabric.BuyerCode = data.BuyerCode;
                    fabric.FabCategory = data.FabCategory;
                    fabric.FabProductName = data.FabProductName;
                    fabric.Image = data.Image;
                    fabric.FabYarnCount = data.FabYarnCount;
                    fabric.FabFibreContent = data.FabFibreContent;
                    fabric.FabFinishing = data.FabFinishing;
                    fabric.FabricWeight = data.FabricWeight;
                    fabric.Supplier = data.Supplier;
                    fabric.SupplierCode = data.SupplierCode;
                    fabric.FabType = data.FabType;
                    fabric.Brand = data.Brand;
                    fabric.Department = data.Department;
                    fabric.Division = data.Division;
                    fabric.Remark = data.Remark;
                    fabric.Color = data.Color;
                    fabric.Version += 1;
                    fabric.Description = data.Description;
                    fabric.FabProductType = data.FabProductType;
                    fabric.IsActive = true;
                    fabric.IsDeleted = false;
                    fabric.IsLatest = true;


                    DbContext.Fabrics.Update(fabric);

                    // persist the changes into the Database.
                    DbContext.SaveChanges();

                    SaveImage(fabric.Id, fabric.Code, fabric.Version, fabric.Image);

                    return new JsonResult(data, DefaultJsonSettings);
                }
                return NotFound(new { error = "Data has not been found" });  // return a HTTP Status 404 (Not Found) if we couldn't find a suitable item.
            }
            return NotFound(new { error = "Invalid Data" });   // return a HTTP Status 404 (Not Found) if we couldn't find a suitable item.
        }

        // DELETE api/values/5
        [HttpDelete("DeleteFabrics/{id}")]
        [Authorize]
        public IActionResult Delete(Guid id)
        {
            var fabricItem = DbContext.Fabrics.FirstOrDefault(i => i.Id == id);

            if (fabricItem != null)
            {
                fabricItem.IsDeleted = true;
                fabricItem.IsLatest = false;
                DbContext.Fabrics.Update(fabricItem);

                // then, find the nearest version to set its IsLatest to true
                var nearestitem = DbContext.Fabrics.Where(x => x.IsDeleted == false && x.IsActive && x.Code == fabricItem.Code).OrderByDescending(x => x.Version).ToList().ElementAt(1);
                if (nearestitem != null)
                {
                    nearestitem.IsLatest = true;
                    DbContext.Fabrics.Update(nearestitem);

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
                    var tempfolderpath = Path.Combine(hostingEnv.WebRootPath + Constants.FABRICTEMPIMAGEUPLOADFOLDER);
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
                        UploadPath = Constants.FABRICTEMPIMAGEUPLOADFOLDER + uploadimage.FileName
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
                                               Constants.FABRICSUPLOADFOLDER + Constants.COMPANYCODEFOLDER);

                var exists = Directory.Exists(uploadspath);
                if (!exists)
                    System.IO.Directory.CreateDirectory(uploadspath);
                var filename = Constants.COMPANYCODE + code + "V" + version + "_" + DateTime.Now.Ticks + extension;
                System.IO.File.Copy(Path.Combine(hostingEnv.WebRootPath + tempfile), Path.Combine(uploadspath + filename));


                return Constants.FABRICSUPLOADFOLDER + Constants.COMPANYCODEFOLDER + filename;
            }

            return string.Empty;

        }
        #endregion

        #region Private Memers

        private List<FabricViewModel> ToItemViewModelList(IEnumerable<LibFabric> Fabrics)
        {
            var result = Fabrics.Select(TinyMapper.Map<FabricViewModel>).ToList();
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
