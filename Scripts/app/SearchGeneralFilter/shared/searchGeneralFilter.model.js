System.register([], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var SearchGeneralFilter;
    return {
        setters: [],
        execute: function () {
            SearchGeneralFilter = (function () {
                function SearchGeneralFilter(Name, Code, BuyerCode, CompanyId) {
                    this.Name = Name;
                    this.Code = Code;
                    this.BuyerCode = BuyerCode;
                    this.CompanyId = CompanyId;
                }
                return SearchGeneralFilter;
            }());
            exports_1("SearchGeneralFilter", SearchGeneralFilter);
        }
    };
});
