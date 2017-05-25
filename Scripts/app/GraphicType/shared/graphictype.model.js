System.register([], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var GraphicType;
    return {
        setters: [],
        execute: function () {
            GraphicType = (function () {
                function GraphicType(Id, IsActive, Name) {
                    this.Id = Id;
                    this.IsActive = IsActive;
                    this.Name = Name;
                }
                return GraphicType;
            }());
            exports_1("GraphicType", GraphicType);
        }
    };
});
