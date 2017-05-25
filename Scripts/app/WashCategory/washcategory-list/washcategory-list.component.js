System.register(["@angular/core", "@angular/forms", "../shared/washcategory.service", "../shared/washcategory.model", "../../Pagination/shared/pagination.model", "@angular/router", "../../auth.service", "../../WashType/shared/washtype.service", "../../Pagination/shared/generalsearch.model"], function (exports_1, context_1) {
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
    var core_1, forms_1, washcategory_service_1, washcategory_model_1, pagination_model_1, router_1, auth_service_1, washtype_service_1, generalsearch_model_1, WashCategoryListComponent;
    return {
        setters: [
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (forms_1_1) {
                forms_1 = forms_1_1;
            },
            function (washcategory_service_1_1) {
                washcategory_service_1 = washcategory_service_1_1;
            },
            function (washcategory_model_1_1) {
                washcategory_model_1 = washcategory_model_1_1;
            },
            function (pagination_model_1_1) {
                pagination_model_1 = pagination_model_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (auth_service_1_1) {
                auth_service_1 = auth_service_1_1;
            },
            function (washtype_service_1_1) {
                washtype_service_1 = washtype_service_1_1;
            },
            function (generalsearch_model_1_1) {
                generalsearch_model_1 = generalsearch_model_1_1;
            }
        ],
        execute: function () {
            WashCategoryListComponent = (function () {
                function WashCategoryListComponent(washcategoryService, authService, router, fb, washtypeService) {
                    this.washcategoryService = washcategoryService;
                    this.authService = authService;
                    this.router = router;
                    this.fb = fb;
                    this.washtypeService = washtypeService;
                    this.title = "Wash Category";
                    this.pagesizearr = [10, 20, 30, 0];
                    this.isFormValuesChanged = false;
                }
                WashCategoryListComponent.prototype.ngOnInit = function () {
                    var _this = this;
                    if (!this.authService.isLoggedIn()) {
                        this.router.navigate([""]);
                    }
                    this.paging = new pagination_model_1.PaginationModel(10, 1, "Name", 0, [], 0);
                    this.searchModel = new generalsearch_model_1.GeneralSearchModel("", "", "", "", this.paging);
                    this.washcategoryService.getWashCategoryList(this.searchModel).subscribe(function (items) { return _this.ACdata = items; }, function (error) { return _this.errorMessage = error; });
                    this.washcategoryAddForm = this.fb.group({
                        name: ["", [forms_1.Validators.required]],
                        isactive: [true],
                        acctype: ["", [forms_1.Validators.required]]
                    });
                    var pageall = new pagination_model_1.PaginationModel(10, 0, "Name", 0, [], 0);
                    var getAll = new generalsearch_model_1.GeneralSearchModel("", "", "", "", pageall);
                    this.washtypeService.getWashTypeList(getAll).subscribe(function (items) { return _this.types = items; }, function (error) { return _this.errorMessage = error; });
                    this.data = new washcategory_model_1.WashCategory("", false, "", "");
                    this.itemid = "";
                };
                WashCategoryListComponent.prototype.changePage = function (i) {
                    var _this = this;
                    this.searchModel.Paging.PageNumber = i;
                    this.washcategoryService.getWashCategoryList(this.searchModel).subscribe(function (items) { return _this.ACdata = items; }, function (error) { return _this.errorMessage = error; });
                };
                WashCategoryListComponent.prototype.changeSize = function (i) {
                    var _this = this;
                    if (i == 0) {
                        this.searchModel.Paging.PageNumber = 0;
                    }
                    else {
                        this.searchModel.Paging.PageSize = i;
                        this.searchModel.Paging.PageNumber = 1;
                    }
                    this.washcategoryService.getWashCategoryList(this.searchModel).subscribe(function (items) { return _this.ACdata = items; }, function (error) { return _this.errorMessage = error; });
                };
                WashCategoryListComponent.prototype.onSubmit = function (data) {
                    var _this = this;
                    var washcategory = new washcategory_model_1.WashCategory("", data.isactive, data.name, data.acctype);
                    this.washcategoryService.add(washcategory).subscribe(function (data) {
                        if (data.error == null) {
                            _this.washcategoryService.getWashCategoryList(_this.searchModel).subscribe(function (items) { return _this.ACdata = items; }, function (error) { return _this.errorMessage = error; });
                            alert("added successfully");
                            _this.data = new washcategory_model_1.WashCategory("", false, "", "");
                            jQuery('#txtName').val('');
                            jQuery('#drType').val('');
                            jQuery('#ckIsActive').prop('checked', true);
                        }
                        else {
                            // update failure
                            _this.errorMessage = data.error;
                            alert(_this.errorMessage);
                        }
                    }, function (error) {
                        _this.errorMessage = error;
                        alert(_this.errorMessage);
                    });
                    jQuery('#myModalAdd').modal('hide');
                };
                WashCategoryListComponent.prototype.onAdd = function () {
                    jQuery('#txtName').val('');
                    jQuery('#drType').val('');
                    jQuery('#ckIsActive').prop('checked', true);
                };
                WashCategoryListComponent.prototype.onUpdate = function (data) {
                    var _this = this;
                    // else, update it
                    // var washcategory = new WashCategory(data.id, null, null, data.isactive, data.name, false, data.buyercode, data.acctype);
                    console.log(data);
                    this.washcategoryService.update(data).subscribe(function (data) {
                        if (data.error == null) {
                            _this.data = data;
                            _this.washcategoryService.getWashCategoryList(_this.searchModel).subscribe(function (items) { return _this.ACdata = items; }, function (error) { return _this.errorMessage = error; });
                            alert("updated successfully");
                            jQuery('#myModalEdit').modal('hide');
                            _this.itemid == "";
                        }
                        else {
                            // update failure
                            _this.errorMessage = data.error;
                            alert(_this.errorMessage);
                        }
                    }, function (error) {
                        _this.errorMessage = error;
                        alert(_this.errorMessage);
                    });
                };
                WashCategoryListComponent.prototype.onEdit = function (id) {
                    var _this = this;
                    this.itemid = id;
                    if (id !== "") {
                        this.washcategoryService.get(id).subscribe(function (data) {
                            _this.data = data;
                        });
                    }
                };
                WashCategoryListComponent.prototype.isFormChanged = function (value) {
                    var _this = this;
                    this.washcategoryService.get(this.data.Id).subscribe(function (oldData) {
                        _this.isFormDataChanged(oldData);
                    });
                };
                WashCategoryListComponent.prototype.isFormDataChanged = function (oldData) {
                    if (JSON.stringify(this.data) === JSON.stringify(oldData))
                        this.isFormValuesChanged = false;
                    else
                        this.isFormValuesChanged = true;
                };
                return WashCategoryListComponent;
            }());
            WashCategoryListComponent = __decorate([
                core_1.Component({
                    selector: 'washcategory',
                    templateUrl: 'app/WashCategory/washcategory-list/washcategory-list.component.html',
                    providers: [washcategory_service_1.WashCategoryService, washtype_service_1.WashTypeService, forms_1.FormBuilder]
                }),
                __metadata("design:paramtypes", [washcategory_service_1.WashCategoryService,
                    auth_service_1.AuthService,
                    router_1.Router,
                    forms_1.FormBuilder,
                    washtype_service_1.WashTypeService])
            ], WashCategoryListComponent);
            exports_1("WashCategoryListComponent", WashCategoryListComponent);
        }
    };
});
