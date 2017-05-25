System.register([], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var SeasonListModel;
    return {
        setters: [],
        execute: function () {
            SeasonListModel = (function () {
                function SeasonListModel(Data, Paging) {
                    this.Data = Data;
                    this.Paging = Paging;
                }
                return SeasonListModel;
            }());
            exports_1("SeasonListModel", SeasonListModel);
        }
    };
});
