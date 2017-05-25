System.register(["@angular/core", "@angular/router", "../shared/graphic.service", "../../auth.service", "../../Graphic/shared/graphic-search.model", "../../Pagination/shared/pagination.model"], function (exports_1, context_1) {
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
    var core_1, router_1, graphic_service_1, auth_service_1, graphic_search_model_1, pagination_model_1, GraphicListComponent;
    return {
        setters: [
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (graphic_service_1_1) {
                graphic_service_1 = graphic_service_1_1;
            },
            function (auth_service_1_1) {
                auth_service_1 = auth_service_1_1;
            },
            function (graphic_search_model_1_1) {
                graphic_search_model_1 = graphic_search_model_1_1;
            },
            function (pagination_model_1_1) {
                pagination_model_1 = pagination_model_1_1;
            }
        ],
        execute: function () {
            GraphicListComponent = (function () {
                function GraphicListComponent(graphicService, authService, router, activatedRoute) {
                    this.graphicService = graphicService;
                    this.authService = authService;
                    this.router = router;
                    this.activatedRoute = activatedRoute;
                    this.toggle = false;
                    this.isDelete = false;
                    this.isLoading = false;
                    this.pagesizearr = [10, 20, 30, 0];
                }
                GraphicListComponent.prototype.ngOnInit = function () {
                    var _this = this;
                    if (!this.authService.isLoggedIn()) {
                        this.router.navigate([""]);
                    }
                    // get params from leftmenu 
                    var typeid = this.activatedRoute.snapshot.params["typeid"];
                    var cateid = this.activatedRoute.snapshot.params["cateid"];
                    var productnameid = this.activatedRoute.snapshot.params["productnameid"];
                    this.title = "Graphic List";
                    this.paging = new pagination_model_1.PaginationModel(10, 1, "Name", 0, [], 0);
                    var getAll = new pagination_model_1.PaginationModel(10, 0, "Name", 0, [], 0);
                    this.searchModel = new graphic_search_model_1.GraphicSearchModel("", "", "", "", this.paging, typeid, cateid, productnameid);
                    var getallSearchModel = new graphic_search_model_1.GraphicSearchModel("", "", "", "", this.paging, typeid, cateid, productnameid);
                    this.graphicService.getGraphicList(this.searchModel).subscribe(function (items) { return _this.ACdata = items; }, function (error) { return _this.errorMessage = error; });
                    this.graphicService.getGraphicList(getallSearchModel).subscribe(function (items) { return _this.Dropdowndata = items; }, function (error) { return _this.errorMessage = error; });
                };
                GraphicListComponent.prototype.onEdit = function (id) {
                    this.router.navigate(["graphic/edit", id]);
                };
                GraphicListComponent.prototype.onSelect = function (data) {
                    this.selectedData = data;
                    this.router.navigate(["graphic/edit", this.selectedData.Id]);
                };
                GraphicListComponent.prototype.onAdd = function () {
                    this.router.navigate(["graphic/add"]);
                };
                GraphicListComponent.prototype.onsearchSubmit = function (data) {
                    var _this = this;
                    this.paging = new pagination_model_1.PaginationModel(10, 1, "Name", 0, [], 0);
                    this.searchModel = new graphic_search_model_1.GraphicSearchModel(data.keyword, data.code, data.buyercode, "", this.paging, "", "", "");
                    this.graphicService.getGraphicList(this.searchModel).subscribe(function (items) { return _this.Dropdowndata = items; }, function (error) { return _this.errorMessage = error; });
                };
                GraphicListComponent.prototype.changePage = function (i) {
                    var _this = this;
                    this.searchModel.Paging.PageNumber = i;
                    this.graphicService.getGraphicList(this.searchModel).subscribe(function (items) { return _this.Dropdowndata = items; }, function (error) { return _this.errorMessage = error; });
                };
                GraphicListComponent.prototype.changeSize = function (i) {
                    var _this = this;
                    if (i == 0) {
                        this.searchModel.Paging.PageNumber = 0;
                    }
                    else {
                        this.searchModel.Paging.PageSize = i;
                        this.searchModel.Paging.PageNumber = 1;
                    }
                    this.graphicService.getGraphicList(this.searchModel).subscribe(function (items) { return _this.Dropdowndata = items; }, function (error) { return _this.errorMessage = error; });
                };
                return GraphicListComponent;
            }());
            GraphicListComponent = __decorate([
                core_1.Component({
                    selector: 'graphic',
                    templateUrl: 'app/Graphic/graphic-list/graphic-list.component.html',
                    providers: [graphic_service_1.GraphicService]
                }),
                __metadata("design:paramtypes", [graphic_service_1.GraphicService, auth_service_1.AuthService, router_1.Router, router_1.ActivatedRoute])
            ], GraphicListComponent);
            exports_1("GraphicListComponent", GraphicListComponent);
        }
    };
});
