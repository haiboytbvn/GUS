import { ModuleWithProviders } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { HomeComponent } from "./Home/home.component";

import { ColorEditComponent } from "./Color/color/color-edit.component";
import { ColorListComponent } from "./Color/color-list/color-list.component";
import { ColorAddComponent } from "./Color/color/color-add.component";

import { FabricsCategoryListComponent } from "./FabricsCategory/fabricscategory-list/fabricscategory-list.component";

import { FabricsProductNameListComponent } from "./FabricsProductName/fabricsproductname-list/fabricsproductname-list.component";


import { FabricsFibreContentListComponent } from "./FabricsFibreContent/fabricsfibrecontent-list/fabricsfibrecontent-list.component";

import { FabricsFinishingListComponent } from "./FabricsFinishing/fabricsfinishing-list/fabricsfinishing-list.component";
import { FabricWeightListComponent } from "./FabricWeight/fabricweight-list/fabricweight-list.component";

import { FabricsYarnCountListComponent } from "./FabricsYarnCount/fabricsyarncount-list/fabricsyarncount-list.component";

import { FabricProductTypeListComponent } from "./FabricProductType/fabricproducttype-list/fabricproducttype-list.component";
import { GraphicTypeListComponent } from "./GraphicType/graphictype-list/graphictype-list.component";
import { GraphicCategoryListComponent } from "./GraphicCategory/graphiccategory-list/graphiccategory-list.component";
import { GraphicProductNameListComponent } from "./GraphicProductName/graphicproductname-list/graphicproductname-list.component";


import { POMListComponent } from "./POM/pom-list/pom-list.component";

import { ShippingListComponent } from "./Shipping/shipping-list/shipping-list.component";
import { ShippingAddComponent } from "./Shipping/shipping/shipping-add.component";
import { ShippingEditComponent } from "./Shipping/shipping/shipping-edit.component";

import { GraphicListComponent } from "./Graphic/graphic-list/graphic-list.component";
import { GraphicAddComponent } from "./Graphic/graphic/graphic-add.component";
import { GraphicEditComponent } from "./Graphic/graphic/graphic-edit.component";

import { FabricsTypeListComponent } from "./FabricsType/fabricstype-list/fabricstype-list.component";
import { DivisionListComponent } from "./Division/division-list/division-list.component";

import { BrandListComponent } from "./Brand/brand-list/brand-list.component";

import { AccessoryTypeListComponent } from "./AccessoryType/accessorytype-list/accessorytype-list.component";

import { ReasonForAbortingProjectListComponent } from "./ReasonForAbortingProject/reasonforabortingproject-list/reasonforabortingproject-list.component";

import { SeasonListComponent } from "./Season/season-list/season-list.component";

import { TrainingListComponent } from "./Training/training-list/training-list.component";
import { TrainingItemListComponent } from "./TrainingItem/trainingitem-list/trainingitem-list.component";

import { ShippingTypeListComponent } from "./ShippingType/shippingtype-list/shippingtype-list.component";


import { SizeRangeListComponent } from "./SizeRange/sizerange-list/sizerange-list.component";
import { SizeRangeAddComponent } from "./SizeRange/sizerange/sizerange-add.component";
import { SizeRangeEditComponent } from "./SizeRange/sizerange/sizerange-edit.component";

import { WashCategoryListComponent } from "./WashCategory/washcategory-list/washcategory-list.component";

import { WashProductNameListComponent } from "./WashProductName/washproductname-list/washproductname-list.component";

import { WashTypeListComponent } from "./WashType/washtype-list/washtype-list.component";

import { YearListComponent } from "./Year/year-list/year-list.component";

import { WashListComponent } from "./Wash/wash-list/wash-list.component";
import { WashAddComponent } from "./Wash/wash/wash-add.component";
import { WashEditComponent } from "./Wash/wash/wash-edit.component";

import { ApplicationListComponent } from "./Application/application-list/application-list.component";
import { ApplicationAddComponent } from "./Application/application/application-add.component";
import { ApplicationEditComponent } from "./Application/application/application-edit.component";


import { AccessoryCategoryListComponent } from "./AccessoryCategory/accessorycategory-list/accessorycategory-list.component";

