import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, OnDestroy } from "@angular/core";
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { Router, ActivatedRoute } from "@angular/router";
import { SizeRange } from "../../SizeRange/shared/sizerange.model";
import { SizeRangeService } from "../../SizeRange/shared/sizerange.service";
import { AuthService } from "../../auth.service";

declare var jQuery: any;

@Component({
    selector: "sizerange-add",
    template: `
<div class="error-message" #errorDiv></div>
<div *ngIf="data">
    <h2>
        <a href="javascript:void(0)" (click)="onBack()">
            &laquo; Back to SizeRange List
        </a>
    </h2>
  <div class="user-container">    
    <form class="form-user" [formGroup]="sizerangeForm" >
        <h2 class="form-user-heading">{{title}}</h2>
        
        <div class="form-group">
            <input formControlName="name" type="text" class="form-control" placeholder="Enter name" value="this.data.Name" autofocus />
            <span class="validator-label valid" *ngIf="this.sizerangeForm.controls.name.valid">
                <span class="glyphicon glyphicon-ok" aria-hidden="true"></span>
                valid!
            </span>
            <span class="validator-label invalid" *ngIf="!this.sizerangeForm.controls.name.valid && !this.sizerangeForm.controls.name.pristine">
                <span class="glyphicon glyphicon-remove" aria-hidden="true"></span>
                invalid
            </span>
        </div> 
      <div class="form-group">
            <input formControlName="buyercode" type="text" class="form-control" placeholder="Enter buyer code" value="this.data.BuyerCode" autofocus />
        </div>  
        <div class="form-group" id="sizeRangeContainer">
            <input type="text" style="width:50px" class="form-control" placeholder="Enter a size" id="txtSizeName1" /> 
             
        </div> 
        <div class="form-group">
            <button (click)="addName()">Add More Size Name</button>
        </div> 
        <div class="form-group">
           Is Active? <input formControlName="isactive" type="checkbox" value="this.data.IsActive" autofocus />     
        </div>                    
        <div class="form-group">
            <input type="button" class="btn btn-primary btn-block" [disabled]="!sizerangeForm.valid" value="Add" (click)="onSubmit(this.sizerangeForm.value)" />
        </div>       
    </form>
  </div>
</div>
`,
    providers: [SizeRangeService,FormBuilder]
})

export class SizeRangeAddComponent {
    data: SizeRange;
    title: string;
    sizenamecount: number;

    sizerangeForm: FormGroup;
    errorMessage = null;
    @ViewChild('errorDiv') errorDiv: ElementRef;
  
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
        this.sizenamecount = 1;
        this.sizerangeForm = this.fb.group(
            {
                name: ["", [
                    Validators.required
                ]], 
                isactive: [true],
                buyercode:[""]                                     
            }
        );

        this.data = new SizeRange("",false,"","",[]);
        this.title = "New Size Range";
    }
    addName() {
        this.sizenamecount += 1;
        jQuery('#sizeRangeContainer').append("<input type=\"text\" style=\"width:50px\" id=\"txtSizeName" + this.sizenamecount +  "\" class=\"form-control\" placeholder= \"Enter a size\" />" )
    }
    ngAfterViewInit() {
        jQuery(this.errorDiv.nativeElement).hide();
    }

    ngOnDestroy() {
        this.sizerangeService.data = this.data;
    }

    onSubmit(data: any) {

       //get name string
        var namestring = "";

        for (var i = 1; i <= this.sizenamecount; i++) {
            if (jQuery('#txtSizeName' + i).val !== "" && i<this.sizenamecount) {
                namestring += jQuery('#txtSizeName' + i).val() + "|";
            }
            else if (jQuery('#txtSizeName' + i).val !== "" && i === this.sizenamecount) {
                namestring += jQuery('#txtSizeName' + i).val();
            }
        }     
     
       //====

        var sizerange = new SizeRange("",data.isactive,"","",[]);
        this.sizerangeService.add(sizerange).subscribe((data) => {
                if (data.error == null) {
                    this.data = data;
                    this.errorMessage = 'Size range added successfully';
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
        this.router.navigate(["sizerange"]);
    }


    displayMessage(message: string, status: boolean) {
        jQuery(this.errorDiv.nativeElement).removeClass();
        this.errorDiv.nativeElement.innerHTML = message;

        if (status) { jQuery(this.errorDiv.nativeElement).addClass("success-message"); }
        else { jQuery(this.errorDiv.nativeElement).addClass("error-message"); }

        jQuery(this.errorDiv.nativeElement).slideDown(1000).delay(6000).slideUp(1000);
    }
}