System.register([], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var FabricListModel;
    return {
        setters: [],
        execute: function () {
            FabricListModel = (function () {
                function FabricListModel(Data, Paging) {
                    this.Data = Data;
                    this.Paging = Paging;
                }
                return FabricListModel;
            }());
            exports_1("FabricListModel", FabricListModel);
        }
    };
});
