System.register([], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var VendorProductType;
    return {
        setters: [],
        execute: function () {
            VendorProductType = (function () {
                function VendorProductType(Id, DateCreated, DateModified, IsActive, Name, checked) {
                    this.Id = Id;
                    this.DateCreated = DateCreated;
                    this.DateModified = DateModified;
                    this.IsActive = IsActive;
                    this.Name = Name;
                    this.checked = checked;
                }
                return VendorProductType;
            }());
            exports_1("VendorProductType", VendorProductType);
        }
    };
});
