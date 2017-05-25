using GUSLibrary.Classes;
using GUSLibrary.Data;
using GUSLibrary.Data.User;
using GUSLibrary.ViewModels;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Nelibur.ObjectMapper;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

namespace GUSLibrary.Controllers
{
    [Route("api/[controller]")]
    public class ApplicationUserController : Controller
    {
        #region Private Fields
        protected GUSLibraryDbContext DbContext;
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly RoleManager<UserRole> _roleManager;
        #endregion Private Fields

        #region Constructor
        public ApplicationUserController(GUSLibraryDbContext context, UserManager<ApplicationUser> userManager, RoleManager<UserRole> roleManager)
        {
            DbContext = context;
            _userManager = userManager;
            _roleManager = roleManager;
        }
        #endregion Constructor
        // GET: /<controller>/

        #region Attribute-based Routing
        // GET: api/values
        [HttpGet("GetApplicationUserList")]
        public IActionResult GetApplicationUserList()
        {
            var items = DbContext.Users.OrderBy(i => i.UserName).ToArray();
            return new JsonResult(ToItemViewModelList(items), DefaultJsonSettings);
        }

        // GET api/values/5
        [HttpGet("GetApplicationUser/{id}")]
        public IActionResult GetApplicationUser(Guid id)
        {
            var item = DbContext.Users.FirstOrDefault(i => i.Id == id.ToString());
            if (item != null)
            {
                var user = new ApplicationUser()
                {
                    Id = item.Id,
                    DateCreated = item.DateCreated,
                    DateModified = item.DateModified,
                    LastAccess = item.LastAccess,
                    IsActive = item.IsActive,

                    UserName = item.UserName,
                    Email = item.Email,
                    UserCode = item.UserCode,   //this should auto generate by system, and can not be changed
                    Slug = item.Slug,           //this should generate by some slug helper class in future.
                    CompanyId = item.CompanyId,
                    RoleId = item.RoleId,
                    FirstName = item.FirstName,
                    LastName = item.LastName
                };

                //return new JsonResult(TinyMapper.Map<ApplicationUserViewModel>(item), DefaultJsonSettings);
                return new JsonResult(user, DefaultJsonSettings);
            }
            return NotFound(new { Error = $"ID {id} has not been found" });
        }

        // POST api/values
        [HttpPost("AddApplicationUser")]
        [Authorize]
        public IActionResult Add([FromBody]ApplicationUserViewModel data)
        {
            //get current login user id as string
            var currentUserIdStr = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            var matrixStr = User.Claims.Where(x => x.Type == "UserMatrix").FirstOrDefault().Value;   //AuthRoleHelper.GetRoleMatrixStr(data.RoleId.Value.ToString()); 
            bool isAuth = AuthRoleHelper.AuthRoleGeneralFunction(EnumHelper.UserMatrixName.CreateUser.ToString(),EnumHelper.UserMatrixAction.Allow.ToString(), matrixStr);
            if (isAuth)
            {
                if (data == null)
                    return NotFound(new { error = String.Format("Invalid Data") });
                // return a HTTP Status 404 (Not Found) if we couldn't find a suitable item.

                var userCount = DbContext.Users.Where(x => x.UserName.ToLower() == data.UserName).Count();
                if (userCount == 0)
                {
                    var user = new ApplicationUser()
                    {
                        Id = Guid.NewGuid().ToString(),
                        DateCreated = DateTime.Now,
                        DateModified = DateTime.Now,
                        LastAccess = DateTime.Now,
                        IsActive = data.IsActive,

                        UserName = data.UserName,
                        Email = data.Email,
                        UserCode = data.UserCode,   //this should auto generate by system, and can not be changed
                        Slug = data.Slug,           //this should generate by some slug helper class in future.
                        CompanyId = Guid.Empty,
                        RoleId = data.RoleId.Value,
                        FirstName = data.FirstName,
                        LastName = data.LastName
                    };

                    //update the user role
                    var roleId = data.RoleId.Value.ToString();
                    var roleItem = _roleManager.FindByIdAsync(roleId).Result;

                    var userCreated = _userManager.CreateAsync(user, "Pass4Admin").Result;
                    var roleAdded = _userManager.AddToRoleAsync(user, roleItem.Name).Result;

                    //DbContext.Users.Add(user);

                    // persist the changes into the Database.
                    DbContext.SaveChanges();

                    // set new id to data object
                    data.Id = new Guid(user.Id);


                    return new JsonResult(data, DefaultJsonSettings);
                }
                else
                {
                    return BadRequest(new { error = String.Format("User already exist.") });
                }
            }
            else
            {
                return Unauthorized();
            }
        }

