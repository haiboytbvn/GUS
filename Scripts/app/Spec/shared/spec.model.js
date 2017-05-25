System.register([], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var Spec;
    return {
        setters: [],
        execute: function () {
            Spec = (function () {
                function Spec(Id, DateCreated, DateModified, IsActive, CompanyId, Name, Code, Slug, BuyerCode, SizeRange, GuidedSpecSize, checked) {
                    this.Id = Id;
                    this.DateCreated = DateCreated;
                    this.DateModified = DateModified;
                    this.IsActive = IsActive;
                    this.CompanyId = CompanyId;
                    this.Name = Name;
                    this.Code = Code;
                    this.Slug = Slug;
                    this.BuyerCode = BuyerCode;
                    this.SizeRange = SizeRange;
                    this.GuidedSpecSize = GuidedSpecSize;
                    this.checked = checked;
                }
                return Spec;
            }());
            exports_1("Spec", Spec);
        }
    };
});
