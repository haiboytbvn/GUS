System.register([], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var WashType;
    return {
        setters: [],
        execute: function () {
            WashType = (function () {
                function WashType(Id, IsActive, Name) {
                    this.Id = Id;
                    this.IsActive = IsActive;
                    this.Name = Name;
                }
                return WashType;
            }());
            exports_1("WashType", WashType);
        }
    };
});
