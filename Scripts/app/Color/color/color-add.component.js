System.register(["@angular/core", "@angular/forms", "@angular/router", "../../Color/shared/color.model", "../../Color/shared/color.service", "../../Department/shared/department.service", "../../Division/shared/division.service", "../../Brand/shared/brand.service", "../../auth.service", "../../SearchGeneralFilter/shared/searchGeneralFilter.model", "../../Pagination/shared/generalsearch.model", "../../Pagination/shared/pagination.model"], function (exports_1, context_1) {
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
    var core_1, forms_1, router_1, color_model_1, color_service_1, department_service_1, division_service_1, brand_service_1, auth_service_1, searchGeneralFilter_model_1, generalsearch_model_1, pagination_model_1, ColorAddComponent;
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
            function (color_model_1_1) {
                color_model_1 = color_model_1_1;
            },
            function (color_service_1_1) {
                color_service_1 = color_service_1_1;
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
            ColorAddComponent = (function () {
                function ColorAddComponent(fb, divisionService, deptServcie, brandService, colorService, router, authService, activatedRoute) {
                    this.fb = fb;
                    this.divisionService = divisionService;
                    this.deptServcie = deptServcie;
                    this.brandService = brandService;
                    this.colorService = colorService;
                    this.router = router;
                    this.authService = authService;
                    this.activatedRoute = activatedRoute;
                    this.errorMessage = null;
                }
                ColorAddComponent.prototype.fileChangeEvent = function () {
                    var fileUpload = jQuery("#files").get(0);
                    var files = fileUpload.files;
                    var data = new FormData();
                    for (var i = 0; i < files.length; i++) {
                        data.append(files[i].name, files[i]);
                    }
                    jQuery.ajax({
                        type: "POST",
                        url: "api/color/UploadImage",
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
                ColorAddComponent.prototype.doUpload = function () {
                    jQuery("#files").trigger("click");
                };
                ColorAddComponent.prototype.ngOnInit = function () {
                    var _this = this;
                    if (!this.authService.isLoggedIn()) {
                        this.router.navigate([""]);
                    }
                    this.colorForm = this.fb.group({
                        buyercode: [""],
                        name: ["", [
                                forms_1.Validators.required
                            ]],
                        brand: ["", [
                                forms_1.Validators.required
                            ]],
                        department: ["", [
                                forms_1.Validators.required
                            ]],
                        division: ["", [
                                forms_1.Validators.required
                            ]],
                        isactive: [true],
                        remark: [""]
                    });
                    var searchGeneralFilter = new searchGeneralFilter_model_1.SearchGeneralFilter("", "", "", "");
                    this.paging = new pagination_model_1.PaginationModel(10, 1, "Name", 0, [], 0);
                    this.searchModel = new generalsearch_model_1.GeneralSearchModel("", "", "", "", this.paging);
                    this.brandService.getBrandList(this.searchModel).subscribe(function (item) { return _this.brands = item.Data; }, function (error) { return _this.errorMessage = error; });
                    this.deptServcie.getDepartmentList(this.searchModel).subscribe(function (item) { return _this.depts = item.Data; }, function (error) { return _this.errorMessage = error; });
                    this.divisionService.getDivisionList(this.searchModel).subscribe(function (items) { return _this.divisions = items.Data; }, function (error) { return _this.errorMessage = error; });
                    this.data = new color_model_1.Color("", false, "", "", "", "", "", "", "", "");
                    this.title = "New Color";
                };
                ColorAddComponent.prototype.ngOnDestroy = function () {
                    this.colorService.data = this.data;
                };
                ColorAddComponent.prototype.onSubmit = function (data) {
                    var _this = this;
                    var newData = new color_model_1.Color("", data.isactive, data.code, data.buyercode, data.name, data.brand, data.department, data.division, jQuery('#hdImage').val(), data.remark);
                    this.colorService.add(newData).subscribe(function (data) {
                        if (data.error == null) {
                            _this.data = data;
                            alert('Color added successfully');
                            _this.router.navigate(["/color"]);
                        }
                        else {
                            // update failure
                            _this.errorMessage = data.error;
                            alert(_this.errorMessage);
                        }
                    }, function (error) {
                        _this.errorMessage = error;
                    });
                };
                ColorAddComponent.prototype.onBack = function () {
                    this.router.navigate(["color"]);
                };
                ColorAddComponent.prototype.changeDivision = function (value) {
                    console.log(value);
                };
                ColorAddComponent.prototype.onUpdate = function (data) {
                };
                return ColorAddComponent;
            }());
            __decorate([
                core_1.ViewChild('errorDiv'),
                __metadata("design:type", core_1.ElementRef)
            ], ColorAddComponent.prototype, "errorDiv", void 0);
            ColorAddComponent = __decorate([
                core_1.Component({
                    selector: "color-add",
                    templateUrl: "app/Color/color/color-add.component.html",
                    providers: [color_service_1.ColorService, forms_1.FormBuilder, department_service_1.DepartmentService, brand_service_1.BrandService, division_service_1.DivisionService]
                }),
                __metadata("design:paramtypes", [forms_1.FormBuilder,
                    division_service_1.DivisionService,
                    department_service_1.DepartmentService,
                    brand_service_1.BrandService,
                    color_service_1.ColorService,
                    router_1.Router,
                    auth_service_1.AuthService,
                    router_1.ActivatedRoute])
            ], ColorAddComponent);
            exports_1("ColorAddComponent", ColorAddComponent);
        }
    };
});
