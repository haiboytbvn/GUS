System.register([], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var SpecDetailModel;
    return {
        setters: [],
        execute: function () {
            SpecDetailModel = (function () {
                function SpecDetailModel(Spec, POMs) {
                    this.Spec = Spec;
                    this.POMs = POMs;
                }
                return SpecDetailModel;
            }());
            exports_1("SpecDetailModel", SpecDetailModel);
        }
    };
});
