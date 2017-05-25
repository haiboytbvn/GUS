System.register([], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var FabricsType;
    return {
        setters: [],
        execute: function () {
            FabricsType = (function () {
                function FabricsType(Id, IsActive, Name) {
                    this.Id = Id;
                    this.IsActive = IsActive;
                    this.Name = Name;
                }
                return FabricsType;
            }());
            exports_1("FabricsType", FabricsType);
        }
    };
});
