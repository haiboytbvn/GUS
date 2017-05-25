System.register(["@angular/core", "@angular/forms", "@angular/router", "../../Color/shared/color.service", "../../Department/shared/department.service", "../../Division/shared/division.service", "../../Brand/shared/brand.service", "../../auth.service", "../../SearchGeneralFilter/shared/searchGeneralFilter.model", "../../Pagination/shared/generalsearch.model", "../../Pagination/shared/pagination.model"], function (exports_1, context_1) {
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
    var core_1, forms_1, router_1, color_service_1, department_service_1, division_service_1, brand_service_1, auth_service_1, searchGeneralFilter_model_1, generalsearch_model_1, pagination_model_1, ColorEditComponent;
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
            ColorEditComponent = (function () {
                function ColorEditComponent(fb, colorService, divisionService, deptServcie, brandService, router, authService, activatedRoute) {
                    this.fb = fb;
                    this.colorService = colorService;
                    this.divisionService = divisionService;
                    this.deptServcie = deptServcie;
                    this.brandService = brandService;
                    this.router = router;
                    this.authService = authService;
                    this.activatedRoute = activatedRoute;
                    this.title = "Edit Color";
                    this.errorMessage = null;
                    this.isDelete = false;
                    this.isFormValuesChanged = false;
                }
                ColorEditComponent.prototype.ngOnInit = function () {
                    var _this = this;
                    if (!this.authService.isLoggedIn()) {
                        this.router.navigate([""]);
                    }
                    var id = this.activatedRoute.snapshot.params["id"];
                    if (id) {
                        this.colorService.get(id).subscribe(function (data) {
                            _this.data = data;
                        });
                    }
                    else {
                        this.router.navigate(["color/add"]);
                    }
                    this.paging = new pagination_model_1.PaginationModel(10, 1, "Name", 0, [], 0);
                    this.searchModel = new generalsearch_model_1.GeneralSearchModel("", "", "", "", this.paging);
                    var searchGeneralFilter = new searchGeneralFilter_model_1.SearchGeneralFilter("", "", "", "");
                    this.brandService.getBrandList(this.searchModel).subscribe(function (items) { return _this.brands = items.Data; }, function (error) { return _this.errorMessage = error; });
                    this.deptServcie.getDepartmentList(this.searchModel).subscribe(function (items) { return _this.depts = items.Data; }, function (error) { return _this.errorMessage = error; });
                    this.divisionService.getDivisionList(this.searchModel).subscribe(function (items) { return _this.divisions = items.Data; }, function (error) { return _this.errorMessage = error; });
                    this.iseditting = false;
                    this.buttonvalue = "Edit";
                };
                ColorEditComponent.prototype.fileChangeEvent = function () {
                    this.isFormValuesChanged = true;
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
                ColorEditComponent.prototype.onUpdate = function (data) {
                    var _this = this;
                    if (this.iseditting) {
                        data.Image = jQuery('#hdImagepath').val();
                        this.colorService.update(data).subscribe(function (data) {
                            if (data.error == null) {
                                _this.data = data;
                                alert('Color details updated successfully');
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
                    }
                    else {
                        this.buttonvalue = "Save";
                        this.iseditting = true;
                    }
                };
                ColorEditComponent.prototype.isFormChanged = function (value) {
                    var _this = this;
                    this.colorService.get(this.data.Id).subscribe(function (oldData) {
                        _this.isFormDataChanged(oldData);
                    });
                };
                ColorEditComponent.prototype.isFormDataChanged = function (oldData) {
                    if (JSON.stringify(this.data) === JSON.stringify(oldData))
                        this.isFormValuesChanged = false;
                    else
                        this.isFormValuesChanged = true;
                };
                return ColorEditComponent;
            }());
            ColorEditComponent = __decorate([
                core_1.Component({
                    selector: "color-edit",
                    templateUrl: "app/Color/color/color-edit.component.html",
                    providers: [color_service_1.ColorService, forms_1.FormBuilder, department_service_1.DepartmentService, brand_service_1.BrandService, division_service_1.DivisionService]
                }),
                __metadata("design:paramtypes", [forms_1.FormBuilder,
                    color_service_1.ColorService,
                    division_service_1.DivisionService,
                    department_service_1.DepartmentService,
                    brand_service_1.BrandService,
                    router_1.Router,
                    auth_service_1.AuthService,
                    router_1.ActivatedRoute])
            ], ColorEditComponent);
            exports_1("ColorEditComponent", ColorEditComponent);
        }
    };
});
