System.register(["@angular/core", "@angular/forms", "@angular/router", "../shared/userRole.service", "../shared/UserRoleMatrix.model", "../../auth.service"], function (exports_1, context_1) {
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
    var core_1, forms_1, router_1, userRole_service_1, UserRoleMatrix_model_1, auth_service_1, UserRoleAddComponent;
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
            function (userRole_service_1_1) {
                userRole_service_1 = userRole_service_1_1;
            },
            function (UserRoleMatrix_model_1_1) {
                UserRoleMatrix_model_1 = UserRoleMatrix_model_1_1;
            },
            function (auth_service_1_1) {
                auth_service_1 = auth_service_1_1;
            }
        ],
        execute: function () {
            UserRoleAddComponent = (function () {
                function UserRoleAddComponent(fb, userRoleService, router, authService, activatedRoute) {
                    this.fb = fb;
                    this.userRoleService = userRoleService;
                    this.router = router;
                    this.authService = authService;
                    this.activatedRoute = activatedRoute;
                    this.errorMessage = null;
                }
                UserRoleAddComponent.prototype.ngOnInit = function () {
                    if (!this.authService.isLoggedIn()) {
                        this.router.navigate([""]);
                    }
                    this.userMatrixForm = this.fb.group({
                        userrolename: ["", [
                                forms_1.Validators.required
                            ]],
                        level1: [false],
                        level2: [false],
                        level3: [false],
                        level4: [false],
                        level5: [false],
                        level6: [false],
                        level7: [false],
                        level8: [false],
                        level9: [false],
                        level10: [false],
                        level11: [false],
                        level12: [false],
                        level13: [false],
                        level14: [false],
                        level15: [false],
                        level16: [false],
                        level17: [false],
                        level18: [false],
                        level19: [false],
                        level20: [false],
                        level21: [false],
                        level22: [false],
                        level23: [false],
                        level24: [false],
                        level25: [false],
                        level26: [false],
                        level27: [false],
                        level28: [false],
                        level29: [false],
                        level30: [false],
                        level31: [false],
                        level32: [false],
                        level33: [false],
                        level34: [false],
                        level35: [false],
                        level36: [false],
                        level37: [false],
                        level38: [false],
                        level39: [false],
                        level40: [false],
                        level41: [false],
                        level42: [false],
                        level43: [false],
                        level44: [false],
                        level45: [false],
                        level46: [false],
                        level47: [false],
                        level48: [false],
                        level49: [false],
                        level50: [false],
                        level51: [false],
                        level52: [false],
                        level53: [false],
                        level54: [false],
                        level55: [false],
                        level56: [false],
                        level57: [false],
                        level58: [false],
                        level59: [false],
                        level60: [false],
                        level61: [false],
                        level62: [false],
                        level63: [false],
                        level64: [false],
                        level65: [false],
                        level66: [false],
                        level67: [false],
                        level68: [false],
                        level69: [false],
                        level70: [false],
                        level71: [false],
                        level72: [false],
                        level73: [false],
                        level74: [false],
                        level75: [false],
                        level76: [false],
                        level77: [false],
                        level78: [false],
                        level79: [false],
                        level80: [false],
                        level81: [false],
                        level82: [false],
                        level83: [false],
                        level84: [false],
                        level85: [false],
                        level86: [false],
                        level87: [false],
                        level88: [false],
                        level89: [false],
                        level90: [false],
                        level91: [false],
                        isactive: [false]
                    });
                    this.data = new UserRoleMatrix_model_1.UserRoleMatrix("", null, null, false, "", "", "", false);
                    this.title = "New User Role";
                };
                UserRoleAddComponent.prototype.ngAfterViewInit = function () {
                    jQuery(this.errorDiv.nativeElement).hide();
                };
                UserRoleAddComponent.prototype.ngOnDestroy = function () {
                    this.userRoleService.data = this.data;
                };
                UserRoleAddComponent.prototype.onSubmit = function (data) {
                    var _this = this;
                    console.log(data);
                    this.userMatrixValue = this.getUserMatrixValue();
                    console.log(this.userMatrixValue);
                    var userRoleMatrix = new UserRoleMatrix_model_1.UserRoleMatrix("", null, null, data.isactive, data.userrolename, "", this.userMatrixValue, false);
                    console.log;
                    this.userRoleService.add(userRoleMatrix).subscribe(function (data) {
                        if (data.error == null) {
                            _this.data = data;
                            _this.errorMessage = 'User Role added successfully';
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
                UserRoleAddComponent.prototype.onBack = function () {
                    this.router.navigate(["userrolelist"]);
                };
                UserRoleAddComponent.prototype.displayMessage = function (message, status) {
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
                UserRoleAddComponent.prototype.getUserMatrixValue = function () {
                    this.result = "";
                    for (var i = 1; i < 92; i++) {
                        if (this.userMatrixForm.get("level" + i.toLocaleString()).value)
                            this.result += "1";
                        else
                            this.result += "0";
                    }
                    return this.result;
                };
                return UserRoleAddComponent;
            }());
            __decorate([
                core_1.ViewChild('errorDiv'),
                __metadata("design:type", core_1.ElementRef)
            ], UserRoleAddComponent.prototype, "errorDiv", void 0);
            UserRoleAddComponent = __decorate([
                core_1.Component({
                    selector: "userRole-add",
                    template: "\n    <div class=\"error-message\" #errorDiv></div>\n    <div *ngIf=\"data\">\n        <h2>\n            <a href=\"javascript:void(0)\" (click)=\"onBack()\">\n                &laquo; Back to User List\n            </a>\n        </h2>\n        <div class=\"user-container\">\n            <form class=\"form-user\" [formGroup]=\"userMatrixForm\">\n                <h2 class=\"form-user-heading\">{{title}}</h2>\n\n\n\n                <div class=\"form-group\">\n                    <input formControlName=\"userrolename\" type=\"text\" class=\"form-control\" placeholder=\"Enter user matrix name\" value=\"this.data.Name\" autofocus />\n                    <span class=\"validator-label valid\" *ngIf=\"this.userMatrixForm.controls.userrolename.valid\">\n                        <span class=\"glyphicon glyphicon-ok\" aria-hidden=\"true\"></span>\n                        valid!\n                    </span>\n                    <span class=\"validator-label invalid\" *ngIf=\"!this.userMatrixForm.controls.userrolename.valid && !this.userMatrixForm.controls.userrolename.pristine\">\n                        <span class=\"glyphicon glyphicon-remove\" aria-hidden=\"true\"></span>\n                        invalid\n                    </span>\n                </div>\n\n                <div class=\"form-group\">\n                    Is Active? <input formControlName=\"isactive\" type=\"checkbox\" value=\"this.data.IsActive\" autofocus />\n                </div>\n\n                <div class=\"form-group\">\n                    <table id=\"tbUserMatrix\">\n                        <tr>\n                            <td><b>Front End</b></td>\n                            <td></td>\n                            <td></td>\n                            <td></td>\n                            <td></td>\n                            <td></td>\n                        </tr>\n                        <tr>\n                            <td>&nbsp;</td>\n                            <td>View</td>\n                            <td>Allow</td>\n                            <td>Deny</td>\n                            <td>Approve</td>\n                            <td>Chat</td>\n                        </tr>\n                        <tr>\n                            <td>Project Setup</td>\n                            <td><input formControlName=\"level1\" type=\"checkbox\" autofocus /></td>\n                            <td><input formControlName=\"level2\" type=\"checkbox\" autofocus /></td>\n                            <td><input formControlName=\"level3\" type=\"checkbox\" autofocus /></td>\n                            <td><input formControlName=\"level4\" type=\"checkbox\" autofocus /></td>\n                            <td><input formControlName=\"level5\" type=\"checkbox\" autofocus /></td>\n                        </tr>\n                        <tr>\n                            <td>Colorway</td>\n                            <td><input formControlName=\"level6\" type=\"checkbox\" autofocus /></td>\n                            <td><input formControlName=\"level7\" type=\"checkbox\" autofocus /></td>\n                            <td><input formControlName=\"level8\" type=\"checkbox\" autofocus /></td>\n                            <td><input formControlName=\"level9\" type=\"checkbox\" autofocus /></td>\n                            <td><input formControlName=\"level10\" type=\"checkbox\" autofocus /></td>\n                        </tr>\n                        <tr>\n                            <td>Fabrics</td>\n                            <td><input formControlName=\"level11\" type=\"checkbox\" autofocus /></td>\n                            <td><input formControlName=\"level12\" type=\"checkbox\" autofocus /></td>\n                            <td><input formControlName=\"level13\" type=\"checkbox\" autofocus /></td>\n                            <td><input formControlName=\"level14\" type=\"checkbox\" autofocus /></td>\n                            <td><input formControlName=\"level15\" type=\"checkbox\" autofocus /></td>\n                        </tr>\n                        <tr>\n                            <td>Accessories</td>\n                            <td><input formControlName=\"level16\" type=\"checkbox\" autofocus /></td>\n                            <td><input formControlName=\"level17\" type=\"checkbox\" autofocus /></td>\n                            <td><input formControlName=\"level18\" type=\"checkbox\" autofocus /></td>\n                            <td><input formControlName=\"level19\" type=\"checkbox\" autofocus /></td>\n                            <td><input formControlName=\"level20\" type=\"checkbox\" autofocus /></td>\n                        </tr>\n                        <tr>\n                            <td>PEW</td>\n                            <td><input formControlName=\"level21\" type=\"checkbox\" autofocus /></td>\n                            <td><input formControlName=\"level22\" type=\"checkbox\" autofocus /></td>\n                            <td><input formControlName=\"level23\" type=\"checkbox\" autofocus /></td>\n                            <td><input formControlName=\"level24\" type=\"checkbox\" autofocus /></td>\n                            <td><input formControlName=\"level25\" type=\"checkbox\" autofocus /></td>\n                        </tr>\n                        <tr>\n                            <td>Guided Spec</td>\n                            <td><input formControlName=\"level26\" type=\"checkbox\" autofocus /></td>\n                            <td><input formControlName=\"level27\" type=\"checkbox\" autofocus /></td>\n                            <td><input formControlName=\"level28\" type=\"checkbox\" autofocus /></td>\n                            <td><input formControlName=\"level29\" type=\"checkbox\" autofocus /></td>\n                            <td><input formControlName=\"level30\" type=\"checkbox\" autofocus /></td>\n                        </tr>\n                        <tr>\n                            <td>Color Details</td>\n                            <td><input formControlName=\"level31\" type=\"checkbox\" autofocus /></td>\n                            <td><input formControlName=\"level32\" type=\"checkbox\" autofocus /></td>\n                            <td><input formControlName=\"level33\" type=\"checkbox\" autofocus /></td>\n                            <td><input formControlName=\"level34\" type=\"checkbox\" autofocus /></td>\n                            <td><input formControlName=\"level35\" type=\"checkbox\" autofocus /></td>\n                        </tr>\n                        <tr>\n                            <td>Techpack</td>\n                            <td><input formControlName=\"level36\" type=\"checkbox\" autofocus /></td>\n                            <td><input formControlName=\"level37\" type=\"checkbox\" autofocus /></td>\n                            <td><input formControlName=\"level38\" type=\"checkbox\" autofocus /></td>\n                            <td><input formControlName=\"level39\" type=\"checkbox\" autofocus /></td>\n                            <td><input formControlName=\"level40\" type=\"checkbox\" autofocus /></td>\n                        </tr>\n                        <tr>\n                            <td>Sample Vendor</td>\n                            <td><input formControlName=\"level41\" type=\"checkbox\" autofocus /></td>\n                            <td><input formControlName=\"level42\" type=\"checkbox\" autofocus /></td>\n                            <td><input formControlName=\"level43\" type=\"checkbox\" autofocus /></td>\n                            <td><input formControlName=\"level44\" type=\"checkbox\" autofocus /></td>\n                            <td><input formControlName=\"level45\" type=\"checkbox\" autofocus /></td>\n                        </tr>\n                        <tr>\n                            <td>&nbsp;</td>\n                            <td>&nbsp;</td>\n                            <td>&nbsp;</td>\n                            <td>&nbsp;</td>\n                            <td>&nbsp;</td>\n                            <td>&nbsp;</td>\n                        </tr>\n                        <tr>\n                            <td><b>Back End</b></td>\n                            <td></td>\n                            <td></td>\n                            <td></td>\n                            <td></td>\n                            <td></td>\n                        </tr>\n                        <tr>\n                            <td>&nbsp;</td>\n                            <td>View</td>\n                            <td>Allow</td>\n                            <td>Deny</td>\n                            <td>Approve</td>\n                            <td>&nbsp;</td>\n                        </tr>\n                        <tr>\n                            <td>General Library</td>\n                            <td><input formControlName=\"level46\" type=\"checkbox\" value=\"this.data.IsActive\" autofocus /></td>\n                            <td><input formControlName=\"level47\" type=\"checkbox\" value=\"this.data.IsActive\" autofocus /></td>\n                            <td><input formControlName=\"level48\" type=\"checkbox\" value=\"this.data.IsActive\" autofocus /></td>\n                            <td><input formControlName=\"level49\" type=\"checkbox\" value=\"this.data.IsActive\" autofocus /></td>\n                            <td>&nbsp;</td>\n                        </tr>\n                        <tr>\n                            <td>Color Library</td>\n                            <td><input formControlName=\"level50\" type=\"checkbox\" value=\"this.data.IsActive\" autofocus /></td>\n                            <td><input formControlName=\"level51\" type=\"checkbox\" value=\"this.data.IsActive\" autofocus /></td>\n                            <td><input formControlName=\"level52\" type=\"checkbox\" value=\"this.data.IsActive\" autofocus /></td>\n                            <td><input formControlName=\"level53\" type=\"checkbox\" value=\"this.data.IsActive\" autofocus /></td>\n                            <td>&nbsp;</td>\n                        </tr>\n                        <tr>\n                            <td>Fabric Library</td>\n                            <td><input formControlName=\"level54\" type=\"checkbox\" value=\"this.data.IsActive\" autofocus /></td>\n                            <td><input formControlName=\"level55\" type=\"checkbox\" value=\"this.data.IsActive\" autofocus /></td>\n                            <td><input formControlName=\"level56\" type=\"checkbox\" value=\"this.data.IsActive\" autofocus /></td>\n                            <td><input formControlName=\"level57\" type=\"checkbox\" value=\"this.data.IsActive\" autofocus /></td>\n                            <td>&nbsp;</td>\n                        </tr>\n                        <tr>\n                            <td>Accessory Library</td>\n                            <td><input formControlName=\"level58\" type=\"checkbox\" value=\"this.data.IsActive\" autofocus /></td>\n                            <td><input formControlName=\"level59\" type=\"checkbox\" value=\"this.data.IsActive\" autofocus /></td>\n                            <td><input formControlName=\"level60\" type=\"checkbox\" value=\"this.data.IsActive\" autofocus /></td>\n                            <td><input formControlName=\"level61\" type=\"checkbox\" value=\"this.data.IsActive\" autofocus /></td>\n                            <td>&nbsp;</td>\n                        </tr>\n                        <tr>\n                            <td>Graphic Library</td>\n                            <td><input formControlName=\"level62\" type=\"checkbox\" value=\"this.data.IsActive\" autofocus /></td>\n                            <td><input formControlName=\"level63\" type=\"checkbox\" value=\"this.data.IsActive\" autofocus /></td>\n                            <td><input formControlName=\"level64\" type=\"checkbox\" value=\"this.data.IsActive\" autofocus /></td>\n                            <td><input formControlName=\"level65\" type=\"checkbox\" value=\"this.data.IsActive\" autofocus /></td>\n                            <td>&nbsp;</td>\n                        </tr>\n                        <tr>\n                            <td>Wash Library</td>\n                            <td><input formControlName=\"level66\" type=\"checkbox\" value=\"this.data.IsActive\" autofocus /></td>\n                            <td><input formControlName=\"level67\" type=\"checkbox\" value=\"this.data.IsActive\" autofocus /></td>\n                            <td><input formControlName=\"level68\" type=\"checkbox\" value=\"this.data.IsActive\" autofocus /></td>\n                            <td><input formControlName=\"level69\" type=\"checkbox\" value=\"this.data.IsActive\" autofocus /></td>\n                            <td>&nbsp;</td>\n                        </tr>\n                        <tr>\n                            <td>Shipping Library</td>\n                            <td><input formControlName=\"level70\" type=\"checkbox\" value=\"this.data.IsActive\" autofocus /></td>\n                            <td><input formControlName=\"level71\" type=\"checkbox\" value=\"this.data.IsActive\" autofocus /></td>\n                            <td><input formControlName=\"level72\" type=\"checkbox\" value=\"this.data.IsActive\" autofocus /></td>\n                            <td><input formControlName=\"level73\" type=\"checkbox\" value=\"this.data.IsActive\" autofocus /></td>\n                            <td>&nbsp;</td>\n                        </tr>\n                        <tr>\n                            <td>Spec Library</td>\n                            <td><input formControlName=\"level74\" type=\"checkbox\" value=\"this.data.IsActive\" autofocus /></td>\n                            <td><input formControlName=\"level75\" type=\"checkbox\" value=\"this.data.IsActive\" autofocus /></td>\n                            <td><input formControlName=\"level76\" type=\"checkbox\" value=\"this.data.IsActive\" autofocus /></td>\n                            <td><input formControlName=\"level77\" type=\"checkbox\" value=\"this.data.IsActive\" autofocus /></td>\n                            <td>&nbsp;</td>\n                        </tr>\n                        <tr>\n                            <td>Techpack Library</td>\n                            <td><input formControlName=\"level78\" type=\"checkbox\" value=\"this.data.IsActive\" autofocus /></td>\n                            <td><input formControlName=\"level79\" type=\"checkbox\" value=\"this.data.IsActive\" autofocus /></td>\n                            <td><input formControlName=\"level80\" type=\"checkbox\" value=\"this.data.IsActive\" autofocus /></td>\n                            <td><input formControlName=\"level81\" type=\"checkbox\" value=\"this.data.IsActive\" autofocus /></td>\n                            <td>&nbsp;</td>\n                        </tr>\n                        <tr>\n                            <td>&nbsp;</td>\n                            <td>&nbsp;</td>\n                            <td>&nbsp;</td>\n                            <td>&nbsp;</td>\n                            <td>&nbsp;</td>\n                            <td>&nbsp;</td>\n                        </tr>\n                        <tr>\n                            <td><b>User Access</b></td>\n                            <td></td>\n                            <td></td>\n                            <td></td>\n                            <td></td>\n                            <td></td>\n                        </tr>\n                        <tr>\n                            <td>&nbsp;</td>\n                            <td>Allow</td>\n                            <td>Deny</td>\n                            <td>&nbsp;</td>\n                            <td>&nbsp;</td>\n                            <td>&nbsp;</td>\n                        </tr>\n                        <tr>\n                            <td>Create User</td>\n                            <td><input formControlName=\"level82\" type=\"checkbox\" value=\"this.data.IsActive\" autofocus /></td>\n                            <td><input formControlName=\"level83\" type=\"checkbox\" value=\"this.data.IsActive\" autofocus /></td>\n                            <td>&nbsp;</td>\n                            <td>&nbsp;</td>\n                            <td>&nbsp;</td>\n                        </tr>\n                        <tr>\n                            <td>Edit User</td>\n                            <td><input formControlName=\"level84\" type=\"checkbox\" value=\"this.data.IsActive\" autofocus /></td>\n                            <td><input formControlName=\"level85\" type=\"checkbox\" value=\"this.data.IsActive\" autofocus /></td>\n                            <td>&nbsp;</td>\n                            <td>&nbsp;</td>\n                            <td>&nbsp;</td>\n                        </tr>\n                        <tr>\n                            <td>Delete User</td>\n                            <td><input formControlName=\"level86\" type=\"checkbox\" value=\"this.data.IsActive\" autofocus /></td>\n                            <td><input formControlName=\"level87\" type=\"checkbox\" value=\"this.data.IsActive\" autofocus /></td>\n                            <td>&nbsp;</td>\n                            <td>&nbsp;</td>\n                            <td>&nbsp;</td>\n                        </tr>\n                        <tr>\n                            <td>Assign User to Role</td>\n                            <td><input formControlName=\"level88\" type=\"checkbox\" value=\"this.data.IsActive\" autofocus /></td>\n                            <td><input formControlName=\"level89\" type=\"checkbox\" value=\"this.data.IsActive\" autofocus /></td>\n                            <td>&nbsp;</td>\n                            <td>&nbsp;</td>\n                            <td>&nbsp;</td>\n                        </tr>\n                        <tr>\n                            <td>Vendor/Supplier Management</td>\n                            <td><input formControlName=\"level90\" type=\"checkbox\" value=\"this.data.IsActive\" autofocus /></td>\n                            <td><input formControlName=\"level91\" type=\"checkbox\" value=\"this.data.IsActive\" autofocus /></td>\n                            <td>&nbsp;</td>\n                            <td>&nbsp;</td>\n                            <td>&nbsp;</td>\n                        </tr>\n                    </table>\n\n                </div>\n\n                <div class=\"form-group\">\n                    <input type=\"button\" class=\"btn btn-primary btn-block\" [disabled]=\"!userMatrixForm.valid\" value=\"Add\" (click)=\"onSubmit(this.userMatrixForm.value)\" />\n                </div>\n            </form>\n        </div>\n    </div>\n",
                    providers: [userRole_service_1.UserRoleService, forms_1.FormBuilder]
                }),
                __metadata("design:paramtypes", [forms_1.FormBuilder,
                    userRole_service_1.UserRoleService,
                    router_1.Router,
                    auth_service_1.AuthService,
                    router_1.ActivatedRoute])
            ], UserRoleAddComponent);
            exports_1("UserRoleAddComponent", UserRoleAddComponent);
        }
    };
});
