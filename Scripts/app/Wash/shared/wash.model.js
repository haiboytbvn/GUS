System.register([], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var Wash;
    return {
        setters: [],
        execute: function () {
            Wash = (function () {
                function Wash(Id, IsActive, BuyerCode, WashCategory, WashProductName, WashType, Description, Brand, Department, Division, Color, Supplier, SupplierCode, Recipe, Remark, Image, Images, Thumbnail) {
                    this.Id = Id;
                    this.IsActive = IsActive;
                    this.BuyerCode = BuyerCode;
                    this.WashCategory = WashCategory;
                    this.WashProductName = WashProductName;
                    this.WashType = WashType;
                    this.Description = Description;
                    this.Brand = Brand;
                    this.Department = Department;
                    this.Division = Division;
                    this.Color = Color;
                    this.Supplier = Supplier;
                    this.SupplierCode = SupplierCode;
                    this.Recipe = Recipe;
                    this.Remark = Remark;
                    this.Image = Image;
                    this.Images = Images;
                    this.Thumbnail = Thumbnail;
                }
                return Wash;
            }());
            exports_1("Wash", Wash);
        }
    };
});
