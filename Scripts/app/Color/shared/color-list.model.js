System.register([], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var ColorListModel;
    return {
        setters: [],
        execute: function () {
            ColorListModel = (function () {
                function ColorListModel(Data, Paging) {
                    this.Data = Data;
                    this.Paging = Paging;
                }
                return ColorListModel;
            }());
            exports_1("ColorListModel", ColorListModel);
        }
    };
});
