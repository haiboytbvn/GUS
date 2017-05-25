///<reference path="../../typings/index.d.ts"/>
import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { HttpModule } from "@angular/http";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import "rxjs/Rx";

import { AppComponent } from "./Start/app.component";
import { GeneralLibLeftMenuComponent } from "./Start/generallib-menu.component";

import { HomeComponent } from "./Home/home.component";

import { AccessoryCategoryListComponent } from "./AccessoryCategory/accessorycategory-list/accessorycategory-list.component";
import { AccessoryCategoryService } from "./AccessoryCategory/shared/accessorycategory.service";

import { ColorEditComponent } from "./Color/color/color-edit.component";
import { ColorListComponent } from "./Color/color-list/color-list.component";
import { ColorAddComponent } from "./Color/color/color-add.component";

import { FabricsTypeListComponent } from "./FabricsType/fabricstype-list/fabricstype-list.component";

import { FabricsCategoryListComponent } from "./FabricsCategory/fabricscategory-list/fabricscategory-list.component";


import { LoginComponent } from "./Login/login.component";
import { UserAddComponent } from "./User/User/User-Add.component";
import { UserEditComponent } from "./User/User/User-Edit.component";
import { UserListComponent } from "./User/User-List/User-List.component";

import { PageNotFoundComponent } from "./PageNotFound/page-not-found.component";
import { AppRouting } from "./app.routing";
import { AuthHttp } from "./auth.http";
import { AuthService } from "./auth.service";
@NgModule({
    // directives, components, and pipes
    declarations: [
        AppComponent,
        HomeComponent,
        AccessoryCategoryListComponent,
        ColorAddComponent,
        ColorListComponent,
        ColorEditComponent,       
        PageNotFoundComponent,
        FabricsCategoryListComponent,
        LoginComponent,
        UserAddComponent,
        UserEditComponent,
        UserListComponent,
        GeneralLibLeftMenuComponent
    ],
    // modules
    imports: [
        BrowserModule,
        HttpModule,
        FormsModule,
        ReactiveFormsModule,
        AppRouting
    ],
    // providers
    providers: [
        AccessoryCategoryService,
        AuthHttp,
        AuthService
    ],
    bootstrap: [
        AppComponent
    ]
})
export class AppModule { }