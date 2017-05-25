System.register([], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var FabricsYarnCount;
    return {
        setters: [],
        execute: function () {
            FabricsYarnCount = (function () {
                function FabricsYarnCount(Id, IsActive, Name) {
                    this.Id = Id;
                    this.IsActive = IsActive;
                    this.Name = Name;
                }
                return FabricsYarnCount;
            }());
            exports_1("FabricsYarnCount", FabricsYarnCount);
        }
    };
});
