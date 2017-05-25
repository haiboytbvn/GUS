using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using GUSLibrary.Data;
using GUSLibrary.ViewModels;
using Microsoft.AspNetCore.Mvc;
using Nelibur.ObjectMapper;
using Newtonsoft.Json;
using System.IO;
using Microsoft.AspNetCore.Authorization;
using GUSLibrary.Classes;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.Net.Http.Headers;


namespace GUSLibrary.Controllers
{
    [Route("api/[controller]")]
    public class ProjectController : Controller
    {
        #region Private Fields
        protected GUSLibraryDbContext DbContext;
        #endregion Private Fields

        #region Constructor
        public ProjectController(GUSLibraryDbContext context, IHostingEnvironment env)
        {
            DbContext = context;
            this.hostingEnv = env;
        }
        #endregion Constructor
        // GET: /<controller>/
        private IHostingEnvironment hostingEnv;
        #region Attribute-based Routing
        // GET: api/values
        [HttpPost("GetProjectList")]
        public IActionResult GetProjectList()
        {
            // Reimplement Select Data Projects START
            /*var lstProject = DbContext.ProProjects;
            var result = from p in lstProject
                         select new ProjectViewModel
                         {
                             Id = p.Id,
                             DateCreated = p.DateCreated,
                             DateModified = p.DateModified,
                             Status = p.Status,
                             ProjectNo = p.ProjectNo,
                             Description = p.Description,
                             DesignDeadline = p.DesignDeadline,
                             SourcingDeadline = p.SourcingDeadline,
                             ProductionDeadline = p.ProductionDeadline,
                             SampleDeadline = p.SampleDeadline,
                             FloorDeliveryDeadline = p.FloorDeliveryDeadline,
                             ImageUpload = p.ImageUpload,
                             Version = p.Version,
                             ProductTypeId = p.ProductTypeId,
                             LibSeasonId = p.LibSeasonId,
                             LibDepartmentId = p.LibDepartmentId,
                             LibDivisionId = p.LibDivisionId,
                             LibBrandId = p.LibBrandId,
                             ReadyStatusPro = p.ReadyStatusPro
                         };
            return new JsonResult(result.OrderBy(x => x.ProjectNo).ToList(), DefaultJsonSettings);*/
            // Reimplement Select Data Projects END

            var items = DbContext.ProProjects.OrderBy(i => i.ProjectNo).ToArray();
            return new JsonResult(ToItemViewModelList(items), DefaultJsonSettings);
        }

        // GET api/values/5
        [HttpGet("GetProject/{id}")]
        public IActionResult GetProject(Guid id)
        {
            var item = DbContext.ProProjects.FirstOrDefault(i => i.Id == id);
            if (item != null) return new JsonResult(TinyMapper.Map<ProjectViewModel>(item), DefaultJsonSettings);
            return NotFound(new { Error = $"ID {id} has not been found" });
        }

        [HttpPost("UploadImage")]
        public async Task<IActionResult> UploadImage()
        {
            //get image here
            var uploadimage = Request.Form.Files[0];
            var path = "uploads/images/projects/";
            var uploadspath = Path.Combine(hostingEnv.WebRootPath, path);
            var exists = System.IO.Directory.Exists(uploadspath);
            if (!exists)
                System.IO.Directory.CreateDirectory(uploadspath);

            //if (uploadimage.Length > 5000)
            //{
            //    return new JsonResult("", DefaultJsonSettings);
            //}

            string fileName = uploadimage.FileName + Guid.NewGuid().ToString().Replace("-", "").Substring(0, 5) + ".jpg";
            using (var fileStream = new FileStream(Path.Combine(uploadspath, fileName), FileMode.Create))
            {
                await uploadimage.CopyToAsync(fileStream);
                
            }


            var data = new ImageDataViewModel
            {
                FileName = uploadimage.FileName.Trim(),
                Size = uploadimage.Length,
                Type = uploadimage.ContentType,
                UploadPath = path + uploadimage.FileName
            };

            return new JsonResult(data, DefaultJsonSettings);
        }

