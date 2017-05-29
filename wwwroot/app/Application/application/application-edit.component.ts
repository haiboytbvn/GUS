import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from "@angular/core";
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { Router, ActivatedRoute } from "@angular/router";
import { Application } from "../../Application/shared/application.model";
import { ApplicationService } from "../../Application/shared/application.service";
import { AuthService } from "../../auth.service";

declare var jQuery: any;

@Component({
    selector: "application-edit",
    template: `
<div class="error-message" #errorDiv></div>
<div>
    <h2>
        <a href="javascript:void(0)" (click)="onBack()">
            &laquo; Back to Application List
        </a>
    </h2>
  <div class="user-container">    
    <form class="form-user" #applicationForm="ngForm" *ngIf="data"  >
        <h2 class="form-user-heading">{{title}}</h2>
        <div class="form-group">
            <input name="input-name" type="text" class="form-control" placeholder="Enter name" [(ngModel)]="data.Name" #name="ngModel" autofocus required (ngModelChange)="isFormChanged($event)"  />
            <span class="validator-label valid" *ngIf="name.valid">
                <span class="glyphicon glyphicon-ok" aria-hidden="true"></span>
                valid!
            </span>
            <span class="validator-label invalid" *ngIf="!name.valid && !name.pristine">
                <span class="glyphicon glyphicon-remove" aria-hidden="true"></span>
                invalid
            </span>
        </div>    
        <div class="form-group">
            <input name="input-buyercode" type="text" class="form-control" placeholder="Enter buyer code" [(ngModel)]="data.BuyerCode" #name="ngModel" autofocus required (ngModelChange)="isFormChanged($event)"  />     
        </div>
        <div class="form-group">
           Is Active? <input name="input-isActive" type="checkbox" [(ngModel)]="data.IsActive" #isActive="ngModel" autofocus required (ngModelChange)="isFormChanged($event)"/>           
        </div>                  
        <div class="form-group">
            <input type="button" class="btn btn-primary btn-block" [disabled]="!name.valid || !isFormValuesChanged" value="Update" (click)="onUpdate(data)" /><br/>
            <input type="button" class="btn btn-danger btn-block" [disabled]="!name.valid" value="Delete" (click)="deleteConfirm()" />             
       </div>             
       <div class="dialog" *ngIf="isDelete">
          <h3>Are you sure to delete ?</h3>
            <input type="button" class="btn btn-danger btn-block"  value="Yes" (click)="onDelete(data)" />   <br/>          
            <input type="button" class="btn btn-primary btn-block"  value="No" (click)="close()" />             
       </div>
       <div *ngIf="isDelete" class="overlay" (click)="Close()"></div>
    </form> 
  </div>       
</div>
`,
providers: [ApplicationService,FormBuilder]
})

export class ApplicationEditComponent {
    data: Application;
    title = "Edit Application";
    applicationForm: FormGroup;
    errorMessage = null;
    @ViewChild('errorDiv') errorDiv: ElementRef;
    isDelete = false;
    isFormValuesChanged = false;
    oldData: Application;

    constructor(
        private fb: FormBuilder,
        private applicationService: ApplicationService,
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
            this.applicationService.get(id).subscribe((data) => {
                this.data = data;
            });
        }
        else {
            this.router.navigate(["application/add"]);
        }
    }

    ngAfterViewInit() {
        jQuery(this.errorDiv.nativeElement).hide();
    }

    onUpdate(data: Application) {
        this.applicationService.update(data).subscribe((data) => {
            if (data.error == null) {
                this.data = data;
                this.errorMessage = 'Application details updated successfully';
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

    onDelete(data: Application) {
        this.applicationService.delete(data.Id).subscribe((data) => {
            if (data.error == null) {
                this.router.navigate(["application"]);
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
        this.router.navigate(["application"]);
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
        this.applicationService.get(this.data.Id).subscribe((oldData) => {
            this.isFormDataChanged(oldData);
        });
    }

    isFormDataChanged(oldData: Application) {
        if (JSON.stringify(this.data) === JSON.stringify(oldData))
            this.isFormValuesChanged = false;
        else
            this.isFormValuesChanged = true;
    }
}