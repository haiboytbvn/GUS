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
using Microsoft.EntityFrameworkCore;
using GUSLibrary.Data.User;
using Microsoft.AspNetCore.Identity;

namespace GUSLibrary.Controllers
{
    [Route("api/[controller]")]
    public class UserRoleController : Controller
    {
        #region Private Fields
        protected GUSLibraryDbContext DbContext;
        private readonly RoleManager<UserRole> _roleManager;
        #endregion Private Fields

        #region Constructor
        public UserRoleController(GUSLibraryDbContext context, RoleManager<UserRole> roleManager)
        {
            DbContext = context;
            _roleManager = roleManager;
        }
        #endregion Constructor

        #region Attribute-based Routing

        [HttpGet("GetUserRoleList")]
        public IActionResult GetUserRoleList()
        {
            var items = DbContext.Roles.OrderBy(i => i.Name).ToArray();
            return new JsonResult(ToItemViewModelList(items), DefaultJsonSettings);
        }

        [HttpGet("GetUserRoleListNoAdmin")]
        public IActionResult GetUserRoleListNoAdmin()
        {
            var items = DbContext.Roles.Where(x => x.Name.ToLower() != "administrators").OrderBy(i => i.Name).ToArray();
            return new JsonResult(ToItemViewModelList(items), DefaultJsonSettings);
        }


        [HttpGet("GetUserRole/{id}")]
        public IActionResult GetUserRole(Guid id)
        {
            var item = DbContext.Roles.FirstOrDefault(i => i.Id == id.ToString());
            if (item != null)
            {
                //var matrixStr = User.Claims.Where(x => x.Type == "UserMatrix").FirstOrDefault().Value;
                var itemList = DbContext.UserMatrixes.Where(i => i.UserRoleId.ToString().ToLower() == item.Id.ToLower());
                if (itemList != null)
                {
                    var matrixStr = GetMatrixString2(itemList);

                    var role = new UserRoleViewModel()
                    {
                        Id = id,
                        DateCreated = item.DateCreated,
                        DateModified = item.DateModified,
                        IsActive = item.IsActive,
                        Name = item.Name,
                        PremissionLevel = matrixStr
                    };

                    //return new JsonResult(TinyMapper.Map<ApplicationUserViewModel>(item), DefaultJsonSettings);
                    return new JsonResult(role, DefaultJsonSettings);
                }
                else
                {
                    return NotFound(new { Error = $"Role matrix with role : {item.Name} has not been found" });
                }
            }
            return NotFound(new { Error = $"ID {id} has not been found" });
        }

        [HttpGet("GetUserMatrixValue/{id}")]
        public IActionResult GetUserMatrixValue(Guid roleId)
        {
            var itemList = DbContext.UserMatrixes.Where(i => i.UserRoleId == roleId);
            if (itemList != null)
            {
                string result = GetMatrixString(itemList);

                return new JsonResult(result, DefaultJsonSettings);
            }
            return NotFound(new { Error = $"Role matrix with role Id : {roleId} has not been found" });
        }



        // POST api/values
        [HttpPost("AddUserRole")]
        [Authorize]
        public IActionResult Add([FromBody]UserMatrixViewModel data)
        {
            // return a HTTP Status 404 (Not Found) if we couldn't find a suitable item.
            if (data == null)
                return NotFound(new { error = String.Format("Invalid Data") });

            // check if role name exist
            string roleName = data.Name;
            if (DbContext.Roles.Where(x => x.Name == roleName).Count() > 0)
                return BadRequest(new { error = String.Format("Role name already exist") });

            // create new role
            var role = new UserRole(roleName);
            DbContext.Roles.Add(role);
            //DbContext.SaveChanges();

            var roleId = role.Id;

            // create user matrix
            var dicUserMatrix = GetMatrixValueArr(data.PremissionLevel);

            foreach (var i in dicUserMatrix)
            {
                var userMatrix = new UserMatrix();
                userMatrix.Id = Guid.NewGuid();
                userMatrix.DateCreated = DateTime.Now;
                userMatrix.DateModified = DateTime.Now;
                userMatrix.IsActive = data.IsActive;

                userMatrix.UserRoleId = new Guid(roleId);
                userMatrix.Name = i.Key;
                userMatrix.PremissionLevel = i.Value;

                DbContext.UserMatrixes.Add(userMatrix);
            }

            DbContext.SaveChanges();

            // set new id to data object
            data.Id = new Guid(role.Id);

            return new JsonResult(data, DefaultJsonSettings);
        }

