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
    public class ProjectColorwayFabricController : Controller
    {
        #region Private Fields
        protected GUSLibraryDbContext DbContext;
        #endregion Private Fields

        #region Constructor
        public ProjectColorwayFabricController(GUSLibraryDbContext context)
        {
            DbContext = context;
        }
        #endregion Constructor

        #region Attribute-based Routing
        // GET: api/values
        [HttpPost("GetProjectColorwayFabricList")]
        public IActionResult GetProjectColorwayFabricList()
        {
            var lstProject = DbContext.ProColorwayFabrics;

            var result = from p in lstProject
                         select new ProjectColorwayFabricViewModel
                         {
                             Id = p.Id,
                             DateCreated = p.DateCreated,
                             DateModified = p.DateModified,
                             ProProjectId = p.ProProjectId,
                             ProColorId = p.ProColorId,
                             ProFabricId = p.ProFabricId,
                             LibColorId = p.LibColorId,
                             ColorCode = p.ColorCode,
                             Version = p.Version
                         };

            return new JsonResult(result.OrderBy(x => x.ProProjectId).ToList(), DefaultJsonSettings);
        }

        // GET api/values/5
        [HttpGet("GetProjectColorwayFabricById/{id}")]
        public IActionResult GetProjectColorwayFabricById(Guid id)
        {
            var item = DbContext.ProColorwayFabrics.FirstOrDefault(i => i.Id == id);
            if (item != null) return new JsonResult(TinyMapper.Map<ProjectColorwayFabricViewModel>(item), DefaultJsonSettings);
            return NotFound(new { Error = $"ID {id} has not been found" });
        }

        // POST api/values
        [HttpPost("AddProjectColorwayFabric")]
        //[Authorize]
        public IActionResult Add([FromBody]ProjectColorwayFabricViewModel data)
        {
            if (data == null)
                return NotFound(new { error = String.Format("Invalid Data") });
            // return a HTTP Status 404 (Not Found) if we couldn't find a suitable item.
            var proProjectToAdd = new ProColorwayFabric()
            {
                Id = Guid.NewGuid(),
                DateCreated = DateTime.Now,
                DateModified = DateTime.Now,
                ProProjectId = data.ProProjectId,
                ProColorId = data.ProColorId,
                ProFabricId = data.ProFabricId,
                LibColorId = data.LibColorId,
                ColorCode = data.ColorCode,
                Version = data.Version
            };

            DbContext.ProColorwayFabrics.Add(proProjectToAdd);

            // persist the changes into the Database.
            DbContext.SaveChanges();

            // set new id to data object
            data.Id = proProjectToAdd.Id;


            return new JsonResult(data, DefaultJsonSettings);
        }

        // PUT api/values/5
        [HttpPut("UpdateProjectColorwayFabric")]
        //[Authorize]
        public IActionResult Update([FromBody]ProjectColorwayFabricViewModel data)
        {
            if (data != null)
            {
                var proProject = DbContext.ProColorwayFabrics.FirstOrDefault(i => i.Id == data.Id);

                if (proProject != null)
                {
                    proProject.DateModified = DateTime.Now;
                    proProject.ProProjectId = data.ProProjectId;
                    proProject.ProColorId = data.ProColorId;
                    proProject.ProFabricId = data.ProFabricId;
                    proProject.LibColorId = data.LibColorId;
                    proProject.ColorCode = data.ColorCode;
                    proProject.Version = data.Version;

                    DbContext.ProColorwayFabrics.Update(proProject);

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
        [HttpDelete("DeleteProjectColorwayFabric/{id}")]
        //[Authorize]
        public IActionResult Delete(Guid id)
        {
            var proProjectItem = DbContext.ProColorwayFabrics.FirstOrDefault(i => i.Id == id);

            if (proProjectItem != null)
            {
                DbContext.ProColorwayFabrics.Remove(proProjectItem);

                // persist the changes into the Database.
                DbContext.SaveChanges();

                return Ok();
            }
            else
                return BadRequest(new { error = String.Format("Data has not been found") });  // return a HTTP Status 404 (Not Found) if we couldn't find a suitable item.
        }
        #endregion

        #region Private Memers

        private List<ProjectColorwayFabricViewModel> ToItemViewModelList(IEnumerable<ProColorwayFabric> Projects)
        {
            var result = Projects.Select(TinyMapper.Map<ProjectColorwayFabricViewModel>).ToList();
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
