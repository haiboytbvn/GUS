System.register([], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var WashListModel;
    return {
        setters: [],
        execute: function () {
            WashListModel = (function () {
                function WashListModel(Data, Paging) {
                    this.Data = Data;
                    this.Paging = Paging;
                }
                return WashListModel;
            }());
            exports_1("WashListModel", WashListModel);
        }
    };
});
