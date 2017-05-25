System.register([], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var FabricsProductName;
    return {
        setters: [],
        execute: function () {
            FabricsProductName = (function () {
                function FabricsProductName(Id, IsActive, Name, CategoryId) {
                    this.Id = Id;
                    this.IsActive = IsActive;
                    this.Name = Name;
                    this.CategoryId = CategoryId;
                }
                return FabricsProductName;
            }());
            exports_1("FabricsProductName", FabricsProductName);
        }
    };
});
