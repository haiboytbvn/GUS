System.register(["@angular/core", "@angular/forms", "../shared/fabricproducttype.service", "../shared/fabricproducttype.model", "../../Pagination/shared/pagination.model", "../../Pagination/shared/generalsearch.model", "@angular/router", "../../auth.service"], function (exports_1, context_1) {
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
    var core_1, forms_1, fabricproducttype_service_1, fabricproducttype_model_1, pagination_model_1, generalsearch_model_1, router_1, auth_service_1, FabricProductTypeListComponent;
    return {
        setters: [
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (forms_1_1) {
                forms_1 = forms_1_1;
            },
            function (fabricproducttype_service_1_1) {
                fabricproducttype_service_1 = fabricproducttype_service_1_1;
            },
            function (fabricproducttype_model_1_1) {
                fabricproducttype_model_1 = fabricproducttype_model_1_1;
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
            FabricProductTypeListComponent = (function () {
                function FabricProductTypeListComponent(fabricproducttypeService, authService, router, fb, acctypeService) {
                    this.fabricproducttypeService = fabricproducttypeService;
                    this.authService = authService;
                    this.router = router;
                    this.fb = fb;
                    this.acctypeService = acctypeService;
                    this.title = "Fabric Product Type";
                    this.pagesizearr = [10, 20, 30, 0];
                    this.isFormValuesChanged = false;
                }
                FabricProductTypeListComponent.prototype.ngOnInit = function () {
                    var _this = this;
                    if (!this.authService.isLoggedIn()) {
                        this.router.navigate([""]);
                    }
                    this.paging = new pagination_model_1.PaginationModel(10, 1, "Name", 0, [], 0);
                    this.searchModel = new generalsearch_model_1.GeneralSearchModel("", "", "", "", this.paging);
                    this.fabricproducttypeService.getFabricProductTypeList(this.searchModel).subscribe(function (items) { return _this.ACdata = items; }, function (error) { return _this.errorMessage = error; });
                    this.fabricproducttypeAddForm = this.fb.group({
                        id: [""],
                        name: ["", [forms_1.Validators.required]],
                        isactive: [true]
                    });
                    this.data = new fabricproducttype_model_1.FabricProductType("", false, "");
                    this.itemid = "";
                };
                FabricProductTypeListComponent.prototype.changePage = function (i) {
                    var _this = this;
                    this.searchModel.Paging.PageNumber = i;
                    this.fabricproducttypeService.getFabricProductTypeList(this.searchModel).subscribe(function (items) { return _this.ACdata = items; }, function (error) { return _this.errorMessage = error; });
                };
                FabricProductTypeListComponent.prototype.changeSize = function (i) {
                    var _this = this;
                    if (i == 0) {
                        this.searchModel.Paging.PageNumber = 0;
                    }
                    else {
                        this.searchModel.Paging.PageSize = i;
                        this.searchModel.Paging.PageNumber = 1;
                    }
                    this.fabricproducttypeService.getFabricProductTypeList(this.searchModel).subscribe(function (items) { return _this.ACdata = items; }, function (error) { return _this.errorMessage = error; });
                };
                FabricProductTypeListComponent.prototype.onSubmit = function (data) {
                    var _this = this;
                    console.log(data);
                    var fabricproducttype = new fabricproducttype_model_1.FabricProductType("", data.isactive, data.name);
                    this.fabricproducttypeService.add(fabricproducttype).subscribe(function (data) {
                        if (data.error == null) {
                            _this.fabricproducttypeService.getFabricProductTypeList(_this.searchModel).subscribe(function (items) { return _this.ACdata = items; }, function (error) { return _this.errorMessage = error; });
                            alert("added successfully");
                            _this.data = new fabricproducttype_model_1.FabricProductType("", false, "");
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
                FabricProductTypeListComponent.prototype.onAdd = function () {
                    jQuery('#txtName').val('');
                    jQuery('#drType').val('');
                    jQuery('#ckIsActive').prop('checked', true);
                };
                FabricProductTypeListComponent.prototype.onUpdate = function (data) {
                    var _this = this;
                    // else, update it
                    // var fabricproducttype = new FabricProductType(data.id, null, null, data.isactive, data.name, false, data.buyercode, data.acctype);
                    console.log(data);
                    this.fabricproducttypeService.update(data).subscribe(function (data) {
                        if (data.error == null) {
                            _this.data = data;
                            _this.fabricproducttypeService.getFabricProductTypeList(_this.searchModel).subscribe(function (items) { return _this.ACdata = items; }, function (error) { return _this.errorMessage = error; });
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
                FabricProductTypeListComponent.prototype.onEdit = function (id) {
                    var _this = this;
                    this.itemid = id;
                    if (id !== "") {
                        this.fabricproducttypeService.get(id).subscribe(function (data) {
                            _this.data = data;
                        });
                    }
                };
                FabricProductTypeListComponent.prototype.isFormChanged = function (value) {
                    var _this = this;
                    this.fabricproducttypeService.get(this.data.Id).subscribe(function (oldData) {
                        _this.isFormDataChanged(oldData);
                    });
                };
                FabricProductTypeListComponent.prototype.isFormDataChanged = function (oldData) {
                    if (JSON.stringify(this.data) === JSON.stringify(oldData))
                        this.isFormValuesChanged = false;
                    else
                        this.isFormValuesChanged = true;
                };
                return FabricProductTypeListComponent;
            }());
            FabricProductTypeListComponent = __decorate([
                core_1.Component({
                    selector: 'fabricproducttype',
                    templateUrl: 'app/FabricProductType/fabricproducttype-list/fabricproducttype-list.component.html',
                    providers: [fabricproducttype_service_1.FabricProductTypeService, fabricproducttype_service_1.FabricProductTypeService, forms_1.FormBuilder]
                }),
                __metadata("design:paramtypes", [fabricproducttype_service_1.FabricProductTypeService,
                    auth_service_1.AuthService,
                    router_1.Router,
                    forms_1.FormBuilder,
                    fabricproducttype_service_1.FabricProductTypeService])
            ], FabricProductTypeListComponent);
            exports_1("FabricProductTypeListComponent", FabricProductTypeListComponent);
        }
    };
});
