System.register([], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var SizeRange;
    return {
        setters: [],
        execute: function () {
            SizeRange = (function () {
                function SizeRange(Id, IsActive, Name, Value, ValueList) {
                    this.Id = Id;
                    this.IsActive = IsActive;
                    this.Name = Name;
                    this.Value = Value;
                    this.ValueList = ValueList;
                }
                return SizeRange;
            }());
            exports_1("SizeRange", SizeRange);
        }
    };
});
