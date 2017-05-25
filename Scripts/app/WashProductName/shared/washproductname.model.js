System.register([], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var WashProductName;
    return {
        setters: [],
        execute: function () {
            WashProductName = (function () {
                function WashProductName(Id, IsActive, Name, CategoryId) {
                    this.Id = Id;
                    this.IsActive = IsActive;
                    this.Name = Name;
                    this.CategoryId = CategoryId;
                }
                return WashProductName;
            }());
            exports_1("WashProductName", WashProductName);
        }
    };
});
