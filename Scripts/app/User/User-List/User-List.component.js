System.register(["@angular/core", "../shared/user.service", "@angular/router", "../../auth.service"], function (exports_1, context_1) {
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
    var core_1, user_service_1, router_1, auth_service_1, UserListComponent;
    return {
        setters: [
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (user_service_1_1) {
                user_service_1 = user_service_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (auth_service_1_1) {
                auth_service_1 = auth_service_1_1;
            }
        ],
        execute: function () {
            UserListComponent = (function () {
                function UserListComponent(userService, router, authService) {
                    this.userService = userService;
                    this.router = router;
                    this.authService = authService;
                    this.title = "User List";
                    this.toggle = false;
                    this.isDelete = false;
                    this.isLoading = false;
                }
                UserListComponent.prototype.ngOnInit = function () {
                    var _this = this;
                    if (!this.authService.isLoggedIn()) {
                        this.router.navigate([""]);
                    }
                    this.userService.getApplicationUserList().subscribe(function (items) { return _this.users = items; }, function (error) { return _this.errorMessage = error; });
                };
                UserListComponent.prototype.ngAfterViewInit = function () {
                    jQuery(this.actionDiv.nativeElement).hide();
                    jQuery(this.errorDiv.nativeElement).hide();
                };
                UserListComponent.prototype.onSelect = function (data) {
                    this.selectedData = data;
                    this.router.navigate(["userlist/edit", this.selectedData.Id]);
                };
                UserListComponent.prototype.addNewUser = function () {
                    this.router.navigate(["userlist/add"]);
                };
                UserListComponent.prototype.onDelete = function (data) {
                    var _this = this;
                    this.isDelete = false;
                    this.isLoading = true;
                    this.users.filter(function (data) { return data.checked; }).forEach(function (selectedData) {
                        return _this.userService.delete(selectedData.Id).subscribe(function (data) {
                            if (data.error == null) {
                                _this.errorMessage = 'deleted selected data(s) successfully';
                                setTimeout(function () {
                                    _this.isLoading = false,
                                        jQuery(_this.actionDiv.nativeElement).hide(1000),
                                        _this.userService.getApplicationUserList().subscribe(function (items) { return _this.users = items; }, function (error) { return _this.errorMessage = error; });
                                }, 2000);
                            }
                        });
                    });
                };
                UserListComponent.prototype.showActionDiv = function (status) {
                    var boxWidth = jQuery(this.actionDiv.nativeElement).width();
                    if (status)
                        jQuery(this.actionDiv.nativeElement).show({ direction: "left" }, 1000);
                    else
                        jQuery(this.actionDiv.nativeElement).hide(1000);
                };
                UserListComponent.prototype.deleteConfirm = function () {
                    this.isDelete = true;
                };
                UserListComponent.prototype.close = function () {
                    this.isDelete = false;
                };
                UserListComponent.prototype.toggleItem = function (data) {
                    data.checked = !data.checked;
                    this.toggle = this.users.every(function (data) { return data.checked; });
                    this.showActionDiv(this.users.filter(function (data) { return data.checked; }).length > 0);
                };
                UserListComponent.prototype.toggleAll = function () {
                    var _this = this;
                    this.toggle = !this.toggle;
                    this.users.forEach(function (data) { return data.checked = _this.toggle; });
                    this.showActionDiv(this.users.filter(function (data) { return data.checked; }).length > 0);
                };
                UserListComponent.prototype.displayMessage = function (message, status) {
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
                return UserListComponent;
            }());
            __decorate([
                core_1.ViewChild('actionDiv'),
                __metadata("design:type", core_1.ElementRef)
            ], UserListComponent.prototype, "actionDiv", void 0);
            __decorate([
                core_1.ViewChild('errorDiv'),
                __metadata("design:type", core_1.ElementRef)
            ], UserListComponent.prototype, "errorDiv", void 0);
            UserListComponent = __decorate([
                core_1.Component({
                    selector: "userList",
                    template: "\n    <div class=\"error-message\" #errorDiv></div>\n    <div class=\"user-container\">\n        <h1 class=\"homeHeader\">{{title}}</h1>\n        <div class=\"col-right-s3 form-group\">\n            <input type=\"button\" class=\"btn btn-primary btn-block\" value=\"Add\" (click)=\"addNewUser()\" />\n        </div>\n        <div class=\"clearDiv\">\n        </div>\n        <div #actionDiv class=\"col-half-one-third leftPane\">\n            <div class=\"leftPaneContent form-group\">\n                <h2>Bulk Actions</h2>\n                <button class=\"btn btn-danger btn-block\" (click)=\"deleteConfirm()\" [disabled]=\"isLoading\">\n                    <div [class.cssload-container]=\"isLoading\">\n                        <div [class.cssload-zenith]=\"isLoading\"></div>\n                    </div>\n                    <div [class.cssload-text]=\"isLoading\">Delete</div>\n                </button>\n\n                <div class=\"dialog\" *ngIf=\"isDelete\">\n                    <h3>Are you sure to delete checked items ?</h3>\n                    <input type=\"button\" class=\"btn btn-danger btn-block\" value=\"Yes\" (click)=\"onDelete()\" />   <br />\n                    <input type=\"button\" class=\"btn btn-primary btn-block\" value=\"No\" (click)=\"close()\" />\n                </div>\n                <div *ngIf=\"isDelete\" class=\"overlay\" (click)=\"Close()\"></div>\n            </div>\n        </div>\n        <div class=\"col-half-two-third\">\n            <table class=\"table table-hover\">\n                <thead>\n                    <tr>\n                        <th>Select All<br /><input type=\"checkbox\" [checked]=\"toggle\" (change)=\"toggleAll()\" /></th>\n                        <th>User Name</th>\n                        <th>User Code</th>\n                        <th>User Type</th>\n                        <th>Full Name</th>\n                        <th>Email</th>\n                        <th>Is Active</th>\n                    </tr>\n                </thead>\n                <tbody>\n                    <tr *ngFor=\"let user of users\" [class.selected]=\"user === selectedData\">\n                        <td><input type=\"checkbox\" #chkSelect value=\"{{user.Id}}\" [checked]=\"user.checked\" (change)=\"toggleItem(user)\" /></td>\n                        <td><a href=\"userlist/edit/{{user.Id}}\">{{user.UserName}}</a></td>\n                        <td>{{user.UserCode}}</td>\n                        <td>{{user.Role}}</td>\n                        <td>{{user.FirstName + \" \" + user.LastName}}</td>\n                        <td>{{user.Email}}</td>\n                        <td>{{user.IsActive}}</td>\n                    </tr>\n                </tbody>\n            </table>\n        </div>\n        <div class=\"clearDiv\">\n        </div>\n    </div>\n",
                    providers: [user_service_1.ApplicationUserService]
                }),
                __metadata("design:paramtypes", [user_service_1.ApplicationUserService, router_1.Router, auth_service_1.AuthService])
            ], UserListComponent);
            exports_1("UserListComponent", UserListComponent);
        }
    };
});
