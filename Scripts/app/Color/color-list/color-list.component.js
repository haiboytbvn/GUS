System.register(["@angular/core", "../shared/color.service", "@angular/router", "../../auth.service", "../../Color/shared/color-search.model", "../../Pagination/shared/pagination.model"], function (exports_1, context_1) {
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
    var core_1, color_service_1, router_1, auth_service_1, color_search_model_1, pagination_model_1, ColorListComponent;
    return {
        setters: [
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (color_service_1_1) {
                color_service_1 = color_service_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (auth_service_1_1) {
                auth_service_1 = auth_service_1_1;
            },
            function (color_search_model_1_1) {
                color_search_model_1 = color_search_model_1_1;
            },
            function (pagination_model_1_1) {
                pagination_model_1 = pagination_model_1_1;
            }
        ],
        execute: function () {
            ColorListComponent = (function () {
                function ColorListComponent(colorService, authService, router) {
                    this.colorService = colorService;
                    this.authService = authService;
                    this.router = router;
                    this.toggle = false;
                    this.isDelete = false;
                    this.isLoading = false;
                    this.pagesizearr = [10, 20, 30, 0];
                }
                ColorListComponent.prototype.ngOnInit = function () {
                    var _this = this;
                    if (!this.authService.isLoggedIn()) {
                        this.router.navigate([""]);
                    }
                    this.isListing = true;
                    this.paging = new pagination_model_1.PaginationModel(10, 1, "Name", 0, [], 0);
                    this.searchModel = new color_search_model_1.ColorSearchModel("", "", "", "", this.paging);
                    this.colorService.getColorList(this.searchModel).subscribe(function (items) { return _this.ACdata = items; }, function (error) { return _this.errorMessage = error; });
                    this.colorService.getColorList(this.searchModel).subscribe(function (items) { return _this.Dropdowndata = items; }, function (error) { return _this.errorMessage = error; });
                };
                ColorListComponent.prototype.onSelect = function (data) {
                    this.selectedData = data;
                    this.router.navigate(["color/edit", this.selectedData.Id]);
                };
                ColorListComponent.prototype.onEdit = function (id) {
                    this.router.navigate(["color/edit", id]);
                };
                ColorListComponent.prototype.changeListViewMode = function () {
                    var _this = this;
                    this.isListing = true;
                    this.colorService.getColorList(this.searchModel).subscribe(function (items) { return _this.ACdata = items; }, function (error) { return _this.errorMessage = error; });
                };
                ColorListComponent.prototype.changeThumbMode = function () {
                    var _this = this;
                    this.isListing = false;
                    this.colorService.getColorList(this.searchModel).subscribe(function (items) { return _this.ACdata = items; }, function (error) { return _this.errorMessage = error; });
                };
                ColorListComponent.prototype.onAdd = function () {
                    this.router.navigate(["color/add"]);
                };
                ColorListComponent.prototype.onsearchSubmit = function (data) {
                    var _this = this;
                    this.paging = new pagination_model_1.PaginationModel(10, 1, "Name", 0, [], 0);
                    this.searchModel = new color_search_model_1.ColorSearchModel(data.keyword, data.code, data.buyercode, "", this.paging);
                    this.colorService.getColorList(this.searchModel).subscribe(function (items) { return _this.ACdata = items; }, function (error) { return _this.errorMessage = error; });
                };
                ColorListComponent.prototype.changePage = function (i) {
                    var _this = this;
                    this.searchModel.Paging.PageNumber = i;
                    this.colorService.getColorList(this.searchModel).subscribe(function (items) { return _this.ACdata = items; }, function (error) { return _this.errorMessage = error; });
                };
                ColorListComponent.prototype.changeSize = function (i) {
                    var _this = this;
                    if (i == 0) {
                        this.searchModel.Paging.PageNumber = 0;
                    }
                    else {
                        this.searchModel.Paging.PageSize = i;
                        this.searchModel.Paging.PageNumber = 1;
                    }
                    this.colorService.getColorList(this.searchModel).subscribe(function (items) { return _this.ACdata = items; }, function (error) { return _this.errorMessage = error; });
                };
                return ColorListComponent;
            }());
            ColorListComponent = __decorate([
                core_1.Component({
                    selector: 'color',
                    templateUrl: 'app/Color/color-list/color-list.component.html',
                    providers: [color_service_1.ColorService]
                }),
                __metadata("design:paramtypes", [color_service_1.ColorService, auth_service_1.AuthService, router_1.Router])
            ], ColorListComponent);
            exports_1("ColorListComponent", ColorListComponent);
        }
    };
});
