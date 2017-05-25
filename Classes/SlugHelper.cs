using GUSLibrary.Data;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography.X509Certificates;
using System.Text.RegularExpressions;
using System.Threading.Tasks;

namespace GUSLibrary.Classes
{

    public static class SlugHelper
    {
        public static string GetSlug(Guid? companyId, GUSLibraryDbContext dbContext, string name, string libType)
        {
            string result = "";
            string slug = GenerateSlug(name);


            switch (libType)
            {
                case "LibAccessoryCategory":
                    {
                        var slugList = dbContext.AccessoryCategories.Where(x => (companyId == Guid.Empty) || (x.CompanyId == companyId)).Select(x => x.Slug).ToList();
                        result = GetUniqueSlug(slugList, slug);
                        break;
                    };

                case "LibAccessoryDesc":
                    {
                        //todo: "dbContext.AccessoryCategories" same as : case "LibAccessoryCategory"
                        var slugList = dbContext.AccessoryCategories.Where(x => (companyId == Guid.Empty) || (x.CompanyId == companyId)).Select(x => x.Slug).ToList();
                        result = GetUniqueSlug(slugList, slug);
                        break;
                    };

                case "LibFabricsCategory":
                    {
                        //todo: "dbContext.AccessoryCategories" same as : case "LibAccessoryCategory"
                        var slugList = dbContext.AccessoryCategories.Where(x => (companyId == Guid.Empty) || (x.CompanyId == companyId)).Select(x => x.Slug).ToList();
                        result = GetUniqueSlug(slugList, slug);
                        break;
                    };

                case "LibDepartment":
                    {
                        var slugList = dbContext.Departments.Where(x => (companyId == Guid.Empty) || (x.CompanyId == companyId)).Select(x => x.Slug).ToList();
                        result = GetUniqueSlug(slugList, slug);
                        break;
                    };
             
                case "LibFabricsFibreContent":
                    {
                        var slugList = dbContext.FabricsFibreContents.Where(x => (companyId == Guid.Empty) || (x.CompanyId == companyId)).Select(x => x.Slug).ToList();
                        result = GetUniqueSlug(slugList, slug);
                        break;
                    };
                case "LibFabricsFinishing":
                    {
                        var slugList = dbContext.FabricsFinishings.Where(x => (companyId == Guid.Empty) || (x.CompanyId == companyId)).Select(x => x.Slug).ToList();
                        result = GetUniqueSlug(slugList, slug);
                        break;
                    };
                case "LibFabricsYarnCount":
                    {
                        var slugList = dbContext.FabricsYarnCounts.Where(x => (companyId == Guid.Empty) || (x.CompanyId == companyId)).Select(x => x.Slug).ToList();
                        result = GetUniqueSlug(slugList, slug);
                        break;
                    };

                case "LibPOM":
                    {
                        var slugList = dbContext.POMs.Where(x => (companyId == Guid.Empty) || (x.CompanyId == companyId)).Select(x => x.Slug).ToList();
                        result = GetUniqueSlug(slugList, slug);
                        break;
                    };
                case "LibProductType":
                    {
                        var slugList = dbContext.ProductTypes.Where(x => (companyId == Guid.Empty) || (x.CompanyId == companyId)).Select(x => x.Slug).ToList();
                        result = GetUniqueSlug(slugList, slug);
                        break;
                    };

                case "LibReasonForAbortingProject":
                    {
                        var slugList = dbContext.ReasonForAbortingProjects.Where(x => (companyId == Guid.Empty) || (x.CompanyId == companyId)).Select(x => x.Slug).ToList();
                        result = GetUniqueSlug(slugList, slug);
                        break;
                    };

                case "LibSeason":
                    {
                        var slugList = dbContext.Seasons.Where(x => (companyId == Guid.Empty) || (x.CompanyId == companyId)).Select(x => x.Slug).ToList();
                        result = GetUniqueSlug(slugList, slug);
                        break;
                    };
                case "LibShippingType":
                    {
                        var slugList = dbContext.ShippingTypes.Where(x => (companyId == Guid.Empty) || (x.CompanyId == companyId)).Select(x => x.Slug).ToList();
                        result = GetUniqueSlug(slugList, slug);
                        break;
                    };
                case "LibShipping":
                    {
                        var slugList = dbContext.Shippings.Where(x => (companyId == Guid.Empty) || (x.CompanyId == companyId)).Select(x => x.Slug).ToList();
                        result = GetUniqueSlug(slugList, slug);
                        break;
                    };
                case "LibLibSizeRangeSeason":
                    {
                        var slugList = dbContext.SizeRanges.Where(x => (companyId == Guid.Empty) || (x.CompanyId == companyId)).Select(x => x.Slug).ToList();
                        result = GetUniqueSlug(slugList, slug);
                        break;
                    };

                case "LibWashCategory":
                    {
                        var slugList = dbContext.WashCategories.Where(x => (companyId == Guid.Empty) || (x.CompanyId == companyId)).Select(x => x.Slug).ToList();
                        result = GetUniqueSlug(slugList, slug);
                        break;
                    };
          
                case "LibWashType":
                    {
                        var slugList = dbContext.WashTypes.Where(x => (companyId == Guid.Empty) || (x.CompanyId == companyId)).Select(x => x.Slug).ToList();
                        result = GetUniqueSlug(slugList, slug);
                        break;
                    };
                case "LibYear":
                    {
                        var slugList = dbContext.Years.Where(x => (companyId == Guid.Empty) || (x.CompanyId == companyId)).Select(x => x.Slug).ToList();
                        result = GetUniqueSlug(slugList, slug);
                        break;
                    };
                case "LibEndBuyer":
                    {
                        var slugList = dbContext.EndBuyers.Where(x => (companyId == Guid.Empty) || (x.CompanyId == companyId)).Select(x => x.Slug).ToList();
                        result = GetUniqueSlug(slugList, slug);
                        break;
                    };
                case "LibColor":
                    {
                        var slugList = dbContext.Colors.Where(x => (companyId == Guid.Empty) || (x.CompanyId == companyId)).Select(x => x.Slug).ToList();
                        result = GetUniqueSlug(slugList, slug);
                        break;
                    };

                case "LibDivision":
                    {
                        var slugList = dbContext.Divisions.Where(x => (companyId == Guid.Empty) || (x.CompanyId == companyId)).Select(x => x.Slug).ToList();
                        result = GetUniqueSlug(slugList, slug);
                        break;
                    };
                case "LibBrand":
                    {
                        var slugList = dbContext.Brands.Where(x => (companyId == Guid.Empty) || (x.CompanyId == companyId)).Select(x => x.Slug).ToList();
                        result = GetUniqueSlug(slugList, slug);
                        break;
                    };
                case "LibWash":
                    {
                        var slugList = dbContext.Washes.Where(x => (companyId == Guid.Empty) || (x.CompanyId == companyId)).Select(x => x.Slug).ToList();
                        result = GetUniqueSlug(slugList, slug);
                        break;
                    };
                case "LibAccessoryType":
                    {
                        var slugList = dbContext.AccessoryTypes.Where(x => (companyId == Guid.Empty) || (x.CompanyId == companyId)).Select(x => x.Slug).ToList();
                        result = GetUniqueSlug(slugList, slug);
                        break;
                    };
                case "LibFabricsType":
                    {
                        var slugList = dbContext.FabricsTypes.Where(x => (companyId == Guid.Empty) || (x.CompanyId == companyId)).Select(x => x.Slug).ToList();
                        result = GetUniqueSlug(slugList, slug);
                        break;
                    };
                case "LibFabric":
                    {
                        var slugList = dbContext.Fabrics.Where(x => (companyId == Guid.Empty) || (x.CompanyId == companyId)).Select(x => x.Slug).ToList();
                        result = GetUniqueSlug(slugList, slug);
                        break;
                    };

                case "LibGraphic":
                    {
                        var slugList = dbContext.Graphics.Where(x => (companyId == Guid.Empty) || (x.CompanyId == companyId)).Select(x => x.Slug).ToList();
                        result = GetUniqueSlug(slugList, slug);
                        break;
                    };
                case "LibGraphicType":
                    {
                        var slugList = dbContext.GraphicTypes.Where(x => (companyId == Guid.Empty) || (x.CompanyId == companyId)).Select(x => x.Slug).ToList();
                        result = GetUniqueSlug(slugList, slug);
                        break;
                    };
                case "LibGraphicCategory":
                    {
                        var slugList = dbContext.GraphicCategories.Where(x => (companyId == Guid.Empty) || (x.CompanyId == companyId)).Select(x => x.Slug).ToList();
                        result = GetUniqueSlug(slugList, slug);
                        break;
                    };
                case "LibGraphicProductName":
                    {
                        var slugList = dbContext.GraphicProductNames.Where(x => (companyId == Guid.Empty) || (x.CompanyId == companyId)).Select(x => x.Slug).ToList();
                        result = GetUniqueSlug(slugList, slug);
                        break;
                    };

                case "LibSizeRange":
                    {
                        var slugList = dbContext.SizeRanges.Where(x => (companyId == Guid.Empty) || (x.CompanyId == companyId)).Select(x => x.Slug).ToList();
                        result = GetUniqueSlug(slugList, slug);
                        break;
                    };

                case "LibApplication":
                    {
                        var slugList = dbContext.Applications.Where(x => (companyId == Guid.Empty) || (x.CompanyId == companyId)).Select(x => x.Slug).ToList();
                        result = GetUniqueSlug(slugList, slug);
                        break;
                    };
                case "LibAccessory":
                    {
                        var slugList = dbContext.Accessories.Where(x => (companyId == Guid.Empty) || (x.CompanyId == companyId)).Select(x => x.Slug).ToList();
                        result = GetUniqueSlug(slugList, slug);
                        break;
                    };
                case "LibFabricProductType":
                    {
                        var slugList = dbContext.FabricProductTypes.Where(x => (companyId == Guid.Empty) || (x.CompanyId == companyId)).Select(x => x.Slug).ToList();
                        result = GetUniqueSlug(slugList, slug);
                        break;
                    };
                case "LibFabricsProductName":
                    {
                        var slugList = dbContext.FabricsProductNames.Where(x => (companyId == Guid.Empty) || (x.CompanyId == companyId)).Select(x => x.Slug).ToList();
                        result = GetUniqueSlug(slugList, slug);
                        break;
                    };
                case "LibAccessoryProductName":
                    {
                        var slugList = dbContext.AccessoryProductNames.Where(x => (companyId == Guid.Empty) || (x.CompanyId == companyId)).Select(x => x.Slug).ToList();
                        result = GetUniqueSlug(slugList, slug);
                        break;
                    };
                case "LibWashProductName":
                    {
                        var slugList = dbContext.WashProductNames.Where(x => (companyId == Guid.Empty) || (x.CompanyId == companyId)).Select(x => x.Slug).ToList();
                        result = GetUniqueSlug(slugList, slug);
                        break;
                    };
                case "LibFabricWeight":
                    {
                        var slugList = dbContext.FabricWeights.Where(x => (companyId == Guid.Empty) || (x.CompanyId == companyId)).Select(x => x.Slug).ToList();
                        result = GetUniqueSlug(slugList, slug);
                        break;
                    };

                // todo: you can add more from here...

                default:
                    {
                        result = "";
                    };
                    break;
            }

            return result;
        }

        private static string GetUniqueSlug(List<string> slugList, string slug)
        {
            if (!slugList.Contains(slug))
            {
                return slug;
            }

            var count = 1;
          
            while (slugList.Contains(slug + "_" + count.ToString().PadLeft(6, '0')))
            {
                count++;
            }
            return slug + "_" +count.ToString().PadLeft(6, '0');

        }


        public static string GenerateSlug(string inputStr)
        {
            string phrase = string.Format("{0}", inputStr);
            string str = RemoveAccent(phrase).ToLower();

            // invalid chars
            str = Regex.Replace(str, @"[^a-z0-9\s-]", "");
            // convert multiple spaces into one space
            str = Regex.Replace(str, @"\s+", " ").Trim();
            // cut and trim
            str = str.Substring(0, str.Length <= 45 ? str.Length : 45).Trim();
            str = Regex.Replace(str, @"\s", "-");   // hyphens
            return str;
        }
        private static string RemoveAccent(string text)
        {
            byte[] bytes = System.Text.Encoding.GetEncoding("Cyrillic").GetBytes(text);
            return System.Text.Encoding.ASCII.GetString(bytes);
        }
    }
}
