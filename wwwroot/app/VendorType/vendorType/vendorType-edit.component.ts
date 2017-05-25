import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from "@angular/core";
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { Router, ActivatedRoute } from "@angular/router";
import { VendorTypeService } from "../shared/vendorType.service";
import { VendorType } from "../shared/vendorType.model";
import { AuthService } from "../../auth.service";

declare var jQuery: any;

@Component({
    selector: "VendorType-edit",
    template: `
<div class="error-message" #errorDiv></div>
<div>
    <h2>
        <a href="javascript:void(0)" (click)="onBack()">
            &laquo; Back to VendorType List
        </a>
    </h2>
  <div class="user-container">    
    <form class="form-user" #VendorTypeForm="ngForm" *ngIf="data"  >
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
    providers: [VendorTypeService, FormBuilder]
})

export class VendorTypeEditComponent {
    data: VendorType;
    title = "Edit Vendor Type";
    VendorTypeForm: FormGroup;
    errorMessage = null;
    @ViewChild('errorDiv') errorDiv: ElementRef;
    isDelete = false;
    isFormValuesChanged = false;
    oldData: VendorType;

    constructor(
        private fb: FormBuilder,
        private vendorTypeService: VendorTypeService,
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
            this.vendorTypeService.get(id).subscribe((data) => {
                this.data = data;
            });
        }
        else {
            this.router.navigate(["VendorType/add"]);
        }
    }

    ngAfterViewInit() {
        jQuery(this.errorDiv.nativeElement).hide();
    }

    onUpdate(data: VendorType) {
        this.vendorTypeService.update(data).subscribe((data) => {
            if (data.error == null) {
                this.data = data;
                this.errorMessage = 'Vendor type updated successfully';
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

    onDelete(data: VendorType) {
        this.vendorTypeService.delete(data.Id).subscribe((data) => {
            if (data.error == null) {
                this.router.navigate(["VendorType"]);
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
        this.router.navigate(["vendortypelist"]);
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
        this.vendorTypeService.get(this.data.Id).subscribe((oldData) => {
            this.isFormDataChanged(oldData);
        });
    }

    isFormDataChanged(oldData: VendorType) {
        if (JSON.stringify(this.data) === JSON.stringify(oldData))
            this.isFormValuesChanged = false;
        else
            this.isFormValuesChanged = true;
    }
}