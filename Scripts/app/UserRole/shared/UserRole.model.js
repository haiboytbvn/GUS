System.register([], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var UserRole;
    return {
        setters: [],
        execute: function () {
            UserRole = (function () {
                function UserRole(Id, DateCreated, DateModified, IsActive, Name, checked) {
                    this.Id = Id;
                    this.DateCreated = DateCreated;
                    this.DateModified = DateModified;
                    this.IsActive = IsActive;
                    this.Name = Name;
                    this.checked = checked;
                }
                return UserRole;
            }());
            exports_1("UserRole", UserRole);
        }
    };
});
