System.register(["@angular/core", "@angular/forms", "rxjs/Rx", "@angular/router", "../../Wash/shared/wash.model", "../../Wash/shared/wash.service", "../../WashCategory/shared/washcategory.service", "../../WashProductName/shared/washproductname.service", "../../Color/shared/color.service", "../../WashType/shared/washtype.service", "../../Department/shared/department.service", "../../Division/shared/division.service", "../../Brand/shared/brand.service", "../../auth.service", "../../Pagination/shared/generalsearch.model", "../../Pagination/shared/pagination.model"], function (exports_1, context_1) {
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
    var core_1, forms_1, router_1, wash_model_1, wash_service_1, washcategory_service_1, washproductname_service_1, color_service_1, washtype_service_1, department_service_1, division_service_1, brand_service_1, auth_service_1, generalsearch_model_1, pagination_model_1, WashAddComponent;
    return {
        setters: [
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (forms_1_1) {
                forms_1 = forms_1_1;
            },
            function (_1) {
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (wash_model_1_1) {
                wash_model_1 = wash_model_1_1;
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
            WashAddComponent = (function () {
                function WashAddComponent(fb, washService, categoryService, accproductnameService, washtypeService, brandService, deptService, divisionService, colorService, router, authService, activatedRoute) {
                    this.fb = fb;
                    this.washService = washService;
                    this.categoryService = categoryService;
                    this.accproductnameService = accproductnameService;
                    this.washtypeService = washtypeService;
                    this.brandService = brandService;
                    this.deptService = deptService;
                    this.divisionService = divisionService;
                    this.colorService = colorService;
                    this.router = router;
                    this.authService = authService;
                    this.activatedRoute = activatedRoute;
                    this.errorMessage = null;
                }
                WashAddComponent.prototype.changeType = function (id) {
                    var _this = this;
                    if (id === "") {
                        this.disableCategory = true;
                        this.disableProductName = true;
                    }
                    else {
                        this.disableCategory = false;
                        this.categoryService.getWashCateogryListByType(id).subscribe(function (items) { return _this.categories = items; }, function (error) { return _this.errorMessage = error; });
                    }
                };
                WashAddComponent.prototype.changeCategory = function (id) {
                    var _this = this;
                    if (id === "") {
                        this.disableProductName = true;
                    }
                    else {
                        this.disableProductName = false;
                        this.accproductnameService.getWashProductNameByCategory(id).subscribe(function (items) { return _this.productnames = items; }, function (error) { return _this.errorMessage = error; });
                    }
                };
                WashAddComponent.prototype.doUpload = function () {
                    jQuery("#files").trigger("click");
                };
                WashAddComponent.prototype.ngOnInit = function () {
                    var _this = this;
                    if (!this.authService.isLoggedIn()) {
                        this.router.navigate([""]);
                    }
                    this.disableCategory = true;
                    this.disableProductName = true;
                    this.washForm = this.fb.group({
                        buyercode: [""],
                        isactive: [true],
                        washcategory: ["", [forms_1.Validators.required]],
                        washproductname: ["", [forms_1.Validators.required]],
                        washtype: ["", [forms_1.Validators.required]],
                        recipe: [""],
                        supplier: [""],
                        suppliercode: [""],
                        brand: ["", [forms_1.Validators.required]],
                        division: ["", [forms_1.Validators.required]],
                        remark: [""],
                        department: ["", [forms_1.Validators.required]],
                        color: ["", [forms_1.Validators.required]],
                        description: [""]
                    });
                    var pageall = new pagination_model_1.PaginationModel(10, 0, "Name", 0, [], 0);
                    var getAll = new generalsearch_model_1.GeneralSearchModel("", "", "", "", pageall);
                    this.categoryService.getWashCategoryList(getAll).subscribe(function (items) { return _this.categories = items.Data; }, function (error) { return _this.errorMessage = error; });
                    this.accproductnameService.getWashProductNameList(getAll).subscribe(function (items) { return _this.productnames = items.Data; }, function (error) { return _this.errorMessage = error; });
                    this.washtypeService.getWashTypeList(getAll).subscribe(function (items) { return _this.types = items.Data; }, function (error) { return _this.errorMessage = error; });
                    this.brandService.getBrandList(getAll).subscribe(function (items) { return _this.brands = items.Data; }, function (error) { return _this.errorMessage = error; });
                    this.deptService.getDepartmentList(getAll).subscribe(function (items) { return _this.departments = items.Data; }, function (error) { return _this.errorMessage = error; });
                    this.divisionService.getDivisionList(getAll).subscribe(function (items) { return _this.divisions = items.Data; }, function (error) { return _this.errorMessage = error; });
                    this.colorService.getColorList(getAll).subscribe(function (items) { return _this.colors = items.Data; }, function (error) { return _this.errorMessage = error; });
                    this.data = new wash_model_1.Wash("", false, "", "", "", "", "", "", "", "", "", "", "", "", "", "", [], "");
                    this.title = "New Wash";
                };
                WashAddComponent.prototype.fileChangeEvent = function (fileInput) {
                    // UPLOAD BY ANGULAR 2
                    var _this = this;
                    var FileList = fileInput.target.files;
                    var formData = new FormData();
                    if (FileList.length > 5 || (this.imageList !== undefined && this.imageList.Images.length + FileList.length > 5)) {
                        alert("Files number cannot exceed 5!");
                        return;
                    }
                    for (var i = 0, length_1 = FileList.length; i < length_1; i++) {
                        formData.append('uploadFile' + i, FileList[i], FileList[i].name);
                    }
                    this.washService.upload(formData).subscribe(function (items) { return _this.imageList = items; }, function (error) { return _this.errorMessage = error; });
                };
                WashAddComponent.prototype.changeImage = function (path) {
                    this.imageList.MainImage = path;
                };
                WashAddComponent.prototype.onSubmit = function (data) {
                    var _this = this;
                    //get images
                    var imagestring = "";
                    for (var i = 0; i < this.imageList.Images.length; i++) {
                        imagestring += this.imageList.Images[i].UploadPath + "|";
                    }
                    var newData = new wash_model_1.Wash("", data.isactive, data.buyercode, data.washcategory, data.washproductname, data.washtype, data.description, data.brand, data.department, data.division, data.color, data.supplier, data.suppliercode, data.recipe, data.remark, imagestring, [], "");
                    this.washService.add(newData).subscribe(function (data) {
                        if (data.error == null) {
                            _this.data = data;
                            alert("Added successfully!");
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
                };
                return WashAddComponent;
            }());
            __decorate([
                core_1.ViewChild('errorDiv'),
                __metadata("design:type", core_1.ElementRef)
            ], WashAddComponent.prototype, "errorDiv", void 0);
            WashAddComponent = __decorate([
                core_1.Component({
                    selector: "wash-add",
                    templateUrl: 'app/Wash/wash/wash-add.component.html',
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
            ], WashAddComponent);
            exports_1("WashAddComponent", WashAddComponent);
        }
    };
});
