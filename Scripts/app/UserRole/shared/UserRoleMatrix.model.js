System.register([], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var UserRoleMatrix;
    return {
        setters: [],
        execute: function () {
            UserRoleMatrix = (function () {
                function UserRoleMatrix(Id, DateCreated, DateModified, IsActive, Name, MatrixId, 
                    //public PremissionName: string,
                    PremissionLevel, checked) {
                    this.Id = Id;
                    this.DateCreated = DateCreated;
                    this.DateModified = DateModified;
                    this.IsActive = IsActive;
                    this.Name = Name;
                    this.MatrixId = MatrixId;
                    this.PremissionLevel = PremissionLevel;
                    this.checked = checked;
                }
                return UserRoleMatrix;
            }());
            exports_1("UserRoleMatrix", UserRoleMatrix);
        }
    };
});
