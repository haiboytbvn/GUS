System.register(["@angular/core", "@angular/forms", "@angular/router", "../../Shipping/shared/shipping.service", "../../ShippingType/shared/shippingtype.service", "../../EndBuyer/shared/endbuyer.service", "../../Department/shared/department.service", "../../Division/shared/division.service", "../../Brand/shared/brand.service", "../../auth.service", "../../SearchGeneralFilter/shared/searchGeneralFilter.model", "../../Pagination/shared/generalsearch.model", "../../Pagination/shared/pagination.model"], function (exports_1, context_1) {
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
    var core_1, forms_1, router_1, shipping_service_1, shippingtype_service_1, endbuyer_service_1, department_service_1, division_service_1, brand_service_1, auth_service_1, searchGeneralFilter_model_1, generalsearch_model_1, pagination_model_1, ShippingEditComponent;
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
            function (shipping_service_1_1) {
                shipping_service_1 = shipping_service_1_1;
            },
            function (shippingtype_service_1_1) {
                shippingtype_service_1 = shippingtype_service_1_1;
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
            function (brand_service_1_1) {
                brand_service_1 = brand_service_1_1;
            },
            function (auth_service_1_1) {
                auth_service_1 = auth_service_1_1;
            },
            function (searchGeneralFilter_model_1_1) {
                searchGeneralFilter_model_1 = searchGeneralFilter_model_1_1;
            },
            function (generalsearch_model_1_1) {
                generalsearch_model_1 = generalsearch_model_1_1;
            },
            function (pagination_model_1_1) {
                pagination_model_1 = pagination_model_1_1;
            }
        ],
        execute: function () {
            ShippingEditComponent = (function () {
                function ShippingEditComponent(fb, shippingService, shippingtypeService, endbuyerService, divisionService, deptServcie, brandService, router, authService, activatedRoute) {
                    this.fb = fb;
                    this.shippingService = shippingService;
                    this.shippingtypeService = shippingtypeService;
                    this.endbuyerService = endbuyerService;
                    this.divisionService = divisionService;
                    this.deptServcie = deptServcie;
                    this.brandService = brandService;
                    this.router = router;
                    this.authService = authService;
                    this.activatedRoute = activatedRoute;
                    this.title = "Edit Shipping";
                    this.errorMessage = null;
                    this.isDelete = false;
                    this.isFormValuesChanged = false;
                }
                ShippingEditComponent.prototype.ngOnInit = function () {
                    var _this = this;
                    if (!this.authService.isLoggedIn()) {
                        this.router.navigate([""]);
                    }
                    var id = this.activatedRoute.snapshot.params["id"];
                    if (id) {
                        this.shippingService.get(id).subscribe(function (data) {
                            _this.data = data;
                        });
                    }
                    else {
                        this.router.navigate(["shipping/add"]);
                    }
                    var pageall = new pagination_model_1.PaginationModel(10, 0, "Name", 0, [], 0);
                    var getAll = new generalsearch_model_1.GeneralSearchModel("", "", "", "", pageall);
                    var searchGeneralFilter = new searchGeneralFilter_model_1.SearchGeneralFilter("", "", "", "");
                    this.paging = new pagination_model_1.PaginationModel(10, 1, "Name", 0, [], 0);
                    this.searchModel = new generalsearch_model_1.GeneralSearchModel("", "", "", "", this.paging);
                    this.shippingtypeService.getShippingTypeList(getAll).subscribe(function (items) { return _this.shippingtypes = items; }, function (error) { return _this.errorMessage = error; });
                    this.endbuyerService.getEndBuyerList(getAll).subscribe(function (items) { return _this.endbuyers = items; }, function (error) { return _this.errorMessage = error; });
                    this.brandService.getBrandList(this.searchModel).subscribe(function (items) { return _this.brands = items; }, function (error) { return _this.errorMessage = error; });
                    this.deptServcie.getDepartmentList(this.searchModel).subscribe(function (items) { return _this.depts = items; }, function (error) { return _this.errorMessage = error; });
                    this.divisionService.getDivisionList(this.searchModel).subscribe(function (items) { return _this.divisions = items; }, function (error) { return _this.errorMessage = error; });
                };
                ShippingEditComponent.prototype.ngAfterViewInit = function () {
                    jQuery(this.errorDiv.nativeElement).hide();
                };
                ShippingEditComponent.prototype.fileChangeEvent = function () {
                    this.isFormValuesChanged = true;
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
                            jQuery('#hdImagepath').val(data.UploadPath);
                            jQuery('#imgPreview').attr("src", data.UploadPath);
                            this.data.Image = data.UploadPath;
                            jQuery('#lblinFo').append('File ' + data.FileName + ' size ' + data.Size + ' uploaded successfully');
                        },
                        error: function () {
                            alert("There was error uploading files!");
                        }
                    });
                };
                ShippingEditComponent.prototype.onUpdate = function (data) {
                    var _this = this;
                    data.Image = jQuery('#hdImagepath').val();
                    this.shippingService.update(data).subscribe(function (data) {
                        if (data.error == null) {
                            _this.data = data;
                            _this.errorMessage = 'Shipping details updated successfully';
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
                ShippingEditComponent.prototype.onDelete = function (data) {
                    var _this = this;
                    this.shippingService.delete(data.Id).subscribe(function (data) {
                        if (data.error == null) {
                            _this.router.navigate(["shipping"]);
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
                ShippingEditComponent.prototype.onBack = function () {
                    this.router.navigate(["shipping"]);
                };
                ShippingEditComponent.prototype.deleteConfirm = function () {
                    this.isDelete = true;
                };
                ShippingEditComponent.prototype.close = function () {
                    this.isDelete = false;
                };
                ShippingEditComponent.prototype.displayMessage = function (message, status) {
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
                ShippingEditComponent.prototype.isFormChanged = function (value) {
                    var _this = this;
                    this.shippingService.get(this.data.Id).subscribe(function (oldData) {
                        _this.isFormDataChanged(oldData);
                    });
                };
                ShippingEditComponent.prototype.isFormDataChanged = function (oldData) {
                    if (JSON.stringify(this.data) === JSON.stringify(oldData))
                        this.isFormValuesChanged = false;
                    else
                        this.isFormValuesChanged = true;
                };
                return ShippingEditComponent;
            }());
            __decorate([
                core_1.ViewChild('errorDiv'),
                __metadata("design:type", core_1.ElementRef)
            ], ShippingEditComponent.prototype, "errorDiv", void 0);
            ShippingEditComponent = __decorate([
                core_1.Component({
                    selector: "shipping-edit",
                    template: "\n<div class=\"error-message\" #errorDiv></div>\n<div>\n    <h2>\n        <a href=\"javascript:void(0)\" (click)=\"onBack()\">\n            &laquo; Back to Shipping List\n        </a>\n    </h2>\n  <div class=\"user-container\">    \n    <form class=\"form-user\" #shippingForm=\"ngForm\" *ngIf=\"data\"  >\n        <h2 class=\"form-user-heading\">{{title}}</h2>\n        <div class=\"form-group\">\n            <input type=\"hidden\" value=\"{{this.data.Image}}\" id=\"hdImagepath\"/>\n            <input name=\"input-name\" type=\"text\" class=\"form-control\" placeholder=\"Enter name\" [(ngModel)]=\"data.Name\" #name=\"ngModel\" autofocus required (ngModelChange)=\"isFormChanged($event)\"  />\n            <span class=\"validator-label valid\" *ngIf=\"name.valid\">\n                <span class=\"glyphicon glyphicon-ok\" aria-hidden=\"true\"></span>\n                valid!\n            </span>\n            <span class=\"validator-label invalid\" *ngIf=\"!name.valid && !name.pristine\">\n                <span class=\"glyphicon glyphicon-remove\" aria-hidden=\"true\"></span>\n                invalid\n            </span>\n        </div> \n        <div class=\"form-group\">\n            <input name=\"input-buyercode\" type=\"text\" class=\"form-control\" placeholder=\"Enter buyer code\" [(ngModel)]=\"data.BuyerCode\" #buyercode=\"ngModel\" autofocus required (ngModelChange)=\"isFormChanged($event)\"  />         \n        </div>      \n        <div class=\"form-group\">\n            <select name=\"input-brand\" class=\"form-control\" style=\"width:332px\" [(ngModel)]=\"data.Brand\" #brand=\"ngModel\" (ngModelChange)=\"isFormChanged($event)\">\n                 <option value=\"\">Chose a brand</option>\n                 <option *ngFor=\"let brand of brands\" value=\"{{brand.Id}}\">{{brand.Name}}</option>\n            </select>\n        </div>   \n        <div class=\"form-group\">\n            <select name=\"input-department\" class=\"form-control\" style=\"width:332px\" [(ngModel)]=\"data.Department\" #department=\"ngModel\" (ngModelChange)=\"isFormChanged($event)\">\n                 <option value=\"\">Chose a department</option>\n                    <option *ngFor=\"let dept of depts\" value=\"{{dept.Id}}\">{{dept.Name}}</option>\n            </select>\n        </div>   \n         <div class=\"form-group\">\n            <select name=\"input-division\" class=\"form-control\" style=\"width:332px\" [(ngModel)]=\"data.Division\" #division=\"ngModel\" (ngModelChange)=\"isFormChanged($event)\">\n                  <option value=\"\">Chose a division</option>\n              <option *ngFor=\"let division of divisions\" value=\"{{division.Id}}\">{{division.Name}}</option>\n            </select>\n        </div>\n        <div class=\"form-group\">\n            <select name=\"input-shippingtype\" class=\"form-control\" style=\"width:332px\" [(ngModel)]=\"data.ShippingType\" #shippingtype=\"ngModel\" (ngModelChange)=\"isFormChanged($event)\">\n                  <option value=\"\">Chose a shipping type</option>\n              <option *ngFor=\"let type of shippingtypes\" value=\"{{type.Id}}\">{{type.Name}}</option>\n            </select>\n        </div>\n         <div class=\"form-group\">\n            <select name=\"input-endbuyer\" class=\"form-control\" style=\"width:332px\" [(ngModel)]=\"data.EndBuyer\" #endbuyer=\"ngModel\" (ngModelChange)=\"isFormChanged($event)\">\n                  <option value=\"\">Chose a endbuyer</option>\n              <option *ngFor=\"let buyer of endbuyers\" value=\"{{buyer.Id}}\">{{buyer.Name}}</option>\n            </select>\n        </div>      \n        <div class=\"form-group\">\n            <input name=\"input-address\" type=\"text\" class=\"form-control\" placeholder=\"Enter address\" [(ngModel)]=\"data.Address\" #address=\"ngModel\" autofocus required (ngModelChange)=\"isFormChanged($event)\"  />         \n        </div> \n  <div class=\"form-group\">\n            <input name=\"input-contact\" type=\"text\" class=\"form-control\" placeholder=\"Enter contact\" [(ngModel)]=\"data.Contact\" #contact=\"ngModel\" autofocus required (ngModelChange)=\"isFormChanged($event)\"  />         \n        </div> \n  <div class=\"form-group\">\n            <input name=\"input-country\" type=\"text\" class=\"form-control\" placeholder=\"Enter country\" [(ngModel)]=\"data.Country\" #country=\"ngModel\" autofocus required (ngModelChange)=\"isFormChanged($event)\"  />         \n        </div> \n        <div class=\"form-group\">\n            <input name=\"input-regname\" type=\"text\" class=\"form-control\" placeholder=\"Enter reg name\" [(ngModel)]=\"data.RegName\" #regname=\"ngModel\" autofocus required (ngModelChange)=\"isFormChanged($event)\"  />         \n        </div> \n<div class=\"form-group\">\n            <input name=\"input-searchname\" type=\"text\" class=\"form-control\" placeholder=\"Enter search name\" [(ngModel)]=\"data.SearchName\" #searchname=\"ngModel\" autofocus required (ngModelChange)=\"isFormChanged($event)\"  />         \n        </div> \n<div class=\"form-group\">\n            <input name=\"input-email\" type=\"email\" class=\"form-control\" placeholder=\"Enter email\" [(ngModel)]=\"data.Email\" #email=\"ngModel\" autofocus required (ngModelChange)=\"isFormChanged($event)\"  />         \n        </div> \n<div class=\"form-group\">\n            <input name=\"input-fax\" type=\"text\" class=\"form-control\" placeholder=\"Enter fax\" [(ngModel)]=\"data.Fax\" #fax=\"ngModel\" autofocus required (ngModelChange)=\"isFormChanged($event)\"  />         \n        </div> \n<div class=\"form-group\">\n            <input name=\"input-postalcode\" type=\"text\" class=\"form-control\" placeholder=\"Enter postal code\" [(ngModel)]=\"data.PostalCode\" #postalcode=\"ngModel\" autofocus required (ngModelChange)=\"isFormChanged($event)\"  />         \n        </div> \n<div class=\"form-group\">\n            <input name=\"input-tel\" type=\"tel\" class=\"form-control\" placeholder=\"Enter tel\" [(ngModel)]=\"data.Tel\" #tel=\"ngModel\" autofocus required (ngModelChange)=\"isFormChanged($event)\"  />         \n        </div>\n<div class=\"form-group\">\n            <input name=\"input-city\" type=\"text\" class=\"form-control\" placeholder=\"Enter city\" [(ngModel)]=\"data.City\" #city=\"ngModel\" autofocus required (ngModelChange)=\"isFormChanged($event)\"  />         \n        </div> \n <div class=\"form-group\">\n            <input name=\"input-remark\" type=\"text\" class=\"form-control\" placeholder=\"Enter type\" [(ngModel)]=\"data.Remark\" #remark=\"ngModel\" autofocus required (ngModelChange)=\"isFormChanged($event)\"  />         \n        </div> \n         <div class=\"form-group\">\n         \n                <input type=\"file\" id=\"files\" name=\"files\" multiple />\n                <input type=\"button\" id=\"upload\" (click)=\"fileChangeEvent()\" value=\"Upload\" />\n                <img src=\"{{this.data.Image}}\" alt=\"\" height=\"42\" width=\"42\" id=\"imgPreview\">\n<div class=\"alert alert-success\" id=\"lblinFo\">\n                </div>\n        </div> \n        <div class=\"form-group\">\n           Is Active? <input name=\"input-isActive\" type=\"checkbox\" [(ngModel)]=\"data.IsActive\" #isActive=\"ngModel\" autofocus required (ngModelChange)=\"isFormChanged($event)\"/>           \n        </div>             \n        <div class=\"form-group\">\n            <input type=\"button\" class=\"btn btn-primary btn-block\" [disabled]=\"!shippingForm.valid || !isFormValuesChanged\" value=\"Update\" (click)=\"onUpdate(data)\" /><br/>\n            <input type=\"button\" class=\"btn btn-danger btn-block\" [disabled]=\"!shippingForm.valid\" value=\"Delete\" (click)=\"deleteConfirm()\" />             \n       </div>             \n       <div class=\"dialog\" *ngIf=\"isDelete\">\n          <h3>Are you sure to delete ?</h3>\n            <input type=\"button\" class=\"btn btn-danger btn-block\"  value=\"Yes\" (click)=\"onDelete(data)\" />   <br/>          \n            <input type=\"button\" class=\"btn btn-primary btn-block\"  value=\"No\" (click)=\"close()\" />             \n       </div>\n       <div *ngIf=\"isDelete\" class=\"overlay\" (click)=\"Close()\"></div>\n    </form> \n  </div>       \n</div>\n",
                    providers: [shipping_service_1.ShippingService, forms_1.FormBuilder, shippingtype_service_1.ShippingTypeService, endbuyer_service_1.EndBuyerService, department_service_1.DepartmentService, brand_service_1.BrandService, division_service_1.DivisionService]
                }),
                __metadata("design:paramtypes", [forms_1.FormBuilder,
                    shipping_service_1.ShippingService,
                    shippingtype_service_1.ShippingTypeService,
                    endbuyer_service_1.EndBuyerService,
                    division_service_1.DivisionService,
                    department_service_1.DepartmentService,
                    brand_service_1.BrandService,
                    router_1.Router,
                    auth_service_1.AuthService,
                    router_1.ActivatedRoute])
            ], ShippingEditComponent);
            exports_1("ShippingEditComponent", ShippingEditComponent);
        }
    };
});
