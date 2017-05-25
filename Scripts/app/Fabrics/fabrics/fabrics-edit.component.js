System.register(["@angular/core", "@angular/forms", "@angular/router", "../../Fabrics/shared/fabric.service", "../../FabricsCategory/shared/fabricscategory.service", "../../FabricsProductName/shared/fabricsproductname.service", "../../FabricsYarnCount/shared/fabricsyarncount.service", "../../FabricsFinishing/shared/fabricsfinishing.service", "../../FabricsFibreContent/shared/fabricsfibrecontent.service", "../../FabricsType/shared/fabricstype.service", "../../Department/shared/department.service", "../../Division/shared/division.service", "../../FabricWeight/shared/fabricweight.service", "../../Brand/shared/brand.service", "../../auth.service", "../../SearchGeneralFilter/shared/searchGeneralFilter.model", "../../Color/shared/color.service", "../../Pagination/shared/generalsearch.model", "../../Pagination/shared/pagination.model", "../../FabricProductType/shared/fabricproducttype.service"], function (exports_1, context_1) {
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
    var core_1, forms_1, router_1, fabric_service_1, fabricscategory_service_1, fabricsproductname_service_1, fabricsyarncount_service_1, fabricsfinishing_service_1, fabricsfibrecontent_service_1, fabricstype_service_1, department_service_1, division_service_1, fabricweight_service_1, brand_service_1, auth_service_1, searchGeneralFilter_model_1, color_service_1, generalsearch_model_1, pagination_model_1, fabricproducttype_service_1, FabricsEditComponent;
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
            function (fabric_service_1_1) {
                fabric_service_1 = fabric_service_1_1;
            },
            function (fabricscategory_service_1_1) {
                fabricscategory_service_1 = fabricscategory_service_1_1;
            },
            function (fabricsproductname_service_1_1) {
                fabricsproductname_service_1 = fabricsproductname_service_1_1;
            },
            function (fabricsyarncount_service_1_1) {
                fabricsyarncount_service_1 = fabricsyarncount_service_1_1;
            },
            function (fabricsfinishing_service_1_1) {
                fabricsfinishing_service_1 = fabricsfinishing_service_1_1;
            },
            function (fabricsfibrecontent_service_1_1) {
                fabricsfibrecontent_service_1 = fabricsfibrecontent_service_1_1;
            },
            function (fabricstype_service_1_1) {
                fabricstype_service_1 = fabricstype_service_1_1;
            },
            function (department_service_1_1) {
                department_service_1 = department_service_1_1;
            },
            function (division_service_1_1) {
                division_service_1 = division_service_1_1;
            },
            function (fabricweight_service_1_1) {
                fabricweight_service_1 = fabricweight_service_1_1;
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
            function (color_service_1_1) {
                color_service_1 = color_service_1_1;
            },
            function (generalsearch_model_1_1) {
                generalsearch_model_1 = generalsearch_model_1_1;
            },
            function (pagination_model_1_1) {
                pagination_model_1 = pagination_model_1_1;
            },
            function (fabricproducttype_service_1_1) {
                fabricproducttype_service_1 = fabricproducttype_service_1_1;
            }
        ],
        execute: function () {
            FabricsEditComponent = (function () {
                function FabricsEditComponent(fb, fabricsService, categoryService, productnameService, yarncountService, finishingService, fibrecontentService, fabtypeService, brandService, departmentService, divisionService, router, weightService, producttypeService, colorService, authService, activatedRoute) {
                    this.fb = fb;
                    this.fabricsService = fabricsService;
                    this.categoryService = categoryService;
                    this.productnameService = productnameService;
                    this.yarncountService = yarncountService;
                    this.finishingService = finishingService;
                    this.fibrecontentService = fibrecontentService;
                    this.fabtypeService = fabtypeService;
                    this.brandService = brandService;
                    this.departmentService = departmentService;
                    this.divisionService = divisionService;
                    this.router = router;
                    this.weightService = weightService;
                    this.producttypeService = producttypeService;
                    this.colorService = colorService;
                    this.authService = authService;
                    this.activatedRoute = activatedRoute;
                    this.title = "Edit Fabrics";
                    this.errorMessage = null;
                    this.isDelete = false;
                    this.isFormValuesChanged = false;
                }
                FabricsEditComponent.prototype.changeCategory = function () {
                    var _this = this;
                    this.productnameService.getFabProductNameByCategory(jQuery('#drFabcategory').val()).subscribe(function (items) { return _this.productnames = items; }, function (error) { return _this.errorMessage = error; });
                };
                FabricsEditComponent.prototype.changeType = function (id) {
                    var _this = this;
                    if (id === "") {
                        this.disableCategory = true;
                        this.disableProductName = true;
                    }
                    else {
                        this.disableCategory = false;
                        this.categoryService.getFabCateogryListByType(id).subscribe(function (items) { return _this.categories = items; }, function (error) { return _this.errorMessage = error; });
                    }
                };
                FabricsEditComponent.prototype.ngOnInit = function () {
                    var _this = this;
                    if (!this.authService.isLoggedIn()) {
                        this.router.navigate([""]);
                    }
                    this.disableCategory = true;
                    this.disableProductName = true;
                    var id = this.activatedRoute.snapshot.params["id"];
                    if (id) {
                        this.fabricsService.get(id).subscribe(function (data) {
                            _this.data = data;
                        });
                    }
                    else {
                        this.router.navigate(["fabrics/add"]);
                    }
                    var searchGeneralFilter = new searchGeneralFilter_model_1.SearchGeneralFilter("", "", "", "");
                    this.paging = new pagination_model_1.PaginationModel(10, 1, "Name", 0, [], 0);
                    this.searchModel = new generalsearch_model_1.GeneralSearchModel("", "", "", "", this.paging);
                    var pageall = new pagination_model_1.PaginationModel(10, 0, "Name", 0, [], 0);
                    var getAll = new generalsearch_model_1.GeneralSearchModel("", "", "", "", pageall);
                    this.categoryService.getFabricsCategoryList(getAll).subscribe(function (items) { return _this.categories = items.Data; }, function (error) { return _this.errorMessage = error; });
                    this.fabtypeService.getFabricsTypeList(getAll).subscribe(function (items) { return _this.fabtypes = items.Data; }, function (error) { return _this.errorMessage = error; });
                    this.productnameService.getFabricsProductNameList(getAll).subscribe(function (items) { return _this.productnames = items.Data; }, function (error) { return _this.errorMessage = error; });
                    this.brandService.getBrandList(getAll).subscribe(function (items) { return _this.brands = items.Data; }, function (error) { return _this.errorMessage = error; });
                    this.departmentService.getDepartmentList(getAll).subscribe(function (items) { return _this.departments = items.Data; }, function (error) { return _this.errorMessage = error; });
                    this.divisionService.getDivisionList(getAll).subscribe(function (items) { return _this.divisions = items.Data; }, function (error) { return _this.errorMessage = error; });
                    this.colorService.getColorList(getAll).subscribe(function (items) { return _this.colors = items.Data; }, function (error) { return _this.errorMessage = error; });
                    this.yarncountService.getFabricsYarnCountList(getAll).subscribe(function (items) { return _this.yarncounts = items.Data; }, function (error) { return _this.errorMessage = error; });
                    this.finishingService.getFabricsFinishingList(getAll).subscribe(function (items) { return _this.finishings = items.Data; }, function (error) { return _this.errorMessage = error; });
                    this.producttypeService.getFabricProductTypeList(getAll).subscribe(function (items) { return _this.producttypes = items.Data; }, function (error) { return _this.errorMessage = error; });
                    this.weightService.getFabricWeightList(getAll).subscribe(function (items) { return _this.weights = items.Data; }, function (error) { return _this.errorMessage = error; });
                    this.fibrecontentService.getFabricsFibreContentList(getAll).subscribe(function (items) { return _this.fibrecontents = items.Data; }, function (error) { return _this.errorMessage = error; });
                    this.title = "Edit Fabric";
                    this.iseditting = false;
                    this.buttonvalue = "Edit";
                };
                FabricsEditComponent.prototype.onUpdate = function (data) {
                    var _this = this;
                    if (this.iseditting) {
                        data.Image = jQuery('#hdImagepath').val();
                        this.fabricsService.update(data).subscribe(function (data) {
                            if (data.error == null) {
                                _this.data = data;
                                alert('Fabric detail updated successfully');
                                _this.router.navigate(["/fabrics"]);
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
                FabricsEditComponent.prototype.fileChangeEvent = function () {
                    var fileUpload = jQuery("#files").get(0);
                    var files = fileUpload.files;
                    var data = new FormData();
                    for (var i = 0; i < files.length; i++) {
                        data.append(files[i].name, files[i]);
                    }
                    jQuery.ajax({
                        type: "POST",
                        url: "api/fabric/UploadImage",
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
                FabricsEditComponent.prototype.isFormChanged = function (value) {
                    var _this = this;
                    this.fabricsService.get(this.data.Id).subscribe(function (oldData) {
                        _this.isFormDataChanged(oldData);
                    });
                };
                FabricsEditComponent.prototype.changeImage = function (path) {
                    jQuery('#imgPreview').prop("src", path);
                };
                FabricsEditComponent.prototype.isFormDataChanged = function (oldData) {
                    if (JSON.stringify(this.data) === JSON.stringify(oldData))
                        this.isFormValuesChanged = false;
                    else
                        this.isFormValuesChanged = true;
                };
                return FabricsEditComponent;
            }());
            __decorate([
                core_1.ViewChild('errorDiv'),
                __metadata("design:type", core_1.ElementRef)
            ], FabricsEditComponent.prototype, "errorDiv", void 0);
            FabricsEditComponent = __decorate([
                core_1.Component({
                    selector: "fabrics-edit",
                    templateUrl: "app/Fabrics/fabrics/fabrics-edit.component.html",
                    providers: [fabricweight_service_1.FabricWeightService, fabricproducttype_service_1.FabricProductTypeService, fabricstype_service_1.FabricsTypeService, color_service_1.ColorService, fabric_service_1.FabricsService, forms_1.FormBuilder, fabricscategory_service_1.FabricsCategoryService, fabricsproductname_service_1.FabricsProductNameService, fabricsyarncount_service_1.FabricsYarnCountService, fabricsfinishing_service_1.FabricsFinishingService, fabricsfibrecontent_service_1.FabricsFibreContentService, forms_1.Validators, department_service_1.DepartmentService, brand_service_1.BrandService, division_service_1.DivisionService, fabricstype_service_1.FabricsTypeService]
                }),
                __metadata("design:paramtypes", [forms_1.FormBuilder,
                    fabric_service_1.FabricsService,
                    fabricscategory_service_1.FabricsCategoryService,
                    fabricsproductname_service_1.FabricsProductNameService,
                    fabricsyarncount_service_1.FabricsYarnCountService,
                    fabricsfinishing_service_1.FabricsFinishingService,
                    fabricsfibrecontent_service_1.FabricsFibreContentService,
                    fabricstype_service_1.FabricsTypeService,
                    brand_service_1.BrandService,
                    department_service_1.DepartmentService,
                    division_service_1.DivisionService,
                    router_1.Router,
                    fabricweight_service_1.FabricWeightService,
                    fabricproducttype_service_1.FabricProductTypeService,
                    color_service_1.ColorService,
                    auth_service_1.AuthService,
                    router_1.ActivatedRoute])
            ], FabricsEditComponent);
            exports_1("FabricsEditComponent", FabricsEditComponent);
        }
    };
});
