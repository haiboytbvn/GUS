System.register([], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var MenuItem;
    return {
        setters: [],
        execute: function () {
            MenuItem = (function () {
                function MenuItem(Text, Value) {
                    this.Text = Text;
                    this.Value = Value;
                }
                return MenuItem;
            }());
            exports_1("MenuItem", MenuItem);
        }
    };
});