        // GET api/values/5
        [HttpPost("SearchProject")]
        public IActionResult SearchProject([FromBody]SearchFilterProjectViewModel data)
        {
            // return a HTTP Status 404 (Not Found) if we couldn't find a suitable item.
            if (data == null)
                return NotFound(new { error = String.Format("Invalid Data") });

            var lstProProjects = DbContext.ProProjects.Where(x => 1 == 1);
            if (data.Others != "")
            {
                lstProProjects = DbContext.ProProjects.Where(x =>
                ((data.SeasonID != Guid.Empty) && (x.LibSeasonId == data.SeasonID)) ||
                ((data.BrandID != Guid.Empty) && (x.LibBrandId == data.BrandID)) ||
                ((data.DepartmentID != Guid.Empty) && (x.LibDepartmentId == data.DepartmentID)) ||
                ((data.DivisionID != Guid.Empty) && (x.LibDivisionId == data.DivisionID)) ||
                ((data.ProductTypeID != Guid.Empty) && (x.LibProductTypeId == data.ProductTypeID)) ||
                ((data.YearID != Guid.Empty) && (x.LibYearId == data.YearID)) &&
                ((data.Others != String.Empty) && ((x.ProjectNo == data.Others) || (x.Description == data.Others)))
                );
            }
            else if (data.SeasonID != Guid.Empty)
            {
                lstProProjects = DbContext.ProProjects.Where(x => (x.LibSeasonId == data.SeasonID));
            }
            else if (data.BrandID != Guid.Empty)
            {
                lstProProjects = DbContext.ProProjects.Where(x => (x.LibBrandId == data.BrandID));
            }
            else if (data.DepartmentID != Guid.Empty)
            {
                lstProProjects = DbContext.ProProjects.Where(x => (x.LibDepartmentId == data.DepartmentID));
            }
            else if (data.DivisionID != Guid.Empty)
            {
                lstProProjects = DbContext.ProProjects.Where(x => (x.LibDivisionId == data.DivisionID));
            }
            else if (data.ProductTypeID != Guid.Empty)
            {
                lstProProjects = DbContext.ProProjects.Where(x => (x.LibProductTypeId == data.ProductTypeID));
            }
            else if (data.YearID != Guid.Empty)
            {
                lstProProjects = DbContext.ProProjects.Where(x => (x.LibYearId == data.YearID));
            }


            var result = from dataProject in lstProProjects
                         select new ProjectViewModel
                         {
                             Id = dataProject.Id,
                             DateCreated = dataProject.DateCreated,
                             DateModified = dataProject.DateModified,
                             Status = dataProject.Status,
                             ProjectNo = dataProject.ProjectNo,
                             Description = dataProject.Description,
                             DesignDeadline = dataProject.DesignDeadline,
                             SourcingDeadline = dataProject.SourcingDeadline,
                             ProductionDeadline = dataProject.ProductionDeadline,
                             SampleDeadline = dataProject.SampleDeadline,
                             FloorDeliveryDeadline = dataProject.FloorDeliveryDeadline,
                             ImageUpload = dataProject.ImageUpload,
                             Version = dataProject.Version,

                             LibProductTypeId = dataProject.LibProductTypeId,
                             LibSeasonId = dataProject.LibSeasonId,
                             LibDepartmentId = dataProject.LibDepartmentId,
                             LibDivisionId = dataProject.LibDivisionId,
                             LibBrandId = dataProject.LibBrandId,
                             LibYearId = dataProject.LibYearId,

                             CopyID = dataProject.CopyID,

                             ReadyStatusPro = dataProject.ReadyStatusPro,
                             ReadyStatusProWash = dataProject.ReadyStatusProWash,
                             ReadyStatusProProjectViewing = dataProject.ReadyStatusProProjectViewing,
                             ReadyStatusProPrint = dataProject.ReadyStatusProPrint,
                             ReadyStatusProImageGallery = dataProject.ReadyStatusProImageGallery,
                             ReadyStatusProFabric = dataProject.ReadyStatusProFabric,
                             ReadyStatusProEmbroidery = dataProject.ReadyStatusProEmbroidery,
                             ReadyStatusProColorwayPrint = dataProject.ReadyStatusProColorwayPrint,
                             ReadyStatusProColorwayFabric = dataProject.ReadyStatusProColorwayFabric,
                             ReadyStatusProColorwayEmbroidery = dataProject.ReadyStatusProColorwayEmbroidery,
                             ReadyStatusProColorwayAccessory = dataProject.ReadyStatusProColorwayAccessory,
                             ReadyStatusProColor = dataProject.ReadyStatusProColor,
                             ReadyStatusProCollaborator = dataProject.ReadyStatusProCollaborator,
                             ReadyStatusProAccessory = dataProject.ReadyStatusProAccessory
                         };

            return new JsonResult(result.OrderBy(x => x.ProjectNo).ToList(), DefaultJsonSettings);
        }

