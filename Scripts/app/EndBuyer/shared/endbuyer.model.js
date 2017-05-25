System.register([], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var EndBuyer;
    return {
        setters: [],
        execute: function () {
            EndBuyer = (function () {
                function EndBuyer(Id, IsActive, Name) {
                    this.Id = Id;
                    this.IsActive = IsActive;
                    this.Name = Name;
                }
                return EndBuyer;
            }());
            exports_1("EndBuyer", EndBuyer);
        }
    };
});