        // PUT api/values/5
        [HttpPut("UpdateApplicationUser")]
        [Authorize]
        public IActionResult Update([FromBody]ApplicationUserViewModel data)
        {
            if (data != null)
            {
                var ApplicationUser = DbContext.Users.FirstOrDefault(i => i.Id == data.Id.ToString());

                if (ApplicationUser != null)
                {
                    var matrixStr = User.Claims.Where(x => x.Type == "UserMatrix").FirstOrDefault().Value;
                    bool isAuth = AuthRoleHelper.AuthRoleGeneralFunction(EnumHelper.UserMatrixName.EditUser.ToString(), EnumHelper.UserMatrixAction.Allow.ToString(), matrixStr);
                    if (isAuth)
                    {
                        ApplicationUser.DateModified = DateTime.Now;
                        //ApplicationUser.LastAccess = DateTime.Now;
                        ApplicationUser.IsActive = data.IsActive;

                        ApplicationUser.UserName = data.UserName;
                        ApplicationUser.Email = data.Email;
                        //ApplicationUser.UserCode = data.UserCode;   //this should auto generate by system, and can not be changed
                        ApplicationUser.Slug = data.Slug;           //this should generate by some slug helper class in future.
                        ApplicationUser.CompanyId = data.CompanyId.GetValueOrDefault();
                        ApplicationUser.RoleId = data.RoleId.Value;
                        ApplicationUser.FirstName = data.FirstName;
                        ApplicationUser.LastName = data.LastName;


                        DbContext.Users.Update(ApplicationUser);

                        // persist the changes into the Database.
                        DbContext.SaveChanges();

                        return new JsonResult(data, DefaultJsonSettings);
                    }else
                    {
                        return Unauthorized();
                    }
                }
                else
                    return NotFound(new { error = String.Format("Data has not been found") });  // return a HTTP Status 404 (Not Found) if we couldn't find a suitable item.
            }
            else
                return NotFound(new { error = String.Format("Invalid Data") });   // return a HTTP Status 404 (Not Found) if we couldn't find a suitable item.
        }

        // DELETE api/values/5
        [HttpDelete("DeleteApplicationUser/{id}")]
        [Authorize]
        public IActionResult Delete(Guid id)
        {
            var item = DbContext.Users.FirstOrDefault(i => i.Id == id.ToString());

            if (item != null)
            {
                var matrixStr = User.Claims.Where(x => x.Type == "UserMatrix").FirstOrDefault().Value;
                bool isAuth = AuthRoleHelper.AuthRoleGeneralFunction(EnumHelper.UserMatrixName.DeleteUser.ToString(), EnumHelper.UserMatrixAction.Allow.ToString(), matrixStr);
                if (isAuth)
                {
                    DbContext.Users.Remove(item);

                    // persist the changes into the Database.
                    DbContext.SaveChanges();

                    return Ok();
                }else
                {
                    return Unauthorized();
                }
            }
            else
                return BadRequest(new { error = String.Format("Data has not been found") });  // return a HTTP Status 404 (Not Found) if we couldn't find a suitable item.
        }
        #endregion

        #region Private Memers

        private List<ApplicationUserViewModel> ToItemViewModelList(IEnumerable<ApplicationUser> applicationUser)
        {
            //var result = applicationUser.Select(TinyMapper.Map<ApplicationUserViewModel>).ToList();   //.Map function will return error : calling convention must be VarArgs

            List<ApplicationUserViewModel> result = new List<ApplicationUserViewModel>();

            foreach (var user in applicationUser)
            {
                ApplicationUserViewModel userItem = new ApplicationUserViewModel();
                userItem.Id = (new Guid(user.Id));
                userItem.LastAccess = user.LastAccess;
                userItem.DateCreated = user.DateCreated;
                userItem.DateModified = user.DateModified;
                userItem.IsActive = user.IsActive;

                userItem.UserName = user.UserName;
                userItem.Email = user.Email;
                userItem.UserCode = user.UserCode;
                userItem.Slug = user.Slug;
                userItem.CompanyId = user.CompanyId;
                userItem.RoleId = user.RoleId;
                userItem.FirstName = user.FirstName;
                userItem.LastAccess = user.LastAccess;

                result.Add(userItem);
            }

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
