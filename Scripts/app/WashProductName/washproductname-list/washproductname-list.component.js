System.register(["@angular/core", "@angular/forms", "../shared/washproductname.service", "../shared/washproductname.model", "../../WashCategory/shared/washcategory.service", "../../Pagination/shared/pagination.model", "../../Pagination/shared/generalsearch.model", "@angular/router", "../../auth.service"], function (exports_1, context_1) {
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
    var core_1, forms_1, washproductname_service_1, washproductname_model_1, washcategory_service_1, pagination_model_1, generalsearch_model_1, router_1, auth_service_1, WashProductNameListComponent;
    return {
        setters: [
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (forms_1_1) {
                forms_1 = forms_1_1;
            },
            function (washproductname_service_1_1) {
                washproductname_service_1 = washproductname_service_1_1;
            },
            function (washproductname_model_1_1) {
                washproductname_model_1 = washproductname_model_1_1;
            },
            function (washcategory_service_1_1) {
                washcategory_service_1 = washcategory_service_1_1;
            },
            function (pagination_model_1_1) {
                pagination_model_1 = pagination_model_1_1;
            },
            function (generalsearch_model_1_1) {
                generalsearch_model_1 = generalsearch_model_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (auth_service_1_1) {
                auth_service_1 = auth_service_1_1;
            }
        ],
        execute: function () {
            WashProductNameListComponent = (function () {
                function WashProductNameListComponent(washproductnameService, authService, fabcategoryService, router, fb, acctypeService) {
                    this.washproductnameService = washproductnameService;
                    this.authService = authService;
                    this.fabcategoryService = fabcategoryService;
                    this.router = router;
                    this.fb = fb;
                    this.acctypeService = acctypeService;
                    this.title = "Wash Product Name";
                    this.pagesizearr = [10, 20, 30, 0];
                    this.isFormValuesChanged = false;
                }
                WashProductNameListComponent.prototype.ngOnInit = function () {
                    var _this = this;
                    if (!this.authService.isLoggedIn()) {
                        this.router.navigate([""]);
                    }
                    this.paging = new pagination_model_1.PaginationModel(10, 1, "Name", 0, [], 0);
                    this.searchModel = new generalsearch_model_1.GeneralSearchModel("", "", "", "", this.paging);
                    var pageall = new pagination_model_1.PaginationModel(10, 0, "Name", 0, [], 0);
                    var getAll = new generalsearch_model_1.GeneralSearchModel("", "", "", "", pageall);
                    this.washproductnameService.getWashProductNameList(this.searchModel).subscribe(function (items) { return _this.ACdata = items; }, function (error) { return _this.errorMessage = error; });
                    this.fabcategoryService.getWashCategoryList(getAll).subscribe(function (items) { return _this.categories = items.Data; }, function (error) { return _this.errorMessage = error; });
                    this.washproductnameAddForm = this.fb.group({
                        id: [""],
                        name: ["", [forms_1.Validators.required]],
                        isactive: [true],
                        acccategory: ["", [forms_1.Validators.required]]
                    });
                    this.data = new washproductname_model_1.WashProductName("", false, "", "");
                    this.itemid = "";
                };
                WashProductNameListComponent.prototype.changePage = function (i) {
                    var _this = this;
                    this.searchModel.Paging.PageNumber = i;
                    this.washproductnameService.getWashProductNameList(this.searchModel).subscribe(function (items) { return _this.ACdata = items; }, function (error) { return _this.errorMessage = error; });
                };
                WashProductNameListComponent.prototype.changeSize = function (i) {
                    var _this = this;
                    if (i == 0) {
                        this.searchModel.Paging.PageNumber = 0;
                    }
                    else {
                        this.searchModel.Paging.PageSize = i;
                        this.searchModel.Paging.PageNumber = 1;
                    }
                    this.washproductnameService.getWashProductNameList(this.searchModel).subscribe(function (items) { return _this.ACdata = items; }, function (error) { return _this.errorMessage = error; });
                };
                WashProductNameListComponent.prototype.onSubmit = function (data) {
                    var _this = this;
                    var apn = new washproductname_model_1.WashProductName("", data.isactive, data.name, data.acccategory);
                    this.washproductnameService.add(apn).subscribe(function (data) {
                        if (data.error == null) {
                            _this.washproductnameService.getWashProductNameList(_this.searchModel).subscribe(function (items) { return _this.ACdata = items; }, function (error) { return _this.errorMessage = error; });
                            alert("added successfully");
                            _this.data = new washproductname_model_1.WashProductName("", false, "", "");
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
                WashProductNameListComponent.prototype.onAdd = function () {
                    jQuery('#txtName').val('');
                    jQuery('#drType').val('');
                    jQuery('#ckIsActive').prop('checked', true);
                };
                WashProductNameListComponent.prototype.onUpdate = function (data) {
                    var _this = this;
                    // else, update it
                    // var washproductname = new WashProductName(data.id, null, null, data.isactive, data.name, false, data.buyercode, data.acctype);
                    console.log(data);
                    this.washproductnameService.update(data).subscribe(function (data) {
                        if (data.error == null) {
                            _this.data = data;
                            _this.washproductnameService.getWashProductNameList(_this.searchModel).subscribe(function (items) { return _this.ACdata = items; }, function (error) { return _this.errorMessage = error; });
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
                WashProductNameListComponent.prototype.onEdit = function (id) {
                    var _this = this;
                    this.itemid = id;
                    if (id !== "") {
                        this.washproductnameService.get(id).subscribe(function (data) {
                            _this.data = data;
                        });
                    }
                };
                WashProductNameListComponent.prototype.isFormChanged = function (value) {
                    var _this = this;
                    this.washproductnameService.get(this.data.Id).subscribe(function (oldData) {
                        _this.isFormDataChanged(oldData);
                    });
                };
                WashProductNameListComponent.prototype.isFormDataChanged = function (oldData) {
                    if (JSON.stringify(this.data) === JSON.stringify(oldData))
                        this.isFormValuesChanged = false;
                    else
                        this.isFormValuesChanged = true;
                };
                return WashProductNameListComponent;
            }());
            WashProductNameListComponent = __decorate([
                core_1.Component({
                    selector: 'washproductname',
                    templateUrl: 'app/WashProductName/washproductname-list/washproductname-list.component.html',
                    providers: [washproductname_service_1.WashProductNameService, forms_1.FormBuilder, washcategory_service_1.WashCategoryService]
                }),
                __metadata("design:paramtypes", [washproductname_service_1.WashProductNameService,
                    auth_service_1.AuthService,
                    washcategory_service_1.WashCategoryService,
                    router_1.Router,
                    forms_1.FormBuilder,
                    washproductname_service_1.WashProductNameService])
            ], WashProductNameListComponent);
            exports_1("WashProductNameListComponent", WashProductNameListComponent);
        }
    };
});
