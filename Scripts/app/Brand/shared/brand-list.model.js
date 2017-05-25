System.register([], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var BrandListModel;
    return {
        setters: [],
        execute: function () {
            BrandListModel = (function () {
                function BrandListModel(Data, Paging) {
                    this.Data = Data;
                    this.Paging = Paging;
                }
                return BrandListModel;
            }());
            exports_1("BrandListModel", BrandListModel);
        }
    };
});
