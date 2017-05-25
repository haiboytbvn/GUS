System.register(["@angular/router", "./Home/home.component", "./Color/color/color-edit.component", "./Color/color-list/color-list.component", "./Color/color/color-add.component", "./FabricsCategory/fabricscategory-list/fabricscategory-list.component", "./FabricsProductName/fabricsproductname-list/fabricsproductname-list.component", "./FabricsFibreContent/fabricsfibrecontent-list/fabricsfibrecontent-list.component", "./FabricsFinishing/fabricsfinishing-list/fabricsfinishing-list.component", "./FabricWeight/fabricweight-list/fabricweight-list.component", "./FabricsYarnCount/fabricsyarncount-list/fabricsyarncount-list.component", "./FabricProductType/fabricproducttype-list/fabricproducttype-list.component", "./GraphicType/graphictype-list/graphictype-list.component", "./GraphicCategory/graphiccategory-list/graphiccategory-list.component", "./GraphicProductName/graphicproductname-list/graphicproductname-list.component", "./POM/pom-list/pom-list.component", "./Shipping/shipping-list/shipping-list.component", "./Shipping/shipping/shipping-add.component", "./Shipping/shipping/shipping-edit.component", "./Graphic/graphic-list/graphic-list.component", "./Graphic/graphic/graphic-add.component", "./Graphic/graphic/graphic-edit.component", "./FabricsType/fabricstype-list/fabricstype-list.component", "./Division/division-list/division-list.component", "./Brand/brand-list/brand-list.component", "./AccessoryType/accessorytype-list/accessorytype-list.component", "./ReasonForAbortingProject/reasonforabortingproject-list/reasonforabortingproject-list.component", "./Season/season-list/season-list.component", "./Training/training-list/training-list.component", "./TrainingItem/trainingitem-list/trainingitem-list.component", "./ShippingType/shippingtype-list/shippingtype-list.component", "./SizeRange/sizerange-list/sizerange-list.component", "./SizeRange/sizerange/sizerange-add.component", "./SizeRange/sizerange/sizerange-edit.component", "./WashCategory/washcategory-list/washcategory-list.component", "./WashProductName/washproductname-list/washproductname-list.component", "./WashType/washtype-list/washtype-list.component", "./Year/year-list/year-list.component", "./Wash/wash-list/wash-list.component", "./Wash/wash/wash-add.component", "./Wash/wash/wash-edit.component", "./Application/application-list/application-list.component", "./Application/application/application-add.component", "./Application/application/application-edit.component", "./AccessoryCategory/accessorycategory-list/accessorycategory-list.component", "./AccessoryProductName/accessoryproductname-list/accessoryproductname-list.component", "./Department/department-list/department-list.component", "./EndBuyer/endbuyer-list/endbuyer-list.component", "./Accessories/accessories-list/accessories-list.component", "./Accessories/accessories/accessories-add.component", "./Accessories/accessories/accessories-edit.component", "./Fabrics/fabrics-list/fabrics-list.component", "./Fabrics/fabrics/fabrics-add.component", "./Fabrics/fabrics/fabrics-edit.component", "./Login/login.component", "./User/User/User-Add.component", "./User/User/User-Edit.component", "./User/User-List/User-List.component", "./Spec/spec-list/spec-list.component", "./Spec/spec/spec-add.component", "./UserRole/UserRole/UserRole-Add.component", "./UserRole/UserRole/UserRole-Edit.component", "./UserRole/UserRole-List/UserRole-List.component", "./VendorType/VendorType/VendorType-Add.component", "./VendorType/VendorType/VendorType-Edit.component", "./VendorType/VendorType-List/VendorType-List.component", "./VendorProductType/VendorProductType/VendorProductType-Add.component", "./VendorProductType/VendorProductType/VendorProductType-Edit.component", "./VendorProductType/VendorProductType-List/VendorProductType-List.component", "./Vendor/Vendor/Vendor-Add.component", "./Vendor/Vendor-List/Vendor-List.component", "./PageNotFound/page-not-found.component"], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var router_1, home_component_1, color_edit_component_1, color_list_component_1, color_add_component_1, fabricscategory_list_component_1, fabricsproductname_list_component_1, fabricsfibrecontent_list_component_1, fabricsfinishing_list_component_1, fabricweight_list_component_1, fabricsyarncount_list_component_1, fabricproducttype_list_component_1, graphictype_list_component_1, graphiccategory_list_component_1, graphicproductname_list_component_1, pom_list_component_1, shipping_list_component_1, shipping_add_component_1, shipping_edit_component_1, graphic_list_component_1, graphic_add_component_1, graphic_edit_component_1, fabricstype_list_component_1, division_list_component_1, brand_list_component_1, accessorytype_list_component_1, reasonforabortingproject_list_component_1, season_list_component_1, training_list_component_1, trainingitem_list_component_1, shippingtype_list_component_1, sizerange_list_component_1, sizerange_add_component_1, sizerange_edit_component_1, washcategory_list_component_1, washproductname_list_component_1, washtype_list_component_1, year_list_component_1, wash_list_component_1, wash_add_component_1, wash_edit_component_1, application_list_component_1, application_add_component_1, application_edit_component_1, accessorycategory_list_component_1, accessoryproductname_list_component_1, department_list_component_1, endbuyer_list_component_1, accessories_list_component_1, accessories_add_component_1, accessories_edit_component_1, fabrics_list_component_1, fabrics_add_component_1, fabrics_edit_component_1, login_component_1, User_Add_component_1, User_Edit_component_1, User_List_component_1, spec_list_component_1, spec_add_component_1, UserRole_Add_component_1, UserRole_Edit_component_1, UserRole_List_component_1, VendorType_Add_component_1, VendorType_Edit_component_1, VendorType_List_component_1, VendorProductType_Add_component_1, VendorProductType_Edit_component_1, VendorProductType_List_component_1, Vendor_Add_component_1, Vendor_List_component_1, page_not_found_component_1, appRoutes, AppRoutingProviders, AppRouting;
    return {
        setters: [
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (home_component_1_1) {
                home_component_1 = home_component_1_1;
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
            function (fabricsproductname_list_component_1_1) {
                fabricsproductname_list_component_1 = fabricsproductname_list_component_1_1;
            },
            function (fabricsfibrecontent_list_component_1_1) {
                fabricsfibrecontent_list_component_1 = fabricsfibrecontent_list_component_1_1;
            },
            function (fabricsfinishing_list_component_1_1) {
                fabricsfinishing_list_component_1 = fabricsfinishing_list_component_1_1;
            },
            function (fabricweight_list_component_1_1) {
                fabricweight_list_component_1 = fabricweight_list_component_1_1;
            },
            function (fabricsyarncount_list_component_1_1) {
                fabricsyarncount_list_component_1 = fabricsyarncount_list_component_1_1;
            },
            function (fabricproducttype_list_component_1_1) {
                fabricproducttype_list_component_1 = fabricproducttype_list_component_1_1;
            },
            function (graphictype_list_component_1_1) {
                graphictype_list_component_1 = graphictype_list_component_1_1;
            },
            function (graphiccategory_list_component_1_1) {
                graphiccategory_list_component_1 = graphiccategory_list_component_1_1;
            },
            function (graphicproductname_list_component_1_1) {
                graphicproductname_list_component_1 = graphicproductname_list_component_1_1;
            },
            function (pom_list_component_1_1) {
                pom_list_component_1 = pom_list_component_1_1;
            },
            function (shipping_list_component_1_1) {
                shipping_list_component_1 = shipping_list_component_1_1;
            },
            function (shipping_add_component_1_1) {
                shipping_add_component_1 = shipping_add_component_1_1;
            },
            function (shipping_edit_component_1_1) {
                shipping_edit_component_1 = shipping_edit_component_1_1;
            },
            function (graphic_list_component_1_1) {
                graphic_list_component_1 = graphic_list_component_1_1;
            },
            function (graphic_add_component_1_1) {
                graphic_add_component_1 = graphic_add_component_1_1;
            },
            function (graphic_edit_component_1_1) {
                graphic_edit_component_1 = graphic_edit_component_1_1;
            },
            function (fabricstype_list_component_1_1) {
                fabricstype_list_component_1 = fabricstype_list_component_1_1;
            },
            function (division_list_component_1_1) {
                division_list_component_1 = division_list_component_1_1;
            },
            function (brand_list_component_1_1) {
                brand_list_component_1 = brand_list_component_1_1;
            },
            function (accessorytype_list_component_1_1) {
                accessorytype_list_component_1 = accessorytype_list_component_1_1;
            },
            function (reasonforabortingproject_list_component_1_1) {
                reasonforabortingproject_list_component_1 = reasonforabortingproject_list_component_1_1;
            },
            function (season_list_component_1_1) {
                season_list_component_1 = season_list_component_1_1;
            },
            function (training_list_component_1_1) {
                training_list_component_1 = training_list_component_1_1;
            },
            function (trainingitem_list_component_1_1) {
                trainingitem_list_component_1 = trainingitem_list_component_1_1;
            },
            function (shippingtype_list_component_1_1) {
                shippingtype_list_component_1 = shippingtype_list_component_1_1;
            },
            function (sizerange_list_component_1_1) {
                sizerange_list_component_1 = sizerange_list_component_1_1;
            },
            function (sizerange_add_component_1_1) {
                sizerange_add_component_1 = sizerange_add_component_1_1;
            },
            function (sizerange_edit_component_1_1) {
                sizerange_edit_component_1 = sizerange_edit_component_1_1;
            },
            function (washcategory_list_component_1_1) {
                washcategory_list_component_1 = washcategory_list_component_1_1;
            },
            function (washproductname_list_component_1_1) {
                washproductname_list_component_1 = washproductname_list_component_1_1;
            },
            function (washtype_list_component_1_1) {
                washtype_list_component_1 = washtype_list_component_1_1;
            },
            function (year_list_component_1_1) {
                year_list_component_1 = year_list_component_1_1;
            },
            function (wash_list_component_1_1) {
                wash_list_component_1 = wash_list_component_1_1;
            },
            function (wash_add_component_1_1) {
                wash_add_component_1 = wash_add_component_1_1;
            },
            function (wash_edit_component_1_1) {
                wash_edit_component_1 = wash_edit_component_1_1;
            },
            function (application_list_component_1_1) {
                application_list_component_1 = application_list_component_1_1;
            },
            function (application_add_component_1_1) {
                application_add_component_1 = application_add_component_1_1;
            },
            function (application_edit_component_1_1) {
                application_edit_component_1 = application_edit_component_1_1;
            },
            function (accessorycategory_list_component_1_1) {
                accessorycategory_list_component_1 = accessorycategory_list_component_1_1;
            },
            function (accessoryproductname_list_component_1_1) {
                accessoryproductname_list_component_1 = accessoryproductname_list_component_1_1;
            },
            function (department_list_component_1_1) {
                department_list_component_1 = department_list_component_1_1;
            },
            function (endbuyer_list_component_1_1) {
                endbuyer_list_component_1 = endbuyer_list_component_1_1;
            },
            function (accessories_list_component_1_1) {
                accessories_list_component_1 = accessories_list_component_1_1;
            },
            function (accessories_add_component_1_1) {
                accessories_add_component_1 = accessories_add_component_1_1;
            },
            function (accessories_edit_component_1_1) {
                accessories_edit_component_1 = accessories_edit_component_1_1;
            },
            function (fabrics_list_component_1_1) {
                fabrics_list_component_1 = fabrics_list_component_1_1;
            },
            function (fabrics_add_component_1_1) {
                fabrics_add_component_1 = fabrics_add_component_1_1;
            },
            function (fabrics_edit_component_1_1) {
                fabrics_edit_component_1 = fabrics_edit_component_1_1;
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
            function (spec_list_component_1_1) {
                spec_list_component_1 = spec_list_component_1_1;
            },
            function (spec_add_component_1_1) {
                spec_add_component_1 = spec_add_component_1_1;
            },
            function (UserRole_Add_component_1_1) {
                UserRole_Add_component_1 = UserRole_Add_component_1_1;
            },
            function (UserRole_Edit_component_1_1) {
                UserRole_Edit_component_1 = UserRole_Edit_component_1_1;
            },
            function (UserRole_List_component_1_1) {
                UserRole_List_component_1 = UserRole_List_component_1_1;
            },
            function (VendorType_Add_component_1_1) {
                VendorType_Add_component_1 = VendorType_Add_component_1_1;
            },
            function (VendorType_Edit_component_1_1) {
                VendorType_Edit_component_1 = VendorType_Edit_component_1_1;
            },
            function (VendorType_List_component_1_1) {
                VendorType_List_component_1 = VendorType_List_component_1_1;
            },
            function (VendorProductType_Add_component_1_1) {
                VendorProductType_Add_component_1 = VendorProductType_Add_component_1_1;
            },
            function (VendorProductType_Edit_component_1_1) {
                VendorProductType_Edit_component_1 = VendorProductType_Edit_component_1_1;
            },
            function (VendorProductType_List_component_1_1) {
                VendorProductType_List_component_1 = VendorProductType_List_component_1_1;
            },
            function (Vendor_Add_component_1_1) {
                Vendor_Add_component_1 = Vendor_Add_component_1_1;
            },
            function (Vendor_List_component_1_1) {
                Vendor_List_component_1 = Vendor_List_component_1_1;
            },
            function (page_not_found_component_1_1) {
                page_not_found_component_1 = page_not_found_component_1_1;
            }
        ],
        execute: function () {
            appRoutes = [
                { path: '', component: home_component_1.HomeComponent },
                { path: "home", redirectTo: "" },
                { path: "color", component: color_list_component_1.ColorListComponent },
                { path: "color/add", component: color_add_component_1.ColorAddComponent },
                { path: "color/edit/:id", component: color_edit_component_1.ColorEditComponent },
                { path: "fabricscategory", component: fabricscategory_list_component_1.FabricsCategoryListComponent },
                { path: "fabricsproductname", component: fabricsproductname_list_component_1.FabricsProductNameListComponent },
                { path: "fabricsfibrecontent", component: fabricsfibrecontent_list_component_1.FabricsFibreContentListComponent },
                { path: "fabricsfinishing", component: fabricsfinishing_list_component_1.FabricsFinishingListComponent },
                { path: "accessories", component: accessories_list_component_1.AccessoriesListComponent },
                { path: "accessories/add", component: accessories_add_component_1.AccessoriesAddComponent },
                { path: "accessories/edit/:id", component: accessories_edit_component_1.AccessoriesEditComponent },
                { path: "graphic", component: graphic_list_component_1.GraphicListComponent },
                { path: "graphic/add", component: graphic_add_component_1.GraphicAddComponent },
                { path: "graphic/edit/:id", component: graphic_edit_component_1.GraphicEditComponent },
                { path: "fabricsyarncount", component: fabricsyarncount_list_component_1.FabricsYarnCountListComponent },
                { path: "fabricproducttype", component: fabricproducttype_list_component_1.FabricProductTypeListComponent },
                { path: "fabricstype", component: fabricstype_list_component_1.FabricsTypeListComponent },
                { path: "fabricweight", component: fabricweight_list_component_1.FabricWeightListComponent },
                { path: "shipping", component: shipping_list_component_1.ShippingListComponent },
                { path: "shipping/add", component: shipping_add_component_1.ShippingAddComponent },
                { path: "shipping/edit/:id", component: shipping_edit_component_1.ShippingEditComponent },
                { path: "pom", component: pom_list_component_1.POMListComponent },
                { path: "accessorytype", component: accessorytype_list_component_1.AccessoryTypeListComponent },
                { path: "accessory/type/:typeid", component: accessories_list_component_1.AccessoriesListComponent },
                { path: "accessory/category/:cateid", component: accessories_list_component_1.AccessoriesListComponent },
                { path: "accessory/productname/:productnameid", component: accessories_list_component_1.AccessoriesListComponent },
                { path: "wash/type/:typeid", component: wash_list_component_1.WashListComponent },
                { path: "wash/category/:cateid", component: wash_list_component_1.WashListComponent },
                { path: "wash/productname/:productnameid", component: wash_list_component_1.WashListComponent },
                { path: "fabrics/type/:typeid", component: fabrics_list_component_1.FabricsListComponent },
                { path: "fabrics/category/:cateid", component: fabrics_list_component_1.FabricsListComponent },
                { path: "fabrics/productname/:productnameid", component: fabrics_list_component_1.FabricsListComponent },
                { path: "graphic/type/:typeid", component: graphic_list_component_1.GraphicListComponent },
                { path: "graphic/category/:cateid", component: graphic_list_component_1.GraphicListComponent },
                { path: "graphic/productname/:productnameid", component: graphic_list_component_1.GraphicListComponent },
                { path: "accessoryproductname", component: accessoryproductname_list_component_1.AccessoryProductNameListComponent },
                { path: "wash", component: wash_list_component_1.WashListComponent },
                { path: "wash/add", component: wash_add_component_1.WashAddComponent },
                { path: "wash/edit/:id", component: wash_edit_component_1.WashEditComponent },
                { path: "reasonforabortingproject", component: reasonforabortingproject_list_component_1.ReasonForAbortingProjectListComponent },
                { path: "season", component: season_list_component_1.SeasonListComponent },
                { path: "training", component: training_list_component_1.TrainingListComponent },
                { path: "trainingitem", component: trainingitem_list_component_1.TrainingItemListComponent },
                { path: "brand", component: brand_list_component_1.BrandListComponent },
                { path: "division", component: division_list_component_1.DivisionListComponent },
                { path: "shippingtype", component: shippingtype_list_component_1.ShippingTypeListComponent },
                { path: "sizerange", component: sizerange_list_component_1.SizeRangeListComponent },
                { path: "sizerange/add", component: sizerange_add_component_1.SizeRangeAddComponent },
                { path: "sizerange/edit/:id", component: sizerange_edit_component_1.SizeRangeEditComponent },
                { path: "washcategory", component: washcategory_list_component_1.WashCategoryListComponent },
                { path: "washproductname", component: washproductname_list_component_1.WashProductNameListComponent },
                { path: "washtype", component: washtype_list_component_1.WashTypeListComponent },
                { path: "graphictype", component: graphictype_list_component_1.GraphicTypeListComponent },
                { path: "graphiccategory", component: graphiccategory_list_component_1.GraphicCategoryListComponent },
                { path: "graphicproductname", component: graphicproductname_list_component_1.GraphicProductNameListComponent },
                { path: "application", component: application_list_component_1.ApplicationListComponent },
                { path: "application/add", component: application_add_component_1.ApplicationAddComponent },
                { path: "application/edit/:id", component: application_edit_component_1.ApplicationEditComponent },
                { path: "year", component: year_list_component_1.YearListComponent },
                { path: "accessorycategory", component: accessorycategory_list_component_1.AccessoryCategoryListComponent },
                { path: "accessoryproductname", component: accessoryproductname_list_component_1.AccessoryProductNameListComponent },
                { path: "department", component: department_list_component_1.DepartmentListComponent },
                { path: "endbuyer", component: endbuyer_list_component_1.EndBuyerListComponent },
                { path: "fabrics", component: fabrics_list_component_1.FabricsListComponent },
                { path: "fabrics/add", component: fabrics_add_component_1.FabricsAddComponent },
                { path: "fabrics/edit/:id", component: fabrics_edit_component_1.FabricsEditComponent },
                { path: "login", component: login_component_1.LoginComponent },
                { path: "userlist", component: User_List_component_1.UserListComponent },
                { path: "userlist/add", component: User_Add_component_1.UserAddComponent },
                { path: "userlist/edit/:id", component: User_Edit_component_1.UserEditComponent },
                { path: "spec", component: spec_list_component_1.SpecListComponent },
                { path: "spec/add", component: spec_add_component_1.SpecAddComponent },
                { path: "userrolelist", component: UserRole_List_component_1.UserRoleListComponent },
                { path: "userrolelist/add", component: UserRole_Add_component_1.UserRoleAddComponent },
                { path: "userrolelist/edit/:id", component: UserRole_Edit_component_1.UserRoleEditComponent },
                { path: "vendortypelist", component: VendorType_List_component_1.VendorTypeListComponent },
                { path: "vendortypelist/add", component: VendorType_Add_component_1.VendorTypeAddComponent },
                { path: "vendortypelist/edit/:id", component: VendorType_Edit_component_1.VendorTypeEditComponent },
                { path: "vendorproducttypelist", component: VendorProductType_List_component_1.VendorProductTypeListComponent },
                { path: "vendorproducttypelist/add", component: VendorProductType_Add_component_1.VendorProductTypeAddComponent },
                { path: "vendorproducttypelist/edit/:id", component: VendorProductType_Edit_component_1.VendorProductTypeEditComponent },
                { path: "vendorlist", component: Vendor_List_component_1.VendorListComponent },
                { path: "vendorlist/add", component: Vendor_Add_component_1.VendorAddComponent },
                //{ path: "vendorlist/edit/:id", component: VendorEditComponent },
                { path: "spec", component: spec_list_component_1.SpecListComponent },
                { path: "spec/add", component: spec_add_component_1.SpecAddComponent },
                { path: '**', component: page_not_found_component_1.PageNotFoundComponent }
            ];
            exports_1("AppRoutingProviders", AppRoutingProviders = []);
            exports_1("AppRouting", AppRouting = router_1.RouterModule.forRoot(appRoutes));
        }
    };
});
