System.register([], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var GraphicProductName;
    return {
        setters: [],
        execute: function () {
            GraphicProductName = (function () {
                function GraphicProductName(Id, IsActive, Name, CategoryId) {
                    this.Id = Id;
                    this.IsActive = IsActive;
                    this.Name = Name;
                    this.CategoryId = CategoryId;
                }
                return GraphicProductName;
            }());
            exports_1("GraphicProductName", GraphicProductName);
        }
    };
});
