System.register(["@angular/core", "@angular/forms", "@angular/router", "../../SizeRange/shared/sizerange.model", "../../SizeRange/shared/sizerange.service", "../../auth.service"], function (exports_1, context_1) {
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
    var core_1, forms_1, router_1, sizerange_model_1, sizerange_service_1, auth_service_1, SizeRangeAddComponent;
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
            function (sizerange_model_1_1) {
                sizerange_model_1 = sizerange_model_1_1;
            },
            function (sizerange_service_1_1) {
                sizerange_service_1 = sizerange_service_1_1;
            },
            function (auth_service_1_1) {
                auth_service_1 = auth_service_1_1;
            }
        ],
        execute: function () {
            SizeRangeAddComponent = (function () {
                function SizeRangeAddComponent(fb, sizerangeService, router, authService, activatedRoute) {
                    this.fb = fb;
                    this.sizerangeService = sizerangeService;
                    this.router = router;
                    this.authService = authService;
                    this.activatedRoute = activatedRoute;
                    this.errorMessage = null;
                }
                SizeRangeAddComponent.prototype.ngOnInit = function () {
                    if (!this.authService.isLoggedIn()) {
                        this.router.navigate([""]);
                    }
                    this.sizenamecount = 1;
                    this.sizerangeForm = this.fb.group({
                        name: ["", [
                                forms_1.Validators.required
                            ]],
                        isactive: [true],
                        buyercode: [""]
                    });
                    this.data = new sizerange_model_1.SizeRange("", false, "", "", []);
                    this.title = "New Size Range";
                };
                SizeRangeAddComponent.prototype.addName = function () {
                    this.sizenamecount += 1;
                    jQuery('#sizeRangeContainer').append("<input type=\"text\" style=\"width:50px\" id=\"txtSizeName" + this.sizenamecount + "\" class=\"form-control\" placeholder= \"Enter a size\" />");
                };
                SizeRangeAddComponent.prototype.ngAfterViewInit = function () {
                    jQuery(this.errorDiv.nativeElement).hide();
                };
                SizeRangeAddComponent.prototype.ngOnDestroy = function () {
                    this.sizerangeService.data = this.data;
                };
                SizeRangeAddComponent.prototype.onSubmit = function (data) {
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
                    var sizerange = new sizerange_model_1.SizeRange("", data.isactive, "", "", []);
                    this.sizerangeService.add(sizerange).subscribe(function (data) {
                        if (data.error == null) {
                            _this.data = data;
                            _this.errorMessage = 'Size range added successfully';
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
                SizeRangeAddComponent.prototype.onBack = function () {
                    this.router.navigate(["sizerange"]);
                };
                SizeRangeAddComponent.prototype.displayMessage = function (message, status) {
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
                return SizeRangeAddComponent;
            }());
            __decorate([
                core_1.ViewChild('errorDiv'),
                __metadata("design:type", core_1.ElementRef)
            ], SizeRangeAddComponent.prototype, "errorDiv", void 0);
            SizeRangeAddComponent = __decorate([
                core_1.Component({
                    selector: "sizerange-add",
                    template: "\n<div class=\"error-message\" #errorDiv></div>\n<div *ngIf=\"data\">\n    <h2>\n        <a href=\"javascript:void(0)\" (click)=\"onBack()\">\n            &laquo; Back to SizeRange List\n        </a>\n    </h2>\n  <div class=\"user-container\">    \n    <form class=\"form-user\" [formGroup]=\"sizerangeForm\" >\n        <h2 class=\"form-user-heading\">{{title}}</h2>\n        \n        <div class=\"form-group\">\n            <input formControlName=\"name\" type=\"text\" class=\"form-control\" placeholder=\"Enter name\" value=\"this.data.Name\" autofocus />\n            <span class=\"validator-label valid\" *ngIf=\"this.sizerangeForm.controls.name.valid\">\n                <span class=\"glyphicon glyphicon-ok\" aria-hidden=\"true\"></span>\n                valid!\n            </span>\n            <span class=\"validator-label invalid\" *ngIf=\"!this.sizerangeForm.controls.name.valid && !this.sizerangeForm.controls.name.pristine\">\n                <span class=\"glyphicon glyphicon-remove\" aria-hidden=\"true\"></span>\n                invalid\n            </span>\n        </div> \n      <div class=\"form-group\">\n            <input formControlName=\"buyercode\" type=\"text\" class=\"form-control\" placeholder=\"Enter buyer code\" value=\"this.data.BuyerCode\" autofocus />\n        </div>  \n        <div class=\"form-group\" id=\"sizeRangeContainer\">\n            <input type=\"text\" style=\"width:50px\" class=\"form-control\" placeholder=\"Enter a size\" id=\"txtSizeName1\" /> \n             \n        </div> \n        <div class=\"form-group\">\n            <button (click)=\"addName()\">Add More Size Name</button>\n        </div> \n        <div class=\"form-group\">\n           Is Active? <input formControlName=\"isactive\" type=\"checkbox\" value=\"this.data.IsActive\" autofocus />     \n        </div>                    \n        <div class=\"form-group\">\n            <input type=\"button\" class=\"btn btn-primary btn-block\" [disabled]=\"!sizerangeForm.valid\" value=\"Add\" (click)=\"onSubmit(this.sizerangeForm.value)\" />\n        </div>       \n    </form>\n  </div>\n</div>\n",
                    providers: [sizerange_service_1.SizeRangeService, forms_1.FormBuilder]
                }),
                __metadata("design:paramtypes", [forms_1.FormBuilder,
                    sizerange_service_1.SizeRangeService,
                    router_1.Router,
                    auth_service_1.AuthService,
                    router_1.ActivatedRoute])
            ], SizeRangeAddComponent);
            exports_1("SizeRangeAddComponent", SizeRangeAddComponent);
        }
    };
});
