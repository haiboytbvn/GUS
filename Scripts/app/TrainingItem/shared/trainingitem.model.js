System.register([], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var TrainingItem;
    return {
        setters: [],
        execute: function () {
            TrainingItem = (function () {
                function TrainingItem(Id, IsActive, Value, DateCreated, DateModified) {
                    this.Id = Id;
                    this.IsActive = IsActive;
                    this.Value = Value;
                    this.DateCreated = DateCreated;
                    this.DateModified = DateModified;
                }
                return TrainingItem;
            }());
            exports_1("TrainingItem", TrainingItem);
        }
    };
});
