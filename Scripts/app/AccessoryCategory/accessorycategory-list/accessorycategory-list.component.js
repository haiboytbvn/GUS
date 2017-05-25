System.register(["@angular/core", "@angular/forms", "../shared/accessorycategory.service", "../shared/accessorycategory.model", "../../Pagination/shared/pagination.model", "@angular/router", "../../auth.service", "../../AccessoryType/shared/accessorytype.service", "../../Pagination/shared/generalsearch.model"], function (exports_1, context_1) {
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
    var core_1, forms_1, accessorycategory_service_1, accessorycategory_model_1, pagination_model_1, router_1, auth_service_1, accessorytype_service_1, generalsearch_model_1, AccessoryCategoryListComponent;
    return {
        setters: [
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (forms_1_1) {
                forms_1 = forms_1_1;
            },
            function (accessorycategory_service_1_1) {
                accessorycategory_service_1 = accessorycategory_service_1_1;
            },
            function (accessorycategory_model_1_1) {
                accessorycategory_model_1 = accessorycategory_model_1_1;
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
            function (accessorytype_service_1_1) {
                accessorytype_service_1 = accessorytype_service_1_1;
            },
            function (generalsearch_model_1_1) {
                generalsearch_model_1 = generalsearch_model_1_1;
            }
        ],
        execute: function () {
            AccessoryCategoryListComponent = (function () {
                function AccessoryCategoryListComponent(accessorycategoryService, authService, router, fb, acctypeService) {
                    this.accessorycategoryService = accessorycategoryService;
                    this.authService = authService;
                    this.router = router;
                    this.fb = fb;
                    this.acctypeService = acctypeService;
                    this.title = "Accessory Category";
                    this.pagesizearr = [10, 20, 30, 0];
                    this.isFormValuesChanged = false;
                }
                AccessoryCategoryListComponent.prototype.ngOnInit = function () {
                    var _this = this;
                    if (!this.authService.isLoggedIn()) {
                        this.router.navigate([""]);
                    }
                    this.paging = new pagination_model_1.PaginationModel(10, 1, "Name", 0, [], 0);
                    this.searchModel = new generalsearch_model_1.GeneralSearchModel("", "", "", "", this.paging);
                    this.accessorycategoryService.getAccessoryCategoryList(this.searchModel).subscribe(function (items) { return _this.ACdata = items; }, function (error) { return _this.errorMessage = error; });
                    this.accessorycategoryAddForm = this.fb.group({
                        name: ["", [forms_1.Validators.required]],
                        isactive: [true],
                        acctype: ["", [forms_1.Validators.required]]
                    });
                    var pageall = new pagination_model_1.PaginationModel(10, 0, "Name", 0, [], 0);
                    var getAll = new generalsearch_model_1.GeneralSearchModel("", "", "", "", pageall);
                    this.acctypeService.getAccessoryTypeList(getAll).subscribe(function (items) { return _this.types = items; }, function (error) { return _this.errorMessage = error; });
                    this.data = new accessorycategory_model_1.AccessoryCategory("", false, "", "");
                    this.itemid = "";
                };
                AccessoryCategoryListComponent.prototype.changePage = function (i) {
                    var _this = this;
                    this.searchModel.Paging.PageNumber = i;
                    this.accessorycategoryService.getAccessoryCategoryList(this.searchModel).subscribe(function (items) { return _this.ACdata = items; }, function (error) { return _this.errorMessage = error; });
                };
                AccessoryCategoryListComponent.prototype.changeSize = function (i) {
                    var _this = this;
                    if (i == 0) {
                        this.searchModel.Paging.PageNumber = 0;
                    }
                    else {
                        this.searchModel.Paging.PageSize = i;
                        this.searchModel.Paging.PageNumber = 1;
                    }
                    this.accessorycategoryService.getAccessoryCategoryList(this.searchModel).subscribe(function (items) { return _this.ACdata = items; }, function (error) { return _this.errorMessage = error; });
                };
                AccessoryCategoryListComponent.prototype.onSubmit = function (data) {
                    var _this = this;
                    var accessorycategory = new accessorycategory_model_1.AccessoryCategory("", data.isactive, data.name, data.acctype);
                    this.accessorycategoryService.add(accessorycategory).subscribe(function (data) {
                        if (data.error == null) {
                            _this.accessorycategoryService.getAccessoryCategoryList(_this.searchModel).subscribe(function (items) { return _this.ACdata = items; }, function (error) { return _this.errorMessage = error; });
                            alert("added successfully");
                            _this.data = new accessorycategory_model_1.AccessoryCategory("", false, "", "");
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
                AccessoryCategoryListComponent.prototype.onAdd = function () {
                    jQuery('#txtName').val('');
                    jQuery('#drType').val('');
                    jQuery('#ckIsActive').prop('checked', true);
                };
                AccessoryCategoryListComponent.prototype.onUpdate = function (data) {
                    var _this = this;
                    // else, update it
                    // var accessorycategory = new AccessoryCategory(data.id, null, null, data.isactive, data.name, false, data.buyercode, data.acctype);
                    console.log(data);
                    this.accessorycategoryService.update(data).subscribe(function (data) {
                        if (data.error == null) {
                            _this.data = data;
                            _this.accessorycategoryService.getAccessoryCategoryList(_this.searchModel).subscribe(function (items) { return _this.ACdata = items; }, function (error) { return _this.errorMessage = error; });
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
                AccessoryCategoryListComponent.prototype.onEdit = function (id) {
                    var _this = this;
                    this.itemid = id;
                    if (id !== "") {
                        this.accessorycategoryService.get(id).subscribe(function (data) {
                            _this.data = data;
                        });
                    }
                };
                AccessoryCategoryListComponent.prototype.isFormChanged = function (value) {
                    var _this = this;
                    this.accessorycategoryService.get(this.data.Id).subscribe(function (oldData) {
                        _this.isFormDataChanged(oldData);
                    });
                };
                AccessoryCategoryListComponent.prototype.isFormDataChanged = function (oldData) {
                    if (JSON.stringify(this.data) === JSON.stringify(oldData))
                        this.isFormValuesChanged = false;
                    else
                        this.isFormValuesChanged = true;
                };
                return AccessoryCategoryListComponent;
            }());
            AccessoryCategoryListComponent = __decorate([
                core_1.Component({
                    selector: 'accessorycategory',
                    templateUrl: 'app/AccessoryCategory/accessorycategory-list/accessorycategory-list.component.html',
                    providers: [accessorycategory_service_1.AccessoryCategoryService, accessorytype_service_1.AccessoryTypeService, forms_1.FormBuilder]
                }),
                __metadata("design:paramtypes", [accessorycategory_service_1.AccessoryCategoryService,
                    auth_service_1.AuthService,
                    router_1.Router,
                    forms_1.FormBuilder,
                    accessorytype_service_1.AccessoryTypeService])
            ], AccessoryCategoryListComponent);
            exports_1("AccessoryCategoryListComponent", AccessoryCategoryListComponent);
        }
    };
});
