System.register([], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var Color;
    return {
        setters: [],
        execute: function () {
            Color = (function () {
                function Color(Id, IsActive, Code, BuyerCode, Name, Brand, Department, Division, Image, Remark) {
                    this.Id = Id;
                    this.IsActive = IsActive;
                    this.Code = Code;
                    this.BuyerCode = BuyerCode;
                    this.Name = Name;
                    this.Brand = Brand;
                    this.Department = Department;
                    this.Division = Division;
                    this.Image = Image;
                    this.Remark = Remark;
                }
                return Color;
            }());
            exports_1("Color", Color);
        }
    };
});
