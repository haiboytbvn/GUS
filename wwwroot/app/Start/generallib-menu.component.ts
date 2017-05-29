import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { AuthService } from "../auth.service";

@Component({
    selector: "generallib-menu",
    templateUrl: 'app/Start/generallib-menu.component.html'
})

export class GeneralLibLeftMenuComponent {
    constructor(public router: Router, public authService: AuthService) { }
    ngOnInit() {
        if (!this.authService.isLoggedIn()) {
            this.router.navigate([""]);
        }

    }
    topFunction() {
        document.body.scrollTop = 0; // For Chrome, Safari and Opera 
        document.documentElement.scrollTop = 0; // For IE and Firefox
    }
}