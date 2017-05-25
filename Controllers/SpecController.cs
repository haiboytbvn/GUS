using System;
using System.Collections.Generic;
using System.Linq;
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
    public class SpecController : Controller
    {
        #region Private Fields
        protected GUSLibraryDbContext DbContext;
        #endregion Private Fields

        #region Constructor
        public SpecController(GUSLibraryDbContext context)
        {
            DbContext = context;
        }
        #endregion Constructor
        // GET: /<controller>/

        #region Attribute-based Routing
        // GET: api/values
        [HttpPost("GetSpecList")]
        public IActionResult GetSpecList([FromBody]SearchGeneralFilterViewModel data)
        {

            // return a HTTP Status 404 (Not Found) if we couldn't find a suitable item.
            if (data == null)
                return NotFound(new { error = "Invalid Data" });

            var companyIdFromSearchData = data.CompanyId ?? Guid.Empty;
            var companyId = CompanyIdHelper.GetCompanyId(companyIdFromSearchData);
            var name = data.Name;
            var code = data.Code;
            var buyerCode = data.BuyerCode;


            var itemList = (from s in DbContext.Specs join sr in DbContext.SizeRanges on s.SizeRange equals sr.Id
                            select new SpecListViewModel
                            {
                               Id = s.Id,
                               IsActive = s.IsActive,
                               CompanyId = s.CompanyId,
                               Name = s.Name,
                               Code = s.Code,
                               Slug = s.Slug,
                               BuyerCode = s.BuyerCode,
                               SizeRange = sr.Name,
                               GuidedSpecSize = s.GuidedSpecSize
                            }
                            ).
                Where(x =>

            (companyId == Guid.Empty) || (x.CompanyId == companyId) &&
            (string.IsNullOrEmpty(name) || x.Name.ToLower().Contains(name.Trim().ToLower())) &&
            (string.IsNullOrEmpty(code) || x.Code.ToLower().Contains(code.Trim().ToLower())) &&
            (string.IsNullOrEmpty(buyerCode) || x.BuyerCode.ToLower().Contains(buyerCode.Trim().ToLower()))
            ).OrderBy(x => x.Name).ToList();
            return new JsonResult(itemList, DefaultJsonSettings);
        }

        // GET api/values/5
        [HttpGet("GetSpec/{id}")]
        public IActionResult GetSpec(Guid id)
        {
            var result = new SpecDetailViewModel();

            var item = DbContext.Specs.FirstOrDefault(i => i.Id == id);
            if (item != null)
            {
                result.Spec = TinyMapper.Map<SpecViewModel>(item);
                result.POMs = (from s in DbContext.Specs
                    join r in DbContext.RelSpecPoMs on s.Id equals r.SpecId
                    join p in DbContext.POMs on r.POMId equals p.Id
                    where s.Id == id
                    select new POMofSpecViewModel
                    {
                        Id = r.Id,
                        SpecId = s.Id,
                        POMId = p.Id,
                        Name = p.Name,
                        Code = p.Code,
                        TOL = r.TOL,
                        GuidSpec = r.GuideSpec,
                        GradeSpec = r.GradeSpec
                    }).ToList();

                return new JsonResult(result, DefaultJsonSettings);
            }

            return NotFound(new { Error = $"ID {id} has not been found" });

            // TODO: Get Detail of Spec, Get POM of Spec, Get TOL, GuidSpecs and GradeSpec from RelSpecPOM table




        }

        // POST api/values
        [HttpPost("AddSpec")]
        [Authorize]
        public IActionResult Add([FromBody]SpecUpdateViewModel data)
        {
            // assume that when adding a new Spec, we need to add POMs also
            // besides, we also need to add TOL, GUID SPEC, Grade Specs
            // I have a SpecUpdateViewModel that contains a Spec Model and a List of POM models to insert into RelSpecPOM table

            if (data == null)
                return NotFound(new { error = "Invalid Data" });
            // return a HTTP Status 404 (Not Found) if we couldn't find a suitable item.

            // Get company Id base on the user type
            Guid companyIdFromSearchData = Guid.Empty;
            Guid companyId = CompanyIdHelper.GetCompanyId(companyIdFromSearchData);

            // Get last code for current library type
            CodeHelper ch = new CodeHelper(DbContext);
            string code = ch.GetAccessoryCategoryCode(EnumHelper.LibType.LibAccessoryCategory.ToString());

            // Check if slug is duplicate or not
            string slug = SlugHelper.GetSlug(data.Spec.CompanyId, DbContext, data.Spec.Name, EnumHelper.LibType.LibAccessoryCategory.ToString());

            // First, Add to LibSpec table
            var guid = new Guid();
            var specToAdd = new LibSpec
            {
                Id = guid,
                DateCreated = DateTime.Now,
                DateModified = DateTime.Now,
                IsActive = data.Spec.IsActive,
                CompanyId = companyId,
                Name = data.Spec.Name,
                Code = data.Spec.Code,   //this should auto generate by system, and can not be changed
                Slug = slug,    //this should generate by some slug helper class in future.
                BuyerCode = code,
                SizeRange = data.Spec.SizeRange,
                GuidedSpecSize = data.Spec.GuidedSpecSize

            };

            DbContext.Specs.Add(specToAdd);
            // Then Add to RelSpecPOM table

            // Create relation record in "RelAccessoryTypeCategories"

            foreach (var item in data.POMs)
            {
                var rel = new RelSpecPOM
                {
                    Id = Guid.NewGuid(),
                    CompanyId = companyId,
                    DateCreated = DateTime.Today.Date,
                    SpecId = guid,
                    POMId = item.Id,
                    GradeSpec = item.GradeSpec,
                    GuideSpec = item.GuideSpec,
                    TOL = item.TOL

                };

                DbContext.RelSpecPoMs.Add(rel);
            }
        
            // persist the changes into the Database.
            DbContext.SaveChanges();

          

            return new JsonResult(data, DefaultJsonSettings);
        }
        [HttpPost("AddSpec1")]
        [Authorize]
        public IActionResult Add1([FromBody]SpecViewModel data)
        {
          // This is just for testing only
          // When you add a new Spec, the POM will be added automatically

            if (data == null)
                return NotFound(new { error = "Invalid Data" });
            // return a HTTP Status 404 (Not Found) if we couldn't find a suitable item.

            // Get company Id base on the user type
            Guid companyIdFromSearchData = Guid.Empty;
            Guid companyId = CompanyIdHelper.GetCompanyId(companyIdFromSearchData);

            // Get last code for current library type
            CodeHelper ch = new CodeHelper(DbContext);
            string code = ch.GetTypeCode(EnumHelper.LibType.LibSpec.ToString());

            // Check if slug is duplicate or not
            string slug = SlugHelper.GetSlug(data.CompanyId, DbContext, data.Name, EnumHelper.LibType.LibAccessoryCategory.ToString());

            var guid = new Guid();
            var specToAdd = new LibSpec
            {
                Id = guid,
                DateCreated = DateTime.Now,
                DateModified = DateTime.Now,
                IsActive = data.IsActive,
                CompanyId = companyId,
                Name = data.Name,
                Code = code,   //this should auto generate by system, and can not be changed
                Slug = slug,    //this should generate by some slug helper class in future.
                BuyerCode = data.BuyerCode,
                SizeRange = data.SizeRange,
                GuidedSpecSize = data.GuidedSpecSize

            };
            DbContext.Specs.Add(specToAdd);
            var lstpom = DbContext.POMs;

            foreach (var pom in lstpom)
            {
                var rel = new RelSpecPOM
                {
                    Id=Guid.NewGuid(),
                    CompanyId = companyId,
                    DateCreated = DateTime.Now,
                    GradeSpec = "Grade " + pom.Name,
                    GuideSpec = "Guid Spec " + pom.Name,
                    POMId = pom.Id,
                    SpecId = specToAdd.Id,
                    TOL = "TOL " + pom.Name
                };

                DbContext.RelSpecPoMs.Add(rel);
               
            }
            // Mock data to test listing


           
            DbContext.SaveChanges();



            return new JsonResult(data, DefaultJsonSettings);
        }
        // PUT api/values/5
        [HttpPut("UpdateSpec")]
        [Authorize]
        public IActionResult Update([FromBody]SpecUpdateViewModel data)
        {

            // Get company Id base on the user type
            var companyIdFromSearchData = Guid.Empty;
            var companyId = CompanyIdHelper.GetCompanyId(companyIdFromSearchData);

            // Get last code for current library type
            var ch = new CodeHelper(DbContext);
            var code = ch.GetAccessoryCategoryCode(EnumHelper.LibType.LibAccessoryCategory.ToString());

            // Check if slug is duplicate or not
            var slug = SlugHelper.GetSlug(data.Spec.CompanyId, DbContext, data.Spec.Name, EnumHelper.LibType.LibAccessoryCategory.ToString());

            // Bcoz there is no versioning version, so the update function simple update the info of spec and then update all the records that related to the Spec
            if (data != null)
            {
                var spec = DbContext.Specs.FirstOrDefault(i => i.Id == data.Spec.Id);

                if (spec != null)
                {
                    spec.DateModified = DateTime.Now;
                    spec.DateCreated = data.Spec.DateCreated;
                    spec.IsActive = data.Spec.IsActive;
                    spec.CompanyId = data.Spec.CompanyId;
                    spec.Name = data.Spec.Name;
                    spec.Code = data.Spec.Code;  //this should auto generate by system, and can not be changed
                    spec.Slug = slug;    //this should generate by some slug helper class in future.
                    spec.BuyerCode = data.Spec.BuyerCode;
                    spec.SizeRange = data.Spec.SizeRange;
                    spec.GuidedSpecSize = data.Spec.GuidedSpecSize;
                    DbContext.Specs.Update(spec);
                  
                    // then update RelSpecPOM table

                    foreach (var item in data.POMs)
                    {
                        var rel = DbContext.RelSpecPoMs.FirstOrDefault(x => x.Id == item.Id);
                        if (rel != null)
                        {
                            // in this case, it's existing rel item, we need to update or delete if POMId null
                          
                                // first, check if user remove a POM from Spec
                                if (item.POMId == null)
                                {
                                    DbContext.RelSpecPoMs.Remove(rel);
                                    DbContext.SaveChanges();
                                }
                                else
                                {
                                    rel.CompanyId = item.CompanyId;
                                    rel.DateCreated = item.DateCreated;
                                    rel.SpecId = item.SpecId;
                                    rel.POMId = item.POMId;
                                    rel.TOL = item.TOL;
                                    rel.GuideSpec = item.GuideSpec;
                                    rel.GradeSpec = item.GradeSpec;
                                    DbContext.RelSpecPoMs.Update(rel);
                                    DbContext.SaveChanges();
                                }                           
                          
                        }
                        else
                        {
                            // in this case, user add a new POM
                            if (item.POMId != null)
                            {
                                var newrel = new RelSpecPOM
                                {
                                    Id = Guid.NewGuid(),
                                    CompanyId = companyId,
                                    DateCreated = DateTime.Today.Date,
                                    GradeSpec = item.GradeSpec,
                                    GuideSpec = item.GuideSpec,
                                    POMId = item.POMId,
                                    SpecId = item.SpecId,
                                    TOL = item.TOL

                                };
                                DbContext.RelSpecPoMs.Add(newrel);
                                DbContext.SaveChanges();
                            }
                          
                        }
                    }

                    return new JsonResult(data, DefaultJsonSettings);
                }
                return NotFound(new { error = "Data has not been found" });  // return a HTTP Status 404 (Not Found) if we couldn't find a suitable item.
            }
            return NotFound(new { error = "Invalid Data" });   // return a HTTP Status 404 (Not Found) if we couldn't find a suitable item.
        }

        // DELETE api/values/5
        [HttpDelete("DeleteSpec/{id}")]
        [Authorize]
        public IActionResult Delete(Guid id)
        {
            // TODO: Delete spec item and records that has SpecId = id in RelSpecPOMs Table
            // because there is no versioning mechanism for Spec, so it's permanent delete

            // First, Delete records in RelSpecPOM

            var lstRel = DbContext.RelSpecPoMs.Where(x => x.SpecId == id);
            if (lstRel.Any())
            {
                foreach (var rel in lstRel)
                {
                    DbContext.RelSpecPoMs.Remove(rel);
                }
                DbContext.SaveChanges();
            }    
           
            // then remove spec
            var spec = DbContext.Specs.FirstOrDefault(x => x.Id == id);
            if (spec != null)
            {
                DbContext.Specs.Remove(spec);
                DbContext.SaveChanges();
                return Ok();
            }

            return BadRequest(new { error = "Data has not been found" });  // return a HTTP Status 404 (Not Found) if we couldn't find a suitable item.
        }
        #endregion

        #region Private Memers
        private List<SpecViewModel> ToItemViewModelList(IEnumerable<LibSpec> Specs)
        {
            var result = Enumerable.ToList(Specs.Select(TinyMapper.Map<SpecViewModel>));
            return result;
        }

        #endregion

        #region Common Properties
        /// <summary>
        /// Returns a suitable JsonSerializerSettings object 
        /// that can be used to generate the JsonResult return value 
        /// for this Controller's methods.
        /// </summary>
        protected JsonSerializerSettings DefaultJsonSettings => new JsonSerializerSettings
        {
            Formatting = Formatting.Indented
        };

        #endregion Common Properties
    }
}
