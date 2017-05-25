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
    public class ProjectColorController : Controller
    {
        #region Private Fields
        protected GUSLibraryDbContext DbContext;
        #endregion Private Fields

        #region Constructor
        public ProjectColorController(GUSLibraryDbContext context)
        {
            DbContext = context;
        }
        #endregion Constructor

        #region Attribute-based Routing
        // GET: api/values
        [HttpPost("GetProjectColorList")]
        public IActionResult GetProjectColorList([FromBody]ProjectSearchGeneralFilterViewModel data)
        {
            Guid projectId = Guid.Empty;

            if(data.ProjectId != null)
                projectId = data.ProjectId.Value;

            var lstBrand = DbContext.Brands;
            var lstDepartment = DbContext.Departments;
            var lstDivision = DbContext.Divisions;
            var lstSeason = DbContext.Seasons;
            var lstYear = DbContext.Years;
            var lstColor = DbContext.Colors;
            var lstProject = DbContext.ProColors;
            //var lstProject = DbContext.ProColors.Where(x => x.ProProjectId == projectId);

            var result = (from c in lstColor
                          join b in lstBrand on c.Brand equals b.Id
                          join dept in lstDepartment on c.Department equals dept.Id
                          join d in lstDivision on c.Division equals d.Id
                          //join s in lstSeason on c.ApplicationSeason equals s.Id
                          //join y in lstYear on c.ApplicationYear equals y.Id
                          join p in lstProject on c.Id equals p.LibColorId
                          where p.ProProjectId == projectId
                          select new ProjectColorViewModel
                          {
                              Id = p.Id,
                              DateCreated = p.DateCreated,
                              DateModified = p.DateModified,
                              ProProjectId = p.ProProjectId,
                              LibColorId = p.LibColorId,
                              Version = p.Version,
                              ColorCode = p.LibColorItem.Code,
                              BrandName = b.Name,
                              DepartmentName = dept.Name,
                              DivisionName = d.Name,
                              //ApplicationSeasonName = s.Name,
                              //ApplicationYearName = y.Name,
                              ColorName = c.Name
                          }
                );
            //return new JsonResult(result.OrderBy(x => x.ProProjectId).ToList(), DefaultJsonSettings);
            return new JsonResult(result.ToList(), DefaultJsonSettings);
        }

        // GET api/values/5
        [HttpGet("GetProjectColorById/{id}")]
        public IActionResult GetProjectColorById(Guid id)
        {
            var item = DbContext.ProColors.FirstOrDefault(i => i.Id == id);
            if (item != null) return new JsonResult(TinyMapper.Map<ProjectColorViewModel>(item), DefaultJsonSettings);
            return NotFound(new { Error = $"ID {id} has not been found" });
        }

        // POST api/values
        [HttpPost("AddProjectColor")]
        //[Authorize]
        public IActionResult Add([FromBody]ProjectColorViewModel data)
        {
            if (data == null)
                return NotFound(new { error = String.Format("Invalid Data") });
            // return a HTTP Status 404 (Not Found) if we couldn't find a suitable item.
            var proProjectToAdd = new ProColor()
            {
                Id = Guid.NewGuid(),
                DateCreated = DateTime.Now,
                DateModified = DateTime.Now,
                ProProjectId = data.ProProjectId,
                LibColorId = data.LibColorId,
                Version = data.Version
            };

            DbContext.ProColors.Add(proProjectToAdd);

            // persist the changes into the Database.
            DbContext.SaveChanges();

            // set new id to data object
            data.Id = proProjectToAdd.Id;


            return new JsonResult(data, DefaultJsonSettings);
        }

        // PUT api/values/5
        [HttpPut("UpdateProjectColor")]
        //[Authorize]
        public IActionResult Update([FromBody]ProjectColorViewModel data)
        {
            if (data != null)
            {
                var proProject = DbContext.ProColors.FirstOrDefault(i => i.Id == data.Id);

                if (proProject != null)
                {
                    proProject.DateModified = DateTime.Now;
                    proProject.ProProjectId = data.ProProjectId;
                    proProject.LibColorId = data.LibColorId;
                    proProject.Version = data.Version;

                    DbContext.ProColors.Update(proProject);

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
        [HttpDelete("DeleteProjectColor/{id}")]
        //[Authorize]
        public IActionResult Delete(Guid id)
        {
            var proProjectItem = DbContext.ProColors.FirstOrDefault(i => i.Id == id);

            if (proProjectItem != null)
            {
                DbContext.ProColors.Remove(proProjectItem);

                // persist the changes into the Database.
                DbContext.SaveChanges();

                return Ok();
            }
            else
                return BadRequest(new { error = String.Format("Data has not been found") });  // return a HTTP Status 404 (Not Found) if we couldn't find a suitable item.
        }
        #endregion

        #region Private Memers

        private List<ProjectColorViewModel> ToItemViewModelList(IEnumerable<ProColor> Projects)
        {
            var result = Projects.Select(TinyMapper.Map<ProjectColorViewModel>).ToList();
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
