System.register([], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var Year;
    return {
        setters: [],
        execute: function () {
            Year = (function () {
                function Year(Id, IsActive, Name) {
                    this.Id = Id;
                    this.IsActive = IsActive;
                    this.Name = Name;
                }
                return Year;
            }());
            exports_1("Year", Year);
        }
    };
});
