import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, OnDestroy } from "@angular/core";
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { Router, ActivatedRoute } from "@angular/router";
import { ApplicationUserService } from "../shared/user.service";
import { ApplicationUser } from "../shared/user.model";
import { UserRole } from "../../UserRole/shared/UserRole.model";
import { UserRoleService } from "../../UserRole/shared/userRole.service";
import { AuthService } from "../../auth.service";

declare var jQuery: any;

@Component({
    selector: "user-add",
    template: `
    <div class="error-message" #errorDiv></div>
    <div *ngIf="data">
        <h2>
            <a href="javascript:void(0)" (click)="onBack()">
                &laquo; Back to User List
            </a>
        </h2>
        <div class="user-container">
            <form class="form-user" [formGroup]="userForm">
                <h2 class="form-user-heading">{{title}}</h2>
                


                <div class="form-group">
                    <input formControlName="username" type="text" class="form-control" placeholder="Enter user name" value="this.data.UserName" autofocus />
                    <span class="validator-label valid" *ngIf="this.userForm.controls.username.valid">
                        <span class="glyphicon glyphicon-ok" aria-hidden="true"></span>
                        valid!
                    </span>
                    <span class="validator-label invalid" *ngIf="!this.userForm.controls.username.valid && !this.userForm.controls.username.pristine">
                        <span class="glyphicon glyphicon-remove" aria-hidden="true"></span>
                        invalid
                    </span>
                </div>
                <div class="form-group">
                    <input formControlName="usercode" type="text" class="form-control" placeholder="Enter user code" value="this.data.UserCode" autofocus />
                    <span class="validator-label valid" *ngIf="this.userForm.controls.usercode.valid">
                        <span class="glyphicon glyphicon-ok" aria-hidden="true"></span>
                        valid!
                    </span>
                    <span class="validator-label invalid" *ngIf="!this.userForm.controls.usercode.valid && !this.userForm.controls.usercode.pristine">
                        <span class="glyphicon glyphicon-remove" aria-hidden="true"></span>
                        invalid
                    </span>
                </div>
                
                <div class="form-group">
                    <input formControlName="userfirstname" type="text" class="form-control" placeholder="Enter user first name" value="this.data.FirstName" autofocus />
                    <span class="validator-label valid" *ngIf="this.userForm.controls.userfirstname.valid">
                        <span class="glyphicon glyphicon-ok" aria-hidden="true"></span>
                        valid!
                    </span>
                    <span class="validator-label invalid" *ngIf="!this.userForm.controls.userfirstname.valid && !this.userForm.controls.userfirstname.pristine">
                        <span class="glyphicon glyphicon-remove" aria-hidden="true"></span>
                        invalid
                    </span>
                </div>
                <div class="form-group">
                    <input formControlName="userlastname" type="text" class="form-control" placeholder="Enter user last name" value="this.data.LastName" autofocus />
                    <span class="validator-label valid" *ngIf="this.userForm.controls.userlastname.valid">
                        <span class="glyphicon glyphicon-ok" aria-hidden="true"></span>
                        valid!
                    </span>
                    <span class="validator-label invalid" *ngIf="!this.userForm.controls.userlastname.valid && !this.userForm.controls.userlastname.pristine">
                        <span class="glyphicon glyphicon-remove" aria-hidden="true"></span>
                        invalid
                    </span>
                </div>
                <div class="form-group">
                    <input formControlName="useremail" type="text" class="form-control" placeholder="Enter user email" value="this.data.Email" autofocus />
                    <span class="validator-label valid" *ngIf="this.userForm.controls.useremail.valid">
                        <span class="glyphicon glyphicon-ok" aria-hidden="true"></span>
                        valid!
                    </span>
                    <span class="validator-label invalid" *ngIf="!this.userForm.controls.useremail.valid && !this.userForm.controls.useremail.pristine">
                        <span class="glyphicon glyphicon-remove" aria-hidden="true"></span>
                        invalid
                    </span>
                </div>
                <div class="form-group">
                    Is Active? <input formControlName="isactive" type="checkbox" value="this.data.IsActive" autofocus />
                </div>

                <div class="form-group">
                    <select value="this.data.RoleId" class="form-control" style="width:332px" formControlName="roleId">
                        <option value="">Chose a Role</option>
                        <option *ngFor="let role of roles" value="{{role.Id}}">{{role.Name}}</option>
                    </select>
                </div>   

                <div class="form-group">
                    <input type="button" class="btn btn-primary btn-block" [disabled]="!userForm.valid" value="Add" (click)="onSubmit(this.userForm.value)" />
                </div>
            </form>
        </div>
    </div>
`,
    providers: [ApplicationUserService, FormBuilder, UserRoleService]
})

