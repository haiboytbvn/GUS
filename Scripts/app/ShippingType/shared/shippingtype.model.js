System.register([], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var ShippingType;
    return {
        setters: [],
        execute: function () {
            ShippingType = (function () {
                function ShippingType(Id, IsActive, Name) {
                    this.Id = Id;
                    this.IsActive = IsActive;
                    this.Name = Name;
                }
                return ShippingType;
            }());
            exports_1("ShippingType", ShippingType);
        }
    };
});
