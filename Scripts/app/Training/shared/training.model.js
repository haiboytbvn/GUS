System.register([], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var Training;
    return {
        setters: [],
        execute: function () {
            Training = (function () {
                function Training(Id, IsActive, Name, Age, Items) {
                    this.Id = Id;
                    this.IsActive = IsActive;
                    this.Name = Name;
                    this.Age = Age;
                    this.Items = Items;
                }
                return Training;
            }());
            exports_1("Training", Training);
        }
    };
});
