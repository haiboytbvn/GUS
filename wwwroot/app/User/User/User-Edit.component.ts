import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from "@angular/core";
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { Router, ActivatedRoute } from "@angular/router";
import { ApplicationUserService } from "../shared/user.service";
import { ApplicationUser } from "../shared/user.model";
import { AuthService } from "../../auth.service";

declare var jQuery: any;

@Component({
    selector: "user-edit",
    template: `
    <div class="error-message" #errorDiv></div>
    <div>
        <h2>
            <a href="javascript:void(0)" (click)="onBack()">
                &laquo; Back to User List
            </a>
        </h2>
        <div class="user-container">
            <form class="form-user" #userForm="ngForm" *ngIf="data">
                <h2 class="form-user-heading">{{title}}</h2>
                

                
                <div class="form-group">
                    <input name="input-name" type="text" class="form-control" placeholder="Enter user name" [(ngModel)]="data.UserName" #username="ngModel" autofocus required (ngModelChange)="isFormChanged($event)" />
                    <span class="validator-label valid" *ngIf="username.valid">
                        <span class="glyphicon glyphicon-ok" aria-hidden="true"></span>
                        valid!
                    </span>
                    <span class="validator-label invalid" *ngIf="!username.valid && !username.pristine">
                        <span class="glyphicon glyphicon-remove" aria-hidden="true"></span>
                        invalid
                    </span>
                </div>
                <div class="form-group">
                    <input name="input-code" type="text" class="form-control" placeholder="Enter user code" [(ngModel)]="data.UserCode" #usercode="ngModel" autofocus required (ngModelChange)="isFormChanged($event)" />
                    <span class="validator-label valid" *ngIf="usercode.valid">
                        <span class="glyphicon glyphicon-ok" aria-hidden="true"></span>
                        valid!
                    </span>
                    <span class="validator-label invalid" *ngIf="!usercode.valid && !usercode.pristine">
                        <span class="glyphicon glyphicon-remove" aria-hidden="true"></span>
                        invalid
                    </span>
                </div>
                <div class="form-group">
                    <input name="input-role" type="text" class="form-control" placeholder="Enter role" [(ngModel)]="data.Role" #userrole="ngModel" autofocus required (ngModelChange)="isFormChanged($event)" />
                    <span class="validator-label valid" *ngIf="userrole.valid">
                        <span class="glyphicon glyphicon-ok" aria-hidden="true"></span>
                        valid!
                    </span>
                    <span class="validator-label invalid" *ngIf="!userrole.valid && !userrole.pristine">
                        <span class="glyphicon glyphicon-remove" aria-hidden="true"></span>
                        invalid
                    </span>
                </div>
                <div class="form-group">
                    <input name="input-firstname" type="text" class="form-control" placeholder="Enter first name" [(ngModel)]="data.FirstName" #userfirstname="ngModel" autofocus required (ngModelChange)="isFormChanged($event)" />
                    <span class="validator-label valid" *ngIf="userfirstname.valid">
                        <span class="glyphicon glyphicon-ok" aria-hidden="true"></span>
                        valid!
                    </span>
                    <span class="validator-label invalid" *ngIf="!userfirstname.valid && !userfirstname.pristine">
                        <span class="glyphicon glyphicon-remove" aria-hidden="true"></span>
                        invalid
                    </span>
                </div>
                <div class="form-group">
                    <input name="input-lastname" type="text" class="form-control" placeholder="Enter last name" [(ngModel)]="data.LastName" #userlastname="ngModel" autofocus required (ngModelChange)="isFormChanged($event)" />
                    <span class="validator-label valid" *ngIf="userlastname.valid">
                        <span class="glyphicon glyphicon-ok" aria-hidden="true"></span>
                        valid!
                    </span>
                    <span class="validator-label invalid" *ngIf="!userlastname.valid && !userlastname.pristine">
                        <span class="glyphicon glyphicon-remove" aria-hidden="true"></span>
                        invalid
                    </span>
                </div>
                <div class="form-group">
                    <input name="input-email" type="text" class="form-control" placeholder="Enter user email" [(ngModel)]="data.Email" #useremail="ngModel" autofocus required (ngModelChange)="isFormChanged($event)" />
                    <span class="validator-label valid" *ngIf="useremail.valid">
                        <span class="glyphicon glyphicon-ok" aria-hidden="true"></span>
                        valid!
                    </span>
                    <span class="validator-label invalid" *ngIf="!useremail.valid && !useremail.pristine">
                        <span class="glyphicon glyphicon-remove" aria-hidden="true"></span>
                        invalid
                    </span>
                </div>
                <div class="form-group">
                    Is Active? <input name="input-isActive" type="checkbox" [(ngModel)]="data.IsActive" #isActive="ngModel" autofocus required (ngModelChange)="isFormChanged($event)" />
                </div>
                
                

                <div class="form-group">
                    <input type="button" class="btn btn-primary btn-block" [disabled]="!username.valid || !isFormValuesChanged" value="Update" (click)="onUpdate(data)" /><br />
                    <input type="button" class="btn btn-danger btn-block" [disabled]="!username.valid" value="Delete" (click)="deleteConfirm()" />
                </div>
                <div class="dialog" *ngIf="isDelete">
                    <h3>Are you sure to delete ?</h3>
                    <input type="button" class="btn btn-danger btn-block" value="Yes" (click)="onDelete(data)" />   <br />
                    <input type="button" class="btn btn-primary btn-block" value="No" (click)="close()" />
                </div>
                <div *ngIf="isDelete" class="overlay" (click)="Close()"></div>
            </form>
        </div>
    </div>
`,
    providers: [ApplicationUserService, FormBuilder]
})

