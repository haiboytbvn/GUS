import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { AuthService } from "../auth.service";
import { MenuService } from "../Start/shared/menu.service";
import { AncestorMenuItem } from "../Start/shared/ancestormenu.model";

@Component({
    selector: "material-menu",
    templateUrl: 'app/Start/materiallib-menu.component.html',
    providers: [MenuService, AuthService]
})

export class MaterialLibLeftMenuComponent {
    constructor(public router: Router, public authService: AuthService, public menuService: MenuService) { }
    generallibMenu: AncestorMenuItem;
    fabgenerallibMenu: AncestorMenuItem;
    washgenerallibMenu: AncestorMenuItem;
    graphicgenerallibMenu: AncestorMenuItem;
    errorMessage: any;
    ngOnInit() {
        if (!this.authService.isLoggedIn()) {
            this.router.navigate([""]);
        }

        // get accessory leftmenu dynamically

        this.menuService.getAccessoryLeftMenu().subscribe(items => this.generallibMenu = items, error => this.errorMessage = <any>error);
        this.menuService.getFabLeftMenu().subscribe(items => this.fabgenerallibMenu = items, error => this.errorMessage = <any>error);
        this.menuService.getWashLeftMenu().subscribe(items => this.washgenerallibMenu = items, error => this.errorMessage = <any>error);
        this.menuService.getGraphicLeftMenu().subscribe(items => this.graphicgenerallibMenu = items, error => this.errorMessage = <any>error);
    }

    changeType(id: string) {
        this.router.navigate(["accessory/type/" + id]);
    }
    changefabType(id: string) {
        this.router.navigate(["fabrics/type/" + id]);
    }
    changeCate(id: string) {
        console.log(id);
        this.router.navigate(["accessory/category/" + id]);
    }
    changefabCate(id: string) {
        console.log(id);
        this.router.navigate(["fabrics/category/" + id]);
    }
    changewashCate(id: string) {

        this.router.navigate(["wash/category/" + id]);
    }
    changewashType(id: string) {
        this.router.navigate(["wash/type/" + id]);
    }
    changegraphicCate(id: string) {

        this.router.navigate(["graphic/category/" + id]);
    }
    changegraphicType(id: string) {
        console.log("aaaaaaaaaaaaa");
        this.router.navigate(["graphic/type/" + id]);
    }
    topFunction() {
        document.body.scrollTop = 0; // For Chrome, Safari and Opera 
        document.documentElement.scrollTop = 0; // For IE and Firefox
    }
}
