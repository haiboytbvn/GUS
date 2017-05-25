System.register(["@angular/core", "@angular/forms", "@angular/router", "../../SizeRange/shared/sizerange.service", "../../auth.service"], function (exports_1, context_1) {
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
    var core_1, forms_1, router_1, sizerange_service_1, auth_service_1, SizeRangeEditComponent;
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
            function (sizerange_service_1_1) {
                sizerange_service_1 = sizerange_service_1_1;
            },
            function (auth_service_1_1) {
                auth_service_1 = auth_service_1_1;
            }
        ],
        execute: function () {
            SizeRangeEditComponent = (function () {
                function SizeRangeEditComponent(fb, sizerangeService, router, authService, activatedRoute) {
                    this.fb = fb;
                    this.sizerangeService = sizerangeService;
                    this.router = router;
                    this.authService = authService;
                    this.activatedRoute = activatedRoute;
                    this.title = "Edit Size Range";
                    this.errorMessage = null;
                    this.isDelete = false;
                    this.isFormValuesChanged = false;
                }
                SizeRangeEditComponent.prototype.ngOnInit = function () {
                    var _this = this;
                    if (!this.authService.isLoggedIn()) {
                        this.router.navigate([""]);
                    }
                    // this.sizenamecount = this.data.ValueList.length;
                    var id = this.activatedRoute.snapshot.params["id"];
                    if (id !== "") {
                        this.sizerangeService.get(id).subscribe(function (data) {
                            _this.data = data;
                        });
                    }
                    else {
                        this.router.navigate(["sizerange/add"]);
                    }
                };
                SizeRangeEditComponent.prototype.addName = function () {
                    this.isFormValuesChanged = true;
                    this.sizenamecount = this.data.ValueList.length + 1;
                    console.log(this.sizenamecount);
                    jQuery('#sizeRangeContainer').append("<input type=\"text\" style=\"width:50px\" id=\"txtSizeName" + this.sizenamecount + "\" class=\"form-control\" placeholder= \"Enter a size\" />");
                };
                SizeRangeEditComponent.prototype.ngAfterViewInit = function () {
                    jQuery(this.errorDiv.nativeElement).hide();
                };
                SizeRangeEditComponent.prototype.onUpdate = function (data) {
                    var _this = this;
                    //get name string
                    var namestring = "";
                    for (var i = 1; i <= this.sizenamecount; i++) {
                        if (jQuery('#txtSizeName' + i).val !== "" && i < this.sizenamecount) {
                            namestring += jQuery('#txtSizeName' + i).val() + "|";
                        }
                        else if (jQuery('#txtSizeName' + i).val !== "" && i === this.sizenamecount) {
                            namestring += jQuery('#txtSizeName' + i).val();
                        }
                    }
                    //====
                    data.Value = namestring;
                    this.sizerangeService.update(data).subscribe(function (data) {
                        if (data.error == null) {
                            _this.data = data;
                            _this.errorMessage = 'SizeRange details updated successfully';
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
                SizeRangeEditComponent.prototype.onDelete = function (data) {
                    var _this = this;
                    this.sizerangeService.delete(data.Id).subscribe(function (data) {
                        if (data.error == null) {
                            _this.router.navigate(["sizerange"]);
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
                SizeRangeEditComponent.prototype.onBack = function () {
                    this.router.navigate(["sizerange"]);
                };
                SizeRangeEditComponent.prototype.deleteConfirm = function () {
                    this.isDelete = true;
                };
                SizeRangeEditComponent.prototype.close = function () {
                    this.isDelete = false;
                };
                SizeRangeEditComponent.prototype.displayMessage = function (message, status) {
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
                SizeRangeEditComponent.prototype.isFormChanged = function (value) {
                    var _this = this;
                    this.sizerangeService.get(this.data.Id).subscribe(function (oldData) {
                        _this.isFormDataChanged(oldData);
                    });
                };
                SizeRangeEditComponent.prototype.isFormDataChanged = function (oldData) {
                    if (JSON.stringify(this.data) === JSON.stringify(oldData))
                        this.isFormValuesChanged = false;
                    else
                        this.isFormValuesChanged = true;
                };
                return SizeRangeEditComponent;
            }());
            __decorate([
                core_1.ViewChild('errorDiv'),
                __metadata("design:type", core_1.ElementRef)
            ], SizeRangeEditComponent.prototype, "errorDiv", void 0);
            SizeRangeEditComponent = __decorate([
                core_1.Component({
                    selector: "sizerange-edit",
                    template: "\n<div class=\"error-message\" #errorDiv></div>\n<div>\n    <h2>\n        <a href=\"javascript:void(0)\" (click)=\"onBack()\">\n            &laquo; Back to Size Range List\n        </a>\n    </h2>\n  <div class=\"user-container\">    \n    <form class=\"form-user\" #sizerangeForm=\"ngForm\" *ngIf=\"data\"  >\n        <h2 class=\"form-user-heading\">{{title}}</h2>\n        <div class=\"form-group\">\n            <input name=\"input-name\" type=\"text\" class=\"form-control\" placeholder=\"Enter name\" [(ngModel)]=\"data.Name\" #name=\"ngModel\" autofocus required (ngModelChange)=\"isFormChanged($event)\"  />\n            <span class=\"validator-label valid\" *ngIf=\"name.valid\">\n                <span class=\"glyphicon glyphicon-ok\" aria-hidden=\"true\"></span>\n                valid!\n            </span>\n            <span class=\"validator-label invalid\" *ngIf=\"!name.valid && !name.pristine\">\n                <span class=\"glyphicon glyphicon-remove\" aria-hidden=\"true\"></span>\n                invalid\n            </span>\n        </div>   \n <div class=\"form-group\">\n            <input name=\"input-buyercode\" type=\"text\" class=\"form-control\" placeholder=\"Enter buyer code\" [(ngModel)]=\"data.BuyerCode\" #name=\"ngModel\" autofocus required (ngModelChange)=\"isFormChanged($event)\"  />     \n        </div> \n\n\n        <div class=\"form-group\" id=\"sizeRangeContainer\">\n            <input type=\"text\" class=\"form-control\" style=\"width:50px\" *ngFor=\"let value of data?.ValueList; let i=index\" value=\"{{value}}\" placeholder=\"Enter a size\" id=\"txtSizeName{{i + 1}}\" /> \n             \n        </div> \n        <div class=\"form-group\">\n            <button (click)=\"addName()\">Add More Size Name</button>\n        </div> \n        <div class=\"form-group\">\n           Is Active? <input name=\"input-isActive\" type=\"checkbox\" [(ngModel)]=\"data.IsActive\" #isActive=\"ngModel\" autofocus required (ngModelChange)=\"isFormChanged($event)\"/>           \n        </div>                  \n        <div class=\"form-group\">\n            <input type=\"button\" class=\"btn btn-primary btn-block\" [disabled]=\"!name.valid || !isFormValuesChanged\" value=\"Update\" (click)=\"onUpdate(data)\" /><br/>\n            <input type=\"button\" class=\"btn btn-danger btn-block\" [disabled]=\"!name.valid\" value=\"Delete\" (click)=\"deleteConfirm()\" />             \n       </div>             \n       <div class=\"dialog\" *ngIf=\"isDelete\">\n          <h3>Are you sure to delete ?</h3>\n            <input type=\"button\" class=\"btn btn-danger btn-block\"  value=\"Yes\" (click)=\"onDelete(data)\" />   <br/>          \n            <input type=\"button\" class=\"btn btn-primary btn-block\"  value=\"No\" (click)=\"close()\" />             \n       </div>\n       <div *ngIf=\"isDelete\" class=\"overlay\" (click)=\"Close()\"></div>\n    </form> \n  </div>       \n</div>\n",
                    providers: [sizerange_service_1.SizeRangeService, forms_1.FormBuilder]
                }),
                __metadata("design:paramtypes", [forms_1.FormBuilder,
                    sizerange_service_1.SizeRangeService,
                    router_1.Router,
                    auth_service_1.AuthService,
                    router_1.ActivatedRoute])
            ], SizeRangeEditComponent);
            exports_1("SizeRangeEditComponent", SizeRangeEditComponent);
        }
    };
});
