System.register([], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var WashCategory;
    return {
        setters: [],
        execute: function () {
            WashCategory = (function () {
                function WashCategory(Id, IsActive, Name, TypeId) {
                    this.Id = Id;
                    this.IsActive = IsActive;
                    this.Name = Name;
                    this.TypeId = TypeId;
                }
                return WashCategory;
            }());
            exports_1("WashCategory", WashCategory);
        }
    };
});
