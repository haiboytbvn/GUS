System.register([], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var Division;
    return {
        setters: [],
        execute: function () {
            Division = (function () {
                function Division(Id, IsActive, Name) {
                    this.Id = Id;
                    this.IsActive = IsActive;
                    this.Name = Name;
                }
                return Division;
            }());
            exports_1("Division", Division);
        }
    };
});
