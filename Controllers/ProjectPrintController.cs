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
    public class ProjectPrintController : Controller
    {
        #region Private Fields
        protected GUSLibraryDbContext DbContext;
        #endregion Private Fields

        #region Constructor
        public ProjectPrintController(GUSLibraryDbContext context)
        {
            DbContext = context;
        }
        #endregion Constructor

        #region Attribute-based Routing
        // GET: api/values
        [HttpPost("GetProjectPrintList")]
        public IActionResult GetProjectPrintList()
        {
            //TODO : NEED TO REIMPLEMENT
            var lstProject = DbContext.ProPrints;

            var result = from p in lstProject
                         select new ProjectPrintViewModel
                         {
                             Id = p.Id,
                             DateCreated = p.DateCreated,
                             DateModified = p.DateModified,
                             ProProjectId = p.ProProjectId,
                             //LibGraphic = p.LibGraphic,
                             Version = p.Version,
                             Application = p.Application
                         };

            return new JsonResult(result.OrderBy(x => x.ProProjectId).ToList(), DefaultJsonSettings);
        }


        [HttpPost("GetProjectPrintListByProjectId")]
        public IActionResult GetProjectPrintListByProjectId([FromBody]ProjectSearchGeneralFilterViewModel data)
        {
            //TODO : NEED TO REIMPLEMENT

            Guid projectId = Guid.Empty;

            if (data.ProjectId != null)
                projectId = data.ProjectId.Value;

            //var lstProPrints = DbContext.ProPrints;
            //var lstSeason = DbContext.Seasons;
            //var lstYear = DbContext.Years;
            //var lstGraphic = DbContext.Graphics;
            var result = "";
            //var result = from lg in lstGraphic
            //             join s in lstSeason on lg.Season equals s.Id
            //             join y in lstYear on lg.Year equals y.Id
            //             join lpp in lstProPrints on lg.Id equals lpp.LibGraphic
            //             where lpp.ProProjectId == projectId
            //             select new ProjectPrintViewModel
            //             {
            //                 Id = lpp.Id,
            //                 DateCreated = lpp.DateCreated,
            //                 DateModified = lpp.DateModified,
            //                 ProProjectId = lpp.ProProjectId,
            //                 LibGraphic = lpp.LibGraphic,
            //                 Version = lpp.Version,
            //                 Application = lpp.Application,
            //                 NameGraphic = lg.Name,
            //                 CodeGraphic = lg.Code,
            //                 BuyerCodeGraphic = lg.BuyerCode,
            //                 SlugGraphic = lg.Slug,
            //                 TypeGraphic = lg.Type,
            //                 SeasonName = s.Name,
            //                 YearName = y.Name,
            //                 DescGraphic = lg.Desc,
            //                 ImageGraphic = lg.Image

            //             };


            //return new JsonResult(result.OrderBy(x => x.ProProjectId).ToList(), DefaultJsonSettings);
            return new JsonResult(result.ToList(), DefaultJsonSettings);
        }

        // GET api/values/5
        [HttpGet("GetProjectPrintById/{id}")]
        public IActionResult GetProjectPrintById(Guid id)
        {
            var item = DbContext.ProPrints.FirstOrDefault(i => i.Id == id);
            if (item != null) return new JsonResult(TinyMapper.Map<ProjectPrintViewModel>(item), DefaultJsonSettings);
            return NotFound(new { Error = $"ID {id} has not been found" });
        }

        // POST api/values
        [HttpPost("AddProjectPrint")]
        //[Authorize]
        public IActionResult Add([FromBody]ProjectPrintViewModel data)
        {
            //TODO : NEED TO REIMPLEMENT

            if (data == null)
                return NotFound(new { error = String.Format("Invalid Data") });
            // return a HTTP Status 404 (Not Found) if we couldn't find a suitable item.
            var proProjectToAdd = new ProPrint()
            {
                Id = Guid.NewGuid(),
                DateCreated = DateTime.Now,
                DateModified = DateTime.Now,
                ProProjectId = data.ProProjectId,
                //LibGraphic = data.LibGraphic,
                Version = data.Version
            };

            DbContext.ProPrints.Add(proProjectToAdd);

            // persist the changes into the Database.
            DbContext.SaveChanges();

            // set new id to data object
            data.Id = proProjectToAdd.Id;


            return new JsonResult(data, DefaultJsonSettings);
        }

        // PUT api/values/5
        [HttpPut("UpdateProjectPrint")]
        //[Authorize]
        public IActionResult Update([FromBody]ProjectPrintViewModel data)
        {
            //TODO : NEED TO REIMPLEMENT

            if (data != null)
            {
                var proProject = DbContext.ProPrints.FirstOrDefault(i => i.Id == data.Id);

                if (proProject != null)
                {
                    proProject.DateModified = DateTime.Now;
                    proProject.ProProjectId = data.ProProjectId;
                    //proProject.LibGraphic = data.LibGraphic;
                    proProject.Version = data.Version;
                    proProject.Application = data.Application;

                    DbContext.ProPrints.Update(proProject);

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
        [HttpDelete("DeleteProjectPrint/{id}")]
        //[Authorize]
        public IActionResult Delete(Guid id)
        {
            var proProjectItem = DbContext.ProPrints.FirstOrDefault(i => i.Id == id);

            if (proProjectItem != null)
            {
                DbContext.ProPrints.Remove(proProjectItem);

                // persist the changes into the Database.
                DbContext.SaveChanges();

                return Ok();
            }
            else
                return BadRequest(new { error = String.Format("Data has not been found") });  // return a HTTP Status 404 (Not Found) if we couldn't find a suitable item.
        }
        #endregion

        #region Private Memers

        private List<ProjectPrintViewModel> ToItemViewModelList(IEnumerable<ProPrint> Projects)
        {
            var result = Projects.Select(TinyMapper.Map<ProjectPrintViewModel>).ToList();
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
