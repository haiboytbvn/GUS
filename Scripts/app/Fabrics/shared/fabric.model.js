System.register([], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var Fabrics;
    return {
        setters: [],
        execute: function () {
            Fabrics = (function () {
                function Fabrics(Id, IsActive, Code, BuyerCode, FabCategory, Image, FabYarnCount, FabFibreContent, FabFinishing, FabricWeight, Supplier, SupplierCode, FabType, Brand, Department, Division, Remark, Color, FabProductType, FabProductName, Description, Images, Thumbnail) {
                    this.Id = Id;
                    this.IsActive = IsActive;
                    this.Code = Code;
                    this.BuyerCode = BuyerCode;
                    this.FabCategory = FabCategory;
                    this.Image = Image;
                    this.FabYarnCount = FabYarnCount;
                    this.FabFibreContent = FabFibreContent;
                    this.FabFinishing = FabFinishing;
                    this.FabricWeight = FabricWeight;
                    this.Supplier = Supplier;
                    this.SupplierCode = SupplierCode;
                    this.FabType = FabType;
                    this.Brand = Brand;
                    this.Department = Department;
                    this.Division = Division;
                    this.Remark = Remark;
                    this.Color = Color;
                    this.FabProductType = FabProductType;
                    this.FabProductName = FabProductName;
                    this.Description = Description;
                    this.Images = Images;
                    this.Thumbnail = Thumbnail;
                }
                return Fabrics;
            }());
            exports_1("Fabrics", Fabrics);
        }
    };
});
