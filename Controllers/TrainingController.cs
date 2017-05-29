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
    public class TrainingController: Controller
    {
        #region Private Fields
        protected GUSLibraryDbContext DbContext;
        #endregion Private Fields

        #region Constructor
        public TrainingController(GUSLibraryDbContext context)
        {
            DbContext = context;
        }
        #endregion Constructor
        // GET: /<controller>/

        #region Attribute-based Routing
        // GET: api/values
        [HttpPost("GetTrainingList")]
        public IActionResult GetTrainingList([FromBody]SearchGeneralFilterViewModel data)
        {
            // return a HTTP Status 404 (Not Found) if we couldn't find a suitable item.
            if (data == null)
                return NotFound(new { error = "Invalid Data" });

            var itemList = DbContext.Trainings.Where(z => z.IsLatest && !(z.IsDeleted) && z.IsActive).ToList().OrderBy(x => x.Name);

            // save the total number of records
            var total = itemList.Count();

            //pass in the model
            var result = new TrainingListViewModel();
            result.Data = new List<TrainingViewModel>();
            result.Paging = new Pagination();
            if (data.Paging.PageNumber == 0)
            {
                // if pagenumber ==0, get All
                result.Data = itemList.Select(x => TinyMapper.Map<TrainingViewModel>(x)).ToList();
                result.Paging.PageNumber = 0;
                result.Paging.Total = total;
                result.Paging.Show = total;
                result.Paging.PageCount = new List<int>();
                result.Paging.PageSize = total;
                return new JsonResult(result, DefaultJsonSettings);
            }
            // else, do Pagination here
            var list = itemList.Skip((data.Paging.PageNumber - 1) * data.Paging.PageSize).Take(data.Paging.PageSize);
            result.Data = list.Select(x => TinyMapper.Map<TrainingViewModel>(x)).ToList();

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
        [HttpGet("GetTrainingById/{id}")]
        public IActionResult GetTrainingById(Guid id)
        {
            var item = DbContext.Trainings.FirstOrDefault(x => x.Id == id);
            var result = TinyMapper.Map<TrainingViewModel>(item);
            result.Items = new List<Guid>();
            var trainingItems = DbContext.RelTrainingTrainingItems.Where(z => (z.TrainingId == id) && z.IsLatest && !(z.IsDeleted) && z.IsActive).ToList();
            foreach (var training in trainingItems)
            {
                result.Items.Add(training.TrainingItemId);
            }
            if (item != null) return new JsonResult(result, DefaultJsonSettings);

            return NotFound( new { Error = $"ID {id} has not been found" });
        }

       

        // POST api/values
        [HttpPost("AddTraining")]
        public IActionResult Add([FromBody]TrainingViewModel data)
        {
            if (data == null)
                return NotFound(new { error = "Invalid Data" });
            // return a HTTP Status 404 (Not Found) if we couldn't find a suitable item.

            var trainingitemtoadd = new LibTraining()
            {
                Id = Guid.NewGuid(),
                DateCreated = DateTime.Now,
                DateModified = DateTime.Now,
                IsActive = data.IsActive,
                Name = data.Name,
                Age = data.Age,
                Version = 0,
                IsLatest = true,
                IsDeleted = false
            };

            DbContext.Trainings.Add(trainingitemtoadd);

            //TODO: Update relation talbe
              
            foreach(var item in data.Items)
            {
                var rel = new RelTrainingTrainingItem()
                {
                    Id = Guid.NewGuid(),
                    TrainingId = trainingitemtoadd.Id,
                    TrainingItemId = item,
                    IsActive = true,
                    IsDeleted = false,
                    IsLatest = true,
                    Version = 0,
                    DateCreated = DateTime.Today.Date,
                    DateModified = DateTime.Today.Date
                    
                };
                DbContext.RelTrainingTrainingItems.Add(rel);
            }

            // persist the changes into the Database.
            DbContext.SaveChanges();

            return new JsonResult(data, DefaultJsonSettings);
        }


        // PUT api/values/5
        [HttpPut("UpdateTraining")]
        [Authorize]
        public IActionResult Update([FromBody]TrainingViewModel data)
        {
            if (data != null)
            {
                var trainingtoupdate = DbContext.Trainings.FirstOrDefault(i => i.Id.Equals(data.Id));

                if (trainingtoupdate != null)
                {
                    var training = new LibTraining()
                    {
                        Id = Guid.NewGuid(),
                        DateCreated = trainingtoupdate.DateCreated,
                        DateModified = trainingtoupdate.DateModified,
                        IsActive = trainingtoupdate.IsActive,
                        Name = trainingtoupdate.Name,
                        Age = trainingtoupdate.Age,
                        Version = trainingtoupdate.Version,
                        IsLatest = false,
                        IsDeleted = trainingtoupdate.IsDeleted
                        
                    };
                    DbContext.Trainings.Add(training);

                    // Update the old record data.
                    trainingtoupdate.DateModified = DateTime.Now;
                    trainingtoupdate.IsActive = data.IsActive;
                    trainingtoupdate.Name = data.Name;
                    trainingtoupdate.Age = data.Age;
                    trainingtoupdate.IsDeleted = false;
                    trainingtoupdate.IsLatest = true;
                    trainingtoupdate.Version = trainingtoupdate.Version + 1;
                    DbContext.Trainings.Update(trainingtoupdate);

                    //update in relation table
                    var olddatas = DbContext.RelTrainingTrainingItems.Where(x => x.TrainingId == data.Id).ToList();
                    foreach(var olddata in olddatas)
                    {
                        olddata.TrainingId = training.Id;
                        olddata.IsLatest = false;
                    }

                    foreach (var item in data.Items)
                    {
                        var rel = new RelTrainingTrainingItem()
                        {
                            Id = Guid.NewGuid(),
                            TrainingId = trainingtoupdate.Id,
                            TrainingItemId = item,
                            IsActive = true,
                            IsDeleted = false,
                            IsLatest = true,
                            DateCreated = DateTime.Today.Date,
                            DateModified = DateTime.Today.Date
                            
                        };
                        DbContext.RelTrainingTrainingItems.Add(rel);
                    }

                    // persist the changes into the Database.
                    DbContext.SaveChanges();

                    return new JsonResult(data, DefaultJsonSettings);
                }
                return NotFound(new { error = "Data has not been found" });  // return a HTTP Status 404 (Not Found) if we couldn't find a suitable item.
            }
            return NotFound(new { error = "Invalid Data" });   // return a HTTP Status 404 (Not Found) if we couldn't find a suitable item.
        }


        // DELETE api/values/5
        [HttpDelete("DeleteTraining/{id}")]
        [Authorize]
        public IActionResult Delete(Guid id)
        {
            var item = DbContext.Trainings.FirstOrDefault(i => i.Id.Equals(id));
            if (item != null)
            {
                //find soonest version and set Latest = true
                
                var soonestTraining = DbContext.Trainings.Where(x =>
                    (x.Name == item.Name) &&
                    (x.IsActive == item.IsActive) &&
                    (x.IsDeleted == false) &&
                    (x.IsLatest == false) &&
                    (x.Version == item.Version - 1)
                    ).FirstOrDefault();

                if(soonestTraining != null)
                {
                    soonestTraining.IsLatest = true;
                    DbContext.Trainings.Update(soonestTraining);
                }
               

                // set isDeleted = true
                item.IsDeleted = true;
                item.IsLatest = false;
                DbContext.Trainings.Update(item);
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
