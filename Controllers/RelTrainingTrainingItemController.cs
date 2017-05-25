using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using GUSLibrary.Classes;
using GUSLibrary.Data;
using GUSLibrary.ViewModels;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Nelibur.ObjectMapper;
using Newtonsoft.Json;

namespace GUSLibrary.Controllers
{
    [Route("api/[controller]")]
    public class RelTrainingTrainingItemController: Controller
    {
        #region Private Fields
        protected GUSLibraryDbContext DbContext;
        #endregion Private Fields

        #region Constructor
        public RelTrainingTrainingItemController(GUSLibraryDbContext context)
        {
            DbContext = context;
        }
        #endregion Constructor
        // GET: /<controller>/

        #region Attribute-based Routing
        // GET: api/values
        [HttpPost("GetRelTrainingTrainingItemList")]
        public IActionResult GetRelTrainingTrainingItemList(Guid trainingId)
        {
            var result = DbContext.RelTrainingTrainingItems.Where(z => (z.TrainingId == trainingId) && z.IsLatest && !(z.IsDeleted) && z.IsActive).ToList();
            return new JsonResult(result, DefaultJsonSettings);
        }


        // GET by Id
        [HttpGet("GetRelTrainingTrainingItemList/{id}")]
        public IActionResult GetRelTrainingTrainingItemById(Guid id)
        {
            var item = DbContext.RelTrainingTrainingItems.FirstOrDefault(x => x.Id == id);
            if (item != null) return new JsonResult(TinyMapper.Map<RelTrainingTrainingItemViewModel>(item), DefaultJsonSettings);
            return NotFound( new { Error = $"ID {id} has not been found" });
        }

        // POST api/values
        [HttpPost("AddRelTrainingTrainingItem")]
        public IActionResult Add([FromBody]RelTrainingTrainingItemViewModel data)
        {
            if (data == null)
                return NotFound(new { error = "Invalid Data" });
            // return a HTTP Status 404 (Not Found) if we couldn't find a suitable item.

            var reltrainingtrainingitemtoupdate = new RelTrainingTrainingItem()
            {
                Id = Guid.NewGuid(),
                DateCreated = DateTime.Now,
                DateModified = DateTime.Now,
                IsActive = data.IsActive,
                TrainingId = data.TrainingId,
                TrainingItemId = data.TrainingItemId,
                Version = 0,
                IsLatest = true,
                IsDeleted = false
            };

            DbContext.RelTrainingTrainingItems.Add(reltrainingtrainingitemtoupdate);

            // persist the changes into the Database.
            DbContext.SaveChanges();

            // set new id to data object
            data.Id = reltrainingtrainingitemtoupdate.Id;

            return new JsonResult(data, DefaultJsonSettings);
        }


        // PUT api/values/5
        [HttpPut("UpdateRelTrainingTrainingItem")]
        [Authorize]
        public IActionResult Update([FromBody]RelTrainingTrainingItemViewModel data)
        {
            if (data != null)
            {
                var reltrainingtrainingitemtoupdate = DbContext.RelTrainingTrainingItems.FirstOrDefault(i => i.Id.Equals(data.Id));

                if (reltrainingtrainingitemtoupdate != null)
                {
                    var reltrainingtrainingitem = new RelTrainingTrainingItem()
                    {
                        Id = Guid.NewGuid(),
                        DateCreated = reltrainingtrainingitemtoupdate.DateCreated,
                        DateModified = reltrainingtrainingitemtoupdate.DateModified,
                        IsActive = reltrainingtrainingitemtoupdate.IsActive,
                        TrainingId = reltrainingtrainingitemtoupdate.TrainingId,
                        TrainingItem = reltrainingtrainingitemtoupdate.TrainingItem,
                        Version = reltrainingtrainingitemtoupdate.Version,
                        IsLatest = false,
                        IsDeleted = reltrainingtrainingitemtoupdate.IsDeleted
                    };
                    DbContext.RelTrainingTrainingItems.Add(reltrainingtrainingitem);

                    // Update the old record data.
                    reltrainingtrainingitemtoupdate.DateModified = DateTime.Now;
                    reltrainingtrainingitemtoupdate.IsActive = data.IsActive;
                    reltrainingtrainingitemtoupdate.TrainingId = data.TrainingId;
                    reltrainingtrainingitemtoupdate.TrainingItemId = data.TrainingItemId;
                    reltrainingtrainingitemtoupdate.IsDeleted = false;
                    reltrainingtrainingitemtoupdate.IsLatest = true;
                    reltrainingtrainingitemtoupdate.Version = reltrainingtrainingitemtoupdate.Version + 1;
                    DbContext.RelTrainingTrainingItems.Update(reltrainingtrainingitemtoupdate);

                    // persist the changes into the Database.
                    DbContext.SaveChanges();

                    return new JsonResult(data, DefaultJsonSettings);
                }
                return NotFound(new { error = "Data has not been found" });  // return a HTTP Status 404 (Not Found) if we couldn't find a suitable item.
            }
            return NotFound(new { error = "Invalid Data" });   // return a HTTP Status 404 (Not Found) if we couldn't find a suitable item.
        }


        // DELETE api/values/5
        [HttpDelete("DeleteRelTrainingTrainingItem/{id}")]
        [Authorize]
        public IActionResult Delete(Guid id)
        {
            var item = DbContext.RelTrainingTrainingItems.FirstOrDefault(i => i.Id.Equals(id));
            if (item != null)
            {
                item.IsDeleted = true;
                item.IsLatest = false;
                DbContext.RelTrainingTrainingItems.Update(item);
            }
            DbContext.SaveChanges();

            return Ok();
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
