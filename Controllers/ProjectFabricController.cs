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
    public class ProjectFabricController : Controller
    {
        #region Private Fields
        protected GUSLibraryDbContext DbContext;
        #endregion Private Fields

        #region Constructor
        public ProjectFabricController(GUSLibraryDbContext context)
        {
            DbContext = context;
        }
        #endregion Constructor

        #region Attribute-based Routing
        // GET: api/values
        [HttpPost("GetProjectFabricList")]
        public IActionResult GetProjectFabricList()
        {
            var lstProject = DbContext.ProFabrics;

            var result = from p in lstProject
                         select new ProjectFabricViewModel
                         {
                             Id = p.Id,
                             DateCreated = p.DateCreated,
                             DateModified = p.DateModified,
                             ProProjectId = p.ProProjectId,
                             LibFabricId = p.LibFabricId,
                             Version = p.Version,
                             Application = p.Application
                         };

            return new JsonResult(result.OrderBy(x => x.ProProjectId).ToList(), DefaultJsonSettings);
        }

        [HttpPost("GetProjectFabricListByProjectId")]
        public IActionResult GetProjectFabricListByProjectId([FromBody]ProjectSearchGeneralFilterViewModel data)
        {
            //TODO : NEED TO REIMPLEMENT
            Guid projectId = Guid.Empty;

            if (data.ProjectId != null)
                projectId = data.ProjectId.Value;

            var result = "";

            //var lstcategory = DbContext.FabricsCategories;
            //var lstdesc = DbContext.FabricsDescs;
            //var lstyarncount = DbContext.FabricsYarnCounts;
            //var lstfibrecontent = DbContext.FabricsFibreContents;
            //var lstfinishing = DbContext.FabricsFinishings;
            //var lstfabrics = DbContext.Fabrics;
            //var lstProFabrics = DbContext.ProFabrics;

            //var result = from f in lstfabrics
            //             join c in lstcategory on f.FabCategory equals c.Id
            //             join d in lstdesc on f.FabDesc equals d.Id
            //             join y in lstyarncount on f.FabYarnCount equals y.Id
            //             join ct in lstfibrecontent on f.FabFibreContent equals ct.Id
            //             join fin in lstfinishing on f.FabFinishing equals fin.Id
            //             join pf in lstProFabrics on f.Id equals pf.LibFabricId
            //             where pf.ProProjectId == projectId
            //             select new ProjectFabricViewModel
            //             {
            //                 Id = f.Id,
            //                 DateCreated = f.DateCreated,
            //                 DateModified = f.DateModified,
            //                 FabricName = f.Name,
            //                 FabricCode = f.Code,
            //                 BuyerFabricCode = f.BuyerCode,
            //                 FabCategoryText = c.Name,
            //                 FabDescText = d.Name,
            //                 ItemImage = f.Image,
            //                 FabYarnCountText = y.Name,
            //                 FabContentText = ct.Name,
            //                 FabFinishingText = fin.Name,
            //                 FabricWeight = f.FabricWeight,
            //                 Supplier = f.Supplier,
            //                 SupplierRefcCode = f.SupplierCode
            //             };


            //return new JsonResult(result.OrderBy(x => x.ProProjectId).ToList(), DefaultJsonSettings);
            return new JsonResult(result.ToList(), DefaultJsonSettings);
        }


        
        // GET api/values/5
        [HttpGet("GetProjectFabricById/{id}")]
        public IActionResult GetProjectFabricById(Guid id)
        {
            var item = DbContext.ProFabrics.FirstOrDefault(i => i.Id == id);
            if (item != null) return new JsonResult(TinyMapper.Map<ProjectFabricViewModel>(item), DefaultJsonSettings);
            return NotFound(new { Error = $"ID {id} has not been found" });
        }

        // POST api/values
        [HttpPost("AddProjectFabric")]
        //[Authorize]
        public IActionResult Add([FromBody]ProjectFabricViewModel data)
        {
            if (data == null)
                return NotFound(new { error = String.Format("Invalid Data") });
            // return a HTTP Status 404 (Not Found) if we couldn't find a suitable item.
            var proProjectToAdd = new ProFabric()
            {
                Id = Guid.NewGuid(),
                DateCreated = DateTime.Now,
                DateModified = DateTime.Now,
                ProProjectId = data.ProProjectId,
                LibFabricId = data.LibFabricId,
                Version = data.Version,
                Application = data.Application
            };

            DbContext.ProFabrics.Add(proProjectToAdd);

            // persist the changes into the Database.
            DbContext.SaveChanges();

            // set new id to data object
            data.Id = proProjectToAdd.Id;


            return new JsonResult(data, DefaultJsonSettings);
        }

        // PUT api/values/5
        [HttpPut("UpdateProjectFabric")]
        //[Authorize]
        public IActionResult Update([FromBody]ProjectFabricViewModel data)
        {
            if (data != null)
            {
                var proProject = DbContext.ProFabrics.FirstOrDefault(i => i.Id == data.Id);

                if (proProject != null)
                {
                    proProject.DateModified = DateTime.Now;
                    proProject.ProProjectId = data.ProProjectId;
                    proProject.LibFabricId = data.LibFabricId;
                    proProject.Version = data.Version;
                    proProject.Application = data.Application;

                    DbContext.ProFabrics.Update(proProject);

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
        [HttpDelete("DeleteProjectFabric/{id}")]
        //[Authorize]
        public IActionResult Delete(Guid id)
        {
            var proProjectItem = DbContext.ProFabrics.FirstOrDefault(i => i.Id == id);

            if (proProjectItem != null)
            {
                DbContext.ProFabrics.Remove(proProjectItem);

                // persist the changes into the Database.
                DbContext.SaveChanges();

                return Ok();
            }
            else
                return BadRequest(new { error = String.Format("Data has not been found") });  // return a HTTP Status 404 (Not Found) if we couldn't find a suitable item.
        }
        #endregion

        #region Private Memers

        private List<ProjectFabricViewModel> ToItemViewModelList(IEnumerable<ProFabric> Projects)
        {
            var result = Projects.Select(TinyMapper.Map<ProjectFabricViewModel>).ToList();
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