import { AccessoryProductNameListComponent } from "./AccessoryProductName/accessoryproductname-list/accessoryproductname-list.component";

import { DepartmentListComponent } from "./Department/department-list/department-list.component";


import { EndBuyerListComponent } from "./EndBuyer/endbuyer-list/endbuyer-list.component";


import { AccessoriesListComponent } from "./Accessories/accessories-list/accessories-list.component";
import { AccessoriesAddComponent } from "./Accessories/accessories/accessories-add.component";
import { AccessoriesEditComponent } from "./Accessories/accessories/accessories-edit.component";


import { FabricsListComponent } from "./Fabrics/fabrics-list/fabrics-list.component";
import { FabricsAddComponent } from "./Fabrics/fabrics/fabrics-add.component";
import { FabricsEditComponent } from "./Fabrics/fabrics/fabrics-edit.component";


import { LoginComponent } from "./Login/login.component";
import { UserAddComponent } from "./User/User/User-Add.component";
import { UserEditComponent } from "./User/User/User-Edit.component";
import { UserListComponent } from "./User/User-List/User-List.component";

import { SpecListComponent } from "./Spec/spec-list/spec-list.component";
import { SpecAddComponent } from "./Spec/spec/spec-add.component";
import { UserRoleAddComponent } from "./UserRole/UserRole/UserRole-Add.component";
import { UserRoleEditComponent } from "./UserRole/UserRole/UserRole-Edit.component";
import { UserRoleListComponent } from "./UserRole/UserRole-List/UserRole-List.component";

import { VendorTypeAddComponent } from "./VendorType/VendorType/VendorType-Add.component";
import { VendorTypeEditComponent } from "./VendorType/VendorType/VendorType-Edit.component";
import { VendorTypeListComponent } from "./VendorType/VendorType-List/VendorType-List.component";

import { VendorProductTypeAddComponent } from "./VendorProductType/VendorProductType/VendorProductType-Add.component";
import { VendorProductTypeEditComponent } from "./VendorProductType/VendorProductType/VendorProductType-Edit.component";
import { VendorProductTypeListComponent } from "./VendorProductType/VendorProductType-List/VendorProductType-List.component";

import { VendorAddComponent } from "./Vendor/Vendor/Vendor-Add.component";
//import { VendorEditComponent } from "./Vendor/Vendor/Vendor-Edit.component";
import { VendorListComponent } from "./Vendor/Vendor-List/Vendor-List.component";


//import { SpecListComponent } from "./Spec/spec-list/spec-list.component";
//import { SpecAddComponent } from "./Spec/spec/spec-add.component";



import { PageNotFoundComponent } from "./PageNotFound/page-not-found.component";

