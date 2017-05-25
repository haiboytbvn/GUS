System.register(["@angular/core", "@angular/forms", "@angular/router", "../shared/VendorProductType.service", "../shared/VendorProductType.model", "../../auth.service"], function (exports_1, context_1) {
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
    var core_1, forms_1, router_1, VendorProductType_service_1, VendorProductType_model_1, auth_service_1, VendorProductTypeAddComponent;
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
            function (VendorProductType_service_1_1) {
                VendorProductType_service_1 = VendorProductType_service_1_1;
            },
            function (VendorProductType_model_1_1) {
                VendorProductType_model_1 = VendorProductType_model_1_1;
            },
            function (auth_service_1_1) {
                auth_service_1 = auth_service_1_1;
            }
        ],
        execute: function () {
            VendorProductTypeAddComponent = (function () {
                function VendorProductTypeAddComponent(fb, vendorProductTypeService, router, authService, activatedRoute) {
                    this.fb = fb;
                    this.vendorProductTypeService = vendorProductTypeService;
                    this.router = router;
                    this.authService = authService;
                    this.activatedRoute = activatedRoute;
                    this.errorMessage = null;
                }
                VendorProductTypeAddComponent.prototype.ngOnInit = function () {
                    if (!this.authService.isLoggedIn()) {
                        this.router.navigate([""]);
                    }
                    this.VendorProductTypeForm = this.fb.group({
                        name: ["", [
                                forms_1.Validators.required
                            ]],
                        isactive: [true],
                        buyercode: [""]
                    });
                    this.data = new VendorProductType_model_1.VendorProductType("", null, null, false, "", false);
                    this.title = "New VendorProductType";
                };
                VendorProductTypeAddComponent.prototype.ngAfterViewInit = function () {
                    jQuery(this.errorDiv.nativeElement).hide();
                };
                VendorProductTypeAddComponent.prototype.ngOnDestroy = function () {
                    this.vendorProductTypeService.data = this.data;
                };
                VendorProductTypeAddComponent.prototype.onSubmit = function (data) {
                    var _this = this;
                    console.log(data);
                    var vendorProductType = new VendorProductType_model_1.VendorProductType("", null, null, data.isactive, data.name, false);
                    this.vendorProductTypeService.add(vendorProductType).subscribe(function (data) {
                        if (data.error == null) {
                            _this.data = data;
                            _this.errorMessage = 'VendorProductType added successfully';
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
                VendorProductTypeAddComponent.prototype.onBack = function () {
                    this.router.navigate(["vendorproducttypelist"]);
                };
                VendorProductTypeAddComponent.prototype.displayMessage = function (message, status) {
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
                return VendorProductTypeAddComponent;
            }());
            __decorate([
                core_1.ViewChild('errorDiv'),
                __metadata("design:type", core_1.ElementRef)
            ], VendorProductTypeAddComponent.prototype, "errorDiv", void 0);
            VendorProductTypeAddComponent = __decorate([
                core_1.Component({
                    selector: "VendorProductType-add",
                    template: "\n    <div class=\"error-message\" #errorDiv></div>\n    <div *ngIf=\"data\">\n        <h2>\n            <a href=\"javascript:void(0)\" (click)=\"onBack()\">\n                &laquo; Back to VendorProductType List\n            </a>\n        </h2>\n        <div class=\"user-container\">\n            <form class=\"form-user\" [formGroup]=\"VendorProductTypeForm\">\n                <h2 class=\"form-user-heading\">{{title}}</h2>\n\n                <div class=\"form-group\">\n                    <input formControlName=\"name\" type=\"text\" class=\"form-control\" placeholder=\"Enter name\" value=\"this.data.Name\" autofocus />\n                    <span class=\"validator-label valid\" *ngIf=\"this.VendorProductTypeForm.controls.name.valid\">\n                        <span class=\"glyphicon glyphicon-ok\" aria-hidden=\"true\"></span>\n                        valid!\n                    </span>\n                    <span class=\"validator-label invalid\" *ngIf=\"!this.VendorProductTypeForm.controls.name.valid && !this.VendorProductTypeForm.controls.name.pristine\">\n                        <span class=\"glyphicon glyphicon-remove\" aria-hidden=\"true\"></span>\n                        invalid\n                    </span>\n                </div>\n                <div class=\"form-group\">\n                    Is Active? <input formControlName=\"isactive\" type=\"checkbox\" value=\"this.data.IsActive\" autofocus />\n                </div>\n                <div class=\"form-group\">\n                    <input type=\"button\" class=\"btn btn-primary btn-block\" [disabled]=\"!VendorProductTypeForm.valid\" value=\"Add\" (click)=\"onSubmit(this.VendorProductTypeForm.value)\" />\n                </div>\n            </form>\n        </div>\n    </div>\n",
                    providers: [VendorProductType_service_1.VendorProductTypeService, forms_1.FormBuilder]
                }),
                __metadata("design:paramtypes", [forms_1.FormBuilder,
                    VendorProductType_service_1.VendorProductTypeService,
                    router_1.Router,
                    auth_service_1.AuthService,
                    router_1.ActivatedRoute])
            ], VendorProductTypeAddComponent);
            exports_1("VendorProductTypeAddComponent", VendorProductTypeAddComponent);
        }
    };
});
