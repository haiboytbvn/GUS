using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using GUSLibrary.Data;
using GUSLibrary.ViewModels;
using Microsoft.AspNetCore.Mvc;
using Nelibur.ObjectMapper;
using Newtonsoft.Json;
using Microsoft.AspNetCore.Authorization;

namespace GUSLibrary.Controllers
{
    [Route("api/[controller]")]
    public class ProjectColorwayEmbroideryController : Controller
    {
        #region Private Fields
        protected GUSLibraryDbContext DbContext;
        #endregion Private Fields

        #region Constructor
        public ProjectColorwayEmbroideryController(GUSLibraryDbContext context)
        {
            DbContext = context;
        }
        #endregion Constructor

        #region Attribute-based Routing
        // GET: api/values
        [HttpPost("GetProjectColorwayEmbroideryList")]
        public IActionResult GetProjectColorwayEmbroideryList()
        {
            var lstProject = DbContext.ProColorwayEmbroiderys;

            var result = from p in lstProject
                         select new ProjectColorwayEmbroideryViewModel
                         {
                             Id = p.Id,
                             DateCreated = p.DateCreated,
                             DateModified = p.DateModified,
                             ProProjectId = p.ProProjectId,
                             ProColorId = p.ProColorId,
                             ProEmbroideryId = p.ProEmbroideryId,
                             LibColorId = p.LibColorId,
                             ColorCode = p.ColorCode,
                             Version = p.Version,
                             LibGraphic = p.LibGraphic
                         };

            return new JsonResult(result.OrderBy(x => x.ProProjectId).ToList(), DefaultJsonSettings);
        }

        // GET api/values/5
        [HttpGet("GetProjectColorwayEmbroideryById/{id}")]
        public IActionResult GetProjectColorwayEmbroideryById(Guid id)
        {
            var item = DbContext.ProColorwayEmbroiderys.FirstOrDefault(i => i.Id == id);
            if (item != null) return new JsonResult(TinyMapper.Map<ProjectColorwayEmbroideryViewModel>(item), DefaultJsonSettings);
            return NotFound(new { Error = $"ID {id} has not been found" });
        }

        // POST api/values
        [HttpPost("AddProjectColorwayEmbroidery")]
        //[Authorize]
        public IActionResult Add([FromBody]ProjectColorwayEmbroideryViewModel data)
        {
            if (data == null)
                return NotFound(new { error = String.Format("Invalid Data") });
            // return a HTTP Status 404 (Not Found) if we couldn't find a suitable item.
            var proProjectToAdd = new ProColorwayEmbroidery()
            {
                Id = Guid.NewGuid(),
                DateCreated = DateTime.Now,
                DateModified = DateTime.Now,
                ProProjectId = data.ProProjectId,
                ProColorId = data.ProColorId,
                ProEmbroideryId = data.ProEmbroideryId,
                LibColorId = data.LibColorId,
                ColorCode = data.ColorCode,
                Version = data.Version,
                LibGraphic = data.LibGraphic
            };

            DbContext.ProColorwayEmbroiderys.Add(proProjectToAdd);

            // persist the changes into the Database.
            DbContext.SaveChanges();

            // set new id to data object
            data.Id = proProjectToAdd.Id;


            return new JsonResult(data, DefaultJsonSettings);
        }

        // PUT api/values/5
        [HttpPut("UpdateProjectColorwayEmbroidery")]
        //[Authorize]
        public IActionResult Update([FromBody]ProjectColorwayEmbroideryViewModel data)
        {
            if (data != null)
            {
                var proProject = DbContext.ProColorwayEmbroiderys.FirstOrDefault(i => i.Id == data.Id);

                if (proProject != null)
                {
                    proProject.DateModified = DateTime.Now;
                    proProject.ProProjectId = data.ProProjectId;
                    proProject.ProColorId = data.ProColorId;
                    proProject.ProEmbroideryId = data.ProEmbroideryId;
                    proProject.LibColorId = data.LibColorId;
                    proProject.ColorCode = data.ColorCode;
                    proProject.Version = data.Version;
                    proProject.LibGraphic = data.LibGraphic;

                    DbContext.ProColorwayEmbroiderys.Update(proProject);

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
        [HttpDelete("DeleteProjectColorwayEmbroidery/{id}")]
        //[Authorize]
        public IActionResult Delete(Guid id)
        {
            var proProjectItem = DbContext.ProColorwayEmbroiderys.FirstOrDefault(i => i.Id == id);

            if (proProjectItem != null)
            {
                DbContext.ProColorwayEmbroiderys.Remove(proProjectItem);

                // persist the changes into the Database.
                DbContext.SaveChanges();

                return Ok();
            }
            else
                return BadRequest(new { error = String.Format("Data has not been found") });  // return a HTTP Status 404 (Not Found) if we couldn't find a suitable item.
        }
        #endregion

        #region Private Memers

        private List<ProjectColorwayEmbroideryViewModel> ToItemViewModelList(IEnumerable<ProColorwayEmbroidery> Projects)
        {
            var result = Projects.Select(TinyMapper.Map<ProjectColorwayEmbroideryViewModel>).ToList();
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
