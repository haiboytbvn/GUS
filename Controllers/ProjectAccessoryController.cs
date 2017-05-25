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
    public class ProjectAccessoryController : Controller
    {
        #region Private Fields
        protected GUSLibraryDbContext DbContext;
        #endregion Private Fields

        #region Constructor
        public ProjectAccessoryController(GUSLibraryDbContext context)
        {
            DbContext = context;
        }
        #endregion Constructor

        #region Attribute-based Routing
        // GET: api/values
        [HttpPost("GetProjectAccessoryViewList")]
        public IActionResult GetProjectAccessoryViewList()
        {
            var lstProject = DbContext.ProAccessorys;

            var result = from p in lstProject
                         select new ProjectAccessoryViewModel
                         {
                             Id = p.Id,
                             DateCreated = p.DateCreated,
                             DateModified = p.DateModified,
                             ProProjectId = p.ProProjectId,
                             LibAccessoryId = p.LibAccessoryId,
                             Version = p.Version,
                             Application = p.Application
                         };

            return new JsonResult(result.OrderBy(x => x.ProProjectId).ToList(), DefaultJsonSettings);
        }

        // GET: api/values
        [HttpPost("getByProjectID")]
        public IActionResult getByProjectID([FromBody]ProjectSearchGeneralFilterViewModel data)
        {
            //TODO : NEED TO REIMPLEMENT
            Guid projectId = Guid.Empty;

            if (data.ProjectId != null)
                projectId = data.ProjectId.Value;
            
            var lstProAccessorys = DbContext.ProAccessorys;
            var lstAccessory = DbContext.Accessories;

            var lstacccategory = DbContext.AccessoryCategories;
            var lstaccdesc = DbContext.AccessoryProductNames;
            var lstacc = DbContext.Accessories;

            var result = from a in lstacc
                         join c in lstacccategory on a.AccCategory equals c.Id
                         join d in lstaccdesc on a.AccProductName equals d.Id
                         join pa in lstProAccessorys on a.Id equals pa.LibAccessoryId
                         where pa.ProProjectId == projectId

                         select new ProjectAccessoryViewModel
                         {
                             Id = pa.Id,
                             DateCreated = pa.DateCreated,
                             DateModified = pa.DateModified,
                             ProProjectId = pa.ProProjectId,
                             LibAccessoryId = pa.LibAccessoryId,
                             Version = pa.Version,
                             Application = pa.Application,
                             //NameAccessory = a.Name,
                             //CodeAccessory = a.Code,
                             BuyerCodeAccessory = a.BuyerCode,
                             AccCategoryTextAccessory = c.Name,
                             AccDescTextAccessory = d.Name,
                             //ImageAccessory = a.Image,
                             ItemSizeAccessory = a.ItemSize,
                             SupplierAccessory = a.Supplier

                         };

            //return new JsonResult(result.OrderBy(x => x.ProProjectId).ToList(), DefaultJsonSettings);
            return new JsonResult(result.ToList(), DefaultJsonSettings);
        }


        // GET api/values/5
        [HttpGet("GetProjectAccessoryViewById/{id}")]
        public IActionResult GetProjectAccessoryViewById(Guid id)
        {
            var item = DbContext.ProAccessorys.FirstOrDefault(i => i.Id == id);
            if (item != null) return new JsonResult(TinyMapper.Map<ProjectAccessoryViewModel>(item), DefaultJsonSettings);
            return NotFound(new { Error = $"ID {id} has not been found" });
        }

        // POST api/values
        [HttpPost("AddProjectAccessory")]
        //[Authorize]
        public IActionResult add([FromBody]ProjectAccessoryViewModel data)
        {
            if (data == null)
                return NotFound(new { error = String.Format("Invalid Data") });
            // return a HTTP Status 404 (Not Found) if we couldn't find a suitable item.
            var proProjectToAdd = new ProAccessory()
            {
                Id = Guid.NewGuid(),
                DateCreated = DateTime.Now,
                DateModified = DateTime.Now,
                ProProjectId = data.ProProjectId,
                LibAccessoryId = data.LibAccessoryId,
                Version = data.Version,
                Application = data.Application
            };

            DbContext.ProAccessorys.Add(proProjectToAdd);

            // persist the changes into the Database.
            DbContext.SaveChanges();

            // set new id to data object
            data.Id = proProjectToAdd.Id;


            return new JsonResult(data, DefaultJsonSettings);
        }

        // PUT api/values/5
        [HttpPut("UpdateProjectAccessoryView")]
        //[Authorize]
        public IActionResult Update([FromBody]ProjectAccessoryViewModel data)
        {
            if (data != null)
            {
                var proProject = DbContext.ProAccessorys.FirstOrDefault(i => i.Id == data.Id);

                if (proProject != null)
                {
                    proProject.DateModified = DateTime.Now;
                    proProject.ProProjectId = data.ProProjectId;
                    proProject.LibAccessoryId = data.LibAccessoryId;
                    proProject.Version = data.Version;
                    proProject.Application = data.Application;

                    DbContext.ProAccessorys.Update(proProject);

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
        [HttpDelete("DeleteProjectAccessoryView/{id}")]
        //[Authorize]
        public IActionResult Delete(Guid id)
        {
            var proProjectItem = DbContext.ProAccessorys.FirstOrDefault(i => i.Id == id);

            if (proProjectItem != null)
            {
                DbContext.ProAccessorys.Remove(proProjectItem);

                // persist the changes into the Database.
                DbContext.SaveChanges();

                return Ok();
            }
            else
                return BadRequest(new { error = String.Format("Data has not been found") });  // return a HTTP Status 404 (Not Found) if we couldn't find a suitable item.
        }
        #endregion

        #region Private Memers

        private List<ProjectAccessoryViewModel> ToItemViewModelList(IEnumerable<ProAccessory> Projects)
        {
            var result = Projects.Select(TinyMapper.Map<ProjectAccessoryViewModel>).ToList();
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
