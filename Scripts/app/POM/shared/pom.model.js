System.register([], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var POM;
    return {
        setters: [],
        execute: function () {
            POM = (function () {
                function POM(Id, IsActive, Name) {
                    this.Id = Id;
                    this.IsActive = IsActive;
                    this.Name = Name;
                }
                return POM;
            }());
            exports_1("POM", POM);
        }
    };
});