        // POST api/values
        [HttpPost("AddProject")]
        ////[Authorize]
        public IActionResult Add([FromBody]ProjectViewModel data)
        {
            if (data == null)
                return NotFound(new { error = String.Format("Invalid Data") });
            // return a HTTP Status 404 (Not Found) if we couldn't find a suitable item.
            var proProjectToAdd = new ProProject()
            {
                Id = Guid.NewGuid(),
                DateCreated = DateTime.Now,
                DateModified = DateTime.Now,
                Status = data.Status,
                ProjectNo = data.ProjectNo,
                Description = data.Description,
                DesignDeadline = data.DesignDeadline,
                SourcingDeadline = data.SourcingDeadline,
                ProductionDeadline = data.ProductionDeadline,
                SampleDeadline = data.SampleDeadline,
                FloorDeliveryDeadline = data.FloorDeliveryDeadline,
                ImageUpload = data.ImageUpload,
                Version = data.Version,
                LibProductTypeId = data.LibProductTypeId,
                LibSeasonId = data.LibSeasonId,
                LibDepartmentId = data.LibDepartmentId,
                LibDivisionId = data.LibDivisionId,
                LibBrandId = data.LibBrandId,
                LibYearId = data.LibYearId,
                CopyID = data.CopyID,

                ReadyStatusPro = data.ReadyStatusPro,
                ReadyStatusProWash = data.ReadyStatusProWash,
                ReadyStatusProProjectViewing = data.ReadyStatusProProjectViewing,
                ReadyStatusProPrint = data.ReadyStatusProPrint,
                ReadyStatusProImageGallery = data.ReadyStatusProImageGallery,
                ReadyStatusProFabric = data.ReadyStatusProFabric,
                ReadyStatusProEmbroidery = data.ReadyStatusProEmbroidery,
                ReadyStatusProColorwayPrint = data.ReadyStatusProColorwayPrint,
                ReadyStatusProColorwayFabric = data.ReadyStatusProColorwayFabric,
                ReadyStatusProColorwayEmbroidery = data.ReadyStatusProColorwayEmbroidery,
                ReadyStatusProColorwayAccessory = data.ReadyStatusProColorwayAccessory,
                ReadyStatusProColor = data.ReadyStatusProColor,
                ReadyStatusProCollaborator = data.ReadyStatusProCollaborator,
                ReadyStatusProAccessory = data.ReadyStatusProAccessory
            };

            DbContext.ProProjects.Add(proProjectToAdd);

            // persist the changes into the Database.
            DbContext.SaveChanges();

            // set new id to data object
            data.Id = proProjectToAdd.Id;


            return new JsonResult(data, DefaultJsonSettings);
        }

        // PUT api/values/5
        [HttpPut("UpdateProject")]
        //[Authorize]
        public IActionResult Update([FromBody]ProjectViewModel data)
        {
            if (data != null)
            {
                var proProject = DbContext.ProProjects.FirstOrDefault(i => i.Id == data.Id);

                if (proProject != null)
                {
                    proProject.DateModified = DateTime.Now;
                    proProject.Status = data.Status;
                    proProject.ProjectNo = data.ProjectNo;
                    proProject.Version = data.Version;
                    proProject.LibProductTypeId = data.LibProductTypeId;
                    proProject.LibSeasonId = data.LibSeasonId;
                    proProject.LibDepartmentId = data.LibDepartmentId;
                    proProject.LibYearId = data.LibYearId;
                    proProject.CopyID = data.CopyID;

                    proProject.ReadyStatusPro = data.ReadyStatusPro;
                    proProject.ReadyStatusProWash = data.ReadyStatusProWash;
                    proProject.ReadyStatusProProjectViewing = data.ReadyStatusProProjectViewing;
                    proProject.ReadyStatusProPrint = data.ReadyStatusProPrint;
                    proProject.ReadyStatusProImageGallery = data.ReadyStatusProImageGallery;
                    proProject.ReadyStatusProFabric = data.ReadyStatusProFabric;
                    proProject.ReadyStatusProEmbroidery = data.ReadyStatusProEmbroidery;
                    proProject.ReadyStatusProColorwayPrint = data.ReadyStatusProColorwayPrint;
                    proProject.ReadyStatusProColorwayFabric = data.ReadyStatusProColorwayFabric;
                    proProject.ReadyStatusProColorwayEmbroidery = data.ReadyStatusProColorwayEmbroidery;
                    proProject.ReadyStatusProColorwayAccessory = data.ReadyStatusProColorwayAccessory;
                    proProject.ReadyStatusProColor = data.ReadyStatusProColor;
                    proProject.ReadyStatusProCollaborator = data.ReadyStatusProCollaborator;
                    proProject.ReadyStatusProAccessory = data.ReadyStatusProAccessory;

                    DbContext.ProProjects.Update(proProject);

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
        [HttpDelete("DeleteProject/{id}")]
        //[Authorize]
        public IActionResult Delete(Guid id)
        {
            var proProjectItem = DbContext.ProProjects.FirstOrDefault(i => i.Id == id);

            if (proProjectItem != null)
            {
                DbContext.ProProjects.Remove(proProjectItem);

                // persist the changes into the Database.
                DbContext.SaveChanges();

                return Ok();
            }
            else
                return BadRequest(new { error = String.Format("Data has not been found") });  // return a HTTP Status 404 (Not Found) if we couldn't find a suitable item.
        }
        #endregion

        #region Private Memers

        private List<ProjectViewModel> ToItemViewModelList(IEnumerable<ProProject> Projects)
        {
            var result = Projects.Select(TinyMapper.Map<ProjectViewModel>).ToList();
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
