System.register([], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var YearListModel;
    return {
        setters: [],
        execute: function () {
            YearListModel = (function () {
                function YearListModel(Data, Paging) {
                    this.Data = Data;
                    this.Paging = Paging;
                }
                return YearListModel;
            }());
            exports_1("YearListModel", YearListModel);
        }
    };
});