        [HttpPut("UpdateUserRole")]
        [Authorize]
        public IActionResult Update([FromBody]UserMatrixViewModel data)
        {
            var userRole = DbContext.Roles.FirstOrDefault(i => i.Id == data.Id.ToString());

            if (userRole != null)
            {
                userRole.Name = data.Name;
                userRole.IsActive = data.IsActive;

                var dicUserMatrix = GetMatrixValueArr(data.PremissionLevel);
                var userMatrixList = DbContext.UserMatrixes.Where(x => x.UserRoleId == data.Id);
                foreach (var i in userMatrixList)
                {
                    i.PremissionLevel = dicUserMatrix[i.Name];
                }


                DbContext.SaveChanges();

                return new JsonResult(data, DefaultJsonSettings);
            }
            else
            {
                return BadRequest(new { error = String.Format("Data has not been found") });
            }
        }

        [HttpDelete("DeleteUserRole/{id}")]
        [Authorize]
        public IActionResult Delete(Guid id)
        {
            var item = DbContext.Roles.FirstOrDefault(i => i.Id == id.ToString());

            if (item != null)
            {
                DbContext.Roles.Remove(item);

                var matrixList = DbContext.UserMatrixes.Where(x => x.UserRoleId == new Guid(item.Id));
                foreach (var i in matrixList)
                {
                    DbContext.UserMatrixes.Remove(i);
                }

                DbContext.SaveChanges();

                return Ok();
            }
            else
                return BadRequest(new { error = String.Format("Data has not been found") });  // return a HTTP Status 404 (Not Found) if we couldn't find a suitable item.
        }

        #endregion

        #region Private Memers

        private List<UserRoleViewModel> ToItemViewModelList(IEnumerable<UserRole> userRole)
        {
            //var result = userRole.Select(TinyMapper.Map<UserRoleViewModel>).ToList();
            var result = new List<UserRoleViewModel>();
            foreach (var i in userRole)
            {
                UserRoleViewModel role = new UserRoleViewModel();
                role.Id = new Guid(i.Id);
                role.DateCreated = i.DateCreated;
                role.DateModified = i.DateModified;
                role.IsActive = i.IsActive;
                role.Name = i.Name;

                result.Add(role);
            }

            return result;
        }

