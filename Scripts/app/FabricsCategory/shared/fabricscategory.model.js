System.register([], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var FabricsCategory;
    return {
        setters: [],
        execute: function () {
            FabricsCategory = (function () {
                function FabricsCategory(Id, IsActive, Name, TypeId) {
                    this.Id = Id;
                    this.IsActive = IsActive;
                    this.Name = Name;
                    this.TypeId = TypeId;
                }
                return FabricsCategory;
            }());
            exports_1("FabricsCategory", FabricsCategory);
        }
    };
});
