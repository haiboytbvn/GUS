System.register(["@angular/core", "@angular/forms", "@angular/router", "../shared/Vendor.service", "../shared/Vendor.model", "../../VendorType/shared/vendorType.service", "../../VendorProductType/shared/VendorProductType.service", "../../auth.service"], function (exports_1, context_1) {
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
    var core_1, forms_1, router_1, Vendor_service_1, Vendor_model_1, vendorType_service_1, VendorProductType_service_1, auth_service_1, VendorAddComponent;
    return {
        setters: [
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (forms_1_1) {
                forms_1 = forms_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (Vendor_service_1_1) {
                Vendor_service_1 = Vendor_service_1_1;
            },
            function (Vendor_model_1_1) {
                Vendor_model_1 = Vendor_model_1_1;
            },
            function (vendorType_service_1_1) {
                vendorType_service_1 = vendorType_service_1_1;
            },
            function (VendorProductType_service_1_1) {
                VendorProductType_service_1 = VendorProductType_service_1_1;
            },
            function (auth_service_1_1) {
                auth_service_1 = auth_service_1_1;
            }
        ],
        execute: function () {
            VendorAddComponent = (function () {
                function VendorAddComponent(fb, vendorService, vendorTypeService, vendorProductTypeService, router, authService, activatedRoute) {
                    this.fb = fb;
                    this.vendorService = vendorService;
                    this.vendorTypeService = vendorTypeService;
                    this.vendorProductTypeService = vendorProductTypeService;
                    this.router = router;
                    this.authService = authService;
                    this.activatedRoute = activatedRoute;
                    this.errorMessage = null;
                }
                VendorAddComponent.prototype.ngOnInit = function () {
                    var _this = this;
                    if (!this.authService.isLoggedIn()) {
                        this.router.navigate([""]);
                    }
                    this.VendorForm = this.fb.group({
                        username: ["", [
                                forms_1.Validators.required
                            ]],
                        email: ["", [
                                forms_1.Validators.required
                            ]],
                        searchName: ["", [
                                forms_1.Validators.required
                            ]],
                        address: ["", [
                                forms_1.Validators.required
                            ]],
                        postalCode: ["", [
                                forms_1.Validators.required
                            ]],
                        city: ["", [
                                forms_1.Validators.required
                            ]],
                        country: ["", [
                                forms_1.Validators.required
                            ]],
                        tel: ["", [
                                forms_1.Validators.required
                            ]],
                        fax: ["", [
                                forms_1.Validators.required
                            ]],
                        homepage: ["", [
                                forms_1.Validators.required
                            ]],
                        paymentTerm: ["", [
                                forms_1.Validators.required
                            ]],
                        deliveryTerm: ["", [
                                forms_1.Validators.required
                            ]],
                        type: ["", [
                                forms_1.Validators.required
                            ]],
                        productType: ["", [
                                forms_1.Validators.required
                            ]],
                        isactive: [true]
                    });
                    this.vendorTypeService.getVendorTypeList().subscribe(function (items) { return _this.types = items; }, function (error) { return _this.errorMessage = error; });
                    this.vendorProductTypeService.getVendorProductTypeList().subscribe(function (items) { return _this.productTypes = items; }, function (error) { return _this.errorMessage = error; });
                    this.data = new Vendor_model_1.Vendor("", null, null, null, false, "", "", "", "", "", "", "", "", "", "", "", "", "", "", false);
                    this.title = "New Vendor";
                };
                VendorAddComponent.prototype.ngAfterViewInit = function () {
                    jQuery(this.errorDiv.nativeElement).hide();
                };
                VendorAddComponent.prototype.ngOnDestroy = function () {
                    this.vendorService.data = this.data;
                };
                VendorAddComponent.prototype.onSubmit = function (data) {
                    var _this = this;
                    console.log(data);
                    var vendor = new Vendor_model_1.Vendor("", null, null, null, data.isactive, data.username, data.email, data.searchName, data.address, data.postalCode, data.city, data.country, data.tel, data.fax, data.homepage, data.paymentTerm, data.deliveryTerm, data.type, data.productType, false);
                    console.log(vendor);
                    this.vendorService.add(vendor).subscribe(function (data) {
                        if (data.error == null) {
                            _this.data = data;
                            _this.errorMessage = 'Vendor added successfully';
                            _this.displayMessage(_this.errorMessage, true);
                        }
                        else {
                            // update failure
                            _this.errorMessage = data.error;
                            _this.displayMessage(_this.errorMessage, false);
                        }
                    }, function (error) {
                        _this.errorMessage = error;
                        _this.displayMessage(_this.errorMessage, false);
                    });
                };
                VendorAddComponent.prototype.onBack = function () {
                    this.router.navigate(["vendorlist"]);
                };
                VendorAddComponent.prototype.displayMessage = function (message, status) {
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
                return VendorAddComponent;
            }());
            __decorate([
                core_1.ViewChild('errorDiv'),
                __metadata("design:type", core_1.ElementRef)
            ], VendorAddComponent.prototype, "errorDiv", void 0);
            VendorAddComponent = __decorate([
                core_1.Component({
                    selector: "Vendor-add",
                    template: "\n    <div class=\"error-message\" #errorDiv></div>\n    <div *ngIf=\"data\">\n        <h2>\n            <a href=\"javascript:void(0)\" (click)=\"onBack()\">\n                &laquo; Back to Vendor List\n            </a>\n        </h2>\n        <div class=\"user-container\">\n            <form class=\"form-user\" [formGroup]=\"VendorForm\">\n                <h2 class=\"form-user-heading\">{{title}}</h2>\n\n                <div class=\"form-group\">\n                    <input formControlName=\"username\" type=\"text\" class=\"form-control\" placeholder=\"Enter name\" value=\"this.data.UserName\" autofocus />\n                    <span class=\"validator-label valid\" *ngIf=\"this.VendorForm.controls.username.valid\">\n                        <span class=\"glyphicon glyphicon-ok\" aria-hidden=\"true\"></span>\n                        valid!\n                    </span>\n                    <span class=\"validator-label invalid\" *ngIf=\"!this.VendorForm.controls.username.valid && !this.VendorForm.controls.username.pristine\">\n                        <span class=\"glyphicon glyphicon-remove\" aria-hidden=\"true\"></span>\n                        invalid\n                    </span>\n                </div>\n\n\n                <div class=\"form-group\">\n                    <input formControlName=\"email\" type=\"text\" class=\"form-control\" placeholder=\"Enter email\" value=\"this.data.Email\" autofocus />\n                    <span class=\"validator-label valid\" *ngIf=\"this.VendorForm.controls.email.valid\">\n                        <span class=\"glyphicon glyphicon-ok\" aria-hidden=\"true\"></span>\n                        valid!\n                    </span>\n                    <span class=\"validator-label invalid\" *ngIf=\"!this.VendorForm.controls.email.valid && !this.VendorForm.controls.email.pristine\">\n                        <span class=\"glyphicon glyphicon-remove\" aria-hidden=\"true\"></span>\n                        invalid\n                    </span>\n                </div>\n                <div class=\"form-group\">\n                    <input formControlName=\"searchName\" type=\"text\" class=\"form-control\" placeholder=\"Enter search name\" value=\"this.data.SearchName\" autofocus />\n                    <span class=\"validator-label valid\" *ngIf=\"this.VendorForm.controls.searchName.valid\">\n                        <span class=\"glyphicon glyphicon-ok\" aria-hidden=\"true\"></span>\n                        valid!\n                    </span>\n                    <span class=\"validator-label invalid\" *ngIf=\"!this.VendorForm.controls.searchName.valid && !this.VendorForm.controls.searchName.pristine\">\n                        <span class=\"glyphicon glyphicon-remove\" aria-hidden=\"true\"></span>\n                        invalid\n                    </span>\n                </div>\n                <div class=\"form-group\">\n                    <input formControlName=\"address\" type=\"text\" class=\"form-control\" placeholder=\"Enter address\" value=\"this.data.Address\" autofocus />\n                    <span class=\"validator-label valid\" *ngIf=\"this.VendorForm.controls.address.valid\">\n                        <span class=\"glyphicon glyphicon-ok\" aria-hidden=\"true\"></span>\n                        valid!\n                    </span>\n                    <span class=\"validator-label invalid\" *ngIf=\"!this.VendorForm.controls.address.valid && !this.VendorForm.controls.address.pristine\">\n                        <span class=\"glyphicon glyphicon-remove\" aria-hidden=\"true\"></span>\n                        invalid\n                    </span>\n                </div>\n                <div class=\"form-group\">\n                    <input formControlName=\"postalCode\" type=\"text\" class=\"form-control\" placeholder=\"Enter Postal Code\" value=\"this.data.PostalCode\" autofocus />\n                    <span class=\"validator-label valid\" *ngIf=\"this.VendorForm.controls.postalCode.valid\">\n                        <span class=\"glyphicon glyphicon-ok\" aria-hidden=\"true\"></span>\n                        valid!\n                    </span>\n                    <span class=\"validator-label invalid\" *ngIf=\"!this.VendorForm.controls.postalCode.valid && !this.VendorForm.controls.postalCode.pristine\">\n                        <span class=\"glyphicon glyphicon-remove\" aria-hidden=\"true\"></span>\n                        invalid\n                    </span>\n                </div>\n                <div class=\"form-group\">\n                    <input formControlName=\"city\" type=\"text\" class=\"form-control\" placeholder=\"Enter city\" value=\"this.data.City\" autofocus />\n                    <span class=\"validator-label valid\" *ngIf=\"this.VendorForm.controls.city.valid\">\n                        <span class=\"glyphicon glyphicon-ok\" aria-hidden=\"true\"></span>\n                        valid!\n                    </span>\n                    <span class=\"validator-label invalid\" *ngIf=\"!this.VendorForm.controls.city.valid && !this.VendorForm.controls.city.pristine\">\n                        <span class=\"glyphicon glyphicon-remove\" aria-hidden=\"true\"></span>\n                        invalid\n                    </span>\n                </div>\n                <div class=\"form-group\">\n                    <input formControlName=\"country\" type=\"text\" class=\"form-control\" placeholder=\"Enter country\" value=\"this.data.Country\" autofocus />\n                    <span class=\"validator-label valid\" *ngIf=\"this.VendorForm.controls.country.valid\">\n                        <span class=\"glyphicon glyphicon-ok\" aria-hidden=\"true\"></span>\n                        valid!\n                    </span>\n                    <span class=\"validator-label invalid\" *ngIf=\"!this.VendorForm.controls.country.valid && !this.VendorForm.controls.country.pristine\">\n                        <span class=\"glyphicon glyphicon-remove\" aria-hidden=\"true\"></span>\n                        invalid\n                    </span>\n                </div>\n                <div class=\"form-group\">\n                    <input formControlName=\"tel\" type=\"text\" class=\"form-control\" placeholder=\"Enter telphone number\" value=\"this.data.Tel\" autofocus />\n                    <span class=\"validator-label valid\" *ngIf=\"this.VendorForm.controls.tel.valid\">\n                        <span class=\"glyphicon glyphicon-ok\" aria-hidden=\"true\"></span>\n                        valid!\n                    </span>\n                    <span class=\"validator-label invalid\" *ngIf=\"!this.VendorForm.controls.tel.valid && !this.VendorForm.controls.tel.pristine\">\n                        <span class=\"glyphicon glyphicon-remove\" aria-hidden=\"true\"></span>\n                        invalid\n                    </span>\n                </div>\n                <div class=\"form-group\">\n                    <input formControlName=\"fax\" type=\"text\" class=\"form-control\" placeholder=\"Enter fax\" value=\"this.data.Fax\" autofocus />\n                    <span class=\"validator-label valid\" *ngIf=\"this.VendorForm.controls.fax.valid\">\n                        <span class=\"glyphicon glyphicon-ok\" aria-hidden=\"true\"></span>\n                        valid!\n                    </span>\n                    <span class=\"validator-label invalid\" *ngIf=\"!this.VendorForm.controls.fax.valid && !this.VendorForm.controls.fax.pristine\">\n                        <span class=\"glyphicon glyphicon-remove\" aria-hidden=\"true\"></span>\n                        invalid\n                    </span>\n                </div>\n                <div class=\"form-group\">\n                    <input formControlName=\"homepage\" type=\"text\" class=\"form-control\" placeholder=\"Enter homepage\" value=\"this.data.Homepage\" autofocus />\n                    <span class=\"validator-label valid\" *ngIf=\"this.VendorForm.controls.homepage.valid\">\n                        <span class=\"glyphicon glyphicon-ok\" aria-hidden=\"true\"></span>\n                        valid!\n                    </span>\n                    <span class=\"validator-label invalid\" *ngIf=\"!this.VendorForm.controls.homepage.valid && !this.VendorForm.controls.homepage.pristine\">\n                        <span class=\"glyphicon glyphicon-remove\" aria-hidden=\"true\"></span>\n                        invalid\n                    </span>\n                </div>\n                <div class=\"form-group\">\n                    <input formControlName=\"paymentTerm\" type=\"text\" class=\"form-control\" placeholder=\"Enter payment term\" value=\"this.data.PaymentTerm\" autofocus />\n                    <span class=\"validator-label valid\" *ngIf=\"this.VendorForm.controls.paymentTerm.valid\">\n                        <span class=\"glyphicon glyphicon-ok\" aria-hidden=\"true\"></span>\n                        valid!\n                    </span>\n                    <span class=\"validator-label invalid\" *ngIf=\"!this.VendorForm.controls.paymentTerm.valid && !this.VendorForm.controls.paymentTerm.pristine\">\n                        <span class=\"glyphicon glyphicon-remove\" aria-hidden=\"true\"></span>\n                        invalid\n                    </span>\n                </div>\n                <div class=\"form-group\">\n                    <input formControlName=\"deliveryTerm\" type=\"text\" class=\"form-control\" placeholder=\"Enter delivery term\" value=\"this.data.DeliveryTerm\" autofocus />\n                    <span class=\"validator-label valid\" *ngIf=\"this.VendorForm.controls.deliveryTerm.valid\">\n                        <span class=\"glyphicon glyphicon-ok\" aria-hidden=\"true\"></span>\n                        valid!\n                    </span>\n                    <span class=\"validator-label invalid\" *ngIf=\"!this.VendorForm.controls.deliveryTerm.valid && !this.VendorForm.controls.deliveryTerm.pristine\">\n                        <span class=\"glyphicon glyphicon-remove\" aria-hidden=\"true\"></span>\n                        invalid\n                    </span>\n                </div>\n                <div class=\"form-group\">\n                    <select value=\"this.data.Type\" class=\"form-control\" style=\"width:332px\" formControlName=\"type\">\n                        <option value=\"\">Chose a type</option>\n                        <option *ngFor=\"let type of types\" value=\"{{type.Id}}\">{{type.Name}}</option>\n                    </select>\n                    <span class=\"validator-label valid\" *ngIf=\"this.VendorForm.controls.type.valid\">\n                        <span class=\"glyphicon glyphicon-ok\" aria-hidden=\"true\"></span>\n                        valid!\n                    </span>\n                    <span class=\"validator-label invalid\" *ngIf=\"!this.VendorForm.controls.type.valid && !this.VendorForm.controls.type.pristine\">\n                        <span class=\"glyphicon glyphicon-remove\" aria-hidden=\"true\"></span>\n                        invalid\n                    </span>\n                </div>\n                <div class=\"form-group\">\n                    <select value=\"this.data.ProductType\" class=\"form-control\" style=\"width:332px\" formControlName=\"productType\">\n                        <option value=\"\">Chose a product type</option>\n                        <option *ngFor=\"let productType of productTypes\" value=\"{{productType.Id}}\">{{productType.Name}}</option>\n                    </select>\n                    <span class=\"validator-label valid\" *ngIf=\"this.VendorForm.controls.productType.valid\">\n                        <span class=\"glyphicon glyphicon-ok\" aria-hidden=\"true\"></span>\n                        valid!\n                    </span>\n                    <span class=\"validator-label invalid\" *ngIf=\"!this.VendorForm.controls.productType.valid && !this.VendorForm.controls.productType.pristine\">\n                        <span class=\"glyphicon glyphicon-remove\" aria-hidden=\"true\"></span>\n                        invalid\n                    </span>\n                </div>\n\n\n                <div class=\"form-group\">\n                    Is Active? <input formControlName=\"isactive\" type=\"checkbox\" value=\"this.data.IsActive\" autofocus />\n                </div>\n                <div class=\"form-group\">\n                    <input type=\"button\" class=\"btn btn-primary btn-block\" [disabled]=\"!VendorForm.valid\" value=\"Add\" (click)=\"onSubmit(this.VendorForm.value)\" />\n                </div>\n            </form>\n        </div>\n    </div>\n",
                    providers: [Vendor_service_1.VendorService, forms_1.FormBuilder, vendorType_service_1.VendorTypeService, VendorProductType_service_1.VendorProductTypeService]
                }),
                __metadata("design:paramtypes", [forms_1.FormBuilder,
                    Vendor_service_1.VendorService,
                    vendorType_service_1.VendorTypeService,
                    VendorProductType_service_1.VendorProductTypeService,
                    router_1.Router,
                    auth_service_1.AuthService,
                    router_1.ActivatedRoute])
            ], VendorAddComponent);
            exports_1("VendorAddComponent", VendorAddComponent);
        }
    };
});
