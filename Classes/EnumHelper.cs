using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GUSLibrary.Classes
{
    public static class EnumHelper
    {
        #region Enum in Code Table (LibCode)
        public enum LibType
        {
            LibColor,
            LibFabric,
            LibAccessory,
            LibWash,
            LibSpec,
            LibGraphic,
            LibGraphicType,
            LibGraphicCategory,
            LibGraphicProductName,
            LibShipping,
            LibAccessoryType,
            LibAccessoryCategory,
            LibAccessoryProductName,
            LibDepartment,
            LibEndBuyer,
            LibFabricsCategory,
            LibFabricsFibreContent,
            LibFabricsFinishing,
            LibFabricsYarnCount,
            LibPOM,
            LibProductType,
            LibReasonForAbortingProject,
            LibSeason,
            LibShippingType,
            LibSizeRange,
            LibWashCategory,
            LibWashProductName,
            LibWashType,
            LibYear,
            LibBrand,
            LibDivision,
            LibFabricsType,
            LibApplication,
            LibFabricProductType,
            LibFabProductName,
            LibFabricsProductName,
            LibFabricWeight,
            //LibTraining,
            //LibTrainingItem,
            //LibTrainingAndTrainingItem
        };
        
        public enum CodePreFix
        {
            CO,
            FA,
            AS,
            WA,
            SP,
            GR,
            GT,
            GC,
            GP,
            SH,

            AT,
            AC,
            AN,
            DE,
            EB,
            FC,
            FB,
            FF,
            FY,
            PO,
            PT,
            RF,
            SE,
            ST,
            SR,
            WC,
            WP,
            WT,
            YE,
            BR,
            DV,
            FT,
            AP,
            FP,
            PR,
            FR,
            FW
            
        }

        public enum GraphicType
        {
            Print, Embroidery, Sketches
        } 
        public enum UserMatrixName
        {
            // Frontend
            ProjectSetup,
            Colorway,
            Fabrics,
            Accessories,
            PEW,
            GuidedSpec,
            ColorDetails,
            Techpack,
            SampleVendor,

            // Backend
            GeneralLib,
            ColorLib,
            FabricLib,
            AccessoryLib,
            GraphicLib,
            WashLib,
            ShippingLib,
            SpecLib,
            TechpackLib,

            // User access value
            CreateUser,
            EditUser,
            DeleteUser,
            AssignUserToRole,
            VendorSupplierManagement
        }

        public enum UserMatrixAction
        {
            //View,
            //Create,
            //Update,
            //Delete,
            //Chat

            View,
            Allow,
            Deny,
            Approve,
            Chat

        }
        #endregion
    }
}