export class UserEditComponent {
    data: ApplicationUser;
    title = "Edit User";
    userForm: FormGroup;
    errorMessage = null;
    @ViewChild('errorDiv') errorDiv: ElementRef;
    isDelete = false;
    isFormValuesChanged = false;
    oldData: ApplicationUser;

    constructor(
        private fb: FormBuilder,
        private applicationUserService: ApplicationUserService,
        private router: Router,
        private authService: AuthService,
        private activatedRoute: ActivatedRoute) {
    }

    ngOnInit() {
        if (!this.authService.isLoggedIn()) {
            this.router.navigate([""]);
        }

        var id = this.activatedRoute.snapshot.params["id"];
        if (id !== "") {
            this.applicationUserService.get(id).subscribe((data) => {
                this.data = data;
            });
        }
        else {
            this.router.navigate(["userlist/add"]);
        }
    }

    ngAfterViewInit() {
        jQuery(this.errorDiv.nativeElement).hide();
    }

    onUpdate(data: ApplicationUser) {
        this.applicationUserService.update(data).subscribe((data) => {
            if (data.error == null) {
                this.data = data;
                this.errorMessage = 'User details updated successfully';
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

    onDelete(data: ApplicationUser) {
        this.applicationUserService.delete(data.Id).subscribe((data) => {
            if (data.error == null) {
                this.router.navigate(["userlist"]);
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

        this.isDelete = false;
    }

    onBack() {
        this.router.navigate(["userlist"]);
    }

    deleteConfirm() {
        this.isDelete = true;
    }

    close() {
        this.isDelete = false;
    }

    displayMessage(message: string, status: boolean) {
        jQuery(this.errorDiv.nativeElement).removeClass();
        this.errorDiv.nativeElement.innerHTML = message;

        if (status) { jQuery(this.errorDiv.nativeElement).addClass("success-message"); }
        else { jQuery(this.errorDiv.nativeElement).addClass("error-message"); }

        jQuery(this.errorDiv.nativeElement).slideDown(1000).delay(6000).slideUp(1000);
    }

    isFormChanged(value) {
        this.applicationUserService.get(this.data.Id).subscribe((oldData) => {
            this.isFormDataChanged(oldData);
        });
    }

    isFormDataChanged(oldData: ApplicationUser) {
        console.log(this.data);
        console.log(oldData);
        if (JSON.stringify(this.data) === JSON.stringify(oldData))
            this.isFormValuesChanged = false;
        else
            this.isFormValuesChanged = true;
    }
}