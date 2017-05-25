System.register([], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var AncestorMenuItem;
    return {
        setters: [],
        execute: function () {
            AncestorMenuItem = (function () {
                function AncestorMenuItem(Text, Value, Items) {
                    this.Text = Text;
                    this.Value = Value;
                    this.Items = Items;
                }
                return AncestorMenuItem;
            }());
            exports_1("AncestorMenuItem", AncestorMenuItem);
        }
    };
});
