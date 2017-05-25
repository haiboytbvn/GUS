System.register(["@angular/core", "@angular/forms", "@angular/router", "../../Spec/shared/spec.model", "../../Spec/shared/spec.service", "../../SizeRange/shared/sizerange.service", "../../auth.service", "../../SearchGeneralFilter/shared/searchGeneralFilter.model"], function (exports_1, context_1) {
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
    var core_1, forms_1, router_1, spec_model_1, spec_service_1, sizerange_service_1, auth_service_1, searchGeneralFilter_model_1, SpecAddComponent;
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
            function (spec_model_1_1) {
                spec_model_1 = spec_model_1_1;
            },
            function (spec_service_1_1) {
                spec_service_1 = spec_service_1_1;
            },
            function (sizerange_service_1_1) {
                sizerange_service_1 = sizerange_service_1_1;
            },
            function (auth_service_1_1) {
                auth_service_1 = auth_service_1_1;
            },
            function (searchGeneralFilter_model_1_1) {
                searchGeneralFilter_model_1 = searchGeneralFilter_model_1_1;
            }
        ],
        execute: function () {
            SpecAddComponent = (function () {
                function SpecAddComponent(fb, specService, router, sizerangeService, authService, activatedRoute) {
                    this.fb = fb;
                    this.specService = specService;
                    this.router = router;
                    this.sizerangeService = sizerangeService;
                    this.authService = authService;
                    this.activatedRoute = activatedRoute;
                    this.errorMessage = null;
                }
                SpecAddComponent.prototype.ngOnInit = function () {
                    var _this = this;
                    if (!this.authService.isLoggedIn()) {
                        this.router.navigate([""]);
                    }
                    var searchGeneralFilter = new searchGeneralFilter_model_1.SearchGeneralFilter("", "", "", "");
                    this.sizerangeService.getSizeRangeList(searchGeneralFilter).subscribe(function (items) { return _this.sizeranges = items; }, function (error) { return _this.errorMessage = error; });
                    this.data = new spec_model_1.Spec("", null, null, false, "", "", "", "", "", "", "", false);
                    this.title = "New Spec";
                    this.specForm = this.fb.group({
                        name: ["", [
                                forms_1.Validators.required
                            ]],
                        isactive: [true],
                        buyercode: [""],
                        sizerange: [""],
                        guidedspecsize: [""]
                    });
                };
                SpecAddComponent.prototype.ngAfterViewInit = function () {
                    jQuery(this.errorDiv.nativeElement).hide();
                };
                SpecAddComponent.prototype.ngOnDestroy = function () {
                    this.specService.data = this.data;
                };
                SpecAddComponent.prototype.onSubmit = function (data) {
                    var _this = this;
                    console.log(data);
                    var spec = new spec_model_1.Spec("", null, null, data.isactive, "", data.name, "", "", data.buyercode, data.sizerange, data.guidedspecsize, false);
                    this.specService.add(spec).subscribe(function (data) {
                        if (data.error == null) {
                            _this.data = data;
                            _this.errorMessage = 'Spec added successfully';
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
                SpecAddComponent.prototype.onBack = function () {
                    this.router.navigate(["spec"]);
                };
                SpecAddComponent.prototype.displayMessage = function (message, status) {
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
                return SpecAddComponent;
            }());
            __decorate([
                core_1.ViewChild('errorDiv'),
                __metadata("design:type", core_1.ElementRef)
            ], SpecAddComponent.prototype, "errorDiv", void 0);
            SpecAddComponent = __decorate([
                core_1.Component({
                    selector: "spec-add",
                    template: "\n<div class=\"error-message\" #errorDiv></div>\n<div *ngIf=\"data\">\n    <h2>\n        <a href=\"javascript:void(0)\" (click)=\"onBack()\">\n            &laquo; Back to Spec List\n        </a>\n    </h2>\n  <div class=\"user-container\">    \n    <form class=\"form-user\" [formGroup]=\"specForm\" >\n        <h2 class=\"form-user-heading\">{{title}}</h2>\n        \n        <div class=\"form-group\">\n            <input formControlName=\"name\" type=\"text\" class=\"form-control\" placeholder=\"Enter name\" value=\"this.data.Name\" autofocus />\n            <span class=\"validator-label valid\" *ngIf=\"this.specForm.controls.name.valid\">\n                <span class=\"glyphicon glyphicon-ok\" aria-hidden=\"true\"></span>\n                valid!\n            </span>\n            <span class=\"validator-label invalid\" *ngIf=\"!this.specForm.controls.name.valid && !this.specForm.controls.name.pristine\">\n                <span class=\"glyphicon glyphicon-remove\" aria-hidden=\"true\"></span>\n                invalid\n            </span>\n        </div>  \n      \n        <div class=\"form-group\">\n            <input formControlName=\"buyercode\" type=\"text\" class=\"form-control\" placeholder=\"Enter buyer code\" value=\"this.data.BuyerCode\" autofocus />\n        </div> \n        <div class=\"form-group\">\n            <input formControlName=\"guidedspecsize\" type=\"text\" class=\"form-control\" placeholder=\"Enter buyer code\" value=\"this.data.GuidedSpecSize\" autofocus />\n        </div> \n       <div class=\"form-group\">\n            <select value=\"this.data?.SizeRange\" class=\"form-control input-medium\" style=\"width:332px\" formControlName=\"sizerange\">\n                    <option value=\"\">Chose a size range</option>\n                    <option *ngFor=\"let sizerange of sizeranges\" value=\"{{sizerange.Id}}\">{{sizerange.Name}}</option>\n            </select>\n        </div>  \n         \n        <div class=\"form-group\">\n           Is Active? <input formControlName=\"isactive\" type=\"checkbox\" value=\"this.data.IsActive\" autofocus />     \n        </div>                    \n        <div class=\"form-group\">\n            <input type=\"button\" class=\"btn btn-primary btn-block\" [disabled]=\"!specForm.valid\" value=\"Add\" (click)=\"onSubmit(this.specForm.value)\" />\n        </div>       \n    </form>\n  </div>\n</div>\n",
                    providers: [spec_service_1.SpecService, forms_1.FormBuilder, sizerange_service_1.SizeRangeService]
                }),
                __metadata("design:paramtypes", [forms_1.FormBuilder,
                    spec_service_1.SpecService,
                    router_1.Router,
                    sizerange_service_1.SizeRangeService,
                    auth_service_1.AuthService,
                    router_1.ActivatedRoute])
            ], SpecAddComponent);
            exports_1("SpecAddComponent", SpecAddComponent);
        }
    };
});
