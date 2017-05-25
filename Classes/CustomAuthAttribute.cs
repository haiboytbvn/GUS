using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Identity;
using GUSLibrary.Data;
using GUSLibrary.Data.User;

namespace GUSLibrary.Classes
{
    public static class AuthRoleHelper
    {
        private static GUSLibraryDbContext DbContext;

        internal static bool AuthRoleGeneralFunction(string matrixName, string matrixAct, string matrixStr)
        {
            bool result = false;

            var matrixDict = GetUserMatrixDictionary(matrixStr);
            string matrixBinaryNum = matrixDict[matrixName];

            result = AnalysisMatrixNum(matrixBinaryNum, matrixAct);

            return result;
        }

        //public static bool AuthRoleGeneralFunction(string requestFrom, string currentUserIdStr, UserManager<ApplicationUser> _userManager, GUSLibraryDbContext DbContext)
        //{
        //    bool result = false;

        //    // Get roles from current login user
        //    var currentUser = _userManager.Users.Where(x => x.Id == currentUserIdStr).SingleOrDefault();    //get current login user object
        //    var roles = _userManager.GetRolesAsync(currentUser).Result; // get current login user's roles name collection

        //    var userMatrixList = new List<UserRole>();
        //    foreach (var roleName in roles)
        //    {
        //        var item = DbContext.Roles.FirstOrDefault(i => i.Name == roleName);
        //        userMatrixList.Add(item);
        //    }

        //    //var topAuthLevelRole = userMatrixList.OrderByDescending(x => x.UserManagementLevel).FirstOrDefault();
        //    //var authLevelInt = topAuthLevelRole.UserManagementLevel;

        //    //switch (requestFrom)
        //    //{
        //    //    case "AddUser":
        //    //        {
        //    //            var topAuthLevelRole = userMatrixList.OrderByDescending(x => x.UserManagementLevel).FirstOrDefault();
        //    //            var authLevelInt = topAuthLevelRole.UserManagementLevel;

        //    //            result = AnalysisPremission(requestFrom, authLevelInt, result);
        //    //        };
        //    //        break;
        //    //    default:
        //    //        {
        //    //            result = false;

        //    //        };
        //    //        break;
        //    //}


        //    return result;
        //}

        private static Dictionary<string, string> GetUserMatrixDictionary(string matrixStr)
        {
            Dictionary<string, string> userMatrixDict = new Dictionary<string, string>();
            string[] matrixArr = matrixStr.Split('|');

            // Frontend
            userMatrixDict.Add(EnumHelper.UserMatrixName.ProjectSetup.ToString(), matrixArr[0]);
            userMatrixDict.Add(EnumHelper.UserMatrixName.Colorway.ToString(), matrixArr[1]);
            userMatrixDict.Add(EnumHelper.UserMatrixName.Fabrics.ToString(), matrixArr[2]);
            userMatrixDict.Add(EnumHelper.UserMatrixName.Accessories.ToString(), matrixArr[3]);
            userMatrixDict.Add(EnumHelper.UserMatrixName.PEW.ToString(), matrixArr[4]);
            userMatrixDict.Add(EnumHelper.UserMatrixName.GuidedSpec.ToString(), matrixArr[5]);
            userMatrixDict.Add(EnumHelper.UserMatrixName.ColorDetails.ToString(), matrixArr[6]);
            userMatrixDict.Add(EnumHelper.UserMatrixName.Techpack.ToString(), matrixArr[7]);
            userMatrixDict.Add(EnumHelper.UserMatrixName.SampleVendor.ToString(), matrixArr[8]);

            // Backend
            userMatrixDict.Add(EnumHelper.UserMatrixName.GeneralLib.ToString(), matrixArr[9]);
            userMatrixDict.Add(EnumHelper.UserMatrixName.ColorLib.ToString(), matrixArr[10]);
            userMatrixDict.Add(EnumHelper.UserMatrixName.FabricLib.ToString(), matrixArr[11]);
            userMatrixDict.Add(EnumHelper.UserMatrixName.AccessoryLib.ToString(), matrixArr[12]);
            userMatrixDict.Add(EnumHelper.UserMatrixName.GraphicLib.ToString(), matrixArr[13]);
            userMatrixDict.Add(EnumHelper.UserMatrixName.WashLib.ToString(), matrixArr[14]);
            userMatrixDict.Add(EnumHelper.UserMatrixName.ShippingLib.ToString(), matrixArr[15]);
            userMatrixDict.Add(EnumHelper.UserMatrixName.SpecLib.ToString(), matrixArr[16]);
            userMatrixDict.Add(EnumHelper.UserMatrixName.TechpackLib.ToString(), matrixArr[17]);

            // User management
            userMatrixDict.Add(EnumHelper.UserMatrixName.CreateUser.ToString(), matrixArr[18]);
            userMatrixDict.Add(EnumHelper.UserMatrixName.EditUser.ToString(), matrixArr[19]);
            userMatrixDict.Add(EnumHelper.UserMatrixName.DeleteUser.ToString(), matrixArr[20]);
            userMatrixDict.Add(EnumHelper.UserMatrixName.AssignUserToRole.ToString(), matrixArr[21]);
            userMatrixDict.Add(EnumHelper.UserMatrixName.VendorSupplierManagement.ToString(), matrixArr[22]);

            return userMatrixDict;
        }

        private static bool AnalysisMatrixNum(string matrixBinaryNum, string matrixAct)
        {
            var result = false;

            /*
             * from left to right
             * View, Allow, Deny, Approve, Chat
             */
            string[] matrixActArr = new string[] {
                EnumHelper.UserMatrixAction.View.ToString(),
                EnumHelper.UserMatrixAction.Allow.ToString(),
                EnumHelper.UserMatrixAction.Deny.ToString(),
                EnumHelper.UserMatrixAction.Approve.ToString(),
                EnumHelper.UserMatrixAction.Chat.ToString()
            };

            int actionIndex = Array.IndexOf(matrixActArr, matrixAct);
            string matrixNum = matrixBinaryNum[actionIndex].ToString();

            result = false ? matrixNum == "0" : matrixNum == "1";

            return result;
        }

        #region Helper
        public static string GetRoleMatrixStr(string roleId)
        {
            var itemList = DbContext.UserMatrixes.Where(i => i.UserRoleId.ToString().ToLower() == roleId.ToLower());
            if (itemList != null)
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
            else
                return string.Empty;
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
