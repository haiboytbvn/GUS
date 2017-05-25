System.register(["@angular/core", "@angular/forms", "@angular/router", "../../Wash/shared/wash.service", "../../WashCategory/shared/washcategory.service", "../../WashProductName/shared/washproductname.service", "../../Color/shared/color.service", "../../WashType/shared/washtype.service", "../../Department/shared/department.service", "../../Division/shared/division.service", "../../Brand/shared/brand.service", "../../auth.service", "../../Pagination/shared/generalsearch.model", "../../Pagination/shared/pagination.model"], function (exports_1, context_1) {
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
    var core_1, forms_1, router_1, wash_service_1, washcategory_service_1, washproductname_service_1, color_service_1, washtype_service_1, department_service_1, division_service_1, brand_service_1, auth_service_1, generalsearch_model_1, pagination_model_1, WashEditComponent;
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
            function (wash_service_1_1) {
                wash_service_1 = wash_service_1_1;
            },
            function (washcategory_service_1_1) {
                washcategory_service_1 = washcategory_service_1_1;
            },
            function (washproductname_service_1_1) {
                washproductname_service_1 = washproductname_service_1_1;
            },
            function (color_service_1_1) {
                color_service_1 = color_service_1_1;
            },
            function (washtype_service_1_1) {
                washtype_service_1 = washtype_service_1_1;
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
            function (generalsearch_model_1_1) {
                generalsearch_model_1 = generalsearch_model_1_1;
            },
            function (pagination_model_1_1) {
                pagination_model_1 = pagination_model_1_1;
            }
        ],
        execute: function () {
            WashEditComponent = (function () {
                function WashEditComponent(fb, washService, categoryService, productnameService, acctypeService, brandService, deptService, divisionService, colorService, router, authService, activatedRoute) {
                    this.fb = fb;
                    this.washService = washService;
                    this.categoryService = categoryService;
                    this.productnameService = productnameService;
                    this.acctypeService = acctypeService;
                    this.brandService = brandService;
                    this.deptService = deptService;
                    this.divisionService = divisionService;
                    this.colorService = colorService;
                    this.router = router;
                    this.authService = authService;
                    this.activatedRoute = activatedRoute;
                    this.title = "Edit Wash";
                    this.errorMessage = null;
                    this.isDelete = false;
                    this.isFormValuesChanged = false;
                }
                WashEditComponent.prototype.changeType = function (id) {
                    var _this = this;
                    this.categoryService.getWashCateogryListByType(id).subscribe(function (items) { return _this.categories = items; }, function (error) { return _this.errorMessage = error; });
                };
                WashEditComponent.prototype.changeCategory = function (id) {
                    var _this = this;
                    if (id === "") {
                        this.disableProductName = true;
                    }
                    else {
                        this.disableProductName = false;
                        this.productnameService.getWashProductNameByCategory(id).subscribe(function (items) { return _this.productnames = items; }, function (error) { return _this.errorMessage = error; });
                    }
                };
                WashEditComponent.prototype.fileChangeEvent = function () {
                    var fileUpload = jQuery("#files").get(0);
                    var files = fileUpload.files;
                    var data = new FormData();
                    for (var i = 0; i < files.length; i++) {
                        data.append(files[i].name, files[i]);
                    }
                    jQuery.ajax({
                        type: "POST",
                        url: "api/wash/UploadImage",
                        contentType: false,
                        processData: false,
                        data: data,
                        success: function (data) {
                            jQuery('#imgPreview').prop("src", data[0].UploadPath);
                            this.mainimage = data[0].UploadPath;
                            var imagepath = "";
                            var appendstring = "";
                            for (var i = 0; i < data.length; i++) {
                                imagepath += data[i].UploadPath + "|";
                                appendstring += "<li><a href=\"javascript:void(0);\" [(click)]=\"changeImage(" + data[i].UploadPath + ")\"><img src=\"" + data[i].UploadPath + "\" alt=\"wash image\"></a></li>";
                                // this.listimages.push(data[i].UploadPath);
                            }
                            jQuery('#hdImage').val(imagepath);
                            jQuery('#imagecontainer').html('');
                            jQuery('#imagecontainer').html(appendstring);
                            this.data.Image = imagepath;
                        },
                        error: function () {
                            alert("There was error uploading files!");
                        }
                    });
                };
                WashEditComponent.prototype.ngOnInit = function () {
                    var _this = this;
                    if (!this.authService.isLoggedIn()) {
                        this.router.navigate([""]);
                    }
                    var id = this.activatedRoute.snapshot.params["id"];
                    if (id) {
                        this.washService.get(id).subscribe(function (data) {
                            _this.data = data;
                        });
                    }
                    else {
                        this.router.navigate(["wash/add"]);
                    }
                    this.paging = new pagination_model_1.PaginationModel(10, 1, "Name", 0, [], 0);
                    this.searchModel = new generalsearch_model_1.GeneralSearchModel("", "", "", "", this.paging);
                    var pageall = new pagination_model_1.PaginationModel(10, 0, "Name", 0, [], 0);
                    var getAll = new generalsearch_model_1.GeneralSearchModel("", "", "", "", pageall);
                    this.categoryService.getWashCategoryList(getAll).subscribe(function (items) { return _this.categories = items.Data; }, function (error) { return _this.errorMessage = error; });
                    this.productnameService.getWashProductNameList(getAll).subscribe(function (items) { return _this.productnames = items.Data; }, function (error) { return _this.errorMessage = error; });
                    this.acctypeService.getWashTypeList(getAll).subscribe(function (items) { return _this.types = items.Data; }, function (error) { return _this.errorMessage = error; });
                    this.brandService.getBrandList(getAll).subscribe(function (items) { return _this.brands = items.Data; }, function (error) { return _this.errorMessage = error; });
                    this.deptService.getDepartmentList(getAll).subscribe(function (items) { return _this.departments = items.Data; }, function (error) { return _this.errorMessage = error; });
                    this.divisionService.getDivisionList(getAll).subscribe(function (items) { return _this.divisions = items.Data; }, function (error) { return _this.errorMessage = error; });
                    this.colorService.getColorList(getAll).subscribe(function (items) { return _this.colors = items.Data; }, function (error) { return _this.errorMessage = error; });
                    this.title = "Edit Wash";
                    this.iseditting = false;
                    this.buttonvalue = "Edit";
                };
                WashEditComponent.prototype.onUpdate = function (data) {
                    var _this = this;
                    if (this.iseditting) {
                        data.Image = jQuery('#hdImagepath').val();
                        this.washService.update(data).subscribe(function (data) {
                            if (data.error == null) {
                                _this.data = data;
                                alert('Wash details updated successfully');
                                _this.router.navigate(["/wash"]);
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
                WashEditComponent.prototype.isFormChanged = function (value) {
                    var _this = this;
                    this.washService.get(this.data.Id).subscribe(function (oldData) {
                        _this.isFormDataChanged(oldData);
                    });
                };
                WashEditComponent.prototype.changeImage = function (path) {
                    jQuery('#imgPreview').prop("src", path);
                };
                WashEditComponent.prototype.isFormDataChanged = function (oldData) {
                    console.log(this.data);
                    console.log(oldData);
                    if (JSON.stringify(this.data) === JSON.stringify(oldData))
                        this.isFormValuesChanged = false;
                    else
                        this.isFormValuesChanged = true;
                };
                return WashEditComponent;
            }());
            WashEditComponent = __decorate([
                core_1.Component({
                    selector: "wash-edit",
                    templateUrl: "app/Wash/wash/wash-edit.component.html",
                    providers: [wash_service_1.WashService, forms_1.FormBuilder, washcategory_service_1.WashCategoryService, washproductname_service_1.WashProductNameService, brand_service_1.BrandService, washtype_service_1.WashTypeService, department_service_1.DepartmentService, division_service_1.DivisionService, color_service_1.ColorService]
                }),
                __metadata("design:paramtypes", [forms_1.FormBuilder,
                    wash_service_1.WashService,
                    washcategory_service_1.WashCategoryService,
                    washproductname_service_1.WashProductNameService,
                    washtype_service_1.WashTypeService,
                    brand_service_1.BrandService,
                    department_service_1.DepartmentService,
                    division_service_1.DivisionService,
                    color_service_1.ColorService,
                    router_1.Router,
                    auth_service_1.AuthService,
                    router_1.ActivatedRoute])
            ], WashEditComponent);
            exports_1("WashEditComponent", WashEditComponent);
        }
    };
});