const appRoutes: Routes = [
    { path: '', component: HomeComponent },
    { path: "home", redirectTo: "" },
    { path: "color", component: ColorListComponent },
    { path: "color/add", component: ColorAddComponent },
    { path: "color/edit/:id", component: ColorEditComponent },
    { path: "fabricscategory", component: FabricsCategoryListComponent },

    { path: "fabricsproductname", component: FabricsProductNameListComponent },


    { path: "fabricsfibrecontent", component: FabricsFibreContentListComponent },


    { path: "fabricsfinishing", component: FabricsFinishingListComponent },

    { path: "accessories", component: AccessoriesListComponent },
    { path: "accessories/add", component: AccessoriesAddComponent },
    { path: "accessories/edit/:id", component: AccessoriesEditComponent },

    { path: "graphic", component: GraphicListComponent },
    { path: "graphic/add", component: GraphicAddComponent },
    { path: "graphic/edit/:id", component: GraphicEditComponent },

    { path: "fabricsyarncount", component: FabricsYarnCountListComponent },

    { path: "fabricproducttype", component: FabricProductTypeListComponent },

    { path: "fabricstype", component: FabricsTypeListComponent },
    { path: "fabricweight", component: FabricWeightListComponent },

    { path: "shipping", component: ShippingListComponent },
    { path: "shipping/add", component: ShippingAddComponent },
    { path: "shipping/edit/:id", component: ShippingEditComponent },

    { path: "pom", component:POMListComponent },

    { path: "accessorytype", component: AccessoryTypeListComponent },

    { path: "accessory/type/:typeid", component: AccessoriesListComponent },
    { path: "accessory/category/:cateid", component: AccessoriesListComponent },
    { path: "accessory/productname/:productnameid", component: AccessoriesListComponent },

    { path: "wash/type/:typeid", component: WashListComponent },
    { path: "wash/category/:cateid", component: WashListComponent },
    { path: "wash/productname/:productnameid", component: WashListComponent },

    { path: "fabrics/type/:typeid", component: FabricsListComponent },
    { path: "fabrics/category/:cateid", component: FabricsListComponent },
    { path: "fabrics/productname/:productnameid", component: FabricsListComponent },


    { path: "graphic/type/:typeid", component: GraphicListComponent },
    { path: "graphic/category/:cateid", component: GraphicListComponent },
    { path: "graphic/productname/:productnameid", component: GraphicListComponent },

    { path: "accessoryproductname", component: AccessoryProductNameListComponent },

    { path: "wash", component:WashListComponent },
    { path: "wash/add", component: WashAddComponent },
    { path: "wash/edit/:id", component: WashEditComponent },

    { path: "reasonforabortingproject", component: ReasonForAbortingProjectListComponent },



    { path: "season", component: SeasonListComponent },

    { path: "training", component: TrainingListComponent },
    { path: "trainingitem", component: TrainingItemListComponent },

    { path: "brand", component: BrandListComponent },

    { path: "division", component: DivisionListComponent },

    { path: "shippingtype", component: ShippingTypeListComponent },



    { path: "sizerange", component: SizeRangeListComponent },
    { path: "sizerange/add", component: SizeRangeAddComponent },
    { path: "sizerange/edit/:id", component: SizeRangeEditComponent },


    { path: "washcategory", component: WashCategoryListComponent },

    { path: "washproductname", component: WashProductNameListComponent },
    { path: "washtype", component: WashTypeListComponent },
    { path: "graphictype", component: GraphicTypeListComponent },
    { path: "graphiccategory", component: GraphicCategoryListComponent },
    { path: "graphicproductname", component: GraphicProductNameListComponent },


    { path: "application", component: ApplicationListComponent },
    { path: "application/add", component:ApplicationAddComponent },
    { path: "application/edit/:id", component: ApplicationEditComponent },

    { path: "year", component: YearListComponent },

    { path: "accessorycategory", component: AccessoryCategoryListComponent },

    { path: "accessoryproductname", component: AccessoryProductNameListComponent },

    { path: "department", component: DepartmentListComponent },

    { path: "endbuyer", component: EndBuyerListComponent },


    { path: "fabrics", component: FabricsListComponent },
    { path: "fabrics/add", component: FabricsAddComponent },
    { path: "fabrics/edit/:id", component: FabricsEditComponent },

    { path: "login", component: LoginComponent },
    { path: "userlist", component: UserListComponent },
    { path: "userlist/add", component: UserAddComponent },
    { path: "userlist/edit/:id", component: UserEditComponent },
    { path: "spec", component: SpecListComponent },
    { path: "spec/add", component: SpecAddComponent },
    { path: "userrolelist", component: UserRoleListComponent },
    { path: "userrolelist/add", component: UserRoleAddComponent },
    { path: "userrolelist/edit/:id", component: UserRoleEditComponent },

    { path: "vendortypelist", component: VendorTypeListComponent },
    { path: "vendortypelist/add", component: VendorTypeAddComponent },
    { path: "vendortypelist/edit/:id", component: VendorTypeEditComponent },

    { path: "vendorproducttypelist", component: VendorProductTypeListComponent },
    { path: "vendorproducttypelist/add", component: VendorProductTypeAddComponent },
    { path: "vendorproducttypelist/edit/:id", component: VendorProductTypeEditComponent },

    { path: "vendorlist", component: VendorListComponent },
    { path: "vendorlist/add", component: VendorAddComponent },
    //{ path: "vendorlist/edit/:id", component: VendorEditComponent },

    { path: "spec", component: SpecListComponent },
    { path: "spec/add", component: SpecAddComponent },

    { path: '**', component: PageNotFoundComponent }
];
export const AppRoutingProviders: any[] = [
];
export const AppRouting: ModuleWithProviders = RouterModule.forRoot(appRoutes);