System.register(["@angular/core", "@angular/forms", "../shared/graphicproductname.service", "../shared/graphicproductname.model", "../../GraphicCategory/shared/graphiccategory.service", "../../Pagination/shared/pagination.model", "../../Pagination/shared/generalsearch.model", "@angular/router", "../../auth.service"], function (exports_1, context_1) {
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
    var core_1, forms_1, graphicproductname_service_1, graphicproductname_model_1, graphiccategory_service_1, pagination_model_1, generalsearch_model_1, router_1, auth_service_1, GraphicProductNameListComponent;
    return {
        setters: [
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (forms_1_1) {
                forms_1 = forms_1_1;
            },
            function (graphicproductname_service_1_1) {
                graphicproductname_service_1 = graphicproductname_service_1_1;
            },
            function (graphicproductname_model_1_1) {
                graphicproductname_model_1 = graphicproductname_model_1_1;
            },
            function (graphiccategory_service_1_1) {
                graphiccategory_service_1 = graphiccategory_service_1_1;
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
            GraphicProductNameListComponent = (function () {
                function GraphicProductNameListComponent(graphicproductnameService, authService, fabcategoryService, router, fb, acctypeService) {
                    this.graphicproductnameService = graphicproductnameService;
                    this.authService = authService;
                    this.fabcategoryService = fabcategoryService;
                    this.router = router;
                    this.fb = fb;
                    this.acctypeService = acctypeService;
                    this.title = "Wash Product Name";
                    this.pagesizearr = [10, 20, 30, 0];
                    this.isFormValuesChanged = false;
                }
                GraphicProductNameListComponent.prototype.ngOnInit = function () {
                    var _this = this;
                    if (!this.authService.isLoggedIn()) {
                        this.router.navigate([""]);
                    }
                    this.paging = new pagination_model_1.PaginationModel(10, 1, "Name", 0, [], 0);
                    this.searchModel = new generalsearch_model_1.GeneralSearchModel("", "", "", "", this.paging);
                    var pageall = new pagination_model_1.PaginationModel(10, 0, "Name", 0, [], 0);
                    var getAll = new generalsearch_model_1.GeneralSearchModel("", "", "", "", pageall);
                    this.graphicproductnameService.getGraphicProductNameList(this.searchModel).subscribe(function (items) { return _this.ACdata = items; }, function (error) { return _this.errorMessage = error; });
                    this.fabcategoryService.getGraphicCategoryList(getAll).subscribe(function (items) { return _this.categories = items.Data; }, function (error) { return _this.errorMessage = error; });
                    this.graphicproductnameAddForm = this.fb.group({
                        id: [""],
                        name: ["", [forms_1.Validators.required]],
                        isactive: [true],
                        acccategory: ["", [forms_1.Validators.required]]
                    });
                    this.data = new graphicproductname_model_1.GraphicProductName("", false, "", "");
                    this.itemid = "";
                };
                GraphicProductNameListComponent.prototype.changePage = function (i) {
                    var _this = this;
                    this.searchModel.Paging.PageNumber = i;
                    this.graphicproductnameService.getGraphicProductNameList(this.searchModel).subscribe(function (items) { return _this.ACdata = items; }, function (error) { return _this.errorMessage = error; });
                };
                GraphicProductNameListComponent.prototype.changeSize = function (i) {
                    var _this = this;
                    if (i == 0) {
                        this.searchModel.Paging.PageNumber = 0;
                    }
                    else {
                        this.searchModel.Paging.PageSize = i;
                        this.searchModel.Paging.PageNumber = 1;
                    }
                    this.graphicproductnameService.getGraphicProductNameList(this.searchModel).subscribe(function (items) { return _this.ACdata = items; }, function (error) { return _this.errorMessage = error; });
                };
                GraphicProductNameListComponent.prototype.onSubmit = function (data) {
                    var _this = this;
                    var apn = new graphicproductname_model_1.GraphicProductName("", data.isactive, data.name, data.acccategory);
                    this.graphicproductnameService.add(apn).subscribe(function (data) {
                        if (data.error == null) {
                            _this.graphicproductnameService.getGraphicProductNameList(_this.searchModel).subscribe(function (items) { return _this.ACdata = items; }, function (error) { return _this.errorMessage = error; });
                            alert("added successfully");
                            _this.data = new graphicproductname_model_1.GraphicProductName("", false, "", "");
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
                GraphicProductNameListComponent.prototype.onAdd = function () {
                    jQuery('#txtName').val('');
                    jQuery('#drType').val('');
                    jQuery('#ckIsActive').prop('checked', true);
                };
                GraphicProductNameListComponent.prototype.onUpdate = function (data) {
                    var _this = this;
                    // else, update it
                    // var graphicproductname = new GraphicProductName(data.id, null, null, data.isactive, data.name, false, data.buyercode, data.acctype);
                    console.log(data);
                    this.graphicproductnameService.update(data).subscribe(function (data) {
                        if (data.error == null) {
                            _this.data = data;
                            _this.graphicproductnameService.getGraphicProductNameList(_this.searchModel).subscribe(function (items) { return _this.ACdata = items; }, function (error) { return _this.errorMessage = error; });
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
                GraphicProductNameListComponent.prototype.onEdit = function (id) {
                    var _this = this;
                    this.itemid = id;
                    if (id !== "") {
                        this.graphicproductnameService.get(id).subscribe(function (data) {
                            _this.data = data;
                        });
                    }
                };
                GraphicProductNameListComponent.prototype.isFormChanged = function (value) {
                    var _this = this;
                    this.graphicproductnameService.get(this.data.Id).subscribe(function (oldData) {
                        _this.isFormDataChanged(oldData);
                    });
                };
                GraphicProductNameListComponent.prototype.isFormDataChanged = function (oldData) {
                    if (JSON.stringify(this.data) === JSON.stringify(oldData))
                        this.isFormValuesChanged = false;
                    else
                        this.isFormValuesChanged = true;
                };
                return GraphicProductNameListComponent;
            }());
            GraphicProductNameListComponent = __decorate([
                core_1.Component({
                    selector: 'graphicproductname',
                    templateUrl: 'app/GraphicProductName/graphicproductname-list/graphicproductname-list.component.html',
                    providers: [graphicproductname_service_1.GraphicProductNameService, forms_1.FormBuilder, graphiccategory_service_1.GraphicCategoryService]
                }),
                __metadata("design:paramtypes", [graphicproductname_service_1.GraphicProductNameService,
                    auth_service_1.AuthService,
                    graphiccategory_service_1.GraphicCategoryService,
                    router_1.Router,
                    forms_1.FormBuilder,
                    graphicproductname_service_1.GraphicProductNameService])
            ], GraphicProductNameListComponent);
            exports_1("GraphicProductNameListComponent", GraphicProductNameListComponent);
        }
    };
});
