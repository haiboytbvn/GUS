System.register([], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var Application;
    return {
        setters: [],
        execute: function () {
            Application = (function () {
                function Application(Id, DateCreated, DateModified, IsActive, Name, checked, BuyerCode) {
                    this.Id = Id;
                    this.DateCreated = DateCreated;
                    this.DateModified = DateModified;
                    this.IsActive = IsActive;
                    this.Name = Name;
                    this.checked = checked;
                    this.BuyerCode = BuyerCode;
                }
                return Application;
            }());
            exports_1("Application", Application);
        }
    };
});
