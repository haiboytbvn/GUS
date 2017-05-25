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
    public class GraphicController : Controller
    {
        #region Private Fields
        protected GUSLibraryDbContext DbContext;
        private IHostingEnvironment hostingEnv;
        #endregion Private Fields

        #region Constructor
        public GraphicController(GUSLibraryDbContext context, IHostingEnvironment env)
        {
            DbContext = context;
            this.hostingEnv = env;
        }
        #endregion Constructor

        #region Attribute-based Routing
        // GET: api/values
        [HttpPost("GetGraphicList")]
        public IActionResult GetGraphicsList([FromBody]GraphicFilterModel data)
        {
            // return a HTTP Status 404 (Not Found) if we couldn't find a suitable item.
            if (data == null)
                return NotFound(new { error = "Invalid Data" });

            var companyIdFromSearchData = data.CompanyId ?? Guid.Empty;
            var companyId = CompanyIdHelper.GetCompanyId(companyIdFromSearchData);
            var name = data.Name; // should come from search data
            var code = data.Code; // should come from search data
            var buyerCode = data.BuyerCode;

            var itemList = (from graphic in DbContext.Graphics   
                          join div in DbContext.Divisions on graphic.Division equals div.Id
                          join dept in DbContext.Departments on graphic.Department equals dept.Id
                          join br in DbContext.Brands on graphic.Brand equals br.Id
                          join c in DbContext.Colors on graphic.Color equals c.Id
                          join gtype in DbContext.GraphicTypes on graphic.GraphicType equals gtype.Id
                          join gc in DbContext.GraphicCategories on graphic.GraphicCategory equals gc.Id
                          join gpn in DbContext.GraphicProductNames on graphic.GraphicProductName equals gpn.Id
                          select new GraphicListItemViewModel
                          {
                              Id = graphic.Id,
                              DateCreated = graphic.DateCreated,
                              DateModified = graphic.DateModified,
                              IsActive = graphic.IsActive,
                              Name = graphic.Name,
                              Code = graphic.Code,
                              BuyerCode = graphic.BuyerCode,                         
                              Image = graphic.Image,
                              Division = div.Name,
                              Department = dept.Name,
                              Brand = br.Name,
                              GraphicType = gtype.Name,
                              GraphicCategory = gc.Name,
                              GraphicProductName = gpn.Name,
                              Description = graphic.Description,
                              ItemSize = graphic.ItemSize,
                              CompanyId = graphic.CompanyId,
                              IsDeleted = graphic.IsDeleted,
                              IsLatest = graphic.IsLatest,
                              Version = graphic.Version,
                              Color = c.Name,
                              Thumbnail = graphic.Image.Split('|')[0],
                              Supplier = graphic.Supplier,
                              SupplierCode = graphic.SupplierCode,
                              GraphicTypeId = gtype.Id.ToString(),
                              GraphicCateId = gc.Id.ToString(),
                              GraphicProductNameId = gpn.Id.ToString()
                          })
                .Where(x =>
                  (companyId == Guid.Empty) || (x.CompanyId == companyId) &&
            (string.IsNullOrEmpty(name) || x.Name.ToLower().Contains(name.Trim().ToLower())) &&
            (string.IsNullOrEmpty(code) || x.Code.ToLower().Contains(code.Trim().ToLower())) &&
            (string.IsNullOrEmpty(buyerCode) || x.BuyerCode.ToLower().Contains(buyerCode.Trim().ToLower()))
            )
            .Where(x => x.IsLatest && !x.IsDeleted && x.IsActive);

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
                itemList = itemList.Where(x => x.Code.ToUpper().Contains(data.Code.Trim().ToUpper()));
            }
            if (!string.IsNullOrEmpty(data.TypeId))
            {
                itemList = itemList.Where(x => x.GraphicTypeId == data.TypeId);
            }
            if (!string.IsNullOrEmpty(data.CateId))
            {
                itemList = itemList.Where(x => x.GraphicCateId == data.CateId);
            }
            if (!string.IsNullOrEmpty(data.ProductNameId))
            {
                itemList = itemList.Where(x => x.GraphicProductNameId == data.ProductNameId);

            }

            itemList = itemList.OrderBy(x => x.BuyerCode);
            //====end filtering

            // save the total number of records
            var total = itemList.Count();
            // pass in the Model
            var result = new GraphicListViewModel();
            result.Data = new List<GraphicListItemViewModel>();
            result.Paging = new Pagination();
            if (data.Paging.PageNumber == 0)
            {
                // if pagenumuber ==0 , get All
                result.Data = itemList.Select(x => TinyMapper.Map<GraphicListItemViewModel>(x)).ToList();
                result.Paging.PageNumber = 0;
                result.Paging.Total = total;
                result.Paging.Show = total;
                result.Paging.PageCount = new List<int>();
                result.Paging.PageSize = total;
                return new JsonResult(result, DefaultJsonSettings);
            }
            // else, do Pagination here
            var list = itemList.Skip((data.Paging.PageNumber - 1) * data.Paging.PageSize).Take(data.Paging.PageSize);
            result.Data = list.Select(x => TinyMapper.Map<GraphicListItemViewModel>(x)).ToList();

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
        [HttpGet("GetGraphicById/{id}")]
        public IActionResult GetGraphicsById(Guid id)
        {
            Guid companyIdFromSearchData = Guid.Empty;
            Guid companyId = CompanyIdHelper.GetCompanyId(companyIdFromSearchData);
            var item = DbContext.Graphics.Where(x=>(companyId == Guid.Empty) || (x.CompanyId == companyId)).FirstOrDefault(x => x.Id==id);
            if (item != null)
            {
                var result = TinyMapper.Map<GraphicViewModel>(item);
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
        [HttpGet("GetGraphicsBySlug/{slug}")]
        public IActionResult GetGraphicBySlug(string slug)
        {
            Guid companyIdFromSearchData = Guid.Empty;
            Guid companyId = CompanyIdHelper.GetCompanyId(companyIdFromSearchData);
            var item = DbContext.Graphics.Where(x => (companyId == Guid.Empty) || (x.CompanyId == companyId)).Where(x => x.IsLatest && !x.IsDeleted).FirstOrDefault(i => i.Slug == slug);
            if (item != null) return new JsonResult(TinyMapper.Map<GraphicViewModel>(item), DefaultJsonSettings);
            return NotFound(new { Error = $"Slug {slug} has not been found" });
        }


        // Get item by code
        [HttpGet("GetGraphicByCode/{code}")]
        public IActionResult GetGraphicByCode(string code)
        {
            if (!string.IsNullOrEmpty(code))
            {
                Guid companyIdFromSearchData = Guid.Empty;
                Guid companyId = CompanyIdHelper.GetCompanyId(companyIdFromSearchData);
                var itemList = DbContext.Graphics.Where(x =>

                    ((companyId == Guid.Empty) || (x.CompanyId == companyId)) &&
                    x.Code.ToLower().Equals(code.Trim().ToLower())

                    )
                    .Where(x => !(x.IsDeleted))
                    .OrderByDescending(x => x.Version);


                return new JsonResult(ToItemViewModelList(itemList), DefaultJsonSettings);
            }
            return BadRequest(new { error = "Code is empty." });
        }

        // Get item by code
        [HttpGet("GetGraphicType")]
        public IActionResult GetGraphicType()
        {
            var result = new List<string>();
            foreach (var suit in Enum.GetValues(typeof(EnumHelper.GraphicType)))
            {
                result.Add(suit.ToString());
            }
            return new JsonResult(result, DefaultJsonSettings);
        }

        // Get item list by code (return all version of items with same code)
        [HttpGet("GetGraphicListByCode/{code}")]
        public IActionResult GetGraphicsListByCode(string code)
        {
            if (!string.IsNullOrEmpty(code))
            {
                Guid companyIdFromSearchData = Guid.Empty;
                Guid companyId = CompanyIdHelper.GetCompanyId(companyIdFromSearchData);

                var itemList = DbContext.Graphics.Where(x =>

                    ((companyId == Guid.Empty) || (x.CompanyId == companyId)) &&
                    x.Code.ToLower().Equals(code.Trim().ToLower())

                    )
                    .OrderByDescending(x => x.Version);

                return new JsonResult(ToItemViewModelList(itemList), DefaultJsonSettings);
            }
            return BadRequest(new { error = "Code is empty." });
        }
        // POST api/values
        [HttpPost("AddGraphic")]
        [Authorize]
        public IActionResult Add([FromBody]GraphicViewModel data)
        {
            if (data == null)
                return NotFound(new { error = "Invalid Data" });
            // return a HTTP Status 404 (Not Found) if we couldn't find a suitable item.
            var companyIdFromSearchData = Guid.Empty;
            var companyId = CompanyIdHelper.GetCompanyId(companyIdFromSearchData);

            // Get last code for current library type
            var ch = new CodeHelper(DbContext);
            string code = ch.GetTypeCode(EnumHelper.LibType.LibGraphic.ToString());
            string slug = SlugHelper.GetSlug(data.CompanyId, DbContext, data.BuyerCode, EnumHelper.LibType.LibGraphic.ToString());
            var guid = Guid.NewGuid();
            var graphicToAdd = new LibGraphic()
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
                GraphicType= data.GraphicType,
                GraphicProductName = data.GraphicProductName,
                GraphicCategory = data.GraphicCategory,
                Supplier = data.Supplier,
                SupplierCode = data.SupplierCode,
                Remark = data.Remark,
                IsLatest = true,
                IsDeleted = false,
                Color = data.Color,
                Description = data.Description,
                ItemSize = data.ItemSize

            };

            DbContext.Graphics.Add(graphicToAdd);
            var arrimage = data.Image.Split('|');
            var images = "";
            for (var i = 0; i < arrimage.Length - 1; i++)
            {
                images += SaveImage(graphicToAdd.Id, graphicToAdd.Code, graphicToAdd.Version, arrimage[i]) + "|";
            }
            // update fabrics image 
            var fab = DbContext.Graphics.FirstOrDefault(x => x.Id == graphicToAdd.Id);
            if (fab != null)
            {
                fab.Image = images;
                DbContext.Graphics.Update(fab);
                DbContext.SaveChanges();
            }
            // persist the changes into the Database.
            DbContext.SaveChanges();

            // set new id to data object
            data.Id = graphicToAdd.Id;

            return new JsonResult(data, DefaultJsonSettings);
        }

        // PUT api/values/5
        [HttpPut("UpdateGraphic")]
        [Authorize]
        public IActionResult Update([FromBody]GraphicViewModel data)
        {
            if (data != null)
            {
                var graphic = DbContext.Graphics.FirstOrDefault(i => i.Id == data.Id);

                if (graphic != null)
                {
                    // Get company Id base on the user type
                    Guid companyIdFromSearchData = Guid.Empty;
                    Guid companyId = CompanyIdHelper.GetCompanyId(companyIdFromSearchData);

                    // Check if slug is duplicate or not
                    string slug = SlugHelper.GetSlug(data.CompanyId, DbContext, data.BuyerCode, EnumHelper.LibType.LibGraphic.ToString());
                    // Copy the old record's data into a new record
                    var grap = new LibGraphic()
                    {
                        Id = Guid.NewGuid(),
                        DateCreated = graphic.DateCreated,
                        DateModified = graphic.DateModified,
                        IsActive = graphic.IsActive,
                        CompanyId = graphic.CompanyId,
                        Name = graphic.Name,
                        Code = graphic.Code,
                        Version = graphic.Version,
                        Slug = graphic.Slug,
                        BuyerCode = graphic.BuyerCode,
                        IsLatest = false,
                        IsDeleted = graphic.IsDeleted,                   
                        Image = graphic.Image,                      
                        Brand = graphic.Brand,
                        Department = graphic.Department,
                        Division = graphic.Division,
                        Remark = graphic.Remark,
                        Color = graphic.Color,
                        GraphicType = graphic.GraphicType,
                        GraphicCategory = graphic.GraphicCategory,
                        GraphicProductName = graphic.GraphicProductName,
                        Description = graphic.Description,
                        ItemSize = graphic.ItemSize,
                        Supplier = graphic.Supplier,
                        SupplierCode = graphic.SupplierCode,
                        
                    };
                    DbContext.Graphics.Add(grap);

                    graphic.DateModified = DateTime.Now;
                    graphic.IsActive = data.IsActive;
                    graphic.CompanyId = data.CompanyId;
                    graphic.Name = data.Name;
                    graphic.Code = data.Code;    //this should auto generate by system, and can not be changed
                    graphic.Slug = slug;    //this should generate by some slug helper class in future.
                    graphic.BuyerCode = data.BuyerCode;                 
                    graphic.Image = data.Image;                
                    graphic.Brand = data.Brand;
                    graphic.Department = data.Department;
                    graphic.Division = data.Division;
                    graphic.Remark = data.Remark;
                    graphic.Version += 1;
                    graphic.ItemSize = data.ItemSize;
                    graphic.GraphicType = data.GraphicType;
                    graphic.GraphicCategory = data.GraphicCategory;
                    graphic.GraphicProductName = data.GraphicProductName;
                    graphic.Description = data.Description;
                    graphic.Supplier = data.Supplier;
                    graphic.SupplierCode = data.SupplierCode;
                    graphic.IsActive = true;
                    graphic.IsDeleted = false;
                    graphic.IsLatest = true;

                    graphic.Color = data.Color;
                    DbContext.Graphics.Update(graphic);

                    // persist the changes into the Database.
                    DbContext.SaveChanges();

                    SaveImage(graphic.Id, graphic.Code, graphic.Version, graphic.Image);

                    return new JsonResult(data, DefaultJsonSettings);
                }
                return NotFound(new { error = "Data has not been found" });  // return a HTTP Status 404 (Not Found) if we couldn't find a suitable item.
            }
            return NotFound(new { error = "Invalid Data" });   // return a HTTP Status 404 (Not Found) if we couldn't find a suitable item.
        }

        // DELETE api/values/5
        [HttpDelete("DeleteGraphic/{id}")]
        [Authorize]
        public IActionResult Delete(Guid id)
        {
            var graphicItem = DbContext.Graphics.FirstOrDefault(i => i.Id == id);

            if (graphicItem != null)
            {
                graphicItem.IsDeleted = true;

                graphicItem.IsLatest = false;
                DbContext.Graphics.Update(graphicItem);
             
                // then, find the nearest version to set its IsLatest to true
                var nearestitem = DbContext.Graphics.Where(x => x.IsDeleted==false && x.IsActive && x.Code == graphicItem.Code).OrderByDescending(x => x.Version).ToList().ElementAt(1);
                if (nearestitem != null)
                {
                    nearestitem.IsLatest = true;
                    DbContext.Graphics.Update(nearestitem);
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
                    var tempfolderpath = Path.Combine(hostingEnv.WebRootPath + Constants.GRAPHICTEMPIMAGEUPLOADFOLDER);
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
                        UploadPath = Constants.GRAPHICTEMPIMAGEUPLOADFOLDER + uploadimage.FileName
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
                                               Constants.GRAPHICUPLOADFOLDER + Constants.COMPANYCODEFOLDER);

                var exists = Directory.Exists(uploadspath);
                if (!exists)
                    System.IO.Directory.CreateDirectory(uploadspath);
                var filename = Constants.COMPANYCODE + code + "V" + version + "_" + DateTime.Now.Ticks + extension;
                System.IO.File.Copy(Path.Combine(hostingEnv.WebRootPath + tempfile), Path.Combine(uploadspath + filename));


                return Constants.GRAPHICUPLOADFOLDER + Constants.COMPANYCODEFOLDER + filename;
            }

            return string.Empty;

        }
        #endregion

        #region Private Members

        private List<GraphicViewModel> ToItemViewModelList(IEnumerable<LibGraphic> Graphics)
        {
            var result = Graphics.Select(TinyMapper.Map<GraphicViewModel>).ToList();
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
