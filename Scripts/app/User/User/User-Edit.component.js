System.register(["@angular/core", "@angular/forms", "@angular/router", "../shared/user.service", "../../auth.service"], function (exports_1, context_1) {
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
    var core_1, forms_1, router_1, user_service_1, auth_service_1, UserEditComponent;
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
            function (user_service_1_1) {
                user_service_1 = user_service_1_1;
            },
            function (auth_service_1_1) {
                auth_service_1 = auth_service_1_1;
            }
        ],
        execute: function () {
            UserEditComponent = (function () {
                function UserEditComponent(fb, applicationUserService, router, authService, activatedRoute) {
                    this.fb = fb;
                    this.applicationUserService = applicationUserService;
                    this.router = router;
                    this.authService = authService;
                    this.activatedRoute = activatedRoute;
                    this.title = "Edit User";
                    this.errorMessage = null;
                    this.isDelete = false;
                    this.isFormValuesChanged = false;
                }
                UserEditComponent.prototype.ngOnInit = function () {
                    var _this = this;
                    if (!this.authService.isLoggedIn()) {
                        this.router.navigate([""]);
                    }
                    var id = this.activatedRoute.snapshot.params["id"];
                    if (id !== "") {
                        this.applicationUserService.get(id).subscribe(function (data) {
                            _this.data = data;
                        });
                    }
                    else {
                        this.router.navigate(["userlist/add"]);
                    }
                };
                UserEditComponent.prototype.ngAfterViewInit = function () {
                    jQuery(this.errorDiv.nativeElement).hide();
                };
                UserEditComponent.prototype.onUpdate = function (data) {
                    var _this = this;
                    this.applicationUserService.update(data).subscribe(function (data) {
                        if (data.error == null) {
                            _this.data = data;
                            _this.errorMessage = 'User details updated successfully';
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
                UserEditComponent.prototype.onDelete = function (data) {
                    var _this = this;
                    this.applicationUserService.delete(data.Id).subscribe(function (data) {
                        if (data.error == null) {
                            _this.router.navigate(["userlist"]);
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
                UserEditComponent.prototype.onBack = function () {
                    this.router.navigate(["userlist"]);
                };
                UserEditComponent.prototype.deleteConfirm = function () {
                    this.isDelete = true;
                };
                UserEditComponent.prototype.close = function () {
                    this.isDelete = false;
                };
                UserEditComponent.prototype.displayMessage = function (message, status) {
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
                UserEditComponent.prototype.isFormChanged = function (value) {
                    var _this = this;
                    this.applicationUserService.get(this.data.Id).subscribe(function (oldData) {
                        _this.isFormDataChanged(oldData);
                    });
                };
                UserEditComponent.prototype.isFormDataChanged = function (oldData) {
                    console.log(this.data);
                    console.log(oldData);
                    if (JSON.stringify(this.data) === JSON.stringify(oldData))
                        this.isFormValuesChanged = false;
                    else
                        this.isFormValuesChanged = true;
                };
                return UserEditComponent;
            }());
            __decorate([
                core_1.ViewChild('errorDiv'),
                __metadata("design:type", core_1.ElementRef)
            ], UserEditComponent.prototype, "errorDiv", void 0);
            UserEditComponent = __decorate([
                core_1.Component({
                    selector: "user-edit",
                    template: "\n    <div class=\"error-message\" #errorDiv></div>\n    <div>\n        <h2>\n            <a href=\"javascript:void(0)\" (click)=\"onBack()\">\n                &laquo; Back to User List\n            </a>\n        </h2>\n        <div class=\"user-container\">\n            <form class=\"form-user\" #userForm=\"ngForm\" *ngIf=\"data\">\n                <h2 class=\"form-user-heading\">{{title}}</h2>\n                \n\n                \n                <div class=\"form-group\">\n                    <input name=\"input-name\" type=\"text\" class=\"form-control\" placeholder=\"Enter user name\" [(ngModel)]=\"data.UserName\" #username=\"ngModel\" autofocus required (ngModelChange)=\"isFormChanged($event)\" />\n                    <span class=\"validator-label valid\" *ngIf=\"username.valid\">\n                        <span class=\"glyphicon glyphicon-ok\" aria-hidden=\"true\"></span>\n                        valid!\n                    </span>\n                    <span class=\"validator-label invalid\" *ngIf=\"!username.valid && !username.pristine\">\n                        <span class=\"glyphicon glyphicon-remove\" aria-hidden=\"true\"></span>\n                        invalid\n                    </span>\n                </div>\n                <div class=\"form-group\">\n                    <input name=\"input-code\" type=\"text\" class=\"form-control\" placeholder=\"Enter user code\" [(ngModel)]=\"data.UserCode\" #usercode=\"ngModel\" autofocus required (ngModelChange)=\"isFormChanged($event)\" />\n                    <span class=\"validator-label valid\" *ngIf=\"usercode.valid\">\n                        <span class=\"glyphicon glyphicon-ok\" aria-hidden=\"true\"></span>\n                        valid!\n                    </span>\n                    <span class=\"validator-label invalid\" *ngIf=\"!usercode.valid && !usercode.pristine\">\n                        <span class=\"glyphicon glyphicon-remove\" aria-hidden=\"true\"></span>\n                        invalid\n                    </span>\n                </div>\n                <div class=\"form-group\">\n                    <input name=\"input-role\" type=\"text\" class=\"form-control\" placeholder=\"Enter role\" [(ngModel)]=\"data.Role\" #userrole=\"ngModel\" autofocus required (ngModelChange)=\"isFormChanged($event)\" />\n                    <span class=\"validator-label valid\" *ngIf=\"userrole.valid\">\n                        <span class=\"glyphicon glyphicon-ok\" aria-hidden=\"true\"></span>\n                        valid!\n                    </span>\n                    <span class=\"validator-label invalid\" *ngIf=\"!userrole.valid && !userrole.pristine\">\n                        <span class=\"glyphicon glyphicon-remove\" aria-hidden=\"true\"></span>\n                        invalid\n                    </span>\n                </div>\n                <div class=\"form-group\">\n                    <input name=\"input-firstname\" type=\"text\" class=\"form-control\" placeholder=\"Enter first name\" [(ngModel)]=\"data.FirstName\" #userfirstname=\"ngModel\" autofocus required (ngModelChange)=\"isFormChanged($event)\" />\n                    <span class=\"validator-label valid\" *ngIf=\"userfirstname.valid\">\n                        <span class=\"glyphicon glyphicon-ok\" aria-hidden=\"true\"></span>\n                        valid!\n                    </span>\n                    <span class=\"validator-label invalid\" *ngIf=\"!userfirstname.valid && !userfirstname.pristine\">\n                        <span class=\"glyphicon glyphicon-remove\" aria-hidden=\"true\"></span>\n                        invalid\n                    </span>\n                </div>\n                <div class=\"form-group\">\n                    <input name=\"input-lastname\" type=\"text\" class=\"form-control\" placeholder=\"Enter last name\" [(ngModel)]=\"data.LastName\" #userlastname=\"ngModel\" autofocus required (ngModelChange)=\"isFormChanged($event)\" />\n                    <span class=\"validator-label valid\" *ngIf=\"userlastname.valid\">\n                        <span class=\"glyphicon glyphicon-ok\" aria-hidden=\"true\"></span>\n                        valid!\n                    </span>\n                    <span class=\"validator-label invalid\" *ngIf=\"!userlastname.valid && !userlastname.pristine\">\n                        <span class=\"glyphicon glyphicon-remove\" aria-hidden=\"true\"></span>\n                        invalid\n                    </span>\n                </div>\n                <div class=\"form-group\">\n                    <input name=\"input-email\" type=\"text\" class=\"form-control\" placeholder=\"Enter user email\" [(ngModel)]=\"data.Email\" #useremail=\"ngModel\" autofocus required (ngModelChange)=\"isFormChanged($event)\" />\n                    <span class=\"validator-label valid\" *ngIf=\"useremail.valid\">\n                        <span class=\"glyphicon glyphicon-ok\" aria-hidden=\"true\"></span>\n                        valid!\n                    </span>\n                    <span class=\"validator-label invalid\" *ngIf=\"!useremail.valid && !useremail.pristine\">\n                        <span class=\"glyphicon glyphicon-remove\" aria-hidden=\"true\"></span>\n                        invalid\n                    </span>\n                </div>\n                <div class=\"form-group\">\n                    Is Active? <input name=\"input-isActive\" type=\"checkbox\" [(ngModel)]=\"data.IsActive\" #isActive=\"ngModel\" autofocus required (ngModelChange)=\"isFormChanged($event)\" />\n                </div>\n                \n                \n\n                <div class=\"form-group\">\n                    <input type=\"button\" class=\"btn btn-primary btn-block\" [disabled]=\"!username.valid || !isFormValuesChanged\" value=\"Update\" (click)=\"onUpdate(data)\" /><br />\n                    <input type=\"button\" class=\"btn btn-danger btn-block\" [disabled]=\"!username.valid\" value=\"Delete\" (click)=\"deleteConfirm()\" />\n                </div>\n                <div class=\"dialog\" *ngIf=\"isDelete\">\n                    <h3>Are you sure to delete ?</h3>\n                    <input type=\"button\" class=\"btn btn-danger btn-block\" value=\"Yes\" (click)=\"onDelete(data)\" />   <br />\n                    <input type=\"button\" class=\"btn btn-primary btn-block\" value=\"No\" (click)=\"close()\" />\n                </div>\n                <div *ngIf=\"isDelete\" class=\"overlay\" (click)=\"Close()\"></div>\n            </form>\n        </div>\n    </div>\n",
                    providers: [user_service_1.ApplicationUserService, forms_1.FormBuilder]
                }),
                __metadata("design:paramtypes", [forms_1.FormBuilder,
                    user_service_1.ApplicationUserService,
                    router_1.Router,
                    auth_service_1.AuthService,
                    router_1.ActivatedRoute])
            ], UserEditComponent);
            exports_1("UserEditComponent", UserEditComponent);
        }
    };
});
