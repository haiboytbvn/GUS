System.register([], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var POMListModel;
    return {
        setters: [],
        execute: function () {
            POMListModel = (function () {
                function POMListModel(Data, Paging) {
                    this.Data = Data;
                    this.Paging = Paging;
                }
                return POMListModel;
            }());
            exports_1("POMListModel", POMListModel);
        }
    };
});
