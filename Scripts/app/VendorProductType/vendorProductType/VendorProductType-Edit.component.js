System.register(["@angular/core", "@angular/forms", "@angular/router", "../shared/VendorProductType.service", "../../auth.service"], function (exports_1, context_1) {
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
    var core_1, forms_1, router_1, VendorProductType_service_1, auth_service_1, VendorProductTypeEditComponent;
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
            function (auth_service_1_1) {
                auth_service_1 = auth_service_1_1;
            }
        ],
        execute: function () {
            VendorProductTypeEditComponent = (function () {
                function VendorProductTypeEditComponent(fb, vendorProductTypeService, router, authService, activatedRoute) {
                    this.fb = fb;
                    this.vendorProductTypeService = vendorProductTypeService;
                    this.router = router;
                    this.authService = authService;
                    this.activatedRoute = activatedRoute;
                    this.title = "Edit Vendor Type";
                    this.errorMessage = null;
                    this.isDelete = false;
                    this.isFormValuesChanged = false;
                }
                VendorProductTypeEditComponent.prototype.ngOnInit = function () {
                    var _this = this;
                    if (!this.authService.isLoggedIn()) {
                        this.router.navigate([""]);
                    }
                    var id = this.activatedRoute.snapshot.params["id"];
                    if (id !== "") {
                        this.vendorProductTypeService.get(id).subscribe(function (data) {
                            _this.data = data;
                        });
                    }
                    else {
                        this.router.navigate(["VendorProductType/add"]);
                    }
                };
                VendorProductTypeEditComponent.prototype.ngAfterViewInit = function () {
                    jQuery(this.errorDiv.nativeElement).hide();
                };
                VendorProductTypeEditComponent.prototype.onUpdate = function (data) {
                    var _this = this;
                    this.vendorProductTypeService.update(data).subscribe(function (data) {
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
                VendorProductTypeEditComponent.prototype.onDelete = function (data) {
                    var _this = this;
                    this.vendorProductTypeService.delete(data.Id).subscribe(function (data) {
                        if (data.error == null) {
                            _this.router.navigate(["VendorProductType"]);
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
                VendorProductTypeEditComponent.prototype.onBack = function () {
                    this.router.navigate(["vendorproducttypelist"]);
                };
                VendorProductTypeEditComponent.prototype.deleteConfirm = function () {
                    this.isDelete = true;
                };
                VendorProductTypeEditComponent.prototype.close = function () {
                    this.isDelete = false;
                };
                VendorProductTypeEditComponent.prototype.displayMessage = function (message, status) {
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
                VendorProductTypeEditComponent.prototype.isFormChanged = function (value) {
                    var _this = this;
                    this.vendorProductTypeService.get(this.data.Id).subscribe(function (oldData) {
                        _this.isFormDataChanged(oldData);
                    });
                };
                VendorProductTypeEditComponent.prototype.isFormDataChanged = function (oldData) {
                    if (JSON.stringify(this.data) === JSON.stringify(oldData))
                        this.isFormValuesChanged = false;
                    else
                        this.isFormValuesChanged = true;
                };
                return VendorProductTypeEditComponent;
            }());
            __decorate([
                core_1.ViewChild('errorDiv'),
                __metadata("design:type", core_1.ElementRef)
            ], VendorProductTypeEditComponent.prototype, "errorDiv", void 0);
            VendorProductTypeEditComponent = __decorate([
                core_1.Component({
                    selector: "VendorProductType-edit",
                    template: "\n<div class=\"error-message\" #errorDiv></div>\n<div>\n    <h2>\n        <a href=\"javascript:void(0)\" (click)=\"onBack()\">\n            &laquo; Back to VendorProductType List\n        </a>\n    </h2>\n  <div class=\"user-container\">    \n    <form class=\"form-user\" #VendorProductTypeForm=\"ngForm\" *ngIf=\"data\"  >\n        <h2 class=\"form-user-heading\">{{title}}</h2>\n        <div class=\"form-group\">\n            <input name=\"input-name\" type=\"text\" class=\"form-control\" placeholder=\"Enter name\" [(ngModel)]=\"data.Name\" #name=\"ngModel\" autofocus required (ngModelChange)=\"isFormChanged($event)\"  />\n            <span class=\"validator-label valid\" *ngIf=\"name.valid\">\n                <span class=\"glyphicon glyphicon-ok\" aria-hidden=\"true\"></span>\n                valid!\n            </span>\n            <span class=\"validator-label invalid\" *ngIf=\"!name.valid && !name.pristine\">\n                <span class=\"glyphicon glyphicon-remove\" aria-hidden=\"true\"></span>\n                invalid\n            </span>\n        </div>  \n \n        <div class=\"form-group\">\n           Is Active? <input name=\"input-isActive\" type=\"checkbox\" [(ngModel)]=\"data.IsActive\" #isActive=\"ngModel\" autofocus required (ngModelChange)=\"isFormChanged($event)\"/>           \n        </div>                  \n        <div class=\"form-group\">\n            <input type=\"button\" class=\"btn btn-primary btn-block\" [disabled]=\"!name.valid || !isFormValuesChanged\" value=\"Update\" (click)=\"onUpdate(data)\" /><br/>\n            <input type=\"button\" class=\"btn btn-danger btn-block\" [disabled]=\"!name.valid\" value=\"Delete\" (click)=\"deleteConfirm()\" />             \n       </div>             \n       <div class=\"dialog\" *ngIf=\"isDelete\">\n          <h3>Are you sure to delete ?</h3>\n            <input type=\"button\" class=\"btn btn-danger btn-block\"  value=\"Yes\" (click)=\"onDelete(data)\" />   <br/>          \n            <input type=\"button\" class=\"btn btn-primary btn-block\"  value=\"No\" (click)=\"close()\" />             \n       </div>\n       <div *ngIf=\"isDelete\" class=\"overlay\" (click)=\"Close()\"></div>\n    </form> \n  </div>       \n</div>\n",
                    providers: [VendorProductType_service_1.VendorProductTypeService, forms_1.FormBuilder]
                }),
                __metadata("design:paramtypes", [forms_1.FormBuilder,
                    VendorProductType_service_1.VendorProductTypeService,
                    router_1.Router,
                    auth_service_1.AuthService,
                    router_1.ActivatedRoute])
            ], VendorProductTypeEditComponent);
            exports_1("VendorProductTypeEditComponent", VendorProductTypeEditComponent);
        }
    };
});
