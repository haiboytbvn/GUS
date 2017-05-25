System.register([], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var PaginationModel;
    return {
        setters: [],
        execute: function () {
            PaginationModel = (function () {
                function PaginationModel(PageSize, PageNumber, Sort, Total, PageCount, Show) {
                    this.PageSize = PageSize;
                    this.PageNumber = PageNumber;
                    this.Sort = Sort;
                    this.Total = Total;
                    this.PageCount = PageCount;
                    this.Show = Show;
                }
                return PaginationModel;
            }());
            exports_1("PaginationModel", PaginationModel);
        }
    };
});
