System.register(["@angular/core", "@angular/forms", "../shared/accessoryproductname.service", "../shared/accessoryproductname.model", "../../AccessoryCategory/shared/accessorycategory.service", "../../Pagination/shared/pagination.model", "../../Pagination/shared/generalsearch.model", "@angular/router", "../../auth.service"], function (exports_1, context_1) {
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
    var core_1, forms_1, accessoryproductname_service_1, accessoryproductname_model_1, accessorycategory_service_1, pagination_model_1, generalsearch_model_1, router_1, auth_service_1, AccessoryProductNameListComponent;
    return {
        setters: [
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (forms_1_1) {
                forms_1 = forms_1_1;
            },
            function (accessoryproductname_service_1_1) {
                accessoryproductname_service_1 = accessoryproductname_service_1_1;
            },
            function (accessoryproductname_model_1_1) {
                accessoryproductname_model_1 = accessoryproductname_model_1_1;
            },
            function (accessorycategory_service_1_1) {
                accessorycategory_service_1 = accessorycategory_service_1_1;
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
            AccessoryProductNameListComponent = (function () {
                function AccessoryProductNameListComponent(accessoryproductnameService, authService, acccategoryService, router, fb, acctypeService) {
                    this.accessoryproductnameService = accessoryproductnameService;
                    this.authService = authService;
                    this.acccategoryService = acccategoryService;
                    this.router = router;
                    this.fb = fb;
                    this.acctypeService = acctypeService;
                    this.title = "Accessory Product Name";
                    this.pagesizearr = [10, 20, 30, 0];
                    this.isFormValuesChanged = false;
                }
                AccessoryProductNameListComponent.prototype.ngOnInit = function () {
                    var _this = this;
                    if (!this.authService.isLoggedIn()) {
                        this.router.navigate([""]);
                    }
                    this.paging = new pagination_model_1.PaginationModel(10, 1, "Name", 0, [], 0);
                    this.searchModel = new generalsearch_model_1.GeneralSearchModel("", "", "", "", this.paging);
                    var pageall = new pagination_model_1.PaginationModel(10, 0, "Name", 0, [], 0);
                    var getAll = new generalsearch_model_1.GeneralSearchModel("", "", "", "", pageall);
                    this.accessoryproductnameService.getAccessoryProductNameList(this.searchModel).subscribe(function (items) { return _this.ACdata = items; }, function (error) { return _this.errorMessage = error; });
                    this.acccategoryService.getAccessoryCategoryList(getAll).subscribe(function (items) { return _this.categories = items.Data; }, function (error) { return _this.errorMessage = error; });
                    this.accessoryproductnameAddForm = this.fb.group({
                        id: [""],
                        name: ["", [forms_1.Validators.required]],
                        isactive: [true],
                        acccategory: ["", [forms_1.Validators.required]]
                    });
                    this.data = new accessoryproductname_model_1.AccessoryProductName("", false, "", "");
                    this.itemid = "";
                };
                AccessoryProductNameListComponent.prototype.changePage = function (i) {
                    var _this = this;
                    this.searchModel.Paging.PageNumber = i;
                    this.accessoryproductnameService.getAccessoryProductNameList(this.searchModel).subscribe(function (items) { return _this.ACdata = items; }, function (error) { return _this.errorMessage = error; });
                };
                AccessoryProductNameListComponent.prototype.changeSize = function (i) {
                    var _this = this;
                    if (i == 0) {
                        this.searchModel.Paging.PageNumber = 0;
                    }
                    else {
                        this.searchModel.Paging.PageSize = i;
                        this.searchModel.Paging.PageNumber = 1;
                    }
                    this.accessoryproductnameService.getAccessoryProductNameList(this.searchModel).subscribe(function (items) { return _this.ACdata = items; }, function (error) { return _this.errorMessage = error; });
                };
                AccessoryProductNameListComponent.prototype.onSubmit = function (data) {
                    var _this = this;
                    var apn = new accessoryproductname_model_1.AccessoryProductName("", data.isactive, data.name, data.acccategory);
                    this.accessoryproductnameService.add(apn).subscribe(function (data) {
                        if (data.error == null) {
                            _this.accessoryproductnameService.getAccessoryProductNameList(_this.searchModel).subscribe(function (items) { return _this.ACdata = items; }, function (error) { return _this.errorMessage = error; });
                            alert("added successfully");
                            _this.data = new accessoryproductname_model_1.AccessoryProductName("", false, "", "");
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
                AccessoryProductNameListComponent.prototype.onAdd = function () {
                    jQuery('#txtName').val('');
                    jQuery('#drType').val('');
                    jQuery('#ckIsActive').prop('checked', true);
                };
                AccessoryProductNameListComponent.prototype.onUpdate = function (data) {
                    var _this = this;
                    // else, update it
                    // var accessoryproductname = new AccessoryProductName(data.id, null, null, data.isactive, data.name, false, data.buyercode, data.acctype);
                    console.log(data);
                    this.accessoryproductnameService.update(data).subscribe(function (data) {
                        if (data.error == null) {
                            _this.data = data;
                            _this.accessoryproductnameService.getAccessoryProductNameList(_this.searchModel).subscribe(function (items) { return _this.ACdata = items; }, function (error) { return _this.errorMessage = error; });
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
                AccessoryProductNameListComponent.prototype.onEdit = function (id) {
                    var _this = this;
                    this.itemid = id;
                    if (id !== "") {
                        this.accessoryproductnameService.get(id).subscribe(function (data) {
                            _this.data = data;
                        });
                    }
                };
                AccessoryProductNameListComponent.prototype.isFormChanged = function (value) {
                    var _this = this;
                    this.accessoryproductnameService.get(this.data.Id).subscribe(function (oldData) {
                        _this.isFormDataChanged(oldData);
                    });
                };
                AccessoryProductNameListComponent.prototype.isFormDataChanged = function (oldData) {
                    if (JSON.stringify(this.data) === JSON.stringify(oldData))
                        this.isFormValuesChanged = false;
                    else
                        this.isFormValuesChanged = true;
                };
                return AccessoryProductNameListComponent;
            }());
            AccessoryProductNameListComponent = __decorate([
                core_1.Component({
                    selector: 'accessoryproductname',
                    templateUrl: 'app/AccessoryProductName/accessoryproductname-list/accessoryproductname-list.component.html',
                    providers: [accessoryproductname_service_1.AccessoryProductNameService, accessoryproductname_service_1.AccessoryProductNameService, forms_1.FormBuilder]
                }),
                __metadata("design:paramtypes", [accessoryproductname_service_1.AccessoryProductNameService,
                    auth_service_1.AuthService,
                    accessorycategory_service_1.AccessoryCategoryService,
                    router_1.Router,
                    forms_1.FormBuilder,
                    accessoryproductname_service_1.AccessoryProductNameService])
            ], AccessoryProductNameListComponent);
            exports_1("AccessoryProductNameListComponent", AccessoryProductNameListComponent);
        }
    };
});
