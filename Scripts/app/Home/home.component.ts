import { Component } from "@angular/core";
import { LoginComponent } from "../Login/login.component";
import { Router } from "@angular/router";
import { AuthService } from "../auth.service";

@Component({
    selector: "home",
    template: `
    <h2>{{title}}</h2>
    <div>Home Page</div>
    
`
})
export class HomeComponent {
    title = "Welcome View";
    constructor(public router: Router, public authService: AuthService) { }

    ngOnInit() {
        this.authService.login("admin", "Pass4Admin")
            .subscribe((data) => {
                // login successful
                // this.loginError = false;
                var auth = this.authService.getAuth();
                console.log("Login success, Token is: " + auth.access_token);
                this.router.navigate([""]);
            },
            (err) => {
                console.log(err);
                // login failure
                //this.loginError = true;
            });
    }

    logout(): boolean {
        // logs out the user, then redirects him to Welcome View.
        if (this.authService.logout()) {
            this.router.navigate([""]);
        }
        return false;
    }

    //<div *ngIf="!authService.isLoggedIn()" >
    //<login></login>
    //< /div>
    //< div * ngIf="authService.isLoggedIn()" >
    //    <a class="logout" href= "javascript:void(0)"(click) = "logout()" > Logout < /a>
    //        < /div>
}