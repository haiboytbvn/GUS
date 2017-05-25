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
using GUSLibrary.Classes;

namespace GUSLibrary.Controllers
{
    [Route("api/[controller]")]
    public class ProjectImageGalleryController : Controller
    {
        #region Private Fields
        protected GUSLibraryDbContext DbContext;
        #endregion Private Fields

        #region Constructor
        public ProjectImageGalleryController(GUSLibraryDbContext context, IHostingEnvironment env)
        {
            DbContext = context;
            this.hostingEnv = env;
        }
        #endregion Constructor
        // GET: /<controller>/
        private IHostingEnvironment hostingEnv;
        #region Attribute-based Routing
        // GET: api/values
        [HttpPost("getProjectImageGalleryList")]
        public IActionResult getProjectImageGalleryList()
        {
            var lstProject = DbContext.ProImageGallerys;

            var result = from p in lstProject
                         select new ProjectImageGalleryViewModel
                         {
                             Id = p.Id,
                             DateCreated = p.DateCreated,
                             DateModified = p.DateModified,
                             ProjectId = p.ProjectId,
                             UserId = p.UserId,
                             FileName = p.FileName,
                             ImageStatus = p.ImageStatus
                         };

            return new JsonResult(result.OrderBy(x => x.ProjectId).ToList(), DefaultJsonSettings);
        }

        // GET api/values/5
        [HttpGet("GetProjectImageGalleryById/{id}")]
        public IActionResult GetProjectImageGalleryById(Guid id)
        {
            var item = DbContext.ProImageGallerys.FirstOrDefault(i => i.Id == id);
            if (item != null) return new JsonResult(TinyMapper.Map<ProjectImageGalleryViewModel>(item), DefaultJsonSettings);
            return NotFound(new { Error = $"ID {id} has not been found" });
        }

        [HttpPost("getProjectImageListByProjectId")]
        public IActionResult getProjectImageListByProjectId([FromBody]SearchFilterProjectViewModel data)
        {
            Guid projectId = Guid.Empty;
            string ImageStatus = "";
            if (data.ProjectId != null)
                projectId = data.ProjectId.Value;

            if (data.Others != null)
                ImageStatus = data.Others.ToString();


            var lstProject = DbContext.ProImageGallerys;

            var result = from p in lstProject
                         where p.ProjectId == projectId && p.ImageStatus == ImageStatus
                         select new ProjectImageGalleryViewModel
                         {
                             Id = p.Id,
                             DateCreated = p.DateCreated,
                             DateModified = p.DateModified,
                             ProjectId = p.ProjectId,
                             UserId = p.UserId,
                             FileName = p.FileName,
                             ImageStatus = p.ImageStatus
                         };

            return new JsonResult(result.OrderBy(x => x.ProjectId).ToList(), DefaultJsonSettings);

            //Guid projectId = Guid.Empty;

            //if (data.ProjectId != null)
            //    projectId = data.ProjectId.Value;

            //var item = DbContext.ProImageGallerys.FirstOrDefault(i => i.ProjectId == projectId);
            //if (item != null) return new JsonResult(TinyMapper.Map<ProjectImageGalleryViewModel>(item), DefaultJsonSettings);
            //return NotFound(new { Error = $"ID {projectId} has not been found" });
        }


        [HttpPost("UploadImage")]
        public async Task<IActionResult> UploadImage()
        {
            //get image here
            var uploadimage = Request.Form.Files[0];
            var ProjectId = Request.Form["ProjectId"].ToString();
            var UserId = Request.Form["UserId"].ToString();
            var path = "uploads/images/projects/";
            //Constants.ACCESSORYUPLOADFOLDER
            var uploadspath = Path.Combine(hostingEnv.WebRootPath, path);
            var exists = System.IO.Directory.Exists(uploadspath);
            if (!exists)
                System.IO.Directory.CreateDirectory(uploadspath);

            //if (uploadimage.Length > 5000)
            //{
            //    return new JsonResult("", DefaultJsonSettings);
            //}

            string fileNameOnly = Path.GetFileNameWithoutExtension(uploadimage.FileName);
            string fileName = fileNameOnly + Guid.NewGuid().ToString().Replace("-", "").Substring(0, 5) + ".jpg";
            

            using (var fileStream = new FileStream(Path.Combine(uploadspath, fileName), FileMode.Create))
            {
                await uploadimage.CopyToAsync(fileStream);

            }

            ProjectImageGalleryViewModel dataProImage = new ProjectImageGalleryViewModel(null, null, ProjectId, UserId, fileName, "0");
            Add(dataProImage);

            var data = new ImageDataViewModel
            {
                FileName = uploadimage.FileName.Trim(),
                Size = uploadimage.Length,
                Type = uploadimage.ContentType,
                UploadPath = path + uploadimage.FileName
            };

            return new JsonResult(data, DefaultJsonSettings);
        }

        // POST api/values
        [HttpPost("AddProjectImageGallery")]
        ////[Authorize]
        public IActionResult Add([FromBody]ProjectImageGalleryViewModel data)
        {
            if (data == null)
                return NotFound(new { error = String.Format("Invalid Data") });
            // return a HTTP Status 404 (Not Found) if we couldn't find a suitable item.
            var proProjectToAdd = new ProImageGallery()
            {
                Id = Guid.NewGuid(),
                DateCreated = DateTime.Now,
                DateModified = DateTime.Now,
                ProjectId = data.ProjectId,
                UserId = data.UserId,
                FileName = data.FileName,
                ImageStatus = data.ImageStatus
            };

            DbContext.ProImageGallerys.Add(proProjectToAdd);

            // persist the changes into the Database.
            DbContext.SaveChanges();

            // set new id to data object
            data.Id = proProjectToAdd.Id;


            return new JsonResult(data, DefaultJsonSettings);
        }

        // PUT api/values/5DeleteProjectImageGallery
        [HttpPut("UpdateProjectImageGallery")]
        //[Authorize]
        public IActionResult Update([FromBody]ProjectImageGalleryViewModel data)
        {
            if (data != null)
            {
                var proProject = DbContext.ProImageGallerys.FirstOrDefault(i => i.Id == data.Id);

                if (proProject != null)
                {
                    proProject.DateModified = DateTime.Now;
                    proProject.ProjectId = data.ProjectId;
                    proProject.UserId = data.UserId;
                    proProject.FileName = data.FileName;
                    proProject.ImageStatus = data.ImageStatus;

                    DbContext.ProImageGallerys.Update(proProject);

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
        [HttpDelete("DeleteProjectImageGallery/{id}")]
        //[Authorize]
        public IActionResult Delete(Guid id)
        {
            var proProjectItem = DbContext.ProImageGallerys.FirstOrDefault(i => i.Id == id);

            if (proProjectItem != null)
            {
                DbContext.ProImageGallerys.Remove(proProjectItem);

                // persist the changes into the Database.
                DbContext.SaveChanges();

                return Ok();
            }
            else
                return BadRequest(new { error = String.Format("Data has not been found") });  // return a HTTP Status 404 (Not Found) if we couldn't find a suitable item.
        }
        #endregion

        #region Private Memers

        private List<ProjectImageGalleryViewModel> ToItemViewModelList(IEnumerable<ProImageGallery> Projects)
        {
            var result = Projects.Select(TinyMapper.Map<ProjectImageGalleryViewModel>).ToList();
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
