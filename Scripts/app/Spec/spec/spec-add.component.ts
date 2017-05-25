import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, OnDestroy } from "@angular/core";
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { Router, ActivatedRoute } from "@angular/router";
import { Spec } from "../../Spec/shared/spec.model";
import { SpecService } from "../../Spec/shared/spec.service";
import { SizeRange } from "../../SizeRange/shared/sizerange.model";
import { SizeRangeService } from "../../SizeRange/shared/sizerange.service";
import { AuthService } from "../../auth.service";
import { SearchGeneralFilter } from "../../SearchGeneralFilter/shared/searchGeneralFilter.model";

declare var jQuery: any;

@Component({
    selector: "spec-add",
    template: `
<div class="error-message" #errorDiv></div>
<div *ngIf="data">
    <h2>
        <a href="javascript:void(0)" (click)="onBack()">
            &laquo; Back to Spec List
        </a>
    </h2>
  <div class="user-container">    
    <form class="form-user" [formGroup]="specForm" >
        <h2 class="form-user-heading">{{title}}</h2>
        
        <div class="form-group">
            <input formControlName="name" type="text" class="form-control" placeholder="Enter name" value="this.data.Name" autofocus />
            <span class="validator-label valid" *ngIf="this.specForm.controls.name.valid">
                <span class="glyphicon glyphicon-ok" aria-hidden="true"></span>
                valid!
            </span>
            <span class="validator-label invalid" *ngIf="!this.specForm.controls.name.valid && !this.specForm.controls.name.pristine">
                <span class="glyphicon glyphicon-remove" aria-hidden="true"></span>
                invalid
            </span>
        </div>  
      
        <div class="form-group">
            <input formControlName="buyercode" type="text" class="form-control" placeholder="Enter buyer code" value="this.data.BuyerCode" autofocus />
        </div> 
        <div class="form-group">
            <input formControlName="guidedspecsize" type="text" class="form-control" placeholder="Enter buyer code" value="this.data.GuidedSpecSize" autofocus />
        </div> 
       <div class="form-group">
            <select value="this.data?.SizeRange" class="form-control input-medium" style="width:332px" formControlName="sizerange">
                    <option value="">Chose a size range</option>
                    <option *ngFor="let sizerange of sizeranges" value="{{sizerange.Id}}">{{sizerange.Name}}</option>
            </select>
        </div>  
         
        <div class="form-group">
           Is Active? <input formControlName="isactive" type="checkbox" value="this.data.IsActive" autofocus />     
        </div>                    
        <div class="form-group">
            <input type="button" class="btn btn-primary btn-block" [disabled]="!specForm.valid" value="Add" (click)="onSubmit(this.specForm.value)" />
        </div>       
    </form>
  </div>
</div>
`,
    providers: [SpecService, FormBuilder, SizeRangeService]
})

export class SpecAddComponent {
    data: Spec;
    title: string;
    specForm: FormGroup;
    errorMessage = null;
    @ViewChild('errorDiv') errorDiv: ElementRef;
    sizeranges: SizeRange[];
 
    constructor(
        private fb: FormBuilder,
        private specService: SpecService,
        private router: Router,
        private sizerangeService: SizeRangeService,
        private authService: AuthService,
        private activatedRoute: ActivatedRoute) {
    }

    ngOnInit() {
        if (!this.authService.isLoggedIn()) {
            this.router.navigate([""]);
        }
        var searchGeneralFilter = new SearchGeneralFilter("", "", "", "");
        this.sizerangeService.getSizeRangeList(searchGeneralFilter).subscribe(items => this.sizeranges = items, error => this.errorMessage = <any>error);
        this.data = new Spec("", null, null, false, "", "", "", "", "", "", "", false);
        this.title = "New Spec";
        this.specForm = this.fb.group(
            {
                name: ["", [
                    Validators.required
                ]], 
                isactive: [true],
                buyercode: [""],
                sizerange: [""],
                guidedspecsize: [""]                             
            });

       

      
    }

    ngAfterViewInit() {
        jQuery(this.errorDiv.nativeElement).hide();
    }

    ngOnDestroy() {
        this.specService.data = this.data;
    }

    onSubmit(data: any) {
        console.log(data);
        var spec = new Spec("",null,null,data.isactive,"",data.name,"","",data.buyercode,data.sizerange,data.guidedspecsize,false);
        this.specService.add(spec).subscribe((data) => {
                if (data.error == null) {
                    this.data = data;
                    this.errorMessage = 'Spec added successfully';
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
        this.router.navigate(["spec"]);
    }


    displayMessage(message: string, status: boolean) {
        jQuery(this.errorDiv.nativeElement).removeClass();
        this.errorDiv.nativeElement.innerHTML = message;

        if (status) { jQuery(this.errorDiv.nativeElement).addClass("success-message"); }
        else { jQuery(this.errorDiv.nativeElement).addClass("error-message"); }

        jQuery(this.errorDiv.nativeElement).slideDown(1000).delay(6000).slideUp(1000);
    }
}