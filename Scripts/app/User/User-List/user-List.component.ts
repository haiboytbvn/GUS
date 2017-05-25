import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from "@angular/core";
import { ApplicationUserService } from "../shared/user.service";
import { ApplicationUser } from "../shared/user.model";
import { Router } from "@angular/router";
import { AuthService } from "../../auth.service";
declare var jQuery: any;

@Component({
    selector: "userList",
    template: `
    <div class="error-message" #errorDiv></div>
    <div class="user-container">
        <h1 class="homeHeader">{{title}}</h1>
        <div class="col-right-s3 form-group">
            <input type="button" class="btn btn-primary btn-block" value="Add" (click)="addNewUser()" />
        </div>
        <div class="clearDiv">
        </div>
        <div #actionDiv class="col-half-one-third leftPane">
            <div class="leftPaneContent form-group">
                <h2>Bulk Actions</h2>
                <button class="btn btn-danger btn-block" (click)="deleteConfirm()" [disabled]="isLoading">
                    <div [class.cssload-container]="isLoading">
                        <div [class.cssload-zenith]="isLoading"></div>
                    </div>
                    <div [class.cssload-text]="isLoading">Delete</div>
                </button>

                <div class="dialog" *ngIf="isDelete">
                    <h3>Are you sure to delete checked items ?</h3>
                    <input type="button" class="btn btn-danger btn-block" value="Yes" (click)="onDelete()" />   <br />
                    <input type="button" class="btn btn-primary btn-block" value="No" (click)="close()" />
                </div>
                <div *ngIf="isDelete" class="overlay" (click)="Close()"></div>
            </div>
        </div>
        <div class="col-half-two-third">
            <table class="table table-hover">
                <thead>
                    <tr>
                        <th>Select All<br /><input type="checkbox" [checked]="toggle" (change)="toggleAll()" /></th>
                        <th>User Name</th>
                        <th>User Code</th>
                        <th>User Type</th>
                        <th>Full Name</th>
                        <th>Email</th>
                        <th>Is Active</th>
                    </tr>
                </thead>
                <tbody>
                    <tr *ngFor="let user of users" [class.selected]="user === selectedData">
                        <td><input type="checkbox" #chkSelect value="{{user.Id}}" [checked]="user.checked" (change)="toggleItem(user)" /></td>
                        <td><a href="userlist/edit/{{user.Id}}">{{user.UserName}}</a></td>
                        <td>{{user.UserCode}}</td>
                        <td>{{user.Role}}</td>
                        <td>{{user.FirstName + " " + user.LastName}}</td>
                        <td>{{user.Email}}</td>
                        <td>{{user.IsActive}}</td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div class="clearDiv">
        </div>
    </div>
`
    ,
    providers: [ApplicationUserService]
})
export class UserListComponent {
    title = "User List";
    selectedData: ApplicationUser;
    errorMessage: string;
    toggle = false;
    isDelete = false;
    isLoading = false;

    @ViewChild('actionDiv') actionDiv: ElementRef;
    @ViewChild('errorDiv') errorDiv: ElementRef;
    users: ApplicationUser[];


    constructor(private userService: ApplicationUserService, private router: Router, private authService: AuthService) { }


    ngOnInit() {
        if (!this.authService.isLoggedIn()) {
            this.router.navigate([""]);
        }
        this.userService.getApplicationUserList().subscribe(items => this.users = items, error => this.errorMessage = <any>error);
    }

    ngAfterViewInit() {
        jQuery(this.actionDiv.nativeElement).hide();
        jQuery(this.errorDiv.nativeElement).hide();
    }

    onSelect(data: ApplicationUser) {
        this.selectedData = data;
        this.router.navigate(["userlist/edit", this.selectedData.Id]);
    }

    addNewUser() {
        this.router.navigate(["userlist/add"]);
    }

    onDelete(data: ApplicationUser) {
        this.isDelete = false;
        this.isLoading = true;

        this.users.filter(data => data.checked).forEach(selectedData =>
            this.userService.delete(selectedData.Id).subscribe((data) => {
                if (data.error == null) {
                    this.errorMessage = 'deleted selected data(s) successfully';
                    setTimeout(() => {
                        this.isLoading = false,
                            jQuery(this.actionDiv.nativeElement).hide(1000),
                            this.userService.getApplicationUserList().subscribe(items => this.users = items, error => this.errorMessage = <any>error);
                    }, 2000);
                }
            })
        );
    }

    showActionDiv(status: boolean) {
        var boxWidth = jQuery(this.actionDiv.nativeElement).width();
        if (status)
            jQuery(this.actionDiv.nativeElement).show({ direction: "left" }, 1000);
        else
            jQuery(this.actionDiv.nativeElement).hide(1000);
    }

    deleteConfirm() {
        this.isDelete = true;
    }

    close() {
        this.isDelete = false;
    }

    toggleItem(data) {
        data.checked = !data.checked;
        this.toggle = this.users.every(data => data.checked);

        this.showActionDiv(this.users.filter(data => data.checked).length > 0);
    }

    toggleAll() {
        this.toggle = !this.toggle;
        this.users.forEach(data => data.checked = this.toggle);
        this.showActionDiv(this.users.filter(data => data.checked).length > 0);
    }

    displayMessage(message: string, status: boolean) {
        jQuery(this.errorDiv.nativeElement).removeClass();
        this.errorDiv.nativeElement.innerHTML = message;

        if (status) { jQuery(this.errorDiv.nativeElement).addClass("success-message"); }
        else { jQuery(this.errorDiv.nativeElement).addClass("error-message"); }

        jQuery(this.errorDiv.nativeElement).slideDown(1000).delay(6000).slideUp(1000);
    }
}