        private List<UserMatrixViewModel> ToItemViewModelList(IEnumerable<UserMatrix> userMatrix)
        {
            var result = userMatrix.Select(TinyMapper.Map<UserMatrixViewModel>).ToList();
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

        #region Helper
        private Dictionary<string, int> GetMatrixValueArr(string premissionLevel)
        {
            var str = premissionLevel;
            var result = new Dictionary<string, int>();

            // Frontend premission value
            int premission1 = Convert.ToInt32(str.Substring(0, 5), 2);
            result.Add(EnumHelper.UserMatrixName.ProjectSetup.ToString(), premission1);
            str = str.Remove(0, 5);

            int premission2 = Convert.ToInt32(str.Substring(0, 5), 2);
            result.Add(EnumHelper.UserMatrixName.Colorway.ToString(), premission2);
            str = str.Remove(0, 5);

            int premission3 = Convert.ToInt32(str.Substring(0, 5), 2);
            result.Add(EnumHelper.UserMatrixName.Fabrics.ToString(), premission3);
            str = str.Remove(0, 5);

            int premission4 = Convert.ToInt32(str.Substring(0, 5), 2);
            result.Add(EnumHelper.UserMatrixName.Accessories.ToString(), premission4);
            str = str.Remove(0, 5);

            int premission5 = Convert.ToInt32(str.Substring(0, 5), 2);
            result.Add(EnumHelper.UserMatrixName.PEW.ToString(), premission5);
            str = str.Remove(0, 5);

            int premission6 = Convert.ToInt32(str.Substring(0, 5), 2);
            result.Add(EnumHelper.UserMatrixName.GuidedSpec.ToString(), premission6);
            str = str.Remove(0, 5);

            int premission7 = Convert.ToInt32(str.Substring(0, 5), 2);
            result.Add(EnumHelper.UserMatrixName.ColorDetails.ToString(), premission7);
            str = str.Remove(0, 5);

            int premission8 = Convert.ToInt32(str.Substring(0, 5), 2);
            result.Add(EnumHelper.UserMatrixName.Techpack.ToString(), premission8);
            str = str.Remove(0, 5);

            int premission9 = Convert.ToInt32(str.Substring(0, 5), 2);
            result.Add(EnumHelper.UserMatrixName.SampleVendor.ToString(), premission9);
            str = str.Remove(0, 5);


            // Backend premission value
            int premission10 = Convert.ToInt32(str.Substring(0, 4), 2);
            result.Add(EnumHelper.UserMatrixName.GeneralLib.ToString(), premission10);
            str = str.Remove(0, 4);

            int premission11 = Convert.ToInt32(str.Substring(0, 4), 2);
            result.Add(EnumHelper.UserMatrixName.ColorLib.ToString(), premission11);
            str = str.Remove(0, 4);

            int premission12 = Convert.ToInt32(str.Substring(0, 4), 2);
            result.Add(EnumHelper.UserMatrixName.FabricLib.ToString(), premission12);
            str = str.Remove(0, 4);

            int premission13 = Convert.ToInt32(str.Substring(0, 4), 2);
            result.Add(EnumHelper.UserMatrixName.AccessoryLib.ToString(), premission13);
            str = str.Remove(0, 4);

            int premission14 = Convert.ToInt32(str.Substring(0, 4), 2);
            result.Add(EnumHelper.UserMatrixName.GraphicLib.ToString(), premission14);
            str = str.Remove(0, 4);

            int premission15 = Convert.ToInt32(str.Substring(0, 4), 2);
            result.Add(EnumHelper.UserMatrixName.WashLib.ToString(), premission15);
            str = str.Remove(0, 4);

            int premission16 = Convert.ToInt32(str.Substring(0, 4), 2);
            result.Add(EnumHelper.UserMatrixName.ShippingLib.ToString(), premission16);
            str = str.Remove(0, 4);

            int premission17 = Convert.ToInt32(str.Substring(0, 4), 2);
            result.Add(EnumHelper.UserMatrixName.SpecLib.ToString(), premission17);
            str = str.Remove(0, 4);

            int premission18 = Convert.ToInt32(str.Substring(0, 4), 2);
            result.Add(EnumHelper.UserMatrixName.TechpackLib.ToString(), premission18);
            str = str.Remove(0, 4);


            // User access premission value
            int premission19 = Convert.ToInt32(str.Substring(0, 2), 2);
            result.Add(EnumHelper.UserMatrixName.CreateUser.ToString(), premission19);
            str = str.Remove(0, 2);

            int premission20 = Convert.ToInt32(str.Substring(0, 2), 2);
            result.Add(EnumHelper.UserMatrixName.EditUser.ToString(), premission20);
            str = str.Remove(0, 2);

            int premission21 = Convert.ToInt32(str.Substring(0, 2), 2);
            result.Add(EnumHelper.UserMatrixName.DeleteUser.ToString(), premission21);
            str = str.Remove(0, 2);

            int premission22 = Convert.ToInt32(str.Substring(0, 2), 2);
            result.Add(EnumHelper.UserMatrixName.AssignUserToRole.ToString(), premission22);
            str = str.Remove(0, 2);

            int premission23 = Convert.ToInt32(str.Substring(0, 2), 2);
            result.Add(EnumHelper.UserMatrixName.VendorSupplierManagement.ToString(), premission23);

            return result;
        }
        private static string GetMatrixString(IQueryable<UserMatrix> itemList)
        {
            string result = "";

            // FrontEnd
            result += Convert.ToString(itemList.SingleOrDefault(x => x.Name == EnumHelper.UserMatrixName.ProjectSetup.ToString()).PremissionLevel, 2);
            result += Convert.ToString(itemList.SingleOrDefault(x => x.Name == EnumHelper.UserMatrixName.Colorway.ToString()).PremissionLevel, 2);
            result += Convert.ToString(itemList.SingleOrDefault(x => x.Name == EnumHelper.UserMatrixName.Fabrics.ToString()).PremissionLevel, 2);
            result += Convert.ToString(itemList.SingleOrDefault(x => x.Name == EnumHelper.UserMatrixName.Accessories.ToString()).PremissionLevel, 2);
            result += Convert.ToString(itemList.SingleOrDefault(x => x.Name == EnumHelper.UserMatrixName.PEW.ToString()).PremissionLevel, 2);
            result += Convert.ToString(itemList.SingleOrDefault(x => x.Name == EnumHelper.UserMatrixName.GuidedSpec.ToString()).PremissionLevel, 2);
            result += Convert.ToString(itemList.SingleOrDefault(x => x.Name == EnumHelper.UserMatrixName.ColorDetails.ToString()).PremissionLevel, 2);
            result += Convert.ToString(itemList.SingleOrDefault(x => x.Name == EnumHelper.UserMatrixName.Techpack.ToString()).PremissionLevel, 2);
            result += Convert.ToString(itemList.SingleOrDefault(x => x.Name == EnumHelper.UserMatrixName.SampleVendor.ToString()).PremissionLevel, 2);

            // Backend
            result += Convert.ToString(itemList.SingleOrDefault(x => x.Name == EnumHelper.UserMatrixName.GeneralLib.ToString()).PremissionLevel, 2);
            result += Convert.ToString(itemList.SingleOrDefault(x => x.Name == EnumHelper.UserMatrixName.ColorLib.ToString()).PremissionLevel, 2);
            result += Convert.ToString(itemList.SingleOrDefault(x => x.Name == EnumHelper.UserMatrixName.FabricLib.ToString()).PremissionLevel, 2);
            result += Convert.ToString(itemList.SingleOrDefault(x => x.Name == EnumHelper.UserMatrixName.AccessoryLib.ToString()).PremissionLevel, 2);
            result += Convert.ToString(itemList.SingleOrDefault(x => x.Name == EnumHelper.UserMatrixName.GraphicLib.ToString()).PremissionLevel, 2);
            result += Convert.ToString(itemList.SingleOrDefault(x => x.Name == EnumHelper.UserMatrixName.WashLib.ToString()).PremissionLevel, 2);
            result += Convert.ToString(itemList.SingleOrDefault(x => x.Name == EnumHelper.UserMatrixName.ShippingLib.ToString()).PremissionLevel, 2);
            result += Convert.ToString(itemList.SingleOrDefault(x => x.Name == EnumHelper.UserMatrixName.SpecLib.ToString()).PremissionLevel, 2);
            result += Convert.ToString(itemList.SingleOrDefault(x => x.Name == EnumHelper.UserMatrixName.TechpackLib.ToString()).PremissionLevel, 2);

            // User Access
            result += Convert.ToString(itemList.SingleOrDefault(x => x.Name == EnumHelper.UserMatrixName.CreateUser.ToString()).PremissionLevel, 2);
            result += Convert.ToString(itemList.SingleOrDefault(x => x.Name == EnumHelper.UserMatrixName.EditUser.ToString()).PremissionLevel, 2);
            result += Convert.ToString(itemList.SingleOrDefault(x => x.Name == EnumHelper.UserMatrixName.DeleteUser.ToString()).PremissionLevel, 2);
            result += Convert.ToString(itemList.SingleOrDefault(x => x.Name == EnumHelper.UserMatrixName.AssignUserToRole.ToString()).PremissionLevel, 2);
            result += Convert.ToString(itemList.SingleOrDefault(x => x.Name == EnumHelper.UserMatrixName.VendorSupplierManagement.ToString()).PremissionLevel, 2);

            return result;
        }
        private static string GetMatrixString2(IQueryable<UserMatrix> itemList)
        {
            var result = "";

            // FrontEnd
            result += GetPremissionLevel(itemList, EnumHelper.UserMatrixName.ProjectSetup.ToString(), 5) + "|";
            result += GetPremissionLevel(itemList, EnumHelper.UserMatrixName.Colorway.ToString(), 5) + "|";
            result += GetPremissionLevel(itemList, EnumHelper.UserMatrixName.Fabrics.ToString(), 5) + "|";
            result += GetPremissionLevel(itemList, EnumHelper.UserMatrixName.Accessories.ToString(), 5) + "|";
            result += GetPremissionLevel(itemList, EnumHelper.UserMatrixName.PEW.ToString(), 5) + "|";
            result += GetPremissionLevel(itemList, EnumHelper.UserMatrixName.GuidedSpec.ToString(), 5) + "|";
            result += GetPremissionLevel(itemList, EnumHelper.UserMatrixName.ColorDetails.ToString(), 5) + "|";
            result += GetPremissionLevel(itemList, EnumHelper.UserMatrixName.Techpack.ToString(), 5) + "|";
            result += GetPremissionLevel(itemList, EnumHelper.UserMatrixName.SampleVendor.ToString(), 5) + "|";

            // Backend
            result += GetPremissionLevel(itemList, EnumHelper.UserMatrixName.GeneralLib.ToString(), 4) + "|";
            result += GetPremissionLevel(itemList, EnumHelper.UserMatrixName.ColorLib.ToString(), 4) + "|";
            result += GetPremissionLevel(itemList, EnumHelper.UserMatrixName.FabricLib.ToString(), 4) + "|";
            result += GetPremissionLevel(itemList, EnumHelper.UserMatrixName.AccessoryLib.ToString(), 4) + "|";
            result += GetPremissionLevel(itemList, EnumHelper.UserMatrixName.GraphicLib.ToString(), 4) + "|";
            result += GetPremissionLevel(itemList, EnumHelper.UserMatrixName.WashLib.ToString(), 4) + "|";
            result += GetPremissionLevel(itemList, EnumHelper.UserMatrixName.ShippingLib.ToString(), 4) + "|";
            result += GetPremissionLevel(itemList, EnumHelper.UserMatrixName.SpecLib.ToString(), 4) + "|";
            result += GetPremissionLevel(itemList, EnumHelper.UserMatrixName.TechpackLib.ToString(), 4) + "|";

            // User Access
            result += GetPremissionLevel(itemList, EnumHelper.UserMatrixName.CreateUser.ToString(), 2) + "|";
            result += GetPremissionLevel(itemList, EnumHelper.UserMatrixName.EditUser.ToString(), 2) + "|";
            result += GetPremissionLevel(itemList, EnumHelper.UserMatrixName.DeleteUser.ToString(), 2) + "|";
            result += GetPremissionLevel(itemList, EnumHelper.UserMatrixName.AssignUserToRole.ToString(), 2) + "|";
            result += GetPremissionLevel(itemList, EnumHelper.UserMatrixName.VendorSupplierManagement.ToString(), 2) + "|";

            return result;
        }
        private static string GetPremissionLevel(IQueryable<UserMatrix> itemList, string matrixName, int paddingLevel)
        {
            var item = itemList.SingleOrDefault(x => x.Name.ToLower() == matrixName.ToLower());

            var preInt = item.PremissionLevel;

            return Convert.ToString(preInt, 2).PadLeft(paddingLevel, '0');
        }
        #endregion
    }
}
