System.register(["@angular/core", "@angular/router", "../auth.service", "../Start/shared/menu.service"], function (exports_1, context_1) {
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
    var core_1, router_1, auth_service_1, menu_service_1, MaterialLibLeftMenuComponent;
    return {
        setters: [
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (auth_service_1_1) {
                auth_service_1 = auth_service_1_1;
            },
            function (menu_service_1_1) {
                menu_service_1 = menu_service_1_1;
            }
        ],
        execute: function () {
            MaterialLibLeftMenuComponent = (function () {
                function MaterialLibLeftMenuComponent(router, authService, menuService) {
                    this.router = router;
                    this.authService = authService;
                    this.menuService = menuService;
                }
                MaterialLibLeftMenuComponent.prototype.ngOnInit = function () {
                    var _this = this;
                    if (!this.authService.isLoggedIn()) {
                        this.router.navigate([""]);
                    }
                    // get accessory leftmenu dynamically
                    this.menuService.getAccessoryLeftMenu().subscribe(function (items) { return _this.generallibMenu = items; }, function (error) { return _this.errorMessage = error; });
                    this.menuService.getFabLeftMenu().subscribe(function (items) { return _this.fabgenerallibMenu = items; }, function (error) { return _this.errorMessage = error; });
                    this.menuService.getWashLeftMenu().subscribe(function (items) { return _this.washgenerallibMenu = items; }, function (error) { return _this.errorMessage = error; });
                    this.menuService.getGraphicLeftMenu().subscribe(function (items) { return _this.graphicgenerallibMenu = items; }, function (error) { return _this.errorMessage = error; });
                };
                MaterialLibLeftMenuComponent.prototype.changeType = function (id) {
                    this.router.navigate(["accessory/type/" + id]);
                };
                MaterialLibLeftMenuComponent.prototype.changefabType = function (id) {
                    this.router.navigate(["fabrics/type/" + id]);
                };
                MaterialLibLeftMenuComponent.prototype.changeCate = function (id) {
                    console.log(id);
                    this.router.navigate(["accessory/category/" + id]);
                };
                MaterialLibLeftMenuComponent.prototype.changefabCate = function (id) {
                    console.log(id);
                    this.router.navigate(["fabrics/category/" + id]);
                };
                MaterialLibLeftMenuComponent.prototype.changewashCate = function (id) {
                    this.router.navigate(["wash/category/" + id]);
                };
                MaterialLibLeftMenuComponent.prototype.changewashType = function (id) {
                    this.router.navigate(["wash/type/" + id]);
                };
                MaterialLibLeftMenuComponent.prototype.changegraphicCate = function (id) {
                    this.router.navigate(["graphic/category/" + id]);
                };
                MaterialLibLeftMenuComponent.prototype.changegraphicType = function (id) {
                    console.log("aaaaaaaaaaaaa");
                    this.router.navigate(["graphic/type/" + id]);
                };
                MaterialLibLeftMenuComponent.prototype.topFunction = function () {
                    document.body.scrollTop = 0; // For Chrome, Safari and Opera 
                    document.documentElement.scrollTop = 0; // For IE and Firefox
                };
                return MaterialLibLeftMenuComponent;
            }());
            MaterialLibLeftMenuComponent = __decorate([
                core_1.Component({
                    selector: "material-menu",
                    templateUrl: 'app/Start/materiallib-menu.component.html',
                    providers: [menu_service_1.MenuService, auth_service_1.AuthService]
                }),
                __metadata("design:paramtypes", [router_1.Router, auth_service_1.AuthService, menu_service_1.MenuService])
            ], MaterialLibLeftMenuComponent);
            exports_1("MaterialLibLeftMenuComponent", MaterialLibLeftMenuComponent);
        }
    };
});
