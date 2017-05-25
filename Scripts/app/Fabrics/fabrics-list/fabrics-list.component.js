System.register(["@angular/core", "@angular/router", "../shared/fabric.service", "../../auth.service", "../../Fabrics/shared/fabrics-search.model", "../../Pagination/shared/pagination.model"], function (exports_1, context_1) {
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
    var core_1, router_1, fabric_service_1, auth_service_1, fabrics_search_model_1, pagination_model_1, FabricsListComponent;
    return {
        setters: [
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (fabric_service_1_1) {
                fabric_service_1 = fabric_service_1_1;
            },
            function (auth_service_1_1) {
                auth_service_1 = auth_service_1_1;
            },
            function (fabrics_search_model_1_1) {
                fabrics_search_model_1 = fabrics_search_model_1_1;
            },
            function (pagination_model_1_1) {
                pagination_model_1 = pagination_model_1_1;
            }
        ],
        execute: function () {
            FabricsListComponent = (function () {
                function FabricsListComponent(fabricsService, authService, router, activatedRoute) {
                    this.fabricsService = fabricsService;
                    this.authService = authService;
                    this.router = router;
                    this.activatedRoute = activatedRoute;
                    this.toggle = false;
                    this.isDelete = false;
                    this.isLoading = false;
                    this.pagesizearr = [10, 20, 30, 0];
                }
                FabricsListComponent.prototype.ngOnInit = function () {
                    var _this = this;
                    if (!this.authService.isLoggedIn()) {
                        this.router.navigate([""]);
                    }
                    var typeid = this.activatedRoute.snapshot.params["typeid"];
                    var cateid = this.activatedRoute.snapshot.params["cateid"];
                    var productnameid = this.activatedRoute.snapshot.params["productnameid"];
                    this.title = "Fabrics List";
                    this.paging = new pagination_model_1.PaginationModel(10, 1, "Name", 0, [], 0);
                    this.searchModel = new fabrics_search_model_1.FabricsSearchModel("", "", "", "", this.paging, typeid, cateid, productnameid);
                    this.fabricsService.getFabricsList(this.searchModel).subscribe(function (items) { return _this.ACdata = items; }, function (error) { return _this.errorMessage = error; });
                    this.fabricsService.getFabricsList(this.searchModel).subscribe(function (items) { return _this.Dropdowndata = items; }, function (error) { return _this.errorMessage = error; });
                };
                FabricsListComponent.prototype.onSelect = function (data) {
                    this.selectedData = data;
                    this.router.navigate(["fabrics/edit", this.selectedData.Id]);
                };
                FabricsListComponent.prototype.onEdit = function (id) {
                    this.router.navigate(["fabrics/edit", id]);
                };
                FabricsListComponent.prototype.onAdd = function () {
                    this.router.navigate(["fabrics/add"]);
                };
                FabricsListComponent.prototype.onsearchSubmit = function (data) {
                    var _this = this;
                    this.paging = new pagination_model_1.PaginationModel(10, 1, "Name", 0, [], 0);
                    this.searchModel = new fabrics_search_model_1.FabricsSearchModel(data.keyword, data.code, data.buyercode, "", this.paging, "", "", "");
                    this.fabricsService.getFabricsList(this.searchModel).subscribe(function (items) { return _this.ACdata = items; }, function (error) { return _this.errorMessage = error; });
                };
                FabricsListComponent.prototype.changePage = function (i) {
                    var _this = this;
                    this.searchModel.Paging.PageNumber = i;
                    this.fabricsService.getFabricsList(this.searchModel).subscribe(function (items) { return _this.ACdata = items; }, function (error) { return _this.errorMessage = error; });
                };
                FabricsListComponent.prototype.changeSize = function (i) {
                    var _this = this;
                    if (i == 0) {
                        this.searchModel.Paging.PageNumber = 0;
                    }
                    else {
                        this.searchModel.Paging.PageSize = i;
                        this.searchModel.Paging.PageNumber = 1;
                    }
                    this.fabricsService.getFabricsList(this.searchModel).subscribe(function (items) { return _this.ACdata = items; }, function (error) { return _this.errorMessage = error; });
                };
                return FabricsListComponent;
            }());
            FabricsListComponent = __decorate([
                core_1.Component({
                    selector: 'fabrics',
                    templateUrl: 'app/Fabrics/fabrics-list/fabrics-list.component.html',
                    providers: [fabric_service_1.FabricsService]
                }),
                __metadata("design:paramtypes", [fabric_service_1.FabricsService, auth_service_1.AuthService, router_1.Router, router_1.ActivatedRoute])
            ], FabricsListComponent);
            exports_1("FabricsListComponent", FabricsListComponent);
        }
    };
});
