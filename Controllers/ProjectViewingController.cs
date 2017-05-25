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
    public class ProjectViewingController : Controller
    {
        #region Private Fields
        protected GUSLibraryDbContext DbContext;
        #endregion Private Fields

        #region Constructor
        public ProjectViewingController(GUSLibraryDbContext context)
        {
            DbContext = context;
        }
        #endregion Constructor
        // GET: /<controller>/

        #region Attribute-based Routing
        // GET: api/values
        [HttpPost("GetProjectViewingList")]
        public IActionResult GetProjectViewingList()
        {
            var lstProject = DbContext.ProProjectViewings;

            var result = from p in lstProject
                         select new ProjectViewingViewModel
                         {
                             Id = p.Id,
                             DateCreated = p.DateCreated,
                             DateModified = p.DateModified,
                             ProjectId = p.ProjectId,
                             UserId = p.UserId
                         };

            return new JsonResult(result.OrderBy(x => x.ProjectId).ToList(), DefaultJsonSettings);
        }

        // GET api/values/5
        [HttpGet("GetProjectViewingById/{id}")]
        public IActionResult GetProjectViewingById(Guid id)
        {
            var item = DbContext.ProProjectViewings.FirstOrDefault(i => i.Id == id);
            if (item != null) return new JsonResult(TinyMapper.Map<ProjectViewingViewModel>(item), DefaultJsonSettings);
            return NotFound(new { Error = $"ID {id} has not been found" });
        }

        // POST api/values
        [HttpPost("AddProjectViewing")]
        ////[Authorize]
        public IActionResult Add([FromBody]ProjectViewingViewModel data)
        {
            if (data == null)
                return NotFound(new { error = String.Format("Invalid Data") });
            // return a HTTP Status 404 (Not Found) if we couldn't find a suitable item.
            var proProjectToAdd = new ProProjectViewing()
            {
                Id = Guid.NewGuid(),
                DateCreated = DateTime.Now,
                DateModified = DateTime.Now,
                ProjectId = data.ProjectId,
                UserId = data.UserId
            };

            DbContext.ProProjectViewings.Add(proProjectToAdd);

            // persist the changes into the Database.
            DbContext.SaveChanges();

            // set new id to data object
            data.Id = proProjectToAdd.Id;


            return new JsonResult(data, DefaultJsonSettings);
        }

        // PUT api/values/5
        [HttpPut("UpdateProjectViewing")]
        //[Authorize]
        public IActionResult Update([FromBody]ProjectViewingViewModel data)
        {
            if (data != null)
            {
                var proProject = DbContext.ProProjectViewings.FirstOrDefault(i => i.Id == data.Id);

                if (proProject != null)
                {
                    proProject.DateModified = DateTime.Now;
                    proProject.ProjectId = data.ProjectId;
                    proProject.UserId = data.UserId;

                    DbContext.ProProjectViewings.Update(proProject);

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
        [HttpDelete("DeleteProjectViewing/{id}")]
        //[Authorize]
        public IActionResult Delete(Guid id)
        {
            var proProjectItem = DbContext.ProProjectViewings.FirstOrDefault(i => i.Id == id);

            if (proProjectItem != null)
            {
                DbContext.ProProjectViewings.Remove(proProjectItem);

                // persist the changes into the Database.
                DbContext.SaveChanges();

                return Ok();
            }
            else
                return BadRequest(new { error = String.Format("Data has not been found") });  // return a HTTP Status 404 (Not Found) if we couldn't find a suitable item.
        }
        #endregion

        #region Private Memers

        private List<ProjectViewingViewModel> ToItemViewModelList(IEnumerable<ProProjectViewing> Projects)
        {
            var result = Projects.Select(TinyMapper.Map<ProjectViewingViewModel>).ToList();
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
