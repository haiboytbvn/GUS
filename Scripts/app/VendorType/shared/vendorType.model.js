System.register([], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var VendorType;
    return {
        setters: [],
        execute: function () {
            VendorType = (function () {
                function VendorType(Id, DateCreated, DateModified, IsActive, Name, checked) {
                    this.Id = Id;
                    this.DateCreated = DateCreated;
                    this.DateModified = DateModified;
                    this.IsActive = IsActive;
                    this.Name = Name;
                    this.checked = checked;
                }
                return VendorType;
            }());
            exports_1("VendorType", VendorType);
        }
    };
});
