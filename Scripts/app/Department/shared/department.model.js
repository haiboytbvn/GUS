System.register([], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var Department;
    return {
        setters: [],
        execute: function () {
            Department = (function () {
                function Department(Id, IsActive, Name) {
                    this.Id = Id;
                    this.IsActive = IsActive;
                    this.Name = Name;
                }
                return Department;
            }());
            exports_1("Department", Department);
        }
    };
});
