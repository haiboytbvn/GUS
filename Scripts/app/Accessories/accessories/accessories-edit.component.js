System.register(["@angular/core", "@angular/forms", "@angular/router", "../../Accessories/shared/accessories.service", "../../AccessoryCategory/shared/accessorycategory.service", "../../AccessoryProductName/shared/accessoryproductname.service", "../../Color/shared/color.service", "../../AccessoryType/shared/accessorytype.service", "../../Department/shared/department.service", "../../Division/shared/division.service", "../../Brand/shared/brand.service", "../../auth.service", "../../Pagination/shared/generalsearch.model", "../../Pagination/shared/pagination.model"], function (exports_1, context_1) {
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
    var core_1, forms_1, router_1, accessories_service_1, accessorycategory_service_1, accessoryproductname_service_1, color_service_1, accessorytype_service_1, department_service_1, division_service_1, brand_service_1, auth_service_1, generalsearch_model_1, pagination_model_1, AccessoriesEditComponent;
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
            function (accessories_service_1_1) {
                accessories_service_1 = accessories_service_1_1;
            },
            function (accessorycategory_service_1_1) {
                accessorycategory_service_1 = accessorycategory_service_1_1;
            },
            function (accessoryproductname_service_1_1) {
                accessoryproductname_service_1 = accessoryproductname_service_1_1;
            },
            function (color_service_1_1) {
                color_service_1 = color_service_1_1;
            },
            function (accessorytype_service_1_1) {
                accessorytype_service_1 = accessorytype_service_1_1;
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
            AccessoriesEditComponent = (function () {
                function AccessoriesEditComponent(fb, accessoriesService, categoryService, productnameService, acctypeService, brandService, deptService, divisionService, colorService, router, authService, activatedRoute) {
                    this.fb = fb;
                    this.accessoriesService = accessoriesService;
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
                    this.title = "Edit Accessories";
                    this.errorMessage = null;
                    this.isDelete = false;
                    this.isFormValuesChanged = false;
                }
                AccessoriesEditComponent.prototype.changeType = function (id) {
                    var _this = this;
                    this.categoryService.getAccCateogryListByType(id).subscribe(function (items) { return _this.categories = items; }, function (error) { return _this.errorMessage = error; });
                };
                AccessoriesEditComponent.prototype.changeCategory = function (id) {
                    var _this = this;
                    if (id === "") {
                        this.disableProductName = true;
                    }
                    else {
                        this.disableProductName = false;
                        this.productnameService.GetAccProductNameByCategory(id).subscribe(function (items) { return _this.productnames = items; }, function (error) { return _this.errorMessage = error; });
                    }
                };
                AccessoriesEditComponent.prototype.fileChangeEvent = function () {
                    var fileUpload = jQuery("#files").get(0);
                    var files = fileUpload.files;
                    var data = new FormData();
                    for (var i = 0; i < files.length; i++) {
                        data.append(files[i].name, files[i]);
                    }
                    jQuery.ajax({
                        type: "POST",
                        url: "api/accessory/UploadImage",
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
                                appendstring += "<li><a href=\"javascript:void(0);\" [(click)]=\"changeImage(" + data[i].UploadPath + ")\"><img src=\"" + data[i].UploadPath + "\" alt=\"accessory image\"></a></li>";
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
                AccessoriesEditComponent.prototype.ngOnInit = function () {
                    var _this = this;
                    if (!this.authService.isLoggedIn()) {
                        this.router.navigate([""]);
                    }
                    this.disableCategory = true;
                    this.disableProductName = true;
                    var id = this.activatedRoute.snapshot.params["id"];
                    if (id) {
                        this.accessoriesService.get(id).subscribe(function (data) {
                            _this.data = data;
                        });
                    }
                    else {
                        this.router.navigate(["accessories/add"]);
                    }
                    this.paging = new pagination_model_1.PaginationModel(10, 1, "Name", 0, [], 0);
                    this.searchModel = new generalsearch_model_1.GeneralSearchModel("", "", "", "", this.paging);
                    var pageall = new pagination_model_1.PaginationModel(10, 0, "Name", 0, [], 0);
                    var getAll = new generalsearch_model_1.GeneralSearchModel("", "", "", "", pageall);
                    this.categoryService.getAccessoryCategoryList(getAll).subscribe(function (items) { return _this.categories = items.Data; }, function (error) { return _this.errorMessage = error; });
                    this.productnameService.getAccessoryProductNameList(getAll).subscribe(function (items) { return _this.productnames = items.Data; }, function (error) { return _this.errorMessage = error; });
                    this.acctypeService.getAccessoryTypeList(getAll).subscribe(function (items) { return _this.types = items.Data; }, function (error) { return _this.errorMessage = error; });
                    this.brandService.getBrandList(getAll).subscribe(function (items) { return _this.brands = items.Data; }, function (error) { return _this.errorMessage = error; });
                    this.deptService.getDepartmentList(getAll).subscribe(function (items) { return _this.departments = items.Data; }, function (error) { return _this.errorMessage = error; });
                    this.divisionService.getDivisionList(getAll).subscribe(function (items) { return _this.divisions = items.Data; }, function (error) { return _this.errorMessage = error; });
                    this.colorService.getColorList(getAll).subscribe(function (items) { return _this.colors = items.Data; }, function (error) { return _this.errorMessage = error; });
                    this.title = "Edit Accessories";
                    this.iseditting = false;
                    this.buttonvalue = "Edit";
                };
                AccessoriesEditComponent.prototype.onUpdate = function (data) {
                    var _this = this;
                    if (this.iseditting) {
                        data.Image = jQuery('#hdImagepath').val();
                        this.accessoriesService.update(data).subscribe(function (data) {
                            if (data.error == null) {
                                _this.data = data;
                                alert('Accessorie details updated successfully');
                                _this.router.navigate(["/accessories"]);
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
                AccessoriesEditComponent.prototype.isFormChanged = function (value) {
                    var _this = this;
                    this.accessoriesService.get(this.data.Id).subscribe(function (oldData) {
                        _this.isFormDataChanged(oldData);
                    });
                };
                AccessoriesEditComponent.prototype.changeImage = function (path) {
                    jQuery('#imgPreview').prop("src", path);
                };
                AccessoriesEditComponent.prototype.isFormDataChanged = function (oldData) {
                    console.log(this.data);
                    console.log(oldData);
                    if (JSON.stringify(this.data) === JSON.stringify(oldData))
                        this.isFormValuesChanged = false;
                    else
                        this.isFormValuesChanged = true;
                };
                return AccessoriesEditComponent;
            }());
            AccessoriesEditComponent = __decorate([
                core_1.Component({
                    selector: "accessories-edit",
                    templateUrl: "app/Accessories/accessories/accessories-edit.component.html",
                    providers: [accessories_service_1.AccessoryService, forms_1.FormBuilder, accessorycategory_service_1.AccessoryCategoryService, accessoryproductname_service_1.AccessoryProductNameService, brand_service_1.BrandService, accessorytype_service_1.AccessoryTypeService, department_service_1.DepartmentService, division_service_1.DivisionService, color_service_1.ColorService]
                }),
                __metadata("design:paramtypes", [forms_1.FormBuilder,
                    accessories_service_1.AccessoryService,
                    accessorycategory_service_1.AccessoryCategoryService,
                    accessoryproductname_service_1.AccessoryProductNameService,
                    accessorytype_service_1.AccessoryTypeService,
                    brand_service_1.BrandService,
                    department_service_1.DepartmentService,
                    division_service_1.DivisionService,
                    color_service_1.ColorService,
                    router_1.Router,
                    auth_service_1.AuthService,
                    router_1.ActivatedRoute])
            ], AccessoriesEditComponent);
            exports_1("AccessoriesEditComponent", AccessoriesEditComponent);
        }
    };
});
