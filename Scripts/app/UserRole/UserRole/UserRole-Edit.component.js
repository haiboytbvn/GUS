System.register(["@angular/core", "@angular/forms", "@angular/router", "../shared/userRole.service", "../../auth.service"], function (exports_1, context_1) {
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
    var core_1, forms_1, router_1, userRole_service_1, auth_service_1, UserRoleEditComponent;
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
            function (auth_service_1_1) {
                auth_service_1 = auth_service_1_1;
            }
        ],
        execute: function () {
            UserRoleEditComponent = (function () {
                function UserRoleEditComponent(fb, userRoleService, router, authService, activatedRoute) {
                    this.fb = fb;
                    this.userRoleService = userRoleService;
                    this.router = router;
                    this.authService = authService;
                    this.activatedRoute = activatedRoute;
                    this.title = "Edit User Role Matrix";
                    this.errorMessage = null;
                    this.isDelete = false;
                    //isFormValuesChanged = false;
                    this.isFormValuesChanged = true;
                }
                UserRoleEditComponent.prototype.ngOnInit = function () {
                    var _this = this;
                    if (!this.authService.isLoggedIn()) {
                        this.router.navigate([""]);
                    }
                    var id = this.activatedRoute.snapshot.params["id"];
                    if (id !== "") {
                        this.userRoleService.get(id).subscribe(function (data) {
                            _this.data = data;
                            _this.PopulatePremissionData(_this.data.PremissionLevel);
                        });
                    }
                    else {
                        this.router.navigate(["userrolelist/add"]);
                    }
                };
                UserRoleEditComponent.prototype.ngAfterViewInit = function () {
                    jQuery(this.errorDiv.nativeElement).hide();
                };
                UserRoleEditComponent.prototype.onUpdate = function (data) {
                    var _this = this;
                    this.data.PremissionLevel = this.GetPremissionLevel();
                    this.data.Id = this.activatedRoute.snapshot.params["id"];
                    console.log("test:" + this.data.PremissionLevel);
                    this.userRoleService.update(data).subscribe(function (data) {
                        if (data.error == null) {
                            _this.data = data;
                            _this.errorMessage = 'User role details updated successfully';
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
                UserRoleEditComponent.prototype.onDelete = function (data) {
                    var _this = this;
                    this.userRoleService.delete(data.Id).subscribe(function (data) {
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
                UserRoleEditComponent.prototype.onBack = function () {
                    this.router.navigate(["userrolelist"]);
                };
                UserRoleEditComponent.prototype.deleteConfirm = function () {
                    this.isDelete = true;
                };
                UserRoleEditComponent.prototype.close = function () {
                    this.isDelete = false;
                };
                UserRoleEditComponent.prototype.displayMessage = function (message, status) {
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
                UserRoleEditComponent.prototype.isFormChanged = function (value) {
                    var _this = this;
                    this.userRoleService.get(this.data.Id).subscribe(function (oldData) {
                        _this.isFormDataChanged(oldData);
                    });
                };
                UserRoleEditComponent.prototype.isFormDataChanged = function (oldData) {
                    console.log(this.data);
                    console.log(oldData);
                    if (JSON.stringify(this.data) === JSON.stringify(oldData))
                        //this.isFormValuesChanged = false;
                        this.isFormValuesChanged = true;
                    else
                        this.isFormValuesChanged = true;
                };
                // Helper
                UserRoleEditComponent.prototype.PopulatePremissionData = function (premissionLevelStr) {
                    var preArr = premissionLevelStr.split('|');
                    console.log(preArr);
                    this.cbLevel1 = this.GetCheckboxValueHelper(preArr[0][0]);
                    this.cbLevel2 = this.GetCheckboxValueHelper(preArr[0][1]);
                    this.cbLevel3 = this.GetCheckboxValueHelper(preArr[0][2]);
                    this.cbLevel4 = this.GetCheckboxValueHelper(preArr[0][3]);
                    this.cbLevel5 = this.GetCheckboxValueHelper(preArr[0][4]);
                    this.cbLevel6 = this.GetCheckboxValueHelper(preArr[1][0]);
                    this.cbLevel7 = this.GetCheckboxValueHelper(preArr[1][1]);
                    this.cbLevel8 = this.GetCheckboxValueHelper(preArr[1][2]);
                    this.cbLevel9 = this.GetCheckboxValueHelper(preArr[1][3]);
                    this.cbLevel10 = this.GetCheckboxValueHelper(preArr[1][4]);
                    this.cbLevel11 = this.GetCheckboxValueHelper(preArr[2][0]);
                    this.cbLevel12 = this.GetCheckboxValueHelper(preArr[2][1]);
                    this.cbLevel13 = this.GetCheckboxValueHelper(preArr[2][2]);
                    this.cbLevel14 = this.GetCheckboxValueHelper(preArr[2][3]);
                    this.cbLevel15 = this.GetCheckboxValueHelper(preArr[2][4]);
                    this.cbLevel16 = this.GetCheckboxValueHelper(preArr[3][0]);
                    this.cbLevel17 = this.GetCheckboxValueHelper(preArr[3][1]);
                    this.cbLevel18 = this.GetCheckboxValueHelper(preArr[3][2]);
                    this.cbLevel19 = this.GetCheckboxValueHelper(preArr[3][3]);
                    this.cbLevel20 = this.GetCheckboxValueHelper(preArr[3][4]);
                    this.cbLevel21 = this.GetCheckboxValueHelper(preArr[4][0]);
                    this.cbLevel22 = this.GetCheckboxValueHelper(preArr[4][1]);
                    this.cbLevel23 = this.GetCheckboxValueHelper(preArr[4][2]);
                    this.cbLevel24 = this.GetCheckboxValueHelper(preArr[4][3]);
                    this.cbLevel25 = this.GetCheckboxValueHelper(preArr[4][4]);
                    this.cbLevel26 = this.GetCheckboxValueHelper(preArr[5][0]);
                    this.cbLevel27 = this.GetCheckboxValueHelper(preArr[5][1]);
                    this.cbLevel28 = this.GetCheckboxValueHelper(preArr[5][2]);
                    this.cbLevel29 = this.GetCheckboxValueHelper(preArr[5][3]);
                    this.cbLevel30 = this.GetCheckboxValueHelper(preArr[5][4]);
                    this.cbLevel31 = this.GetCheckboxValueHelper(preArr[6][0]);
                    this.cbLevel32 = this.GetCheckboxValueHelper(preArr[6][1]);
                    this.cbLevel33 = this.GetCheckboxValueHelper(preArr[6][2]);
                    this.cbLevel34 = this.GetCheckboxValueHelper(preArr[6][3]);
                    this.cbLevel35 = this.GetCheckboxValueHelper(preArr[6][4]);
                    this.cbLevel36 = this.GetCheckboxValueHelper(preArr[7][0]);
                    this.cbLevel37 = this.GetCheckboxValueHelper(preArr[7][1]);
                    this.cbLevel38 = this.GetCheckboxValueHelper(preArr[7][2]);
                    this.cbLevel39 = this.GetCheckboxValueHelper(preArr[7][3]);
                    this.cbLevel40 = this.GetCheckboxValueHelper(preArr[7][4]);
                    this.cbLevel41 = this.GetCheckboxValueHelper(preArr[8][0]);
                    this.cbLevel42 = this.GetCheckboxValueHelper(preArr[8][1]);
                    this.cbLevel43 = this.GetCheckboxValueHelper(preArr[8][2]);
                    this.cbLevel44 = this.GetCheckboxValueHelper(preArr[8][3]);
                    this.cbLevel45 = this.GetCheckboxValueHelper(preArr[8][4]);
                    this.cbLevel46 = this.GetCheckboxValueHelper(preArr[9][0]);
                    this.cbLevel47 = this.GetCheckboxValueHelper(preArr[9][1]);
                    this.cbLevel48 = this.GetCheckboxValueHelper(preArr[9][2]);
                    this.cbLevel49 = this.GetCheckboxValueHelper(preArr[9][3]);
                    this.cbLevel50 = this.GetCheckboxValueHelper(preArr[10][0]);
                    this.cbLevel51 = this.GetCheckboxValueHelper(preArr[10][1]);
                    this.cbLevel52 = this.GetCheckboxValueHelper(preArr[10][2]);
                    this.cbLevel53 = this.GetCheckboxValueHelper(preArr[10][3]);
                    this.cbLevel54 = this.GetCheckboxValueHelper(preArr[11][0]);
                    this.cbLevel55 = this.GetCheckboxValueHelper(preArr[11][1]);
                    this.cbLevel56 = this.GetCheckboxValueHelper(preArr[11][2]);
                    this.cbLevel57 = this.GetCheckboxValueHelper(preArr[11][3]);
                    this.cbLevel58 = this.GetCheckboxValueHelper(preArr[12][0]);
                    this.cbLevel59 = this.GetCheckboxValueHelper(preArr[12][1]);
                    this.cbLevel60 = this.GetCheckboxValueHelper(preArr[12][2]);
                    this.cbLevel61 = this.GetCheckboxValueHelper(preArr[12][3]);
                    this.cbLevel62 = this.GetCheckboxValueHelper(preArr[13][0]);
                    this.cbLevel63 = this.GetCheckboxValueHelper(preArr[13][1]);
                    this.cbLevel64 = this.GetCheckboxValueHelper(preArr[13][2]);
                    this.cbLevel65 = this.GetCheckboxValueHelper(preArr[13][3]);
                    this.cbLevel66 = this.GetCheckboxValueHelper(preArr[14][0]);
                    this.cbLevel67 = this.GetCheckboxValueHelper(preArr[14][1]);
                    this.cbLevel68 = this.GetCheckboxValueHelper(preArr[14][2]);
                    this.cbLevel69 = this.GetCheckboxValueHelper(preArr[14][3]);
                    this.cbLevel70 = this.GetCheckboxValueHelper(preArr[15][0]);
                    this.cbLevel71 = this.GetCheckboxValueHelper(preArr[15][1]);
                    this.cbLevel72 = this.GetCheckboxValueHelper(preArr[15][2]);
                    this.cbLevel73 = this.GetCheckboxValueHelper(preArr[15][3]);
                    this.cbLevel74 = this.GetCheckboxValueHelper(preArr[16][0]);
                    this.cbLevel75 = this.GetCheckboxValueHelper(preArr[16][1]);
                    this.cbLevel76 = this.GetCheckboxValueHelper(preArr[16][2]);
                    this.cbLevel77 = this.GetCheckboxValueHelper(preArr[16][3]);
                    this.cbLevel78 = this.GetCheckboxValueHelper(preArr[17][0]);
                    this.cbLevel79 = this.GetCheckboxValueHelper(preArr[17][1]);
                    this.cbLevel80 = this.GetCheckboxValueHelper(preArr[17][2]);
                    this.cbLevel81 = this.GetCheckboxValueHelper(preArr[17][3]);
                    this.cbLevel82 = this.GetCheckboxValueHelper(preArr[18][0]);
                    this.cbLevel83 = this.GetCheckboxValueHelper(preArr[18][1]);
                    this.cbLevel84 = this.GetCheckboxValueHelper(preArr[19][0]);
                    this.cbLevel85 = this.GetCheckboxValueHelper(preArr[19][1]);
                    this.cbLevel86 = this.GetCheckboxValueHelper(preArr[20][0]);
                    this.cbLevel87 = this.GetCheckboxValueHelper(preArr[20][1]);
                    this.cbLevel88 = this.GetCheckboxValueHelper(preArr[21][0]);
                    this.cbLevel89 = this.GetCheckboxValueHelper(preArr[21][1]);
                    this.cbLevel90 = this.GetCheckboxValueHelper(preArr[22][0]);
                    this.cbLevel91 = this.GetCheckboxValueHelper(preArr[22][1]);
                };
                UserRoleEditComponent.prototype.GetCheckboxValueHelper = function (value) {
                    if (value == "0")
                        return false;
                    else
                        return true;
                };
                UserRoleEditComponent.prototype.GetPremissionLevel = function () {
                    var result = "";
                    result += this.GetPremissionValueHelper(this.cbLevel1);
                    result += this.GetPremissionValueHelper(this.cbLevel2);
                    result += this.GetPremissionValueHelper(this.cbLevel3);
                    result += this.GetPremissionValueHelper(this.cbLevel4);
                    result += this.GetPremissionValueHelper(this.cbLevel5);
                    result += this.GetPremissionValueHelper(this.cbLevel6);
                    result += this.GetPremissionValueHelper(this.cbLevel7);
                    result += this.GetPremissionValueHelper(this.cbLevel8);
                    result += this.GetPremissionValueHelper(this.cbLevel9);
                    result += this.GetPremissionValueHelper(this.cbLevel10);
                    result += this.GetPremissionValueHelper(this.cbLevel11);
                    result += this.GetPremissionValueHelper(this.cbLevel12);
                    result += this.GetPremissionValueHelper(this.cbLevel13);
                    result += this.GetPremissionValueHelper(this.cbLevel14);
                    result += this.GetPremissionValueHelper(this.cbLevel15);
                    result += this.GetPremissionValueHelper(this.cbLevel16);
                    result += this.GetPremissionValueHelper(this.cbLevel17);
                    result += this.GetPremissionValueHelper(this.cbLevel18);
                    result += this.GetPremissionValueHelper(this.cbLevel19);
                    result += this.GetPremissionValueHelper(this.cbLevel20);
                    result += this.GetPremissionValueHelper(this.cbLevel21);
                    result += this.GetPremissionValueHelper(this.cbLevel22);
                    result += this.GetPremissionValueHelper(this.cbLevel23);
                    result += this.GetPremissionValueHelper(this.cbLevel24);
                    result += this.GetPremissionValueHelper(this.cbLevel25);
                    result += this.GetPremissionValueHelper(this.cbLevel26);
                    result += this.GetPremissionValueHelper(this.cbLevel27);
                    result += this.GetPremissionValueHelper(this.cbLevel28);
                    result += this.GetPremissionValueHelper(this.cbLevel29);
                    result += this.GetPremissionValueHelper(this.cbLevel30);
                    result += this.GetPremissionValueHelper(this.cbLevel31);
                    result += this.GetPremissionValueHelper(this.cbLevel32);
                    result += this.GetPremissionValueHelper(this.cbLevel33);
                    result += this.GetPremissionValueHelper(this.cbLevel34);
                    result += this.GetPremissionValueHelper(this.cbLevel35);
                    result += this.GetPremissionValueHelper(this.cbLevel36);
                    result += this.GetPremissionValueHelper(this.cbLevel37);
                    result += this.GetPremissionValueHelper(this.cbLevel38);
                    result += this.GetPremissionValueHelper(this.cbLevel39);
                    result += this.GetPremissionValueHelper(this.cbLevel40);
                    result += this.GetPremissionValueHelper(this.cbLevel41);
                    result += this.GetPremissionValueHelper(this.cbLevel42);
                    result += this.GetPremissionValueHelper(this.cbLevel43);
                    result += this.GetPremissionValueHelper(this.cbLevel44);
                    result += this.GetPremissionValueHelper(this.cbLevel45);
                    result += this.GetPremissionValueHelper(this.cbLevel46);
                    result += this.GetPremissionValueHelper(this.cbLevel47);
                    result += this.GetPremissionValueHelper(this.cbLevel48);
                    result += this.GetPremissionValueHelper(this.cbLevel49);
                    result += this.GetPremissionValueHelper(this.cbLevel50);
                    result += this.GetPremissionValueHelper(this.cbLevel51);
                    result += this.GetPremissionValueHelper(this.cbLevel52);
                    result += this.GetPremissionValueHelper(this.cbLevel53);
                    result += this.GetPremissionValueHelper(this.cbLevel54);
                    result += this.GetPremissionValueHelper(this.cbLevel55);
                    result += this.GetPremissionValueHelper(this.cbLevel56);
                    result += this.GetPremissionValueHelper(this.cbLevel57);
                    result += this.GetPremissionValueHelper(this.cbLevel58);
                    result += this.GetPremissionValueHelper(this.cbLevel59);
                    result += this.GetPremissionValueHelper(this.cbLevel60);
                    result += this.GetPremissionValueHelper(this.cbLevel61);
                    result += this.GetPremissionValueHelper(this.cbLevel62);
                    result += this.GetPremissionValueHelper(this.cbLevel63);
                    result += this.GetPremissionValueHelper(this.cbLevel64);
                    result += this.GetPremissionValueHelper(this.cbLevel65);
                    result += this.GetPremissionValueHelper(this.cbLevel66);
                    result += this.GetPremissionValueHelper(this.cbLevel67);
                    result += this.GetPremissionValueHelper(this.cbLevel68);
                    result += this.GetPremissionValueHelper(this.cbLevel69);
                    result += this.GetPremissionValueHelper(this.cbLevel70);
                    result += this.GetPremissionValueHelper(this.cbLevel71);
                    result += this.GetPremissionValueHelper(this.cbLevel72);
                    result += this.GetPremissionValueHelper(this.cbLevel73);
                    result += this.GetPremissionValueHelper(this.cbLevel74);
                    result += this.GetPremissionValueHelper(this.cbLevel75);
                    result += this.GetPremissionValueHelper(this.cbLevel76);
                    result += this.GetPremissionValueHelper(this.cbLevel77);
                    result += this.GetPremissionValueHelper(this.cbLevel78);
                    result += this.GetPremissionValueHelper(this.cbLevel79);
                    result += this.GetPremissionValueHelper(this.cbLevel80);
                    result += this.GetPremissionValueHelper(this.cbLevel81);
                    result += this.GetPremissionValueHelper(this.cbLevel82);
                    result += this.GetPremissionValueHelper(this.cbLevel83);
                    result += this.GetPremissionValueHelper(this.cbLevel84);
                    result += this.GetPremissionValueHelper(this.cbLevel85);
                    result += this.GetPremissionValueHelper(this.cbLevel86);
                    result += this.GetPremissionValueHelper(this.cbLevel87);
                    result += this.GetPremissionValueHelper(this.cbLevel88);
                    result += this.GetPremissionValueHelper(this.cbLevel89);
                    result += this.GetPremissionValueHelper(this.cbLevel90);
                    result += this.GetPremissionValueHelper(this.cbLevel91);
                    return result;
                };
                UserRoleEditComponent.prototype.GetPremissionValueHelper = function (value) {
                    if (value == true)
                        return "1";
                    else
                        return "0";
                };
                return UserRoleEditComponent;
            }());
            __decorate([
                core_1.ViewChild('errorDiv'),
                __metadata("design:type", core_1.ElementRef)
            ], UserRoleEditComponent.prototype, "errorDiv", void 0);
            UserRoleEditComponent = __decorate([
                core_1.Component({
                    selector: "userRole-edit",
                    template: "\n    <div class=\"error-message\" #errorDiv></div>\n    <div>\n        <h2>\n            <a href=\"javascript:void(0)\" (click)=\"onBack()\">\n                &laquo; Back to User List\n            </a>\n        </h2>\n        <div class=\"user-container\">\n            <form class=\"form-user\" #userForm=\"ngForm\" *ngIf=\"data\">\n                <h2 class=\"form-user-heading\">{{title}}</h2>\n\n\n\n                <div class=\"form-group\">\n                    <input name=\"input-name\" type=\"text\" class=\"form-control\" placeholder=\"Enter user name\" [(ngModel)]=\"data.Name\" #username=\"ngModel\" autofocus required (ngModelChange)=\"isFormChanged($event)\" />\n                    <span class=\"validator-label valid\" *ngIf=\"username.valid\">\n                        <span class=\"glyphicon glyphicon-ok\" aria-hidden=\"true\"></span>\n                        valid!\n                    </span>\n                    <span class=\"validator-label invalid\" *ngIf=\"!username.valid && !username.pristine\">\n                        <span class=\"glyphicon glyphicon-remove\" aria-hidden=\"true\"></span>\n                        invalid\n                    </span>\n                </div>\n                <div class=\"form-group\">\n                    Is Active? <input name=\"input-isActive\" type=\"checkbox\" [(ngModel)]=\"data.IsActive\" #isActive=\"ngModel\" autofocus required (ngModelChange)=\"isFormChanged($event)\" />\n                </div>\n\n                <div class=\"form-group\">\n                    <table id=\"tbUserMatrix\">\n                        <tr>\n                            <td><b>Front End</b></td>\n                            <td></td>\n                            <td></td>\n                            <td></td>\n                            <td></td>\n                            <td></td>\n                        </tr>\n                        <tr>\n                            <td>&nbsp;</td>\n                            <td>View</td>\n                            <td>Allow</td>\n                            <td>Deny</td>\n                            <td>Approve</td>\n                            <td>Chat</td>\n                        </tr>\n                        <tr>\n                            <td>Project Setup</td>\n                            <td><input name=\"level1\" type=\"checkbox\" [(ngModel)]=\"cbLevel1\" autofocus /></td>\n                            <td><input name=\"level2\" type=\"checkbox\" [(ngModel)]=\"cbLevel2\" autofocus /></td>\n                            <td><input name=\"level3\" type=\"checkbox\" [(ngModel)]=\"cbLevel3\" autofocus /></td>\n                            <td><input name=\"level4\" type=\"checkbox\" [(ngModel)]=\"cbLevel4\" autofocus /></td>\n                            <td><input name=\"level5\" type=\"checkbox\" [(ngModel)]=\"cbLevel5\" autofocus /></td>\n                        </tr>\n                        <tr>\n                            <td>Colorway</td>\n                            <td><input name=\"level6\" type=\"checkbox\" [(ngModel)]=\"cbLevel6\" autofocus /></td>\n                            <td><input name=\"level7\" type=\"checkbox\" [(ngModel)]=\"cbLevel7\" autofocus /></td>\n                            <td><input name=\"level8\" type=\"checkbox\" [(ngModel)]=\"cbLevel8\" autofocus /></td>\n                            <td><input name=\"level9\" type=\"checkbox\" [(ngModel)]=\"cbLevel9\" autofocus /></td>\n                            <td><input name=\"level10\" type=\"checkbox\" [(ngModel)]=\"cbLevel0\" autofocus /></td>\n                        </tr>\n                        <tr>\n                            <td>Fabrics</td>\n                            <td><input name=\"level11\" type=\"checkbox\" [(ngModel)]=\"cbLevel11\" autofocus /></td>\n                            <td><input name=\"level12\" type=\"checkbox\" [(ngModel)]=\"cbLevel12\" autofocus /></td>\n                            <td><input name=\"level13\" type=\"checkbox\" [(ngModel)]=\"cbLevel13\" autofocus /></td>\n                            <td><input name=\"level14\" type=\"checkbox\" [(ngModel)]=\"cbLevel14\" autofocus /></td>\n                            <td><input name=\"level15\" type=\"checkbox\" [(ngModel)]=\"cbLevel15\" autofocus /></td>\n                        </tr>\n                        <tr>\n                            <td>Accessories</td>\n                            <td><input name=\"level16\" type=\"checkbox\" [(ngModel)]=\"cbLevel16\" autofocus /></td>\n                            <td><input name=\"level17\" type=\"checkbox\" [(ngModel)]=\"cbLevel17\" autofocus /></td>\n                            <td><input name=\"level18\" type=\"checkbox\" [(ngModel)]=\"cbLevel18\" autofocus /></td>\n                            <td><input name=\"level19\" type=\"checkbox\" [(ngModel)]=\"cbLevel19\" autofocus /></td>\n                            <td><input name=\"level20\" type=\"checkbox\" [(ngModel)]=\"cbLevel20\" autofocus /></td>\n                        </tr>\n                        <tr>\n                            <td>PEW</td>\n                            <td><input name=\"level21\" type=\"checkbox\" [(ngModel)]=\"cbLevel21\" autofocus /></td>\n                            <td><input name=\"level22\" type=\"checkbox\" [(ngModel)]=\"cbLevel22\" autofocus /></td>\n                            <td><input name=\"level23\" type=\"checkbox\" [(ngModel)]=\"cbLevel23\" autofocus /></td>\n                            <td><input name=\"level24\" type=\"checkbox\" [(ngModel)]=\"cbLevel24\" autofocus /></td>\n                            <td><input name=\"level25\" type=\"checkbox\" [(ngModel)]=\"cbLevel25\" autofocus /></td>\n                        </tr>\n                        <tr>\n                            <td>Guided Spec</td>\n                            <td><input name=\"level26\" type=\"checkbox\" [(ngModel)]=\"cbLevel26\" autofocus /></td>\n                            <td><input name=\"level27\" type=\"checkbox\" [(ngModel)]=\"cbLevel27\" autofocus /></td>\n                            <td><input name=\"level28\" type=\"checkbox\" [(ngModel)]=\"cbLevel28\" autofocus /></td>\n                            <td><input name=\"level29\" type=\"checkbox\" [(ngModel)]=\"cbLevel29\" autofocus /></td>\n                            <td><input name=\"level30\" type=\"checkbox\" [(ngModel)]=\"cbLevel30\" autofocus /></td>\n                        </tr>\n                        <tr>\n                            <td>Color Details</td>\n                            <td><input name=\"level31\" type=\"checkbox\" [(ngModel)]=\"cbLevel31\" autofocus /></td>\n                            <td><input name=\"level32\" type=\"checkbox\" [(ngModel)]=\"cbLevel32\" autofocus /></td>\n                            <td><input name=\"level33\" type=\"checkbox\" [(ngModel)]=\"cbLevel33\" autofocus /></td>\n                            <td><input name=\"level34\" type=\"checkbox\" [(ngModel)]=\"cbLevel34\" autofocus /></td>\n                            <td><input name=\"level35\" type=\"checkbox\" [(ngModel)]=\"cbLevel35\" autofocus /></td>\n                        </tr>\n                        <tr>\n                            <td>Techpack</td>\n                            <td><input name=\"level36\" type=\"checkbox\" [(ngModel)]=\"cbLevel36\" autofocus /></td>\n                            <td><input name=\"level37\" type=\"checkbox\" [(ngModel)]=\"cbLevel37\" autofocus /></td>\n                            <td><input name=\"level38\" type=\"checkbox\" [(ngModel)]=\"cbLevel38\" autofocus /></td>\n                            <td><input name=\"level39\" type=\"checkbox\" [(ngModel)]=\"cbLevel39\" autofocus /></td>\n                            <td><input name=\"level40\" type=\"checkbox\" [(ngModel)]=\"cbLevel40\" autofocus /></td>\n                        </tr>\n                        <tr>\n                            <td>Sample Vendor</td>\n                            <td><input name=\"level41\" type=\"checkbox\" [(ngModel)]=\"cbLevel41\" autofocus /></td>\n                            <td><input name=\"level42\" type=\"checkbox\" [(ngModel)]=\"cbLevel42\" autofocus /></td>\n                            <td><input name=\"level43\" type=\"checkbox\" [(ngModel)]=\"cbLevel43\" autofocus /></td>\n                            <td><input name=\"level44\" type=\"checkbox\" [(ngModel)]=\"cbLevel44\" autofocus /></td>\n                            <td><input name=\"level45\" type=\"checkbox\" [(ngModel)]=\"cbLevel45\" autofocus /></td>\n                        </tr>\n                        <tr>\n                            <td>&nbsp;</td>\n                            <td>&nbsp;</td>\n                            <td>&nbsp;</td>\n                            <td>&nbsp;</td>\n                            <td>&nbsp;</td>\n                            <td>&nbsp;</td>\n                        </tr>\n                        <tr>\n                            <td><b>Back End</b></td>\n                            <td></td>\n                            <td></td>\n                            <td></td>\n                            <td></td>\n                            <td></td>\n                        </tr>\n                        <tr>\n                            <td>&nbsp;</td>\n                            <td>View</td>\n                            <td>Allow</td>\n                            <td>Deny</td>\n                            <td>Approve</td>\n                            <td>&nbsp;</td>\n                        </tr>\n                        <tr>\n                            <td>General Library</td>\n                            <td><input name=\"level46\" type=\"checkbox\" [(ngModel)]=\"cbLevel46\" autofocus /></td>\n                            <td><input name=\"level47\" type=\"checkbox\" [(ngModel)]=\"cbLevel47\" autofocus /></td>\n                            <td><input name=\"level48\" type=\"checkbox\" [(ngModel)]=\"cbLevel48\" autofocus /></td>\n                            <td><input name=\"level49\" type=\"checkbox\" [(ngModel)]=\"cbLevel49\" autofocus /></td>\n                            <td>&nbsp;</td>\n                        </tr>\n                        <tr>\n                            <td>Color Library</td>\n                            <td><input name=\"level50\" type=\"checkbox\" [(ngModel)]=\"cbLevel50\" autofocus /></td>\n                            <td><input name=\"level51\" type=\"checkbox\" [(ngModel)]=\"cbLevel51\" autofocus /></td>\n                            <td><input name=\"level52\" type=\"checkbox\" [(ngModel)]=\"cbLevel52\" autofocus /></td>\n                            <td><input name=\"level53\" type=\"checkbox\" [(ngModel)]=\"cbLevel53\" autofocus /></td>\n                            <td>&nbsp;</td>\n                        </tr>\n                        <tr>\n                            <td>Fabric Library</td>\n                            <td><input name=\"level54\" type=\"checkbox\" [(ngModel)]=\"cbLevel54\" autofocus /></td>\n                            <td><input name=\"level55\" type=\"checkbox\" [(ngModel)]=\"cbLevel55\" autofocus /></td>\n                            <td><input name=\"level56\" type=\"checkbox\" [(ngModel)]=\"cbLevel56\" autofocus /></td>\n                            <td><input name=\"level57\" type=\"checkbox\" [(ngModel)]=\"cbLevel57\" autofocus /></td>\n                            <td>&nbsp;</td>\n                        </tr>\n                        <tr>\n                            <td>Accessory Library</td>\n                            <td><input name=\"level58\" type=\"checkbox\" [(ngModel)]=\"cbLevel58\" autofocus /></td>\n                            <td><input name=\"level59\" type=\"checkbox\" [(ngModel)]=\"cbLevel59\" autofocus /></td>\n                            <td><input name=\"level60\" type=\"checkbox\" [(ngModel)]=\"cbLevel60\" autofocus /></td>\n                            <td><input name=\"level61\" type=\"checkbox\" [(ngModel)]=\"cbLevel61\" autofocus /></td>\n                            <td>&nbsp;</td>\n                        </tr>\n                        <tr>\n                            <td>Graphic Library</td>\n                            <td><input name=\"level62\" type=\"checkbox\" [(ngModel)]=\"cbLevel62\" autofocus /></td>\n                            <td><input name=\"level63\" type=\"checkbox\" [(ngModel)]=\"cbLevel63\" autofocus /></td>\n                            <td><input name=\"level64\" type=\"checkbox\" [(ngModel)]=\"cbLevel64\" autofocus /></td>\n                            <td><input name=\"level65\" type=\"checkbox\" [(ngModel)]=\"cbLevel65\" autofocus /></td>\n                            <td>&nbsp;</td>\n                        </tr>\n                        <tr>\n                            <td>Wash Library</td>\n                            <td><input name=\"level66\" type=\"checkbox\" [(ngModel)]=\"cbLevel66\" autofocus /></td>\n                            <td><input name=\"level67\" type=\"checkbox\" [(ngModel)]=\"cbLevel67\" autofocus /></td>\n                            <td><input name=\"level68\" type=\"checkbox\" [(ngModel)]=\"cbLevel68\" autofocus /></td>\n                            <td><input name=\"level69\" type=\"checkbox\" [(ngModel)]=\"cbLevel69\" autofocus /></td>\n                            <td>&nbsp;</td>\n                        </tr>\n                        <tr>\n                            <td>Shipping Library</td>\n                            <td><input name=\"level70\" type=\"checkbox\" [(ngModel)]=\"cbLevel70\" autofocus /></td>\n                            <td><input name=\"level71\" type=\"checkbox\" [(ngModel)]=\"cbLevel71\" autofocus /></td>\n                            <td><input name=\"level72\" type=\"checkbox\" [(ngModel)]=\"cbLevel72\" autofocus /></td>\n                            <td><input name=\"level73\" type=\"checkbox\" [(ngModel)]=\"cbLevel73\" autofocus /></td>\n                            <td>&nbsp;</td>\n                        </tr>\n                        <tr>\n                            <td>Spec Library</td>\n                            <td><input name=\"level74\" type=\"checkbox\" [(ngModel)]=\"cbLevel74\" autofocus /></td>\n                            <td><input name=\"level75\" type=\"checkbox\" [(ngModel)]=\"cbLevel75\" autofocus /></td>\n                            <td><input name=\"level76\" type=\"checkbox\" [(ngModel)]=\"cbLevel76\" autofocus /></td>\n                            <td><input name=\"level77\" type=\"checkbox\" [(ngModel)]=\"cbLevel77\" autofocus /></td>\n                            <td>&nbsp;</td>\n                        </tr>\n                        <tr>\n                            <td>Techpack Library</td>\n                            <td><input name=\"level78\" type=\"checkbox\" [(ngModel)]=\"cbLevel78\" autofocus /></td>\n                            <td><input name=\"level79\" type=\"checkbox\" [(ngModel)]=\"cbLevel79\" autofocus /></td>\n                            <td><input name=\"level80\" type=\"checkbox\" [(ngModel)]=\"cbLevel80\" autofocus /></td>\n                            <td><input name=\"level81\" type=\"checkbox\" [(ngModel)]=\"cbLevel81\" autofocus /></td>\n                            <td>&nbsp;</td>\n                        </tr>\n                        <tr>\n                            <td>&nbsp;</td>\n                            <td>&nbsp;</td>\n                            <td>&nbsp;</td>\n                            <td>&nbsp;</td>\n                            <td>&nbsp;</td>\n                            <td>&nbsp;</td>\n                        </tr>\n                        <tr>\n                            <td><b>User Access</b></td>\n                            <td></td>\n                            <td></td>\n                            <td></td>\n                            <td></td>\n                            <td></td>\n                        </tr>\n                        <tr>\n                            <td>&nbsp;</td>\n                            <td>Allow</td>\n                            <td>Deny</td>\n                            <td>&nbsp;</td>\n                            <td>&nbsp;</td>\n                            <td>&nbsp;</td>\n                        </tr>\n                        <tr>\n                            <td>Create User</td>\n                            <td><input name=\"level82\" type=\"checkbox\" [(ngModel)]=\"cbLevel82\" autofocus /></td>\n                            <td><input name=\"level83\" type=\"checkbox\" [(ngModel)]=\"cbLevel83\" autofocus /></td>\n                            <td>&nbsp;</td>\n                            <td>&nbsp;</td>\n                            <td>&nbsp;</td>\n                        </tr>\n                        <tr>\n                            <td>Edit User</td>\n                            <td><input name=\"level84\" type=\"checkbox\" [(ngModel)]=\"cbLevel84\" autofocus /></td>\n                            <td><input name=\"level85\" type=\"checkbox\" [(ngModel)]=\"cbLevel85\" autofocus /></td>\n                            <td>&nbsp;</td>\n                            <td>&nbsp;</td>\n                            <td>&nbsp;</td>\n                        </tr>\n                        <tr>\n                            <td>Delete User</td>\n                            <td><input name=\"level86\" type=\"checkbox\" [(ngModel)]=\"cbLevel86\" autofocus /></td>\n                            <td><input name=\"level87\" type=\"checkbox\" [(ngModel)]=\"cbLevel87\" autofocus /></td>\n                            <td>&nbsp;</td>\n                            <td>&nbsp;</td>\n                            <td>&nbsp;</td>\n                        </tr>\n                        <tr>\n                            <td>Assign User to Role</td>\n                            <td><input name=\"level88\" type=\"checkbox\" [(ngModel)]=\"cbLevel88\" autofocus /></td>\n                            <td><input name=\"level89\" type=\"checkbox\" [(ngModel)]=\"cbLevel89\" autofocus /></td>\n                            <td>&nbsp;</td>\n                            <td>&nbsp;</td>\n                            <td>&nbsp;</td>\n                        </tr>\n                        <tr>\n                            <td>Vendor/Supplier Management</td>\n                            <td><input name=\"level90\" type=\"checkbox\" [(ngModel)]=\"cbLevel90\" autofocus /></td>\n                            <td><input name=\"level91\" type=\"checkbox\" [(ngModel)]=\"cbLevel91\" autofocus /></td>\n                            <td>&nbsp;</td>\n                            <td>&nbsp;</td>\n                            <td>&nbsp;</td>\n                        </tr>\n                    </table>\n\n                </div>\n\n\n                <div class=\"form-group\">\n                    <input type=\"button\" class=\"btn btn-primary btn-block\" [disabled]=\"!username.valid || !isFormValuesChanged\" value=\"Update\" (click)=\"onUpdate(data)\" /><br />\n                    <input type=\"button\" class=\"btn btn-danger btn-block\" [disabled]=\"!username.valid\" value=\"Delete\" (click)=\"deleteConfirm()\" />\n                </div>\n                <div class=\"dialog\" *ngIf=\"isDelete\">\n                    <h3>Are you sure to delete ?</h3>\n                    <input type=\"button\" class=\"btn btn-danger btn-block\" value=\"Yes\" (click)=\"onDelete(data)\" />   <br />\n                    <input type=\"button\" class=\"btn btn-primary btn-block\" value=\"No\" (click)=\"close()\" />\n                </div>\n                <div *ngIf=\"isDelete\" class=\"overlay\" (click)=\"Close()\"></div>\n            </form>\n        </div>\n    </div>\n",
                    providers: [userRole_service_1.UserRoleService, forms_1.FormBuilder]
                }),
                __metadata("design:paramtypes", [forms_1.FormBuilder,
                    userRole_service_1.UserRoleService,
                    router_1.Router,
                    auth_service_1.AuthService,
                    router_1.ActivatedRoute])
            ], UserRoleEditComponent);
            exports_1("UserRoleEditComponent", UserRoleEditComponent);
        }
    };
});
