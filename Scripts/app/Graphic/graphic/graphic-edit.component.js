System.register(["@angular/core", "@angular/forms", "@angular/router", "../../Graphic/shared/graphic.service", "../../GraphicCategory/shared/graphiccategory.service", "../../GraphicProductName/shared/graphicproductname.service", "../../Color/shared/color.service", "../../GraphicType/shared/graphictype.service", "../../Department/shared/department.service", "../../Division/shared/division.service", "../../Brand/shared/brand.service", "../../auth.service", "../../Pagination/shared/generalsearch.model", "../../Pagination/shared/pagination.model"], function (exports_1, context_1) {
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
    var core_1, forms_1, router_1, graphic_service_1, graphiccategory_service_1, graphicproductname_service_1, color_service_1, graphictype_service_1, department_service_1, division_service_1, brand_service_1, auth_service_1, generalsearch_model_1, pagination_model_1, GraphicEditComponent;
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
            function (graphic_service_1_1) {
                graphic_service_1 = graphic_service_1_1;
            },
            function (graphiccategory_service_1_1) {
                graphiccategory_service_1 = graphiccategory_service_1_1;
            },
            function (graphicproductname_service_1_1) {
                graphicproductname_service_1 = graphicproductname_service_1_1;
            },
            function (color_service_1_1) {
                color_service_1 = color_service_1_1;
            },
            function (graphictype_service_1_1) {
                graphictype_service_1 = graphictype_service_1_1;
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
            GraphicEditComponent = (function () {
                function GraphicEditComponent(fb, graphicService, categoryService, productnameService, graphictypeService, brandService, deptService, divisionService, colorService, router, authService, activatedRoute) {
                    this.fb = fb;
                    this.graphicService = graphicService;
                    this.categoryService = categoryService;
                    this.productnameService = productnameService;
                    this.graphictypeService = graphictypeService;
                    this.brandService = brandService;
                    this.deptService = deptService;
                    this.divisionService = divisionService;
                    this.colorService = colorService;
                    this.router = router;
                    this.authService = authService;
                    this.activatedRoute = activatedRoute;
                    this.title = "Edit Graphic";
                    this.errorMessage = null;
                    this.isDelete = false;
                    this.isFormValuesChanged = false;
                }
                GraphicEditComponent.prototype.changeType = function (id) {
                    var _this = this;
                    if (id === "") {
                        this.disableCategory = true;
                        this.disableProductName = true;
                    }
                    else {
                        this.disableCategory = false;
                        this.categoryService.getGraphicCategoryListByType(id).subscribe(function (items) { return _this.categories = items; }, function (error) { return _this.errorMessage = error; });
                    }
                };
                GraphicEditComponent.prototype.changeCategory = function (id) {
                    var _this = this;
                    if (id === "") {
                        this.disableProductName = true;
                    }
                    else {
                        this.disableProductName = false;
                        this.productnameService.getGraphicProductNameByCategory(id).subscribe(function (items) { return _this.productnames = items; }, function (error) { return _this.errorMessage = error; });
                    }
                };
                GraphicEditComponent.prototype.fileChangeEvent = function () {
                    var fileUpload = jQuery("#files").get(0);
                    var files = fileUpload.files;
                    var data = new FormData();
                    for (var i = 0; i < files.length; i++) {
                        data.append(files[i].name, files[i]);
                    }
                    jQuery.ajax({
                        type: "POST",
                        url: "api/graphic/UploadImage",
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
                                appendstring += "<li><a href=\"javascript:void(0);\" [(click)]=\"changeImage(" + data[i].UploadPath + ")\"><img src=\"" + data[i].UploadPath + "\" alt=\"graphic image\"></a></li>";
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
                GraphicEditComponent.prototype.ngOnInit = function () {
                    var _this = this;
                    if (!this.authService.isLoggedIn()) {
                        this.router.navigate([""]);
                    }
                    this.disableCategory = true;
                    this.disableProductName = true;
                    var id = this.activatedRoute.snapshot.params["id"];
                    if (id) {
                        this.graphicService.get(id).subscribe(function (data) {
                            _this.data = data;
                        });
                    }
                    else {
                        this.router.navigate(["graphic/add"]);
                    }
                    this.paging = new pagination_model_1.PaginationModel(10, 1, "Name", 0, [], 0);
                    this.searchModel = new generalsearch_model_1.GeneralSearchModel("", "", "", "", this.paging);
                    var pageall = new pagination_model_1.PaginationModel(10, 0, "Name", 0, [], 0);
                    var getAll = new generalsearch_model_1.GeneralSearchModel("", "", "", "", pageall);
                    this.categoryService.getGraphicCategoryList(getAll).subscribe(function (items) { return _this.categories = items.Data; }, function (error) { return _this.errorMessage = error; });
                    this.productnameService.getGraphicProductNameList(getAll).subscribe(function (items) { return _this.productnames = items.Data; }, function (error) { return _this.errorMessage = error; });
                    this.graphictypeService.getGraphicTypeList(getAll).subscribe(function (items) { return _this.types = items.Data; }, function (error) { return _this.errorMessage = error; });
                    this.brandService.getBrandList(getAll).subscribe(function (items) { return _this.brands = items.Data; }, function (error) { return _this.errorMessage = error; });
                    this.deptService.getDepartmentList(getAll).subscribe(function (items) { return _this.departments = items.Data; }, function (error) { return _this.errorMessage = error; });
                    this.divisionService.getDivisionList(getAll).subscribe(function (items) { return _this.divisions = items.Data; }, function (error) { return _this.errorMessage = error; });
                    this.colorService.getColorList(getAll).subscribe(function (items) { return _this.colors = items.Data; }, function (error) { return _this.errorMessage = error; });
                    this.title = "Edit Graphic";
                    this.iseditting = false;
                    this.buttonvalue = "Edit";
                };
                GraphicEditComponent.prototype.onUpdate = function (data) {
                    var _this = this;
                    if (this.iseditting) {
                        data.Image = jQuery('#hdImagepath').val();
                        this.graphicService.update(data).subscribe(function (data) {
                            if (data.error == null) {
                                _this.data = data;
                                alert('Accessorie details updated successfully');
                                _this.router.navigate(["/graphic"]);
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
                GraphicEditComponent.prototype.isFormChanged = function (value) {
                    var _this = this;
                    this.graphicService.get(this.data.Id).subscribe(function (oldData) {
                        _this.isFormDataChanged(oldData);
                    });
                };
                GraphicEditComponent.prototype.changeImage = function (path) {
                    jQuery('#imgPreview').prop("src", path);
                };
                GraphicEditComponent.prototype.isFormDataChanged = function (oldData) {
                    console.log(this.data);
                    console.log(oldData);
                    if (JSON.stringify(this.data) === JSON.stringify(oldData))
                        this.isFormValuesChanged = false;
                    else
                        this.isFormValuesChanged = true;
                };
                return GraphicEditComponent;
            }());
            GraphicEditComponent = __decorate([
                core_1.Component({
                    selector: "graphic-edit",
                    templateUrl: "app/Graphic/graphic/graphic-edit.component.html",
                    providers: [graphic_service_1.GraphicService, forms_1.FormBuilder, graphiccategory_service_1.GraphicCategoryService, graphicproductname_service_1.GraphicProductNameService, brand_service_1.BrandService, graphictype_service_1.GraphicTypeService, department_service_1.DepartmentService, division_service_1.DivisionService, color_service_1.ColorService]
                }),
                __metadata("design:paramtypes", [forms_1.FormBuilder,
                    graphic_service_1.GraphicService,
                    graphiccategory_service_1.GraphicCategoryService,
                    graphicproductname_service_1.GraphicProductNameService,
                    graphictype_service_1.GraphicTypeService,
                    brand_service_1.BrandService,
                    department_service_1.DepartmentService,
                    division_service_1.DivisionService,
                    color_service_1.ColorService,
                    router_1.Router,
                    auth_service_1.AuthService,
                    router_1.ActivatedRoute])
            ], GraphicEditComponent);
            exports_1("GraphicEditComponent", GraphicEditComponent);
        }
    };
});
