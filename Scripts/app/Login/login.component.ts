import { Component } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { AuthService } from "../auth.service";
@Component({
    selector: "login",
    template: `
    <div>
        <h2>Login</h2>
        <div role="alert" *ngIf="loginError">
            <strong>Warning:</strong> Username or Password mismatch
        </div>
        <form [formGroup]="loginForm" (submit)="performLogin($event)">
            <input formControlName="username" type="text" placeholder="Your username or e-mail address" required autofocus />
            <input formControlName="password" type="password" placeholder="Your password" required />
            <div class="checkbox">
                <label>
                    <input type="checkbox" value="remember-me">
                    Remember me
                </label>
            </div>
            <button class="btn btn-lg btn-primary btn-block" type="submit">
                Sign in
            </button>
            <br>
            <p>User name : admin</p>
            <p>Password  : Pass4Admin</p>
            <p>For test only, please ignore</p>
        </form>
    </div>
`
})
export class LoginComponent {
    title = "Login";
    loginForm = null;
    loginError = false;
    constructor(private fb: FormBuilder, private router: Router, private authService: AuthService) {
        if (this.authService.isLoggedIn()) {
            this.router.navigate([""]);
        }
        this.loginForm = fb.group({
            username: ["", Validators.required],
            password: ["", Validators.required]
        });
    }

    performLogin(e) {
        e.preventDefault();
        var username = this.loginForm.value.username;
        var password = this.loginForm.value.password;

        this.authService.login(username, password)
            .subscribe((data) => {
                // login successful
                this.loginError = false;
                var auth = this.authService.getAuth();
                alert("Login success, Token is: " + auth.access_token);
                this.router.navigate([""]);
            },
            (err) => {
                console.log(err);
                // login failure
                this.loginError = true;
            });
    }
}