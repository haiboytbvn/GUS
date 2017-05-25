System.register([], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var AccessoryProductName;
    return {
        setters: [],
        execute: function () {
            AccessoryProductName = (function () {
                function AccessoryProductName(Id, IsActive, Name, CategoryId) {
                    this.Id = Id;
                    this.IsActive = IsActive;
                    this.Name = Name;
                    this.CategoryId = CategoryId;
                }
                return AccessoryProductName;
            }());
            exports_1("AccessoryProductName", AccessoryProductName);
        }
    };
});
