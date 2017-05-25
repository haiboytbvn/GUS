System.register([], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var FabricWeight;
    return {
        setters: [],
        execute: function () {
            FabricWeight = (function () {
                function FabricWeight(Id, IsActive, Name) {
                    this.Id = Id;
                    this.IsActive = IsActive;
                    this.Name = Name;
                }
                return FabricWeight;
            }());
            exports_1("FabricWeight", FabricWeight);
        }
    };
});
