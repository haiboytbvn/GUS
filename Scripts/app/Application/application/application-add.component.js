System.register(["@angular/core", "@angular/forms", "@angular/router", "../../Application/shared/application.model", "../../Application/shared/application.service", "../../auth.service"], function (exports_1, context_1) {
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
    var core_1, forms_1, router_1, application_model_1, application_service_1, auth_service_1, ApplicationAddComponent;
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
            function (application_model_1_1) {
                application_model_1 = application_model_1_1;
            },
            function (application_service_1_1) {
                application_service_1 = application_service_1_1;
            },
            function (auth_service_1_1) {
                auth_service_1 = auth_service_1_1;
            }
        ],
        execute: function () {
            ApplicationAddComponent = (function () {
                function ApplicationAddComponent(fb, applicationService, router, authService, activatedRoute) {
                    this.fb = fb;
                    this.applicationService = applicationService;
                    this.router = router;
                    this.authService = authService;
                    this.activatedRoute = activatedRoute;
                    this.errorMessage = null;
                }
                ApplicationAddComponent.prototype.ngOnInit = function () {
                    if (!this.authService.isLoggedIn()) {
                        this.router.navigate([""]);
                    }
                    this.applicationForm = this.fb.group({
                        name: ["", [
                                forms_1.Validators.required
                            ]],
                        isactive: [true],
                        buyercode: [""]
                    });
                    this.data = new application_model_1.Application("", null, null, false, "", false, "");
                    this.title = "New Application";
                };
                ApplicationAddComponent.prototype.ngAfterViewInit = function () {
                    jQuery(this.errorDiv.nativeElement).hide();
                };
                ApplicationAddComponent.prototype.ngOnDestroy = function () {
                    this.applicationService.data = this.data;
                };
                ApplicationAddComponent.prototype.onSubmit = function (data) {
                    var _this = this;
                    var application = new application_model_1.Application("", null, null, data.isactive, data.name, false, data.buyercode);
                    this.applicationService.add(application).subscribe(function (data) {
                        if (data.error == null) {
                            _this.data = data;
                            _this.errorMessage = 'Acessory Desc added successfully';
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
                ApplicationAddComponent.prototype.onBack = function () {
                    this.router.navigate(["application"]);
                };
                ApplicationAddComponent.prototype.displayMessage = function (message, status) {
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
                return ApplicationAddComponent;
            }());
            __decorate([
                core_1.ViewChild('errorDiv'),
                __metadata("design:type", core_1.ElementRef)
            ], ApplicationAddComponent.prototype, "errorDiv", void 0);
            ApplicationAddComponent = __decorate([
                core_1.Component({
                    selector: "application-add",
                    template: "\n<div class=\"error-message\" #errorDiv></div>\n<div *ngIf=\"data\">\n    <h2>\n        <a href=\"javascript:void(0)\" (click)=\"onBack()\">\n            &laquo; Back to Application List\n        </a>\n    </h2>\n  <div class=\"user-container\">    \n    <form class=\"form-user\" [formGroup]=\"applicationForm\" >\n        <h2 class=\"form-user-heading\">{{title}}</h2>\n        \n        <div class=\"form-group\">\n            <input formControlName=\"name\" type=\"text\" class=\"form-control\" placeholder=\"Enter name\" value=\"this.data.Name\" autofocus />\n            <span class=\"validator-label valid\" *ngIf=\"this.applicationForm.controls.name.valid\">\n                <span class=\"glyphicon glyphicon-ok\" aria-hidden=\"true\"></span>\n                valid!\n            </span>\n        <div class=\"form-group\">\n            <input formControlName=\"buyercode\" type=\"text\" class=\"form-control\" placeholder=\"Enter buyer code\" value=\"this.data.BuyerCode\" autofocus />\n        </div> \n            <span class=\"validator-label invalid\" *ngIf=\"!this.applicationForm.controls.name.valid && !this.applicationForm.controls.name.pristine\">\n                <span class=\"glyphicon glyphicon-remove\" aria-hidden=\"true\"></span>\n                invalid\n            </span>\n        </div>  \n        <div class=\"form-group\">\n           Is Active? <input formControlName=\"isactive\" type=\"checkbox\" value=\"this.data.IsActive\" autofocus />     \n        </div>                    \n        <div class=\"form-group\">\n            <input type=\"button\" class=\"btn btn-primary btn-block\" [disabled]=\"!applicationForm.valid\" value=\"Add\" (click)=\"onSubmit(this.applicationForm.value)\" />\n        </div>       \n    </form>\n  </div>\n</div>\n",
                    providers: [application_service_1.ApplicationService, forms_1.FormBuilder]
                }),
                __metadata("design:paramtypes", [forms_1.FormBuilder,
                    application_service_1.ApplicationService,
                    router_1.Router,
                    auth_service_1.AuthService,
                    router_1.ActivatedRoute])
            ], ApplicationAddComponent);
            exports_1("ApplicationAddComponent", ApplicationAddComponent);
        }
    };
});
