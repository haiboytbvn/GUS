System.register(["@angular/core", "../shared/shipping.service", "@angular/router", "../../auth.service", "../../Shipping/shared/shipping-search.model"], function (exports_1, context_1) {
    "use strict";
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var __moduleName = context_1 && context_1.id;
    var core_1, shipping_service_1, router_1, auth_service_1, shipping_search_model_1, ShippingListComponent;
    return {
        setters: [
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (shipping_service_1_1) {
                shipping_service_1 = shipping_service_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (auth_service_1_1) {
                auth_service_1 = auth_service_1_1;
            },
            function (shipping_search_model_1_1) {
                shipping_search_model_1 = shipping_search_model_1_1;
            }
        ],
        execute: function () {
            ShippingListComponent = (function () {
                function ShippingListComponent(shippingService, authService, router) {
                    this.shippingService = shippingService;
                    this.authService = authService;
                    this.router = router;
                    this.toggle = false;
                    this.isDelete = false;
                    this.isLoading = false;
                }
                ShippingListComponent.prototype.ngOnInit = function () {
                    var _this = this;
                    if (!this.authService.isLoggedIn()) {
                        this.router.navigate([""]);
                    }
                    this.title = "Shipping List";
                    this.searchModel = new shipping_search_model_1.ShippingSearchModel("", "", "", "");
                    this.shippingService.getShippingList(this.searchModel).subscribe(function (items) { return _this.shippings = items; }, function (error) { return _this.errorMessage = error; });
                };
                ShippingListComponent.prototype.ngAfterViewInit = function () {
                    jQuery(this.actionDiv.nativeElement).hide();
                    jQuery(this.errorDiv.nativeElement).hide();
                };
                ShippingListComponent.prototype.onSelect = function (data) {
                    this.selectedData = data;
                    this.router.navigate(["shipping/edit", this.selectedData.Id]);
                };
                ShippingListComponent.prototype.addNewShipping = function () {
                    this.router.navigate(["shipping/add"]);
                };
                ShippingListComponent.prototype.onDelete = function (data) {
                    var _this = this;
                    this.isDelete = false;
                    this.isLoading = true;
                    this.shippings.filter(function (data) { return data.checked; }).forEach(function (selectedData) {
                        return _this.shippingService.delete(selectedData.Id).subscribe(function (data) {
                            if (data.error == null) {
                                _this.errorMessage = 'deleted selected data(s) successfully';
                                setTimeout(function () {
                                    _this.isLoading = false,
                                        jQuery(_this.actionDiv.nativeElement).hide(1000),
                                        _this.shippingService.getShippingList(_this.searchModel).subscribe(function (items) { return _this.shippings = items; }, function (error) { return _this.errorMessage = error; });
                                }, 2000);
                            }
                        });
                    });
                };
                ShippingListComponent.prototype.showActionDiv = function (status) {
                    var boxWidth = jQuery(this.actionDiv.nativeElement).width();
                    if (status)
                        jQuery(this.actionDiv.nativeElement).show({ direction: "left" }, 1000);
                    else
                        jQuery(this.actionDiv.nativeElement).hide(1000);
                };
                ShippingListComponent.prototype.deleteConfirm = function () {
                    this.isDelete = true;
                };
                ShippingListComponent.prototype.close = function () {
                    this.isDelete = false;
                };
                ShippingListComponent.prototype.toggleItem = function (data) {
                    data.checked = !data.checked;
                    this.toggle = this.shippings.every(function (data) { return data.checked; });
                    this.showActionDiv(this.shippings.filter(function (data) { return data.checked; }).length > 0);
                };
                ShippingListComponent.prototype.toggleAll = function () {
                    var _this = this;
                    this.toggle = !this.toggle;
                    this.shippings.forEach(function (data) { return data.checked = _this.toggle; });
                    this.showActionDiv(this.shippings.filter(function (data) { return data.checked; }).length > 0);
                };
                ShippingListComponent.prototype.displayMessage = function (message, status) {
                    jQuery(this.errorDiv.nativeElement).removeClass();
                    this.errorDiv.nativeElement.innerHTML = message;
                    if (status) {
                        jQuery(this.errorDiv.nativeElement).addClass("success-message");
                    }
                    else {
                        jQuery(this.errorDiv.nativeElement).addClass("error-message");
                    }
                    jQuery(this.errorDiv.nativeElement).slideDown(1000).delay(6000).slideUp(1000);
                };
                ShippingListComponent.prototype.doSearch = function (searchmodel) {
                    var _this = this;
                    this.shippingService.getShippingList(searchmodel).subscribe(function (items) { return _this.shippings = items; }, function (error) { return _this.errorMessage = error; });
                };
                return ShippingListComponent;
            }());
            __decorate([
                core_1.ViewChild('actionDiv'),
                __metadata("design:type", core_1.ElementRef)
            ], ShippingListComponent.prototype, "actionDiv", void 0);
            __decorate([
                core_1.ViewChild('errorDiv'),
                __metadata("design:type", core_1.ElementRef)
            ], ShippingListComponent.prototype, "errorDiv", void 0);
            ShippingListComponent = __decorate([
                core_1.Component({
                    selector: 'shipping',
                    template: "<div class=\"error-message\" #errorDiv></div>\n<div class=\"user-container\">\n   <h1 class=\"homeHeader\">{{title}}</h1>\n <div class=\"form-inline mt-50\">\n    <div class=\"form-group\">\n      <label class=\"sr-only\" for=\"name\">Name:</label>\n       <input type=\"text\" [(ngModel)]=\"searchModel.Name\" class=\"form-control\" placeholder=\"Enter name\">\n    </div>\n    <div class=\"form-group\">\n      <label class=\"sr-only\" for=\"name\">Code:</label>\n      <input type=\"text\" [(ngModel)]=\"searchModel.Code\" class=\"form-control\" placeholder=\"Enter code\">\n    </div>\n    <div class=\"checkbox\">\n     <label class=\"sr-only\" for=\"name\">Buyer code:</label>\n      <input type=\"text\" [(ngModel)]=\"searchModel.BuyerCode\" class=\"form-control\" placeholder=\"Enter buyer code\">\n    </div>\n    <input type=\"button\" class=\"btn\" value=\"Search\" (click)=\"doSearch(searchModel)\" />\n  </div>\n  <div class=\"col-right-s3 form-group\">\n    <input type=\"button\" class=\"btn btn-primary btn-block\" value=\"Add\" (click)=\"addNewShipping()\" />\n  </div>\n  <div class=\"clearDiv\">\n  </div>\n  <div #actionDiv class=\"col-half-one-third leftPane\">\n     <div class=\"leftPaneContent form-group\">\n        <h2>Bulk Actions</h2>\n        <button class=\"btn btn-danger btn-block\"  (click)=\"deleteConfirm()\" [disabled]=\"isLoading\">                    \n         <div [class.cssload-container]=\"isLoading\">\n           <div [class.cssload-zenith]=\"isLoading\"></div>\n         </div>\n         <div [class.cssload-text]=\"isLoading\">Delete</div>\n        </button>\n                         \n        <div class=\"dialog\" *ngIf=\"isDelete\">\n          <h3>Are you sure to delete checked items ?</h3>\n            <input type=\"button\" class=\"btn btn-danger btn-block\"  value=\"Yes\" (click)=\"onDelete()\" />   <br/>          \n            <input type=\"button\" class=\"btn btn-primary btn-block\"  value=\"No\" (click)=\"close()\" />             \n       </div>\n       <div *ngIf=\"isDelete\" class=\"overlay\" (click)=\"Close()\"></div>\n\n     </div>\n  </div>\n  <div class=\"col-half-two-third\">\n    <table class=\"table table-hover\">\n      <thead>\n        <tr>\n          <th>Select All<br/><input type=\"checkbox\" [checked]=\"toggle\" (change)=\"toggleAll()\" /></th>\n            <th>Shipping Name</th>         \n           <th>Buyer Code</th>\n           <th>Brand</th>\n           <th>Division</th>\n           <th>Department</th>\n           <th>Type</th>\n           <th>End Buyer</th>\n          <th>Reg Name</th>         \n          <th>Search Name</th>         \n          <th>Address</th>         \n          <th>Image</th>                 \n       </tr>\n     </thead>\n     <tbody>\n       <tr *ngFor=\"let shipping of shippings\" [class.selected]=\"shipping === selectedData\">        \n        <td><input type=\"checkbox\" #chkSelect value=\"{{shipping.Id}}\" [checked]=\"shipping.checked\" (change)=\"toggleItem(shipping)\" /></td>\n         <td><a href=\"/shipping/edit/{{shipping.Id}}\">{{shipping.Name}}</a></td>              \n         <td>{{shipping.BuyerCode}}</td>        \n         <td>{{shipping.Brand}}</td>        \n         <td>{{shipping.Division}}</td>        \n         <td>{{shipping.Department}}</td>        \n         <td>{{shipping.ShippingType}}</td>        \n         <td>{{shipping.EndBuyer}}</td>\n         <td>{{shipping.RegName}}</td>\n         <td>{{shipping.SearchName}}</td>\n         <td>{{shipping.Address}}</td>\n         <td> <img src=\"{{shipping.Image}}\" alt=\"{{shipping.Name}}\" height=\"42\" width=\"42\"></td>\n      </tr>\n     </tbody>\n    </table>\n  </div>\n  <div class=\"clearDiv\">\n  </div>\n</div>\n",
                    providers: [shipping_service_1.ShippingService]
                }),
                __metadata("design:paramtypes", [shipping_service_1.ShippingService, auth_service_1.AuthService, router_1.Router])
            ], ShippingListComponent);
            exports_1("ShippingListComponent", ShippingListComponent);
        }
    };
});
