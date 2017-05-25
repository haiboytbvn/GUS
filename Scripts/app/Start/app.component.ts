import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { AuthService } from "../auth.service";
import { GeneralLibLeftMenuComponent } from "../Start/generallib-menu.component";
import { MaterialLibLeftMenuComponent } from "../Start/materiallib-menu.component";
import { Optional } from "@angular/core";
@Component({
    selector: "gus",
    templateUrl: 'app/Start/app.component.html',
    directives: [GeneralLibLeftMenuComponent, MaterialLibLeftMenuComponent]
})

export class AppComponent {
    title = "GUS Website";
    constructor(public router: Router, public authService: AuthService) { }
    ngOnInit() {
        //if (!this.authService.isLoggedIn()) {
        //    this.router.navigate([""]);
        //}
    }
}