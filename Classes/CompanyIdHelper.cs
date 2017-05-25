using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

namespace GUSLibrary.Classes
{
    public static class CompanyIdHelper
    {
        public static Guid GetCompanyId(Guid companyId)
        {
           // var abc = ClaimTypes.Actor;

            Guid id = new Guid("11111111-1111-1111-1111-111111111111");

            // check the user is admin or normal user with some company id
            // use different way to check if the user is admin or not

            // todo: get company id form JWTprovider or server side api

            return id;
        }
    }
}
