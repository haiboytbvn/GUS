System.register([], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var DepartmentListModel;
    return {
        setters: [],
        execute: function () {
            DepartmentListModel = (function () {
                function DepartmentListModel(Data, Paging) {
                    this.Data = Data;
                    this.Paging = Paging;
                }
                return DepartmentListModel;
            }());
            exports_1("DepartmentListModel", DepartmentListModel);
        }
    };
});
