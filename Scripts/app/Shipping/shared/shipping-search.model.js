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
    var searchGeneralFilter_model_1, ShippingSearchModel;
    return {
        setters: [
            function (searchGeneralFilter_model_1_1) {
                searchGeneralFilter_model_1 = searchGeneralFilter_model_1_1;
            }
        ],
        execute: function () {
            ShippingSearchModel = (function (_super) {
                __extends(ShippingSearchModel, _super);
                function ShippingSearchModel(Name, Code, BuyerCode, CompanyId) {
                    var _this = _super.call(this, Name, Code, BuyerCode, CompanyId) || this;
                    _this.Name = Name;
                    _this.Code = Code;
                    _this.BuyerCode = BuyerCode;
                    _this.CompanyId = CompanyId;
                    return _this;
                }
                return ShippingSearchModel;
            }(searchGeneralFilter_model_1.SearchGeneralFilter));
            exports_1("ShippingSearchModel", ShippingSearchModel);
        }
    };
});
