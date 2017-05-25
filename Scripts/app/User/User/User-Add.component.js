System.register(["@angular/core", "@angular/forms", "@angular/router", "../shared/user.service", "../shared/user.model", "../../UserRole/shared/userRole.service", "../../auth.service"], function (exports_1, context_1) {
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
    var core_1, forms_1, router_1, user_service_1, user_model_1, userRole_service_1, auth_service_1, UserAddComponent;
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
            function (user_model_1_1) {
                user_model_1 = user_model_1_1;
            },
            function (userRole_service_1_1) {
                userRole_service_1 = userRole_service_1_1;
            },
            function (auth_service_1_1) {
                auth_service_1 = auth_service_1_1;
            }
        ],
        execute: function () {
            UserAddComponent = (function () {
                function UserAddComponent(fb, applicationUserService, router, userRoleService, authService, activatedRoute) {
                    this.fb = fb;
                    this.applicationUserService = applicationUserService;
                    this.router = router;
                    this.userRoleService = userRoleService;
                    this.authService = authService;
                    this.activatedRoute = activatedRoute;
                    this.errorMessage = null;
                }
                UserAddComponent.prototype.ngOnInit = function () {
                    var _this = this;
                    if (!this.authService.isLoggedIn()) {
                        this.router.navigate([""]);
                    }
                    this.userForm = this.fb.group({
                        username: ["", [
                                forms_1.Validators.required
                            ]],
                        usercode: ["", [
                                forms_1.Validators.required
                            ]],
                        //userrole: ["", [
                        //    Validators.required
                        //]],
                        userfirstname: ["", [
                                forms_1.Validators.required
                            ]],
                        userlastname: ["", [
                                forms_1.Validators.required
                            ]],
                        useremail: ["", [
                                forms_1.Validators.required
                            ]],
                        isactive: [false],
                        roleId: [""]
                    });
                    this.userRoleService.getUserRoleList().subscribe(function (items) { return _this.roles = items; }, function (error) { return _this.errorMessage = error; });
                    this.data = new user_model_1.ApplicationUser("", null, null, null, false, "", "", "", "", "", "", "", "", false);
                    this.title = "New User";
                };
                UserAddComponent.prototype.ngAfterViewInit = function () {
                    jQuery(this.errorDiv.nativeElement).hide();
                };
                UserAddComponent.prototype.ngOnDestroy = function () {
                    this.applicationUserService.data = this.data;
                };
                UserAddComponent.prototype.onSubmit = function (data) {
                    var _this = this;
                    console.log("data.RoleId : " + this.data.RoleId);
                    console.log(data);
                    var applicationUser = new user_model_1.ApplicationUser("", null, null, null, data.isactive, data.username, data.useremail, data.usercode, data.slug, data.companyid, data.RoleId, data.userfirstname, data.userlastname, false);
                    this.applicationUserService.add(applicationUser).subscribe(function (data) {
                        if (data.error == null) {
                            _this.data = data;
                            _this.errorMessage = 'User added successfully';
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
                UserAddComponent.prototype.onBack = function () {
                    this.router.navigate(["userlist"]);
                };
                UserAddComponent.prototype.displayMessage = function (message, status) {
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
                return UserAddComponent;
            }());
            __decorate([
                core_1.ViewChild('errorDiv'),
                __metadata("design:type", core_1.ElementRef)
            ], UserAddComponent.prototype, "errorDiv", void 0);
            UserAddComponent = __decorate([
                core_1.Component({
                    selector: "user-add",
                    template: "\n    <div class=\"error-message\" #errorDiv></div>\n    <div *ngIf=\"data\">\n        <h2>\n            <a href=\"javascript:void(0)\" (click)=\"onBack()\">\n                &laquo; Back to User List\n            </a>\n        </h2>\n        <div class=\"user-container\">\n            <form class=\"form-user\" [formGroup]=\"userForm\">\n                <h2 class=\"form-user-heading\">{{title}}</h2>\n                \n\n\n                <div class=\"form-group\">\n                    <input formControlName=\"username\" type=\"text\" class=\"form-control\" placeholder=\"Enter user name\" value=\"this.data.UserName\" autofocus />\n                    <span class=\"validator-label valid\" *ngIf=\"this.userForm.controls.username.valid\">\n                        <span class=\"glyphicon glyphicon-ok\" aria-hidden=\"true\"></span>\n                        valid!\n                    </span>\n                    <span class=\"validator-label invalid\" *ngIf=\"!this.userForm.controls.username.valid && !this.userForm.controls.username.pristine\">\n                        <span class=\"glyphicon glyphicon-remove\" aria-hidden=\"true\"></span>\n                        invalid\n                    </span>\n                </div>\n                <div class=\"form-group\">\n                    <input formControlName=\"usercode\" type=\"text\" class=\"form-control\" placeholder=\"Enter user code\" value=\"this.data.UserCode\" autofocus />\n                    <span class=\"validator-label valid\" *ngIf=\"this.userForm.controls.usercode.valid\">\n                        <span class=\"glyphicon glyphicon-ok\" aria-hidden=\"true\"></span>\n                        valid!\n                    </span>\n                    <span class=\"validator-label invalid\" *ngIf=\"!this.userForm.controls.usercode.valid && !this.userForm.controls.usercode.pristine\">\n                        <span class=\"glyphicon glyphicon-remove\" aria-hidden=\"true\"></span>\n                        invalid\n                    </span>\n                </div>\n                \n                <div class=\"form-group\">\n                    <input formControlName=\"userfirstname\" type=\"text\" class=\"form-control\" placeholder=\"Enter user first name\" value=\"this.data.FirstName\" autofocus />\n                    <span class=\"validator-label valid\" *ngIf=\"this.userForm.controls.userfirstname.valid\">\n                        <span class=\"glyphicon glyphicon-ok\" aria-hidden=\"true\"></span>\n                        valid!\n                    </span>\n                    <span class=\"validator-label invalid\" *ngIf=\"!this.userForm.controls.userfirstname.valid && !this.userForm.controls.userfirstname.pristine\">\n                        <span class=\"glyphicon glyphicon-remove\" aria-hidden=\"true\"></span>\n                        invalid\n                    </span>\n                </div>\n                <div class=\"form-group\">\n                    <input formControlName=\"userlastname\" type=\"text\" class=\"form-control\" placeholder=\"Enter user last name\" value=\"this.data.LastName\" autofocus />\n                    <span class=\"validator-label valid\" *ngIf=\"this.userForm.controls.userlastname.valid\">\n                        <span class=\"glyphicon glyphicon-ok\" aria-hidden=\"true\"></span>\n                        valid!\n                    </span>\n                    <span class=\"validator-label invalid\" *ngIf=\"!this.userForm.controls.userlastname.valid && !this.userForm.controls.userlastname.pristine\">\n                        <span class=\"glyphicon glyphicon-remove\" aria-hidden=\"true\"></span>\n                        invalid\n                    </span>\n                </div>\n                <div class=\"form-group\">\n                    <input formControlName=\"useremail\" type=\"text\" class=\"form-control\" placeholder=\"Enter user email\" value=\"this.data.Email\" autofocus />\n                    <span class=\"validator-label valid\" *ngIf=\"this.userForm.controls.useremail.valid\">\n                        <span class=\"glyphicon glyphicon-ok\" aria-hidden=\"true\"></span>\n                        valid!\n                    </span>\n                    <span class=\"validator-label invalid\" *ngIf=\"!this.userForm.controls.useremail.valid && !this.userForm.controls.useremail.pristine\">\n                        <span class=\"glyphicon glyphicon-remove\" aria-hidden=\"true\"></span>\n                        invalid\n                    </span>\n                </div>\n                <div class=\"form-group\">\n                    Is Active? <input formControlName=\"isactive\" type=\"checkbox\" value=\"this.data.IsActive\" autofocus />\n                </div>\n\n                <div class=\"form-group\">\n                    <select value=\"this.data.RoleId\" class=\"form-control\" style=\"width:332px\" formControlName=\"roleId\">\n                        <option value=\"\">Chose a Role</option>\n                        <option *ngFor=\"let role of roles\" value=\"{{role.Id}}\">{{role.Name}}</option>\n                    </select>\n                </div>   \n\n                <div class=\"form-group\">\n                    <input type=\"button\" class=\"btn btn-primary btn-block\" [disabled]=\"!userForm.valid\" value=\"Add\" (click)=\"onSubmit(this.userForm.value)\" />\n                </div>\n            </form>\n        </div>\n    </div>\n",
                    providers: [user_service_1.ApplicationUserService, forms_1.FormBuilder, userRole_service_1.UserRoleService]
                }),
                __metadata("design:paramtypes", [forms_1.FormBuilder,
                    user_service_1.ApplicationUserService,
                    router_1.Router,
                    userRole_service_1.UserRoleService,
                    auth_service_1.AuthService,
                    router_1.ActivatedRoute])
            ], UserAddComponent);
            exports_1("UserAddComponent", UserAddComponent);
        }
    };
});
