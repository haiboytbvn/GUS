import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from "@angular/core";
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { Router, ActivatedRoute } from "@angular/router";
import { SizeRange } from "../../SizeRange/shared/sizerange.model";
import { SizeRangeService } from "../../SizeRange/shared/sizerange.service";
import { AuthService } from "../../auth.service";

declare var jQuery: any;

@Component({
    selector: "sizerange-edit",
    template: `
<div class="error-message" #errorDiv></div>
<div>
    <h2>
        <a href="javascript:void(0)" (click)="onBack()">
            &laquo; Back to Size Range List
        </a>
    </h2>
  <div class="user-container">    
    <form class="form-user" #sizerangeForm="ngForm" *ngIf="data"  >
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


        <div class="form-group" id="sizeRangeContainer">
            <input type="text" class="form-control" style="width:50px" *ngFor="let value of data?.ValueList; let i=index" value="{{value}}" placeholder="Enter a size" id="txtSizeName{{i + 1}}" /> 
             
        </div> 
        <div class="form-group">
            <button (click)="addName()">Add More Size Name</button>
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
providers: [SizeRangeService,FormBuilder]
})

export class SizeRangeEditComponent {
    data: SizeRange;
    title = "Edit Size Range";
    sizerangeForm: FormGroup;
    errorMessage = null;
    @ViewChild('errorDiv') errorDiv: ElementRef;
    isDelete = false;
    isFormValuesChanged = false;
    oldData: SizeRange;
    sizenamecount: number;

    constructor(
        private fb: FormBuilder,
        private sizerangeService: SizeRangeService,
        private router: Router,
        private authService: AuthService,
        private activatedRoute: ActivatedRoute) {
    }

    ngOnInit() {
        if (!this.authService.isLoggedIn()) {
            this.router.navigate([""]);
        }
       // this.sizenamecount = this.data.ValueList.length;
        var id =  this.activatedRoute.snapshot.params["id"];
        if (id !== "") {
            this.sizerangeService.get(id).subscribe((data) => {
                this.data = data;
            });
        }
        else {
            this.router.navigate(["sizerange/add"]);
        }
    }
    addName() {
        this.isFormValuesChanged = true;
        this.sizenamecount= this.data.ValueList.length + 1;
        console.log(this.sizenamecount);
        jQuery('#sizeRangeContainer').append("<input type=\"text\" style=\"width:50px\" id=\"txtSizeName" + this.sizenamecount + "\" class=\"form-control\" placeholder= \"Enter a size\" />")
    }
    ngAfterViewInit() {
        jQuery(this.errorDiv.nativeElement).hide();
    }

    onUpdate(data: SizeRange) {

        //get name string
        var namestring = "";

        for (var i = 1; i <= this.sizenamecount; i++) {
            if (jQuery('#txtSizeName' + i).val !== "" && i < this.sizenamecount) {
                namestring += jQuery('#txtSizeName' + i).val() + "|";
            }
            else if (jQuery('#txtSizeName' + i).val !== "" && i === this.sizenamecount) {
                namestring += jQuery('#txtSizeName' + i).val();
            }
        }

       //====

        data.Value = namestring;
        this.sizerangeService.update(data).subscribe((data) => {
            if (data.error == null) {
                this.data = data;
                this.errorMessage = 'SizeRange details updated successfully';
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

    onDelete(data: SizeRange) {
        this.sizerangeService.delete(data.Id).subscribe((data) => {
            if (data.error == null) {
                this.router.navigate(["sizerange"]);
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
        this.router.navigate(["sizerange"]);
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
        this.sizerangeService.get(this.data.Id).subscribe((oldData) => {
            this.isFormDataChanged(oldData);
        });
    }

    isFormDataChanged(oldData: SizeRange) {
        if (JSON.stringify(this.data) === JSON.stringify(oldData))
            this.isFormValuesChanged = false;
        else
            this.isFormValuesChanged = true;
    }
}