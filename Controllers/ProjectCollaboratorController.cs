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
    public class ProjectCollaboratorController : Controller
    {
        #region Private Fields
        protected GUSLibraryDbContext DbContext;
        #endregion Private Fields

        #region Constructor
        public ProjectCollaboratorController(GUSLibraryDbContext context)
        {
            DbContext = context;
        }
        #endregion Constructor
        // GET: /<controller>/

        #region Attribute-based Routing
        // GET: api/values
        [HttpPost("GetProjectCollaboratorList")]
        public IActionResult GetProjectCollaboratorList()
        {
            var lstProject = DbContext.ProCollaborators;

            var result = from p in lstProject
                         select new ProjectCollaboratorViewModel
                         {
                             Id = p.Id,
                             DateCreated = p.DateCreated,
                             DateModified = p.DateModified,
                             ProjectId = p.ProjectId,
                             UserId = p.UserId,
                             Name = p.Name,
                             Role = p.Role,
                             Email = p.Email
                         };

            return new JsonResult(result.OrderBy(x => x.ProjectId).ToList(), DefaultJsonSettings);
        }

        // GET api/values/5
        [HttpGet("GetProjectCollaboratorById/{id}")]
        public IActionResult GetProjectCollaboratorById(Guid id)
        {
            var item = DbContext.ProCollaborators.FirstOrDefault(i => i.Id == id);
            if (item != null) return new JsonResult(TinyMapper.Map<ProjectCollaboratorViewModel>(item), DefaultJsonSettings);
            return NotFound(new { Error = $"ID {id} has not been found" });
        }

        // POST api/values
        [HttpPost("AddProjectCollaborator")]
        ////[Authorize]
        public IActionResult Add([FromBody]ProjectCollaboratorViewModel data)
        {
            if (data == null)
                return NotFound(new { error = String.Format("Invalid Data") });
            // return a HTTP Status 404 (Not Found) if we couldn't find a suitable item.
            var proProjectToAdd = new ProCollaborator()
            {
                Id = Guid.NewGuid(),
                DateCreated = DateTime.Now,
                DateModified = DateTime.Now,
                ProjectId = data.ProjectId,
                UserId = data.UserId,
                Name = data.Name,
                Role = data.Role,
                Email = data.Email
            };

            DbContext.ProCollaborators.Add(proProjectToAdd);

            // persist the changes into the Database.
            DbContext.SaveChanges();

            // set new id to data object
            data.Id = proProjectToAdd.Id;

            return new JsonResult(data, DefaultJsonSettings);
        }

        // PUT api/values/5
        [HttpPut("UpdateProjectCollaborator")]
        //[Authorize]
        public IActionResult Update([FromBody]ProjectCollaboratorViewModel data)
        {
            if (data != null)
            {
                var proProject = DbContext.ProCollaborators.FirstOrDefault(i => i.Id == data.Id);

                if (proProject != null)
                {
                    proProject.DateModified = DateTime.Now;
                    proProject.ProjectId = data.ProjectId;
                    proProject.UserId = data.UserId;
                    proProject.Name = data.Name;
                    proProject.Role = data.Role;
                    proProject.Email = data.Email;

                    DbContext.ProCollaborators.Update(proProject);

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
        [HttpDelete("DeleteProjectCollaborator/{id}")]
        //[Authorize]
        public IActionResult Delete(Guid id)
        {
            var proProjectItem = DbContext.ProCollaborators.FirstOrDefault(i => i.Id == id);

            if (proProjectItem != null)
            {
                DbContext.ProCollaborators.Remove(proProjectItem);

                // persist the changes into the Database.
                DbContext.SaveChanges();

                return Ok();
            }
            else
                return BadRequest(new { error = String.Format("Data has not been found") });  // return a HTTP Status 404 (Not Found) if we couldn't find a suitable item.
        }
        #endregion

        #region Private Memers

        private List<ProjectCollaboratorViewModel> ToItemViewModelList(IEnumerable<ProCollaborator> Projects)
        {
            var result = Projects.Select(TinyMapper.Map<ProjectCollaboratorViewModel>).ToList();
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
