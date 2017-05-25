System.register([], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var Accessory;
    return {
        setters: [],
        execute: function () {
            Accessory = (function () {
                function Accessory(Id, IsActive, BuyerCode, AccType, AccCategory, Description, Brand, Department, Division, ItemSize, Supplier, SupplierCode, Image, Color, Remark, AccProductName, Images, Thumbnail) {
                    this.Id = Id;
                    this.IsActive = IsActive;
                    this.BuyerCode = BuyerCode;
                    this.AccType = AccType;
                    this.AccCategory = AccCategory;
                    this.Description = Description;
                    this.Brand = Brand;
                    this.Department = Department;
                    this.Division = Division;
                    this.ItemSize = ItemSize;
                    this.Supplier = Supplier;
                    this.SupplierCode = SupplierCode;
                    this.Image = Image;
                    this.Color = Color;
                    this.Remark = Remark;
                    this.AccProductName = AccProductName;
                    this.Images = Images;
                    this.Thumbnail = Thumbnail;
                }
                return Accessory;
            }());
            exports_1("Accessory", Accessory);
        }
    };
});
