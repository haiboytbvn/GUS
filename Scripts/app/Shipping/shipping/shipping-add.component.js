System.register(["@angular/core", "@angular/forms", "@angular/router", "../../Shipping/shared/shipping.model", "../../Shipping/shared/shipping.service", "../../EndBuyer/shared/endbuyer.service", "../../Department/shared/department.service", "../../Division/shared/division.service", "../../ShippingType/shared/shippingtype.service", "../../Brand/shared/brand.service", "../../auth.service", "../../Pagination/shared/generalsearch.model", "../../Pagination/shared/pagination.model"], function (exports_1, context_1) {
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
    var core_1, forms_1, router_1, shipping_model_1, shipping_service_1, endbuyer_service_1, department_service_1, division_service_1, shippingtype_service_1, brand_service_1, auth_service_1, generalsearch_model_1, pagination_model_1, ShippingAddComponent;
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
            function (shipping_model_1_1) {
                shipping_model_1 = shipping_model_1_1;
            },
            function (shipping_service_1_1) {
                shipping_service_1 = shipping_service_1_1;
            },
            function (endbuyer_service_1_1) {
                endbuyer_service_1 = endbuyer_service_1_1;
            },
            function (department_service_1_1) {
                department_service_1 = department_service_1_1;
            },
            function (division_service_1_1) {
                division_service_1 = division_service_1_1;
            },
            function (shippingtype_service_1_1) {
                shippingtype_service_1 = shippingtype_service_1_1;
            },
            function (brand_service_1_1) {
                brand_service_1 = brand_service_1_1;
            },
            function (auth_service_1_1) {
                auth_service_1 = auth_service_1_1;
            },
            function (generalsearch_model_1_1) {
                generalsearch_model_1 = generalsearch_model_1_1;
            },
            function (pagination_model_1_1) {
                pagination_model_1 = pagination_model_1_1;
            }
        ],
        execute: function () {
            ShippingAddComponent = (function () {
                function ShippingAddComponent(fb, shippingtypeService, endbuyerService, divisionService, deptServcie, brandService, shippingService, router, authService, activatedRoute) {
                    this.fb = fb;
                    this.shippingtypeService = shippingtypeService;
                    this.endbuyerService = endbuyerService;
                    this.divisionService = divisionService;
                    this.deptServcie = deptServcie;
                    this.brandService = brandService;
                    this.shippingService = shippingService;
                    this.router = router;
                    this.authService = authService;
                    this.activatedRoute = activatedRoute;
                    this.errorMessage = null;
                }
                ShippingAddComponent.prototype.fileChangeEvent = function () {
                    var fileUpload = jQuery("#files").get(0);
                    var files = fileUpload.files;
                    var data = new FormData();
                    for (var i = 0; i < files.length; i++) {
                        data.append(files[i].name, files[i]);
                    }
                    jQuery.ajax({
                        type: "POST",
                        url: "api/shipping/UploadImage",
                        contentType: false,
                        processData: false,
                        data: data,
                        success: function (data) {
                            jQuery('#hdImage').val(data.UploadPath);
                            jQuery('#imgPreview').attr("src", data.UploadPath);
                            this.data.Image = data.UploadPath;
                            jQuery('#lblinFo').append('File ' + data.FileName + ' size ' + data.Size + ' uploaded successfully');
                        },
                        error: function () {
                            alert("There was error uploading files!");
                        }
                    });
                };
                ShippingAddComponent.prototype.ngOnInit = function () {
                    var _this = this;
                    if (!this.authService.isLoggedIn()) {
                        this.router.navigate([""]);
                    }
                    this.shippingForm = this.fb.group({
                        code: [""],
                        buyercode: [""],
                        name: [
                            "", [
                                forms_1.Validators.required
                            ]
                        ],
                        brand: [""],
                        department: [""],
                        remark: [""],
                        division: [""],
                        shippingtype: [""],
                        endbuyer: [""],
                        isactive: [true],
                        regname: [""],
                        searchname: [""],
                        email: [""],
                        fax: [""],
                        tel: [""],
                        city: [""],
                        country: [""],
                        postalcode: [""],
                        contact: [""],
                        address: [""]
                    });
                    var pageall = new pagination_model_1.PaginationModel(10, 0, "Name", 0, [], 0);
                    var getAll = new generalsearch_model_1.GeneralSearchModel("", "", "", "", pageall);
                    this.paging = new pagination_model_1.PaginationModel(10, 1, "Name", 0, [], 0);
                    this.searchModel = new generalsearch_model_1.GeneralSearchModel("", "", "", "", this.paging);
                    this.shippingtypeService.getShippingTypeList(getAll).subscribe(function (items) { return _this.shippingtypes = items; }, function (error) { return _this.errorMessage = error; });
                    this.endbuyerService.getEndBuyerList(getAll).subscribe(function (items) { return _this.endbuyers = items; }, function (error) { return _this.errorMessage = error; });
                    this.brandService.getBrandList(this.searchModel).subscribe(function (items) { return _this.brands = items; }, function (error) { return _this.errorMessage = error; });
                    this.deptServcie.getDepartmentList(this.searchModel).subscribe(function (items) { return _this.depts = items; }, function (error) { return _this.errorMessage = error; });
                    this.divisionService.getDivisionList(this.searchModel).subscribe(function (items) { return _this.divisions = items; }, function (error) { return _this.errorMessage = error; });
                    this.data = new shipping_model_1.Shipping("", false, "", "", "", "", "", "", false, "", "", "", "", "", "", "", "", "", "", "", "", "");
                    this.title = "New Shipping";
                };
                ShippingAddComponent.prototype.ngAfterViewInit = function () {
                    jQuery(this.errorDiv.nativeElement).hide();
                };
                ShippingAddComponent.prototype.ngOnDestroy = function () {
                    this.shippingService.data = this.data;
                };
                ShippingAddComponent.prototype.onSubmit = function (shippingData) {
                    var _this = this;
                    var newData = new shipping_model_1.Shipping("", shippingData.isactive, shippingData.name, shippingData.buyercode, shippingData.brand, shippingData.department, shippingData.division, jQuery("#hdImage").val(), false, shippingData.remark, shippingData.shippingtype, shippingData.address, shippingData.regname, shippingData.searchname, shippingData.email, shippingData.endbuyer, shippingData.fax, shippingData.tel, shippingData.city, shippingData.country, shippingData.postalcode, shippingData.contact);
                    this.shippingService.add(newData).subscribe(function (data) {
                        if (data.error == null) {
                            _this.data = data;
                            _this.errorMessage = 'Shipping added successfully';
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
                ShippingAddComponent.prototype.onBack = function () {
                    this.router.navigate(["shipping"]);
                };
                ShippingAddComponent.prototype.onUpdate = function (data) {
                };
                ShippingAddComponent.prototype.displayMessage = function (message, status) {
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
                return ShippingAddComponent;
            }());
            __decorate([
                core_1.ViewChild('errorDiv'),
                __metadata("design:type", core_1.ElementRef)
            ], ShippingAddComponent.prototype, "errorDiv", void 0);
            ShippingAddComponent = __decorate([
                core_1.Component({
                    selector: "shipping-add",
                    template: "\n<div class=\"error-message\" #errorDiv></div>\n<div *ngIf=\"data\">\n    <h2>\n        <a href=\"javascript:void(0)\" (click)=\"onBack()\">\n            &laquo; Back to Shipping List\n        </a>\n    </h2>\n  <div class=\"user-container\">    \n    <form class=\"form-user\" [formGroup]=\"shippingForm\" >\n        <h2 class=\"form-user-heading\">{{title}}</h2>\n          <input type=\"hidden\" id=\"hdImage\" value=\"\"/>\n           <div class=\"form-group\">\n            <input formControlName=\"name\" type=\"text\" class=\"form-control\" placeholder=\"Enter shipping name\" value=\"this.data.Name\"  />\n            <span class=\"validator-label valid\" *ngIf=\"this.shippingForm.controls.name.valid\">\n                <span class=\"glyphicon glyphicon-ok\" aria-hidden=\"true\"></span>\n                valid!\n            </span>\n            <span class=\"validator-label invalid\" *ngIf=\"!this.shippingForm.controls.name.valid && !this.shippingForm.controls.name.pristine\">\n                <span class=\"glyphicon glyphicon-remove\" aria-hidden=\"true\"></span>\n                invalid\n            </span>\n        </div>\n        <div class=\"form-group\">\n            <input formControlName=\"buyercode\" type=\"text\" class=\"form-control\" placeholder=\"Enter buyer code\" value=\"this.data.BuyerCode\" autofocus />            \n        </div>     \n        <div class=\"form-group\">\n            <select value=\"this.data.Brand\" class=\"form-control\" style=\"width:332px\" formControlName=\"brand\">\n                 <option value=\"\">Chose a brand</option>\n                 <option *ngFor=\"let brand of brands\" value=\"{{brand.Id}}\">{{brand.Name}}</option>\n            </select>\n        </div>   \n         <div class=\"form-group\">\n            <select value=\"this.data.Department\" class=\"form-control input-medium\" style=\"width:332px\" formControlName=\"department\">\n                    <option value=\"\">Chose a department</option>\n                    <option *ngFor=\"let dept of depts\" value=\"{{dept.Id}}\">{{dept.Name}}</option>\n            </select>\n        </div>  \n        <div class=\"form-group\">\n            <select value=\"this.data.Division\" class=\"form-control input-medium\" style=\"width:332px\" formControlName=\"division\">\n                    <option value=\"\">Chose a division</option>\n              <option *ngFor=\"let division of divisions\" value=\"{{division.Id}}\">{{division.Name}}</option>\n            </select>\n        </div> \n        <div class=\"form-group\">\n            <select value=\"this.data.ShippingType\" class=\"form-control input-medium\" style=\"width:332px\" formControlName=\"shippingtype\">\n                 <option value=\"\">Chose a shipping type</option>\n                 <option *ngFor=\"let type of shippingtypes\" value=\"{{type.Id}}\">{{type.Name}}</option>\n            </select>\n        </div> \n         <div class=\"form-group\">\n            <select value=\"this.data.EndBuyer\" class=\"form-control input-medium\" style=\"width:332px\" formControlName=\"endbuyer\">\n                 <option value=\"\">Chose an end buyer</option>             \n                 <option *ngFor=\"let buyer of endbuyers\" value=\"{{buyer.Id}}\">{{buyer.Name}}</option>\n            </select>\n        </div> \n       <div class=\"form-group\">\n                    <input formControlName=\"address\" type=\"text\" class=\"form-control\" placeholder=\"Enter address\" value=\"this.data.Address\" autofocus />            \n                </div>   \n <div class=\"form-group\">\n                    <input formControlName=\"contact\" type=\"text\" class=\"form-control\" placeholder=\"Enter contact\" value=\"this.data.Contact\" autofocus />            \n                </div>   \n <div class=\"form-group\">\n                    <input formControlName=\"country\" type=\"text\" class=\"form-control\" placeholder=\"Enter country\" value=\"this.data.Country\" autofocus />            \n                </div>   \n        <div class=\"form-group\">\n                    <input formControlName=\"regname\" type=\"text\" class=\"form-control\" placeholder=\"Enter reg name\" value=\"this.data.Regname\" autofocus />            \n                </div> \n<div class=\"form-group\">\n                    <input formControlName=\"searchname\" type=\"text\" class=\"form-control\" placeholder=\"Enter search name\" value=\"this.data.SearchName\" autofocus />            \n                </div>   \n<div class=\"form-group\">\n                    <input formControlName=\"email\" type=\"email\" class=\"form-control\" placeholder=\"Enter email\" value=\"this.data.Email\" autofocus />            \n                </div>  \n<div class=\"form-group\">\n                    <input formControlName=\"fax\" type=\"text\" class=\"form-control\" placeholder=\"Enter fax\" value=\"this.data.Fax\" autofocus />            \n                </div>\n<div class=\"form-group\">\n                    <input formControlName=\"postalcode\" type=\"text\" class=\"form-control\" placeholder=\"Enter postal code\" value=\"this.data.PostalCode\" autofocus />            \n                </div>     \n<div class=\"form-group\">\n                    <input formControlName=\"tel\" type=\"tel\" class=\"form-control\" placeholder=\"Enter tel\" value=\"this.data.Tel\" autofocus />            \n                </div>  \n<div class=\"form-group\">\n                    <input formControlName=\"city\" type=\"tel\" class=\"form-control\" placeholder=\"Enter city\" value=\"this.data.City\" autofocus />            \n                </div>  \n        <div class=\"form-group\">\n                    <input formControlName=\"remark\" type=\"text\" class=\"form-control\" placeholder=\"Enter remark\" value=\"this.data.Remark\" autofocus />            \n                </div> \n       <div class=\"form-group\">       \n                <input type=\"file\" id=\"files\" name=\"files\" multiple />\n                <input type=\"button\" id=\"upload\" (click)=\"fileChangeEvent()\" value=\"Upload\" />\n                <img src=\"\" alt=\"\" height=\"42\" width=\"42\" id=\"imgPreview\">\n <div class=\"alert alert-success\" id=\"lblinFo\">\n                </div>\n        </div> \n        <div class=\"form-group\">\n           Is Active? <input formControlName=\"isactive\" type=\"checkbox\" value=\"this.data.IsActive\" autofocus />     \n        </div>                   \n        <div class=\"form-group\">\n            <input type=\"button\" class=\"btn btn-primary btn-block\" [disabled]=\"!shippingForm.valid\" value=\"Add\" (click)=\"onSubmit(this.shippingForm.value)\" />\n        </div>       \n    </form>\n  </div>\n</div>\n",
                    providers: [shipping_service_1.ShippingService, forms_1.FormBuilder, shippingtype_service_1.ShippingTypeService, endbuyer_service_1.EndBuyerService, department_service_1.DepartmentService, brand_service_1.BrandService, division_service_1.DivisionService]
                }),
                __metadata("design:paramtypes", [forms_1.FormBuilder,
                    shippingtype_service_1.ShippingTypeService,
                    endbuyer_service_1.EndBuyerService,
                    division_service_1.DivisionService,
                    department_service_1.DepartmentService,
                    brand_service_1.BrandService,
                    shipping_service_1.ShippingService,
                    router_1.Router,
                    auth_service_1.AuthService,
                    router_1.ActivatedRoute])
            ], ShippingAddComponent);
            exports_1("ShippingAddComponent", ShippingAddComponent);
        }
    };
});
