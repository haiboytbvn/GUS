System.register([], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var AccessoryType;
    return {
        setters: [],
        execute: function () {
            AccessoryType = (function () {
                function AccessoryType(Id, IsActive, Name) {
                    this.Id = Id;
                    this.IsActive = IsActive;
                    this.Name = Name;
                }
                return AccessoryType;
            }());
            exports_1("AccessoryType", AccessoryType);
        }
    };
});
