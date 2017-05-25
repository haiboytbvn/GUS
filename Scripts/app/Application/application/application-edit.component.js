System.register(["@angular/core", "@angular/forms", "@angular/router", "../../Application/shared/application.service", "../../auth.service"], function (exports_1, context_1) {
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
    var core_1, forms_1, router_1, application_service_1, auth_service_1, ApplicationEditComponent;
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
            function (application_service_1_1) {
                application_service_1 = application_service_1_1;
            },
            function (auth_service_1_1) {
                auth_service_1 = auth_service_1_1;
            }
        ],
        execute: function () {
            ApplicationEditComponent = (function () {
                function ApplicationEditComponent(fb, applicationService, router, authService, activatedRoute) {
                    this.fb = fb;
                    this.applicationService = applicationService;
                    this.router = router;
                    this.authService = authService;
                    this.activatedRoute = activatedRoute;
                    this.title = "Edit Application";
                    this.errorMessage = null;
                    this.isDelete = false;
                    this.isFormValuesChanged = false;
                }
                ApplicationEditComponent.prototype.ngOnInit = function () {
                    var _this = this;
                    if (!this.authService.isLoggedIn()) {
                        this.router.navigate([""]);
                    }
                    var id = this.activatedRoute.snapshot.params["id"];
                    if (id !== "") {
                        this.applicationService.get(id).subscribe(function (data) {
                            _this.data = data;
                        });
                    }
                    else {
                        this.router.navigate(["application/add"]);
                    }
                };
                ApplicationEditComponent.prototype.ngAfterViewInit = function () {
                    jQuery(this.errorDiv.nativeElement).hide();
                };
                ApplicationEditComponent.prototype.onUpdate = function (data) {
                    var _this = this;
                    this.applicationService.update(data).subscribe(function (data) {
                        if (data.error == null) {
                            _this.data = data;
                            _this.errorMessage = 'Application details updated successfully';
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
                ApplicationEditComponent.prototype.onDelete = function (data) {
                    var _this = this;
                    this.applicationService.delete(data.Id).subscribe(function (data) {
                        if (data.error == null) {
                            _this.router.navigate(["application"]);
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
                    this.isDelete = false;
                };
                ApplicationEditComponent.prototype.onBack = function () {
                    this.router.navigate(["application"]);
                };
                ApplicationEditComponent.prototype.deleteConfirm = function () {
                    this.isDelete = true;
                };
                ApplicationEditComponent.prototype.close = function () {
                    this.isDelete = false;
                };
                ApplicationEditComponent.prototype.displayMessage = function (message, status) {
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
                ApplicationEditComponent.prototype.isFormChanged = function (value) {
                    var _this = this;
                    this.applicationService.get(this.data.Id).subscribe(function (oldData) {
                        _this.isFormDataChanged(oldData);
                    });
                };
                ApplicationEditComponent.prototype.isFormDataChanged = function (oldData) {
                    if (JSON.stringify(this.data) === JSON.stringify(oldData))
                        this.isFormValuesChanged = false;
                    else
                        this.isFormValuesChanged = true;
                };
                return ApplicationEditComponent;
            }());
            __decorate([
                core_1.ViewChild('errorDiv'),
                __metadata("design:type", core_1.ElementRef)
            ], ApplicationEditComponent.prototype, "errorDiv", void 0);
            ApplicationEditComponent = __decorate([
                core_1.Component({
                    selector: "application-edit",
                    template: "\n<div class=\"error-message\" #errorDiv></div>\n<div>\n    <h2>\n        <a href=\"javascript:void(0)\" (click)=\"onBack()\">\n            &laquo; Back to Application List\n        </a>\n    </h2>\n  <div class=\"user-container\">    \n    <form class=\"form-user\" #applicationForm=\"ngForm\" *ngIf=\"data\"  >\n        <h2 class=\"form-user-heading\">{{title}}</h2>\n        <div class=\"form-group\">\n            <input name=\"input-name\" type=\"text\" class=\"form-control\" placeholder=\"Enter name\" [(ngModel)]=\"data.Name\" #name=\"ngModel\" autofocus required (ngModelChange)=\"isFormChanged($event)\"  />\n            <span class=\"validator-label valid\" *ngIf=\"name.valid\">\n                <span class=\"glyphicon glyphicon-ok\" aria-hidden=\"true\"></span>\n                valid!\n            </span>\n            <span class=\"validator-label invalid\" *ngIf=\"!name.valid && !name.pristine\">\n                <span class=\"glyphicon glyphicon-remove\" aria-hidden=\"true\"></span>\n                invalid\n            </span>\n        </div>    \n        <div class=\"form-group\">\n            <input name=\"input-buyercode\" type=\"text\" class=\"form-control\" placeholder=\"Enter buyer code\" [(ngModel)]=\"data.BuyerCode\" #name=\"ngModel\" autofocus required (ngModelChange)=\"isFormChanged($event)\"  />     \n        </div>\n        <div class=\"form-group\">\n           Is Active? <input name=\"input-isActive\" type=\"checkbox\" [(ngModel)]=\"data.IsActive\" #isActive=\"ngModel\" autofocus required (ngModelChange)=\"isFormChanged($event)\"/>           \n        </div>                  \n        <div class=\"form-group\">\n            <input type=\"button\" class=\"btn btn-primary btn-block\" [disabled]=\"!name.valid || !isFormValuesChanged\" value=\"Update\" (click)=\"onUpdate(data)\" /><br/>\n            <input type=\"button\" class=\"btn btn-danger btn-block\" [disabled]=\"!name.valid\" value=\"Delete\" (click)=\"deleteConfirm()\" />             \n       </div>             \n       <div class=\"dialog\" *ngIf=\"isDelete\">\n          <h3>Are you sure to delete ?</h3>\n            <input type=\"button\" class=\"btn btn-danger btn-block\"  value=\"Yes\" (click)=\"onDelete(data)\" />   <br/>          \n            <input type=\"button\" class=\"btn btn-primary btn-block\"  value=\"No\" (click)=\"close()\" />             \n       </div>\n       <div *ngIf=\"isDelete\" class=\"overlay\" (click)=\"Close()\"></div>\n    </form> \n  </div>       \n</div>\n",
                    providers: [application_service_1.ApplicationService, forms_1.FormBuilder]
                }),
                __metadata("design:paramtypes", [forms_1.FormBuilder,
                    application_service_1.ApplicationService,
                    router_1.Router,
                    auth_service_1.AuthService,
                    router_1.ActivatedRoute])
            ], ApplicationEditComponent);
            exports_1("ApplicationEditComponent", ApplicationEditComponent);
        }
    };
});
