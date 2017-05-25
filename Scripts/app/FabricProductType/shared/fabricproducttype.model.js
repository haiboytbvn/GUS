System.register([], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var FabricProductType;
    return {
        setters: [],
        execute: function () {
            FabricProductType = (function () {
                function FabricProductType(Id, IsActive, Name) {
                    this.Id = Id;
                    this.IsActive = IsActive;
                    this.Name = Name;
                }
                return FabricProductType;
            }());
            exports_1("FabricProductType", FabricProductType);
        }
    };
});
