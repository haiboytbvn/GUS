System.register(["@angular/core", "@angular/platform-browser", "@angular/http", "@angular/forms", "rxjs/Rx", "./Start/app.component", "./Start/generallib-menu.component", "./Home/home.component", "./AccessoryCategory/accessorycategory-list/accessorycategory-list.component", "./AccessoryCategory/shared/accessorycategory.service", "./Color/color/color-edit.component", "./Color/color-list/color-list.component", "./Color/color/color-add.component", "./FabricsCategory/fabricscategory-list/fabricscategory-list.component", "./Login/login.component", "./User/User/User-Add.component", "./User/User/User-Edit.component", "./User/User-List/User-List.component", "./PageNotFound/page-not-found.component", "./app.routing", "./auth.http", "./auth.service"], function (exports_1, context_1) {
    "use strict";
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __moduleName = context_1 && context_1.id;
    var core_1, platform_browser_1, http_1, forms_1, app_component_1, generallib_menu_component_1, home_component_1, accessorycategory_list_component_1, accessorycategory_service_1, color_edit_component_1, color_list_component_1, color_add_component_1, fabricscategory_list_component_1, login_component_1, User_Add_component_1, User_Edit_component_1, User_List_component_1, page_not_found_component_1, app_routing_1, auth_http_1, auth_service_1, AppModule;
    return {
        setters: [
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (platform_browser_1_1) {
                platform_browser_1 = platform_browser_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
            },
            function (forms_1_1) {
                forms_1 = forms_1_1;
            },
            function (_1) {
            },
            function (app_component_1_1) {
                app_component_1 = app_component_1_1;
            },
            function (generallib_menu_component_1_1) {
                generallib_menu_component_1 = generallib_menu_component_1_1;
            },
            function (home_component_1_1) {
                home_component_1 = home_component_1_1;
            },
            function (accessorycategory_list_component_1_1) {
                accessorycategory_list_component_1 = accessorycategory_list_component_1_1;
            },
            function (accessorycategory_service_1_1) {
                accessorycategory_service_1 = accessorycategory_service_1_1;
            },
            function (color_edit_component_1_1) {
                color_edit_component_1 = color_edit_component_1_1;
            },
            function (color_list_component_1_1) {
                color_list_component_1 = color_list_component_1_1;
            },
            function (color_add_component_1_1) {
                color_add_component_1 = color_add_component_1_1;
            },
            function (fabricscategory_list_component_1_1) {
                fabricscategory_list_component_1 = fabricscategory_list_component_1_1;
            },
            function (login_component_1_1) {
                login_component_1 = login_component_1_1;
            },
            function (User_Add_component_1_1) {
                User_Add_component_1 = User_Add_component_1_1;
            },
            function (User_Edit_component_1_1) {
                User_Edit_component_1 = User_Edit_component_1_1;
            },
            function (User_List_component_1_1) {
                User_List_component_1 = User_List_component_1_1;
            },
            function (page_not_found_component_1_1) {
                page_not_found_component_1 = page_not_found_component_1_1;
            },
            function (app_routing_1_1) {
                app_routing_1 = app_routing_1_1;
            },
            function (auth_http_1_1) {
                auth_http_1 = auth_http_1_1;
            },
            function (auth_service_1_1) {
                auth_service_1 = auth_service_1_1;
            }
        ],
        execute: function () {
            AppModule = (function () {
                function AppModule() {
                }
                return AppModule;
            }());
            AppModule = __decorate([
                core_1.NgModule({
                    // directives, components, and pipes
                    declarations: [
                        app_component_1.AppComponent,
                        home_component_1.HomeComponent,
                        accessorycategory_list_component_1.AccessoryCategoryListComponent,
                        color_add_component_1.ColorAddComponent,
                        color_list_component_1.ColorListComponent,
                        color_edit_component_1.ColorEditComponent,
                        page_not_found_component_1.PageNotFoundComponent,
                        fabricscategory_list_component_1.FabricsCategoryListComponent,
                        login_component_1.LoginComponent,
                        User_Add_component_1.UserAddComponent,
                        User_Edit_component_1.UserEditComponent,
                        User_List_component_1.UserListComponent,
                        generallib_menu_component_1.GeneralLibLeftMenuComponent
                    ],
                    // modules
                    imports: [
                        platform_browser_1.BrowserModule,
                        http_1.HttpModule,
                        forms_1.FormsModule,
                        forms_1.ReactiveFormsModule,
                        app_routing_1.AppRouting
                    ],
                    // providers
                    providers: [
                        accessorycategory_service_1.AccessoryCategoryService,
                        auth_http_1.AuthHttp,
                        auth_service_1.AuthService
                    ],
                    bootstrap: [
                        app_component_1.AppComponent
                    ]
                })
            ], AppModule);
            exports_1("AppModule", AppModule);
        }
    };
});
