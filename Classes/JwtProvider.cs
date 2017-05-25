using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using Microsoft.IdentityModel.Tokens;
using Microsoft.AspNetCore.Identity;
using GUSLibrary.Data;
using System.Text;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using Newtonsoft.Json;
using GUSLibrary.Data.User;

namespace GUSLibrary.Classes
{
    public class JwtProvider
    {
        #region private members
        private readonly RequestDelegate _next;

        // JWT-related members
        private TimeSpan TokenExpiration;
        private SigningCredentials SigningCredentials;

        // EF and Identity members, available through DI
        private GUSLibraryDbContext DbContext;
        private UserManager<ApplicationUser> UserManager;
        private SignInManager<ApplicationUser> SignInManager;
        #endregion Private Members

        #region Static Members
        private static readonly string PrivateKey = "private_key_1234567890";
        public static readonly SymmetricSecurityKey SecurityKey = new SymmetricSecurityKey(Encoding.ASCII.GetBytes(PrivateKey));
        public static readonly string Issuer = "GUSLibraryApplication";
        public static string TokenEndPoint = "/api/connect/token";
        private static double tokenExpiration = 30.0;   // Update from 10.0
        #endregion Static Members

        #region Constructor
        public JwtProvider(RequestDelegate next, GUSLibraryDbContext dbContext, UserManager<ApplicationUser> userManager, SignInManager<ApplicationUser> signInManager)
        {
            _next = next;

            // Instantiate JWT-related members
            TokenExpiration = TimeSpan.FromMinutes(tokenExpiration);
            SigningCredentials = new SigningCredentials(SecurityKey, SecurityAlgorithms.HmacSha256);

            // Instantiate through Dependency Injection
            DbContext = dbContext;
            UserManager = userManager;
            SignInManager = signInManager;
        }
        #endregion Constructor

        #region public methods
        public Task Invoke(HttpContext httpContext)
        {
            // Check if the request path matches our TokenEndPoint
            if (!httpContext.Request.Path.Equals(TokenEndPoint, StringComparison.Ordinal))
                return _next(httpContext);

            // Check if the current request is a valid POST with the appropriate content type (application / x - www - form - urlencoded)
            if (httpContext.Request.Method.Equals("POST") && httpContext.Request.HasFormContentType)
            {
                // OK: generate token and send it via a json-formatted string
                return CreateToken(httpContext);
            }
            else
            {
                // Not OK: output a 400 - Bad request HTTP error.
                httpContext.Response.StatusCode = 400;
                return httpContext.Response.WriteAsync("Bad request.");
            }
        }
        #endregion public methods

        #region Private Methods
        private async Task CreateToken(HttpContext httpContext)
        {
            try
            {
                // retrieve the relevant FORM data
                string username = httpContext.Request.Form["username"];
                string password = httpContext.Request.Form["password"];

                // check if there's an user with the given username
                var user = await UserManager.FindByNameAsync(username);

                // fallback to support e-mail address instead of username
                if (user == null && username.Contains("@"))
                    user = await UserManager.FindByEmailAsync(username);

                var success = user != null && await UserManager.CheckPasswordAsync(user, password);
                if (success)
                {
                    DateTime now = DateTime.UtcNow;

                    var roleName = (await UserManager.GetRolesAsync(user)).SingleOrDefault();
                    var roleId = DbContext.Roles.FirstOrDefault(i => i.Name == roleName).Id;
                    var userMatrixValue = GetRoleMatrixStr(roleId);
                    // add the registered claims for JWT (RFC7519).
                    // For more info, see https:
                    //tools.ietf.org/html/rfc7519#section-4.1
                    var claims = new[] {
                        new Claim(JwtRegisteredClaimNames.Iss, Issuer),
                        new Claim(JwtRegisteredClaimNames.Sub, user.Id),
                        new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                        new Claim(JwtRegisteredClaimNames.Iat, new DateTimeOffset(now).ToUnixTimeSeconds().ToString(), ClaimValueTypes.Integer64),
                        new Claim("UserMatrix", userMatrixValue)
                        // TODO: add additional claims here
                    };
                    // Create the JWT and write it to a string
                    var token = new JwtSecurityToken(
                    claims: claims,
                    notBefore: now,
                    expires: now.Add(TokenExpiration),
                    signingCredentials: SigningCredentials);
                    var encodedToken = new JwtSecurityTokenHandler().WriteToken(token);

                    // build the json response
                    var jwt = new
                    {
                        access_token = encodedToken,
                        expiration = (int)TokenExpiration.TotalSeconds
                    };

                    // return token
                    httpContext.Response.ContentType = "application/json";
                    await httpContext.Response.WriteAsync(JsonConvert.SerializeObject(jwt));
                    return;
                }
            }
            catch (Exception ex)
            {
                // TODO: handle errors
                throw ex;
            }
            httpContext.Response.StatusCode = 400;
            await httpContext.Response.WriteAsync("Invalid username or password.");
        }
        #endregion Private Methods

        #region Helper
        private string GetRoleMatrixStr(string roleId)
        {
            var itemList = DbContext.UserMatrixes.Where(i => i.UserRoleId.ToString().ToLower() == roleId.ToLower());
            if (itemList != null)
            {
                var result = "";

                // FrontEnd
                result += GetPremissionLevel(itemList, EnumHelper.UserMatrixName.ProjectSetup.ToString(),5) + "|";
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
        private string GetPremissionLevel(IQueryable<UserMatrix> itemList, string matrixName, int paddingLevel)
        {
            var item = itemList.SingleOrDefault(x => x.Name.ToLower() == matrixName.ToLower());

            var preInt = item.PremissionLevel;

            return Convert.ToString(preInt, 2).PadLeft(paddingLevel, '0');
        }
        #endregion
    }

    #region Extension Methods
    // Extension method used to add the middleware to the HTTP request pipeline.
    public static class JwtProviderExtensions
    {
        public static IApplicationBuilder UseJwtProvider(this IApplicationBuilder builder)
        {
            return builder.UseMiddleware<JwtProvider>();
        }
    }
    #endregion Extension Methods
}
