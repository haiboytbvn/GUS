System.register([], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var Graphic;
    return {
        setters: [],
        execute: function () {
            Graphic = (function () {
                function Graphic(Id, IsActive, BuyerCode, Brand, Department, Division, Image, GraphicProductName, GraphicType, GraphicCategory, Description, ItemSize, Supplier, SupplierCode, Remark, Color, Images, Thumbnail) {
                    this.Id = Id;
                    this.IsActive = IsActive;
                    this.BuyerCode = BuyerCode;
                    this.Brand = Brand;
                    this.Department = Department;
                    this.Division = Division;
                    this.Image = Image;
                    this.GraphicProductName = GraphicProductName;
                    this.GraphicType = GraphicType;
                    this.GraphicCategory = GraphicCategory;
                    this.Description = Description;
                    this.ItemSize = ItemSize;
                    this.Supplier = Supplier;
                    this.SupplierCode = SupplierCode;
                    this.Remark = Remark;
                    this.Color = Color;
                    this.Images = Images;
                    this.Thumbnail = Thumbnail;
                }
                return Graphic;
            }());
            exports_1("Graphic", Graphic);
        }
    };
});
