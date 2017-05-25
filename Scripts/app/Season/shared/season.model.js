System.register([], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var Season;
    return {
        setters: [],
        execute: function () {
            Season = (function () {
                function Season(Id, IsActive, Name) {
                    this.Id = Id;
                    this.IsActive = IsActive;
                    this.Name = Name;
                }
                return Season;
            }());
            exports_1("Season", Season);
        }
    };
});
