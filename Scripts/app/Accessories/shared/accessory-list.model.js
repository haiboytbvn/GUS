System.register([], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var AccessoryListModel;
    return {
        setters: [],
        execute: function () {
            AccessoryListModel = (function () {
                function AccessoryListModel(Data, Paging) {
                    this.Data = Data;
                    this.Paging = Paging;
                }
                return AccessoryListModel;
            }());
            exports_1("AccessoryListModel", AccessoryListModel);
        }
    };
});
