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
    public class TrainingItemController: Controller
    {
        #region Private Fields
        protected GUSLibraryDbContext DbContext;
        #endregion Private Fields

        #region Constructor
        public TrainingItemController(GUSLibraryDbContext context)
        {
            DbContext = context;
        }
        #endregion Constructor
        // GET: /<controller>/

        #region Attribute-based Routing
        // GET: api/values
        [HttpPost("GetTrainingItemList")]
        public IActionResult GetTrainingItemList([FromBody]SearchGeneralFilterViewModel data)
        {
            // return a HTTP Status 404 (Not Found) if we couldn't find a suitable item.
            if (data == null)
                return NotFound(new { error = "Invalid Data" });

            var itemList = DbContext.TrainingItems.Where(z => z.IsLatest && !(z.IsDeleted) && z.IsActive).ToList().OrderBy(x => x.Value);

            // save the total number of records
            var total = itemList.Count();

            //pass in the model
            var result = new TrainingItemListViewModel();
            result.Data = new List<TrainingItemViewModel>();
            result.Paging = new Pagination();
            if (data.Paging.PageNumber == 0)
            {
                // if pagenumber ==0, get All
                result.Data = itemList.Select(x => TinyMapper.Map<TrainingItemViewModel>(x)).ToList();
                result.Paging.PageNumber = 0;
                result.Paging.Total = total;
                result.Paging.Show = total;
                result.Paging.PageCount = new List<int>();
                result.Paging.PageSize = total;
                return new JsonResult(result, DefaultJsonSettings);
            }
            // else, do Pagination here
            var list = itemList.Skip((data.Paging.PageNumber - 1) * data.Paging.PageSize).Take(data.Paging.PageSize);
            result.Data = list.Select(x => TinyMapper.Map<TrainingItemViewModel>(x)).ToList();

            // pass in Pagination parmeters to show in front-end

            result.Paging.Total = total;
            result.Paging.PageSize = data.Paging.PageSize;
            result.Paging.PageNumber = data.Paging.PageNumber;
            result.Paging.Show = list.Count();
            //calculate and return pages of list
            var numberofpages = Math.Ceiling((decimal)total / data.Paging.PageSize);
            result.Paging.PageCount = new List<int>();
            if (data.Paging.PageNumber > 1) result.Paging.PageCount.Add(data.Paging.PageNumber - 1);
            else result.Paging.PageCount.Add(0);
            for (var i = 1; i <= numberofpages; i++)
            {
                if (i >= data.Paging.PageNumber && i < data.Paging.PageNumber + 3 && i <= numberofpages)
                    result.Paging.PageCount.Add(i);
            }
            if (data.Paging.PageNumber < numberofpages) result.Paging.PageCount.Add(data.Paging.PageNumber + 1);
            else result.Paging.PageCount.Add(0);
            return new JsonResult(result, DefaultJsonSettings);
        }


        // GET by Id
        [HttpGet("GetTrainingItemById/{id}")]
        public IActionResult GetSeasonById(Guid id)
        {
            var item = DbContext.TrainingItems.FirstOrDefault(x => x.Id == id);
            if (item != null) return new JsonResult(TinyMapper.Map<TrainingItemViewModel>(item), DefaultJsonSettings);
            return NotFound( new { Error = $"ID {id} has not been found" });
        }

        // POST api/values
        [HttpPost("AddTrainingItem")]
        public IActionResult Add([FromBody]TrainingItemViewModel data)
        {
            if (data == null)
                return NotFound(new { error = "Invalid Data" });
            // return a HTTP Status 404 (Not Found) if we couldn't find a suitable item.

            var trainingitemtoupdate = new LibTrainingItem()
            {
                Id = Guid.NewGuid(),
                DateCreated = DateTime.Now,
                DateModified = DateTime.Now,
                IsActive = data.IsActive,
                Value = data.Value,
                Version = 0,
                IsLatest = true,
                IsDeleted = false
            };

            DbContext.TrainingItems.Add(trainingitemtoupdate);

            // persist the changes into the Database.
            DbContext.SaveChanges();

            // set new id to data object
            data.Id = trainingitemtoupdate.Id;

            return new JsonResult(data, DefaultJsonSettings);
        }


        // PUT api/values/5
        [HttpPut("UpdateTrainingItem")]
        [Authorize]
        public IActionResult Update([FromBody]TrainingItemViewModel data)
        {
            if (data != null)
            {
                var trainingitemtoupdate = DbContext.TrainingItems.FirstOrDefault(i => i.Id.Equals(data.Id));

                if (trainingitemtoupdate != null)
                {
                    var trainingitem = new LibTrainingItem()
                    {
                        Id = Guid.NewGuid(),
                        DateCreated = trainingitemtoupdate.DateCreated,
                        DateModified = trainingitemtoupdate.DateModified,
                        IsActive = trainingitemtoupdate.IsActive,
                        Value = trainingitemtoupdate.Value,
                        Version = trainingitemtoupdate.Version,
                        IsLatest = false,
                        IsDeleted = trainingitemtoupdate.IsDeleted
                    };
                    DbContext.TrainingItems.Add(trainingitem);

                    // Update the old record data.
                    trainingitemtoupdate.DateModified = DateTime.Now;
                    trainingitemtoupdate.IsActive = data.IsActive;
                    trainingitemtoupdate.Value = data.Value;
                  
                    trainingitemtoupdate.IsDeleted = false;
                    trainingitemtoupdate.IsLatest = true;
                    trainingitemtoupdate.Version = trainingitemtoupdate.Version + 1;
                    DbContext.TrainingItems.Update(trainingitemtoupdate);

                    // persist the changes into the Database.
                    DbContext.SaveChanges();

                    return new JsonResult(data, DefaultJsonSettings);
                }
                return NotFound(new { error = "Data has not been found" });  // return a HTTP Status 404 (Not Found) if we couldn't find a suitable item.
            }
            return NotFound(new { error = "Invalid Data" });   // return a HTTP Status 404 (Not Found) if we couldn't find a suitable item.
        }


        // DELETE api/values/5
        [HttpDelete("DeleteTrainingItem/{id}")]
        [Authorize]
        public IActionResult Delete(Guid id)
        {
            var item = DbContext.TrainingItems.FirstOrDefault(i => i.Id.Equals(id));
            if (item != null)
            {
                item.IsDeleted = true;
                item.IsLatest = false;
                DbContext.TrainingItems.Update(item);
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
