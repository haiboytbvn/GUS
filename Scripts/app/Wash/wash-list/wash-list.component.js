System.register(["@angular/core", "@angular/router", "../shared/wash.service", "../../auth.service", "../../Wash/shared/wash-search.model", "../../Pagination/shared/pagination.model"], function (exports_1, context_1) {
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
    var core_1, router_1, wash_service_1, auth_service_1, wash_search_model_1, pagination_model_1, WashListComponent;
    return {
        setters: [
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (wash_service_1_1) {
                wash_service_1 = wash_service_1_1;
            },
            function (auth_service_1_1) {
                auth_service_1 = auth_service_1_1;
            },
            function (wash_search_model_1_1) {
                wash_search_model_1 = wash_search_model_1_1;
            },
            function (pagination_model_1_1) {
                pagination_model_1 = pagination_model_1_1;
            }
        ],
        execute: function () {
            WashListComponent = (function () {
                function WashListComponent(washService, authService, router, activatedRoute) {
                    this.washService = washService;
                    this.authService = authService;
                    this.router = router;
                    this.activatedRoute = activatedRoute;
                    this.toggle = false;
                    this.isDelete = false;
                    this.isLoading = false;
                    this.pagesizearr = [10, 20, 30, 0];
                }
                WashListComponent.prototype.ngOnInit = function () {
                    var _this = this;
                    if (!this.authService.isLoggedIn()) {
                        this.router.navigate([""]);
                    }
                    // get params from leftmenu 
                    var typeid = this.activatedRoute.snapshot.params["typeid"];
                    var cateid = this.activatedRoute.snapshot.params["cateid"];
                    var productnameid = this.activatedRoute.snapshot.params["productnameid"];
                    this.title = "Wash List";
                    this.paging = new pagination_model_1.PaginationModel(10, 1, "Name", 0, [], 0);
                    var getAllpaging = new pagination_model_1.PaginationModel(10, 0, "Name", 0, [], 0);
                    this.searchModel = new wash_search_model_1.WashSearchModel("", "", "", "", this.paging, typeid, cateid, productnameid);
                    var getAllsearch = new wash_search_model_1.WashSearchModel("", "", "", "", getAllpaging, typeid, cateid, productnameid);
                    this.washService.getWashList(this.searchModel).subscribe(function (items) { return _this.ACdata = items; }, function (error) { return _this.errorMessage = error; });
                    this.washService.getWashList(getAllsearch).subscribe(function (items) { return _this.Dropdowndata = items; }, function (error) { return _this.errorMessage = error; });
                };
                WashListComponent.prototype.onSelect = function (data) {
                    this.selectedData = data;
                    this.router.navigate(["wash/edit", this.selectedData.Id]);
                };
                WashListComponent.prototype.onEdit = function (id) {
                    this.router.navigate(["wash/edit", id]);
                };
                WashListComponent.prototype.onAdd = function () {
                    this.router.navigate(["wash/add"]);
                };
                WashListComponent.prototype.onsearchSubmit = function (data) {
                    var _this = this;
                    console.log(data);
                    this.paging = new pagination_model_1.PaginationModel(10, 1, "Name", 0, [], 0);
                    this.searchModel = new wash_search_model_1.WashSearchModel(data.keyword, data.code, data.buyercode, "", this.paging, "", "", "");
                    this.washService.getWashList(this.searchModel).subscribe(function (items) { return _this.ACdata = items; }, function (error) { return _this.errorMessage = error; });
                };
                WashListComponent.prototype.changePage = function (i) {
                    var _this = this;
                    this.searchModel.Paging.PageNumber = i;
                    this.washService.getWashList(this.searchModel).subscribe(function (items) { return _this.ACdata = items; }, function (error) { return _this.errorMessage = error; });
                };
                WashListComponent.prototype.changeSize = function (i) {
                    var _this = this;
                    if (i == 0) {
                        this.searchModel.Paging.PageNumber = 0;
                    }
                    else {
                        this.searchModel.Paging.PageSize = i;
                        this.searchModel.Paging.PageNumber = 1;
                    }
                    this.washService.getWashList(this.searchModel).subscribe(function (items) { return _this.ACdata = items; }, function (error) { return _this.errorMessage = error; });
                };
                return WashListComponent;
            }());
            WashListComponent = __decorate([
                core_1.Component({
                    selector: 'wash',
                    templateUrl: 'app/Wash/wash-list/wash-list.component.html',
                    providers: [wash_service_1.WashService]
                }),
                __metadata("design:paramtypes", [wash_service_1.WashService, auth_service_1.AuthService, router_1.Router, router_1.ActivatedRoute])
            ], WashListComponent);
            exports_1("WashListComponent", WashListComponent);
        }
    };
});
