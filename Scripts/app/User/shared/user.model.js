System.register([], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var ApplicationUser;
    return {
        setters: [],
        execute: function () {
            ApplicationUser = (function () {
                function ApplicationUser(Id, LastAccess, DateCreated, DateModified, IsActive, UserName, Email, UserCode, Slug, CompanyId, RoleId, FirstName, LastName, checked) {
                    this.Id = Id;
                    this.LastAccess = LastAccess;
                    this.DateCreated = DateCreated;
                    this.DateModified = DateModified;
                    this.IsActive = IsActive;
                    this.UserName = UserName;
                    this.Email = Email;
                    this.UserCode = UserCode;
                    this.Slug = Slug;
                    this.CompanyId = CompanyId;
                    this.RoleId = RoleId;
                    this.FirstName = FirstName;
                    this.LastName = LastName;
                    this.checked = checked;
                }
                return ApplicationUser;
            }());
            exports_1("ApplicationUser", ApplicationUser);
        }
    };
});
