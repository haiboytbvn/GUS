System.register([], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var FabricsFinishing;
    return {
        setters: [],
        execute: function () {
            FabricsFinishing = (function () {
                function FabricsFinishing(Id, IsActive, Name) {
                    this.Id = Id;
                    this.IsActive = IsActive;
                    this.Name = Name;
                }
                return FabricsFinishing;
            }());
            exports_1("FabricsFinishing", FabricsFinishing);
        }
    };
});
