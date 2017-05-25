System.register(["@angular/core", "@angular/forms", "@angular/router", "../shared/vendorType.service", "../../auth.service"], function (exports_1, context_1) {
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
    var core_1, forms_1, router_1, vendorType_service_1, auth_service_1, VendorTypeEditComponent;
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
            function (auth_service_1_1) {
                auth_service_1 = auth_service_1_1;
            }
        ],
        execute: function () {
            VendorTypeEditComponent = (function () {
                function VendorTypeEditComponent(fb, vendorTypeService, router, authService, activatedRoute) {
                    this.fb = fb;
                    this.vendorTypeService = vendorTypeService;
                    this.router = router;
                    this.authService = authService;
                    this.activatedRoute = activatedRoute;
                    this.title = "Edit Vendor Type";
                    this.errorMessage = null;
                    this.isDelete = false;
                    this.isFormValuesChanged = false;
                }
                VendorTypeEditComponent.prototype.ngOnInit = function () {
                    var _this = this;
                    if (!this.authService.isLoggedIn()) {
                        this.router.navigate([""]);
                    }
                    var id = this.activatedRoute.snapshot.params["id"];
                    if (id !== "") {
                        this.vendorTypeService.get(id).subscribe(function (data) {
                            _this.data = data;
                        });
                    }
                    else {
                        this.router.navigate(["VendorType/add"]);
                    }
                };
                VendorTypeEditComponent.prototype.ngAfterViewInit = function () {
                    jQuery(this.errorDiv.nativeElement).hide();
                };
                VendorTypeEditComponent.prototype.onUpdate = function (data) {
                    var _this = this;
                    this.vendorTypeService.update(data).subscribe(function (data) {
                        if (data.error == null) {
                            _this.data = data;
                            _this.errorMessage = 'Vendor type updated successfully';
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
                VendorTypeEditComponent.prototype.onDelete = function (data) {
                    var _this = this;
                    this.vendorTypeService.delete(data.Id).subscribe(function (data) {
                        if (data.error == null) {
                            _this.router.navigate(["VendorType"]);
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
                VendorTypeEditComponent.prototype.onBack = function () {
                    this.router.navigate(["vendortypelist"]);
                };
                VendorTypeEditComponent.prototype.deleteConfirm = function () {
                    this.isDelete = true;
                };
                VendorTypeEditComponent.prototype.close = function () {
                    this.isDelete = false;
                };
                VendorTypeEditComponent.prototype.displayMessage = function (message, status) {
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
                VendorTypeEditComponent.prototype.isFormChanged = function (value) {
                    var _this = this;
                    this.vendorTypeService.get(this.data.Id).subscribe(function (oldData) {
                        _this.isFormDataChanged(oldData);
                    });
                };
                VendorTypeEditComponent.prototype.isFormDataChanged = function (oldData) {
                    if (JSON.stringify(this.data) === JSON.stringify(oldData))
                        this.isFormValuesChanged = false;
                    else
                        this.isFormValuesChanged = true;
                };
                return VendorTypeEditComponent;
            }());
            __decorate([
                core_1.ViewChild('errorDiv'),
                __metadata("design:type", core_1.ElementRef)
            ], VendorTypeEditComponent.prototype, "errorDiv", void 0);
            VendorTypeEditComponent = __decorate([
                core_1.Component({
                    selector: "VendorType-edit",
                    template: "\n<div class=\"error-message\" #errorDiv></div>\n<div>\n    <h2>\n        <a href=\"javascript:void(0)\" (click)=\"onBack()\">\n            &laquo; Back to VendorType List\n        </a>\n    </h2>\n  <div class=\"user-container\">    \n    <form class=\"form-user\" #VendorTypeForm=\"ngForm\" *ngIf=\"data\"  >\n        <h2 class=\"form-user-heading\">{{title}}</h2>\n        <div class=\"form-group\">\n            <input name=\"input-name\" type=\"text\" class=\"form-control\" placeholder=\"Enter name\" [(ngModel)]=\"data.Name\" #name=\"ngModel\" autofocus required (ngModelChange)=\"isFormChanged($event)\"  />\n            <span class=\"validator-label valid\" *ngIf=\"name.valid\">\n                <span class=\"glyphicon glyphicon-ok\" aria-hidden=\"true\"></span>\n                valid!\n            </span>\n            <span class=\"validator-label invalid\" *ngIf=\"!name.valid && !name.pristine\">\n                <span class=\"glyphicon glyphicon-remove\" aria-hidden=\"true\"></span>\n                invalid\n            </span>\n        </div>  \n \n        <div class=\"form-group\">\n           Is Active? <input name=\"input-isActive\" type=\"checkbox\" [(ngModel)]=\"data.IsActive\" #isActive=\"ngModel\" autofocus required (ngModelChange)=\"isFormChanged($event)\"/>           \n        </div>                  \n        <div class=\"form-group\">\n            <input type=\"button\" class=\"btn btn-primary btn-block\" [disabled]=\"!name.valid || !isFormValuesChanged\" value=\"Update\" (click)=\"onUpdate(data)\" /><br/>\n            <input type=\"button\" class=\"btn btn-danger btn-block\" [disabled]=\"!name.valid\" value=\"Delete\" (click)=\"deleteConfirm()\" />             \n       </div>             \n       <div class=\"dialog\" *ngIf=\"isDelete\">\n          <h3>Are you sure to delete ?</h3>\n            <input type=\"button\" class=\"btn btn-danger btn-block\"  value=\"Yes\" (click)=\"onDelete(data)\" />   <br/>          \n            <input type=\"button\" class=\"btn btn-primary btn-block\"  value=\"No\" (click)=\"close()\" />             \n       </div>\n       <div *ngIf=\"isDelete\" class=\"overlay\" (click)=\"Close()\"></div>\n    </form> \n  </div>       \n</div>\n",
                    providers: [vendorType_service_1.VendorTypeService, forms_1.FormBuilder]
                }),
                __metadata("design:paramtypes", [forms_1.FormBuilder,
                    vendorType_service_1.VendorTypeService,
                    router_1.Router,
                    auth_service_1.AuthService,
                    router_1.ActivatedRoute])
            ], VendorTypeEditComponent);
            exports_1("VendorTypeEditComponent", VendorTypeEditComponent);
        }
    };
});
