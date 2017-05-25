System.register([], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var GraphicCategory;
    return {
        setters: [],
        execute: function () {
            GraphicCategory = (function () {
                function GraphicCategory(Id, IsActive, Name, TypeId) {
                    this.Id = Id;
                    this.IsActive = IsActive;
                    this.Name = Name;
                    this.TypeId = TypeId;
                }
                return GraphicCategory;
            }());
            exports_1("GraphicCategory", GraphicCategory);
        }
    };
});
