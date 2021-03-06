System.register(["@angular/core", "../shared/Vendor.service", "@angular/router", "../../auth.service"], function (exports_1, context_1) {
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
    var core_1, Vendor_service_1, router_1, auth_service_1, VendorListComponent;
    return {
        setters: [
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (Vendor_service_1_1) {
                Vendor_service_1 = Vendor_service_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (auth_service_1_1) {
                auth_service_1 = auth_service_1_1;
            }
        ],
        execute: function () {
            VendorListComponent = (function () {
                function VendorListComponent(vendorService, authService, router) {
                    this.vendorService = vendorService;
                    this.authService = authService;
                    this.router = router;
                    this.title = "Vendor List";
                    this.toggle = false;
                    this.isDelete = false;
                    this.isLoading = false;
                }
                VendorListComponent.prototype.ngOnInit = function () {
                    var _this = this;
                    if (!this.authService.isLoggedIn()) {
                        this.router.navigate([""]);
                    }
                    this.vendorService.getVendorList().subscribe(function (items) { return _this.Vendors = items; }, function (error) { return _this.errorMessage = error; });
                };
                VendorListComponent.prototype.ngAfterViewInit = function () {
                    jQuery(this.actionDiv.nativeElement).hide();
                    jQuery(this.errorDiv.nativeElement).hide();
                };
                VendorListComponent.prototype.onSelect = function (data) {
                    this.selectedData = data;
                    this.router.navigate(["vendorList/edit", this.selectedData.Id]);
                };
                VendorListComponent.prototype.addNewCategory = function () {
                    this.router.navigate(["vendorlist/add"]);
                };
                VendorListComponent.prototype.onDelete = function (data) {
                    var _this = this;
                    this.isDelete = false;
                    this.isLoading = true;
                    this.Vendors.filter(function (data) { return data.checked; }).forEach(function (selectedData) {
                        return _this.vendorService.delete(selectedData.Id).subscribe(function (data) {
                            if (data.error == null) {
                                _this.errorMessage = 'deleted selected data(s) successfully';
                                setTimeout(function () {
                                    _this.isLoading = false,
                                        jQuery(_this.actionDiv.nativeElement).hide(1000),
                                        _this.vendorService.getVendorList().subscribe(function (items) { return _this.Vendors = items; }, function (error) { return _this.errorMessage = error; });
                                }, 2000);
                            }
                        });
                    });
                };
                VendorListComponent.prototype.showActionDiv = function (status) {
                    var boxWidth = jQuery(this.actionDiv.nativeElement).width();
                    if (status)
                        jQuery(this.actionDiv.nativeElement).show({ direction: "left" }, 1000);
                    else
                        jQuery(this.actionDiv.nativeElement).hide(1000);
                };
                VendorListComponent.prototype.deleteConfirm = function () {
                    this.isDelete = true;
                };
                VendorListComponent.prototype.close = function () {
                    this.isDelete = false;
                };
                VendorListComponent.prototype.toggleItem = function (data) {
                    data.checked = !data.checked;
                    this.toggle = this.Vendors.every(function (data) { return data.checked; });
                    this.showActionDiv(this.Vendors.filter(function (data) { return data.checked; }).length > 0);
                };
                VendorListComponent.prototype.toggleAll = function () {
                    var _this = this;
                    this.toggle = !this.toggle;
                    this.Vendors.forEach(function (data) { return data.checked = _this.toggle; });
                    this.showActionDiv(this.Vendors.filter(function (data) { return data.checked; }).length > 0);
                };
                VendorListComponent.prototype.displayMessage = function (message, status) {
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
                return VendorListComponent;
            }());
            __decorate([
                core_1.ViewChild('actionDiv'),
                __metadata("design:type", core_1.ElementRef)
            ], VendorListComponent.prototype, "actionDiv", void 0);
            __decorate([
                core_1.ViewChild('errorDiv'),
                __metadata("design:type", core_1.ElementRef)
            ], VendorListComponent.prototype, "errorDiv", void 0);
            VendorListComponent = __decorate([
                core_1.Component({
                    selector: 'Vendor',
                    template: "\n    <div class=\"error-message\" #errorDiv></div>\n    <div class=\"user-container\">\n        <h1 class=\"homeHeader\">{{title}}</h1>\n        <div class=\"col-right-s3 form-group\">\n            <input type=\"button\" class=\"btn btn-primary btn-block\" value=\"Add\" (click)=\"addNewCategory()\" />\n        </div>\n        <div class=\"clearDiv\">\n        </div>\n        <div #actionDiv class=\"col-half-one-third leftPane\">\n            <div class=\"leftPaneContent form-group\">\n                <h2>Bulk Actions</h2>\n                <button class=\"btn btn-danger btn-block\" (click)=\"deleteConfirm()\" [disabled]=\"isLoading\">\n                    <div [class.cssload-container]=\"isLoading\">\n                        <div [class.cssload-zenith]=\"isLoading\"></div>\n                    </div>\n                    <div [class.cssload-text]=\"isLoading\">Delete</div>\n                </button>\n\n                <div class=\"dialog\" *ngIf=\"isDelete\">\n                    <h3>Are you sure to delete checked items ?</h3>\n                    <input type=\"button\" class=\"btn btn-danger btn-block\" value=\"Yes\" (click)=\"onDelete()\" />   <br />\n                    <input type=\"button\" class=\"btn btn-primary btn-block\" value=\"No\" (click)=\"close()\" />\n                </div>\n                <div *ngIf=\"isDelete\" class=\"overlay\" (click)=\"Close()\"></div>\n            </div>\n        </div>\n        <div class=\"col-half-two-third\">\n            <table class=\"table table-hover\">\n                <thead>\n                    <tr>\n                        <th>Select All<br /><input type=\"checkbox\" [checked]=\"toggle\" (change)=\"toggleAll()\" /></th>\n                        <th>Name</th>\n\n                        <th>Email</th>\n                        <th>SearchName</th>\n                        <th>Address</th>\n                        <th>PostalCode</th>\n                        <th>City</th>\n                        <th>Country</th>\n                        <th>Tel</th>\n                        <th>Fax</th>\n                        <th>Homepage</th>\n                        <th>PaymentTerm</th>\n                        <th>DeliveryTerm</th>\n\n                        <th>Is Active</th>\n                    </tr>\n                </thead>\n                <tbody>\n                    <tr *ngFor=\"let Vendor of Vendors\" [class.selected]=\"Vendor === selectedData\">\n                        <td><input type=\"checkbox\" #chkSelect value=\"{{Vendor.Id}}\" [checked]=\"Vendor.checked\" (change)=\"toggleItem(Vendor)\" /></td>\n                        <td><a href=\"Vendorlist/edit/{{Vendor.Id}}\">{{Vendor.UserName}}</a></td>\n\n                        <td>{{Vendor.Email}}</td>\n                        <td>{{Vendor.SearchName}}</td>\n                        <td>{{Vendor.Address}}</td>\n                        <td>{{Vendor.PostalCode}}</td>\n                        <td>{{Vendor.City}}</td>\n                        <td>{{Vendor.Country}}</td>\n                        <td>{{Vendor.Tel}}</td>\n                        <td>{{Vendor.Fax}}</td>\n                        <td>{{Vendor.Homepage}}</td>\n                        <td>{{Vendor.PaymentTerm}}</td>\n                        <td>{{Vendor.DeliveryTerm}}</td>\n\n                        <td>{{Vendor.IsActive}}</td>\n                    </tr>\n                </tbody>\n            </table>\n        </div>\n        <div class=\"clearDiv\">\n        </div>\n    </div>\n",
                    providers: [Vendor_service_1.VendorService]
                }),
                __metadata("design:paramtypes", [Vendor_service_1.VendorService, auth_service_1.AuthService, router_1.Router])
            ], VendorListComponent);
            exports_1("VendorListComponent", VendorListComponent);
        }
    };
});
