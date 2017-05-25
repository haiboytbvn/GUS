import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { AuthService } from "../auth.service";

@Component({
    selector: "page-not-found",
    template: `
<h2>{{title}}</h2>
<div>
Oops.. This page does not exist (yet!).
</div>
`
})
export class PageNotFoundComponent {
    title = "Page not Found";

    constructor(
        private authService: AuthService,
        private router: Router
    ) { }

    ngOnInit() {
        if (!this.authService.isLoggedIn()) {
            this.router.navigate([""]);
        }
    }
}