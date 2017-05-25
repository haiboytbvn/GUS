using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using GUSLibrary.Classes;
using GUSLibrary.Data;
using GUSLibrary.ViewModels;
using Microsoft.AspNetCore.Mvc;
using Nelibur.ObjectMapper;
using Newtonsoft.Json;
using Microsoft.AspNetCore.Authorization;

namespace GUSLibrary.Controllers
{
    [Route("api/[controller]")]
    public class CodeController : Controller
    {
        #region Private Fields
        protected GUSLibraryDbContext DbContext;
        #endregion Private Fields

        #region Constructor
        public CodeController(GUSLibraryDbContext context)
        {
            DbContext = context;
        }
        #endregion Constructor

        #region Attribute-based Routing
        // GET: api/values
        [HttpGet("GetCodeList")]
        public IActionResult GetCodeList()
        {
            var items = DbContext.Codes.OrderBy(i => i.LibType).ToArray();
            return new JsonResult(ToItemViewModelList(items), DefaultJsonSettings);
        }


        // GET api/values/5
        [HttpGet("GetCodebyId/{id}")]
        public IActionResult GetCodebyId(Guid id)
        {
            var item = DbContext.Codes.FirstOrDefault(i => i.Id == id);
            if (item != null) return new JsonResult(TinyMapper.Map<CodeViewModel>(item), DefaultJsonSettings);
            return NotFound(new { Error = $"ID {id} has not been found" });
        }


        // POST api/values
        [HttpPost("AddCode")]
        [Authorize]
        public IActionResult Add(string libType)
        {
            var lastItem = DbContext.Codes.FirstOrDefault(x => x.LibType == libType);
            var lastCode = lastItem.CodeNumber;
            lastItem.CodeNumber = lastCode + 1;

            DbContext.Codes.Update(lastItem);
            DbContext.SaveChanges();

            return new JsonResult(lastCode, DefaultJsonSettings);
        }
       
        #endregion

        #region Private Memers

        private List<CodeViewModel> ToItemViewModelList(IEnumerable<LibCode> code)
        {
            var result = code.Select(TinyMapper.Map<CodeViewModel>).ToList();
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
