System.register([], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var POMofSpecModel;
    return {
        setters: [],
        execute: function () {
            POMofSpecModel = (function () {
                function POMofSpecModel(Id, SpecId, POMId, Name, Code, TOL, GuidSpec, GradeSpec) {
                    this.Id = Id;
                    this.SpecId = SpecId;
                    this.POMId = POMId;
                    this.Name = Name;
                    this.Code = Code;
                    this.TOL = TOL;
                    this.GuidSpec = GuidSpec;
                    this.GradeSpec = GradeSpec;
                }
                return POMofSpecModel;
            }());
            exports_1("POMofSpecModel", POMofSpecModel);
        }
    };
});
