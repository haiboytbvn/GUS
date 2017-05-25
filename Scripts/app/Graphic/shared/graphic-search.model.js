System.register(["../../SearchGeneralFilter/shared/searchGeneralFilter.model"], function (exports_1, context_1) {
    "use strict";
    var __extends = (this && this.__extends) || (function () {
        var extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return function (d, b) {
            extendStatics(d, b);
            function __() { this.constructor = d; }
            d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
        };
    })();
    var __moduleName = context_1 && context_1.id;
    var searchGeneralFilter_model_1, GraphicSearchModel;
    return {
        setters: [
            function (searchGeneralFilter_model_1_1) {
                searchGeneralFilter_model_1 = searchGeneralFilter_model_1_1;
            }
        ],
        execute: function () {
            GraphicSearchModel = (function (_super) {
                __extends(GraphicSearchModel, _super);
                function GraphicSearchModel(Name, Code, BuyerCode, CompanyId, Paging, TypeId, CateId, ProductNameId) {
                    var _this = _super.call(this, Name, Code, BuyerCode, CompanyId) || this;
                    _this.Name = Name;
                    _this.Code = Code;
                    _this.BuyerCode = BuyerCode;
                    _this.CompanyId = CompanyId;
                    _this.Paging = Paging;
                    _this.TypeId = TypeId;
                    _this.CateId = CateId;
                    _this.ProductNameId = ProductNameId;
                    return _this;
                }
                return GraphicSearchModel;
            }(searchGeneralFilter_model_1.SearchGeneralFilter));
            exports_1("GraphicSearchModel", GraphicSearchModel);
        }
    };
});
