System.register([], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var ParentMenuItem;
    return {
        setters: [],
        execute: function () {
            ParentMenuItem = (function () {
                function ParentMenuItem(Text, Value, Items) {
                    this.Text = Text;
                    this.Value = Value;
                    this.Items = Items;
                }
                return ParentMenuItem;
            }());
            exports_1("ParentMenuItem", ParentMenuItem);
        }
    };
});