export class UserAddComponent {
    data: ApplicationUser;
    title: string;
    userForm: FormGroup;
    errorMessage = null;
    roles: UserRole[];

    @ViewChild('errorDiv') errorDiv: ElementRef;

    constructor(
        private fb: FormBuilder,
        private applicationUserService: ApplicationUserService,
        private router: Router,
        private userRoleService: UserRoleService,
        private authService: AuthService,
        private activatedRoute: ActivatedRoute) {
    }


    ngOnInit() {
        if (!this.authService.isLoggedIn()) {
            this.router.navigate([""]);
        }
        this.userForm = this.fb.group(
            {
                username: ["", [
                    Validators.required
                ]],
                usercode: ["", [
                    Validators.required
                ]],
                //userrole: ["", [
                //    Validators.required
                //]],
                userfirstname: ["", [
                    Validators.required
                ]],
                userlastname: ["", [
                    Validators.required
                ]],
                useremail: ["", [
                    Validators.required
                ]],
                isactive: [false],
                roleId: [""]
            }
        );
        this.userRoleService.getUserRoleList().subscribe(items => this.roles = items, error => this.errorMessage = <any>error);

        this.data = new ApplicationUser("", null, null, null, false, "", "", "", "", "", "", "", "", false);
        this.title = "New User";
    }

    ngAfterViewInit() {
        jQuery(this.errorDiv.nativeElement).hide();
    }

    ngOnDestroy() {
        this.applicationUserService.data = this.data;
    }

    onSubmit(data: any) {
        console.log("data.RoleId : " + this.data.RoleId);
        console.log(data);
        var applicationUser = new ApplicationUser("", null, null, null, data.isactive, data.username, data.useremail, data.usercode, data.slug, data.companyid, data.RoleId, data.userfirstname, data.userlastname, false);
        this.applicationUserService.add(applicationUser).subscribe((data) => {
            if (data.error == null) {
                this.data = data;
                this.errorMessage = 'User added successfully';
                this.displayMessage(this.errorMessage, true);
            }
            else {
                // update failure
                this.errorMessage = data.error;
                this.displayMessage(this.errorMessage, false);
            }
        },
            (error) => {
                this.errorMessage = error;
                this.displayMessage(this.errorMessage, false);
            }
        );

    }

    onBack() {
        this.router.navigate(["userlist"]);
    }

    displayMessage(message: string, status: boolean) {
        jQuery(this.errorDiv.nativeElement).removeClass();
        this.errorDiv.nativeElement.innerHTML = message;

        if (status) { jQuery(this.errorDiv.nativeElement).addClass("success-message"); }
        else { jQuery(this.errorDiv.nativeElement).addClass("error-message"); }

        jQuery(this.errorDiv.nativeElement).slideDown(1000).delay(6000).slideUp(1000);
    }

    // userRole Field
    //<div class="form-group">
    //    <input formControlName="userrole" type="text" class="form-control" placeholder="Enter user role" value="this.data.Role" autofocus />
    //    <span class="validator-label valid" *ngIf="this.userForm.controls.userrole.valid">
    //        <span class="glyphicon glyphicon-ok" aria-hidden="true"></span>
    //        valid!
    //    </span>
    //    <span class="validator-label invalid" *ngIf="!this.userForm.controls.userrole.valid && !this.userForm.controls.userrole.pristine">
    //        <span class="glyphicon glyphicon-remove" aria-hidden="true"></span>
    //        invalid
    //    </span>
    //</div>
}