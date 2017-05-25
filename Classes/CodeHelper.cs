using GUSLibrary.Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GUSLibrary.Classes
{
    public class CodeHelper
    {
        protected GUSLibraryDbContext DbContext;
        public CodeHelper(GUSLibraryDbContext context)
        {
            DbContext = context;
        }

        public LibCode[] GetCodeList()
        {
            var items = DbContext.Codes.OrderBy(i => i.LibType).ToArray();
            return items;
        }

        public int? GetCodebyId(Guid id)
        {
            var item = DbContext.Codes.FirstOrDefault(i => i.Id == id);

            if (item != null)
                return item.CodeNumber;
            else
                return null;
        }

        public int GetCodebyType(string libType)
        {
            var code = 0;

            // todo: start lock
            var lastItem = DbContext.Codes.FirstOrDefault(x => x.LibType == libType);
            if (lastItem != null)
            {
                code = lastItem.CodeNumber;
                lastItem.CodeNumber++;

                DbContext.Codes.Update(lastItem);
                DbContext.SaveChanges();
            }
            // todo: releae lock


            return code;
        }


        #region 
        public string GetColorCode(string libType)
        {
            string codeNumber = GetCodebyType(libType).ToString().PadLeft(6, '0');

            string code = EnumHelper.CodePreFix.CO.ToString() + codeNumber;

            return code;
        }

        public string GetAccessoryTypeCode(string libType)
        {
            string codeNumber = GetCodebyType(libType).ToString().PadLeft(6, '0');

            string code = EnumHelper.CodePreFix.AT.ToString() + codeNumber;

            return code;
        }
        public string GetAccessoryCategoryCode(string libType)
        {
            string codeNumber = GetCodebyType(libType).ToString().PadLeft(6, '0');

            string code = EnumHelper.CodePreFix.AC.ToString() + codeNumber;

            return code;
        }
        public string GetAccessoryDescCode(string libType)
        {
            string codeNumber = GetCodebyType(libType).ToString().PadLeft(6, '0');

            string code = EnumHelper.CodePreFix.AC.ToString() + codeNumber;

            return code;
        }
        public string GetTypeCode(string libType)
        {
            string codeNumber = GetCodebyType(libType).ToString().PadLeft(6, '0');

            switch (libType)
            {
                case "LibColor":
                    {
                        return EnumHelper.CodePreFix.CO.ToString() + codeNumber;
                    }

                case "LibFabric":
                    {
                        return EnumHelper.CodePreFix.FA.ToString() + codeNumber;
                    }
                case "LibAccessory":
                    {
                        return EnumHelper.CodePreFix.AS.ToString() + codeNumber;
                    }
                case "LibWash":
                    {
                        return EnumHelper.CodePreFix.WA.ToString() + codeNumber;
                    }
                case "LibSpec":
                    {
                        return EnumHelper.CodePreFix.SP.ToString() + codeNumber;
                    }
                case "LibGraphic":
                    {
                        return EnumHelper.CodePreFix.GR.ToString() + codeNumber;
                    }
                case "LibGraphicType":
                    {
                        return EnumHelper.CodePreFix.GT.ToString() + codeNumber;
                    }
                case "LibGraphicCategory":
                    {
                        return EnumHelper.CodePreFix.GC.ToString() + codeNumber;
                    }
                case "LibGraphicProductName":
                    {
                        return EnumHelper.CodePreFix.GP.ToString() + codeNumber;
                    }
                case "LibShipping":
                    {
                        return EnumHelper.CodePreFix.SH.ToString() + codeNumber;
                    }
                case "LibAccessoryCategory":
                    {
                        return EnumHelper.CodePreFix.AC.ToString() + codeNumber;
                    }
                case "LibAccessoryType":
                    {
                        return EnumHelper.CodePreFix.AT.ToString() + codeNumber;
                    }
                case "LibAccessoryProductName":
                    {
                        return EnumHelper.CodePreFix.AN.ToString() + codeNumber;
                    }
                case "LibEndBuyer":
                    {
                        return EnumHelper.CodePreFix.EB.ToString() + codeNumber;
                    }
                case "LibFabricsCategory":
                    {
                        return EnumHelper.CodePreFix.FC.ToString() + codeNumber;
                    }
                case "LibFabricsFibreContent":
                    {
                        return EnumHelper.CodePreFix.FB.ToString() + codeNumber;
                    }
                case "LibFabricsFinishing":
                    {
                        return EnumHelper.CodePreFix.FF.ToString() + codeNumber;
                    }
                case "LibFabricsYarnCount":
                    {
                        return EnumHelper.CodePreFix.FY + codeNumber;
                    }
                case "LibPOM":
                    {
                        return EnumHelper.CodePreFix.PO + codeNumber;
                    }
                case "LibProductType":
                    {
                        return EnumHelper.CodePreFix.PT + codeNumber;
                    }
                case "LibReasonForAbortingProject":
                    {
                        return EnumHelper.CodePreFix.RF + codeNumber;
                    }
                case "LibSeason":
                    {
                        return EnumHelper.CodePreFix.SE + codeNumber;
                    }
                case "LibShippingType":
                    {
                        return EnumHelper.CodePreFix.ST + codeNumber;
                    }
                case "LibSizeRange":
                    {
                        return EnumHelper.CodePreFix.SR + codeNumber;
                    }
                case "LibDepartment":
                    {
                        return EnumHelper.CodePreFix.DE + codeNumber;
                    }

                case "LibWashCategory":
                    {
                        return EnumHelper.CodePreFix.WC + codeNumber;
                    }
                case "LibWashType":
                    {
                        return EnumHelper.CodePreFix.WT + codeNumber;
                    }
                case "LibWashProductName":
                    {
                        return EnumHelper.CodePreFix.WP+ codeNumber;
                    }

                case "LibYear":
                    {
                        return EnumHelper.CodePreFix.YE + codeNumber;
                    }
                case "LibBrand":
                    {
                        return EnumHelper.CodePreFix.BR + codeNumber;
                    }
                case "LibDivision":
                    {
                        return EnumHelper.CodePreFix.DV + codeNumber;
                    }
                case "LibFabricsType":
                    {
                        return EnumHelper.CodePreFix.FT + codeNumber;
                    }
                case "LibApplication":
                    {
                        return EnumHelper.CodePreFix.AP + codeNumber;
                    }
                case "LibFabricProductType":
                    {
                        return EnumHelper.CodePreFix.FP + codeNumber;
                    }
                case "LibFabricsProductName":
                    {
                        return EnumHelper.CodePreFix.PR + codeNumber;
                    }
                case "LibFabricWeight":
                    {
                        return EnumHelper.CodePreFix.FW + codeNumber;
                    }
                default:
                {
                    return string.Empty;
                }
            }



        }

        #endregion
    }
}
