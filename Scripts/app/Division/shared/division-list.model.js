System.register([], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var DivisionListModel;
    return {
        setters: [],
        execute: function () {
            DivisionListModel = (function () {
                function DivisionListModel(Data, Paging) {
                    this.Data = Data;
                    this.Paging = Paging;
                }
                return DivisionListModel;
            }());
            exports_1("DivisionListModel", DivisionListModel);
        }
    };
});
