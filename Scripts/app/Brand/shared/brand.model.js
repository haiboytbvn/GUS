System.register([], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var Brand;
    return {
        setters: [],
        execute: function () {
            Brand = (function () {
                function Brand(Id, IsActive, Name) {
                    this.Id = Id;
                    this.IsActive = IsActive;
                    this.Name = Name;
                }
                return Brand;
            }());
            exports_1("Brand", Brand);
        }
    };
});
