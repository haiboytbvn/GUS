System.register([], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var AccessoryCategory;
    return {
        setters: [],
        execute: function () {
            AccessoryCategory = (function () {
                function AccessoryCategory(Id, IsActive, Name, TypeId) {
                    this.Id = Id;
                    this.IsActive = IsActive;
                    this.Name = Name;
                    this.TypeId = TypeId;
                }
                return AccessoryCategory;
            }());
            exports_1("AccessoryCategory", AccessoryCategory);
        }
    };
});
