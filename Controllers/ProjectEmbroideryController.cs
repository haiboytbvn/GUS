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
    public class ProjectEmbroideryController : Controller
    {
        #region Private Fields
        protected GUSLibraryDbContext DbContext;
        #endregion Private Fields

        #region Constructor
        public ProjectEmbroideryController(GUSLibraryDbContext context)
        {
            DbContext = context;
        }
        #endregion Constructor

        #region Attribute-based Routing
        // GET: api/values
        [HttpPost("GetProjectEmbroideryList")]
        public IActionResult GetProjectEmbroideryList()
        {
            //TODO : NEED TO REIMPLEMENT

            var lstProject = DbContext.ProEmbroiderys;

            var result = from p in lstProject
                         select new ProjectEmbroideryViewModel
                         {
                             Id = p.Id,
                             DateCreated = p.DateCreated,
                             DateModified = p.DateModified,
                             ProProjectId = p.ProProjectId,
                             //LibEmbroideryId = p.LibEmbroideryId,
                             Version = p.Version,
                             Application = p.Application,
                             //LibGraphic = p.LibGraphic
                         };

            return new JsonResult(result.OrderBy(x => x.ProProjectId).ToList(), DefaultJsonSettings);
        }


        [HttpPost("GetProjectEmbroideryListByProjectId")]
        public IActionResult GetProjectEmbroideryListByProjectId([FromBody]ProjectSearchGeneralFilterViewModel data)
        {
            //TODO : NEED TO REIMPLEMENT

            Guid projectId = Guid.Empty;

            if (data.ProjectId != null)
                projectId = data.ProjectId.Value;

            var lstProEmbroiderys = DbContext.ProEmbroiderys;
            var lstSeason = DbContext.Seasons;
            var lstYear = DbContext.Years;
            var lstGraphic = DbContext.Graphics;
            var result = "";
            //var result = from lg in lstGraphic
            //             join s in lstSeason on lg.Season equals s.Id
            //             join y in lstYear on lg.Year equals y.Id
            //             //join lpe in lstProEmbroiderys on lg.Id equals lpe.LibGraphic
            //             where lpe.ProProjectId == projectId
            //             select new ProjectEmbroideryViewModel
            //             {
            //                 Id = lpe.Id,
            //                 DateCreated = lpe.DateCreated,
            //                 DateModified = lpe.DateModified,
            //                 ProProjectId = lpe.ProProjectId,
            //                 //LibGraphic = lpe.LibGraphic,
            //                 Version = lpe.Version,
            //                 Application = lpe.Application,
            //                 //NameGraphic = lg.Name,
            //                 CodeGraphic = lg.Code,
            //                 BuyerCodeGraphic = lg.BuyerCode,
            //                 SlugGraphic = lg.Slug,
            //                 TypeGraphic = lg.Type,
            //                 SeasonNameGraphic = s.Name,
            //                 YearNameGraphic = y.Name,
            //                 DescGraphic = lg.Desc,
            //                 ImageGraphic = lg.Image

            //             };


            //return new JsonResult(result.OrderBy(x => x.ProProjectId).ToList(), DefaultJsonSettings);
            return new JsonResult(result.ToList(), DefaultJsonSettings);
        }


        // GET api/values/5
        [HttpGet("GetProjectEmbroideryById/{id}")]
        public IActionResult GetProjectEmbroideryById(Guid id)
        {
            var item = DbContext.ProEmbroiderys.FirstOrDefault(i => i.Id == id);
            if (item != null) return new JsonResult(TinyMapper.Map<ProjectEmbroideryViewModel>(item), DefaultJsonSettings);
            return NotFound(new { Error = $"ID {id} has not been found" });
        }

        // POST api/values
        [HttpPost("AddProjectEmbroidery")]
        //[Authorize]
        public IActionResult Add([FromBody]ProjectEmbroideryViewModel data)
        {
            //TODO : NEED TO REIMPLEMENT
            if (data == null)
                return NotFound(new { error = String.Format("Invalid Data") });
            // return a HTTP Status 404 (Not Found) if we couldn't find a suitable item.
            var proProjectToAdd = new ProEmbroidery()
            {
                Id = Guid.NewGuid(),
                DateCreated = DateTime.Now,
                DateModified = DateTime.Now,
                ProProjectId = data.ProProjectId,
                Version = data.Version,
                Application = data.Application,
                //LibGraphic = data.LibGraphic
            };

            DbContext.ProEmbroiderys.Add(proProjectToAdd);

            // persist the changes into the Database.
            DbContext.SaveChanges();

            // set new id to data object
            data.Id = proProjectToAdd.Id;


            return new JsonResult(data, DefaultJsonSettings);
        }

        // PUT api/values/5
        [HttpPut("UpdateProjectEmbroidery")]
        //[Authorize]
        public IActionResult Update([FromBody]ProjectEmbroideryViewModel data)
        {
            //TODO : NEED TO REIMPLEMENT
            if (data != null)
            {
                var proProject = DbContext.ProEmbroiderys.FirstOrDefault(i => i.Id == data.Id);

                if (proProject != null)
                {
                    proProject.DateModified = DateTime.Now;
                    proProject.ProProjectId = data.ProProjectId;
                    proProject.Version = data.Version;
                    proProject.Application = data.Application;
                    //proProject.LibGraphic = data.LibGraphic;

                    DbContext.ProEmbroiderys.Update(proProject);

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
        [HttpDelete("DeleteProjectEmbroidery/{id}")]
        //[Authorize]
        public IActionResult Delete(Guid id)
        {
            var proProjectItem = DbContext.ProEmbroiderys.FirstOrDefault(i => i.Id == id);

            if (proProjectItem != null)
            {
                DbContext.ProEmbroiderys.Remove(proProjectItem);

                // persist the changes into the Database.
                DbContext.SaveChanges();

                return Ok();
            }
            else
                return BadRequest(new { error = String.Format("Data has not been found") });  // return a HTTP Status 404 (Not Found) if we couldn't find a suitable item.
        }
        #endregion

        #region Private Memers

        private List<ProjectEmbroideryViewModel> ToItemViewModelList(IEnumerable<ProEmbroidery> Projects)
        {
            var result = Projects.Select(TinyMapper.Map<ProjectEmbroideryViewModel>).ToList();
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
