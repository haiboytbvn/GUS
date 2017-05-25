System.register(["@angular/core", "@angular/forms", "@angular/router", "../shared/vendorType.service", "../shared/vendorType.model", "../../auth.service"], function (exports_1, context_1) {
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
    var core_1, forms_1, router_1, vendorType_service_1, vendorType_model_1, auth_service_1, VendorTypeAddComponent;
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
            function (vendorType_service_1_1) {
                vendorType_service_1 = vendorType_service_1_1;
            },
            function (vendorType_model_1_1) {
                vendorType_model_1 = vendorType_model_1_1;
            },
            function (auth_service_1_1) {
                auth_service_1 = auth_service_1_1;
            }
        ],
        execute: function () {
            VendorTypeAddComponent = (function () {
                function VendorTypeAddComponent(fb, vendorTypeService, router, authService, activatedRoute) {
                    this.fb = fb;
                    this.vendorTypeService = vendorTypeService;
                    this.router = router;
                    this.authService = authService;
                    this.activatedRoute = activatedRoute;
                    this.errorMessage = null;
                }
                VendorTypeAddComponent.prototype.ngOnInit = function () {
                    if (!this.authService.isLoggedIn()) {
                        this.router.navigate([""]);
                    }
                    this.VendorTypeForm = this.fb.group({
                        name: ["", [
                                forms_1.Validators.required
                            ]],
                        isactive: [true],
                        buyercode: [""]
                    });
                    this.data = new vendorType_model_1.VendorType("", null, null, false, "", false);
                    this.title = "New VendorType";
                };
                VendorTypeAddComponent.prototype.ngAfterViewInit = function () {
                    jQuery(this.errorDiv.nativeElement).hide();
                };
                VendorTypeAddComponent.prototype.ngOnDestroy = function () {
                    this.vendorTypeService.data = this.data;
                };
                VendorTypeAddComponent.prototype.onSubmit = function (data) {
                    var _this = this;
                    console.log(data);
                    var vendorType = new vendorType_model_1.VendorType("", null, null, data.isactive, data.name, false);
                    this.vendorTypeService.add(vendorType).subscribe(function (data) {
                        if (data.error == null) {
                            _this.data = data;
                            _this.errorMessage = 'VendorType added successfully';
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
                VendorTypeAddComponent.prototype.onBack = function () {
                    this.router.navigate(["vendortypelist"]);
                };
                VendorTypeAddComponent.prototype.displayMessage = function (message, status) {
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
                return VendorTypeAddComponent;
            }());
            __decorate([
                core_1.ViewChild('errorDiv'),
                __metadata("design:type", core_1.ElementRef)
            ], VendorTypeAddComponent.prototype, "errorDiv", void 0);
            VendorTypeAddComponent = __decorate([
                core_1.Component({
                    selector: "VendorType-add",
                    template: "\n    <div class=\"error-message\" #errorDiv></div>\n    <div *ngIf=\"data\">\n        <h2>\n            <a href=\"javascript:void(0)\" (click)=\"onBack()\">\n                &laquo; Back to VendorType List\n            </a>\n        </h2>\n        <div class=\"user-container\">\n            <form class=\"form-user\" [formGroup]=\"VendorTypeForm\">\n                <h2 class=\"form-user-heading\">{{title}}</h2>\n\n                <div class=\"form-group\">\n                    <input formControlName=\"name\" type=\"text\" class=\"form-control\" placeholder=\"Enter name\" value=\"this.data.Name\" autofocus />\n                    <span class=\"validator-label valid\" *ngIf=\"this.VendorTypeForm.controls.name.valid\">\n                        <span class=\"glyphicon glyphicon-ok\" aria-hidden=\"true\"></span>\n                        valid!\n                    </span>\n                    <span class=\"validator-label invalid\" *ngIf=\"!this.VendorTypeForm.controls.name.valid && !this.VendorTypeForm.controls.name.pristine\">\n                        <span class=\"glyphicon glyphicon-remove\" aria-hidden=\"true\"></span>\n                        invalid\n                    </span>\n                </div>\n                <div class=\"form-group\">\n                    Is Active? <input formControlName=\"isactive\" type=\"checkbox\" value=\"this.data.IsActive\" autofocus />\n                </div>\n                <div class=\"form-group\">\n                    <input type=\"button\" class=\"btn btn-primary btn-block\" [disabled]=\"!VendorTypeForm.valid\" value=\"Add\" (click)=\"onSubmit(this.VendorTypeForm.value)\" />\n                </div>\n            </form>\n        </div>\n    </div>\n",
                    providers: [vendorType_service_1.VendorTypeService, forms_1.FormBuilder]
                }),
                __metadata("design:paramtypes", [forms_1.FormBuilder,
                    vendorType_service_1.VendorTypeService,
                    router_1.Router,
                    auth_service_1.AuthService,
                    router_1.ActivatedRoute])
            ], VendorTypeAddComponent);
            exports_1("VendorTypeAddComponent", VendorTypeAddComponent);
        }
    };
});
