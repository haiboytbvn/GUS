System.register([], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var GraphicListModel;
    return {
        setters: [],
        execute: function () {
            GraphicListModel = (function () {
                function GraphicListModel(Data, Paging) {
                    this.Data = Data;
                    this.Paging = Paging;
                }
                return GraphicListModel;
            }());
            exports_1("GraphicListModel", GraphicListModel);
        }
    };
});
