System.register([], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var TrainingItemListModel;
    return {
        setters: [],
        execute: function () {
            TrainingItemListModel = (function () {
                function TrainingItemListModel(Data, Paging) {
                    this.Data = Data;
                    this.Paging = Paging;
                }
                return TrainingItemListModel;
            }());
            exports_1("TrainingItemListModel", TrainingItemListModel);
        }
    };
});
