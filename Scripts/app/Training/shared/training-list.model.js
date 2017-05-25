System.register([], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var TrainingListModel;
    return {
        setters: [],
        execute: function () {
            TrainingListModel = (function () {
                function TrainingListModel(Data, Paging) {
                    this.Data = Data;
                    this.Paging = Paging;
                }
                return TrainingListModel;
            }());
            exports_1("TrainingListModel", TrainingListModel);
        }
    };
});
