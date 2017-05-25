import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, OnDestroy } from "@angular/core";
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { Router, ActivatedRoute } from "@angular/router";
import { Application } from "../../Application/shared/application.model";
import { ApplicationService } from "../../Application/shared/application.service";
import { AuthService } from "../../auth.service";

declare var jQuery: any;

@Component({
    selector: "application-add",
    template: `
<div class="error-message" #errorDiv></div>
<div *ngIf="data">
    <h2>
        <a href="javascript:void(0)" (click)="onBack()">
            &laquo; Back to Application List
        </a>
    </h2>
  <div class="user-container">    
    <form class="form-user" [formGroup]="applicationForm" >
        <h2 class="form-user-heading">{{title}}</h2>
        
        <div class="form-group">
            <input formControlName="name" type="text" class="form-control" placeholder="Enter name" value="this.data.Name" autofocus />
            <span class="validator-label valid" *ngIf="this.applicationForm.controls.name.valid">
                <span class="glyphicon glyphicon-ok" aria-hidden="true"></span>
                valid!
            </span>
        <div class="form-group">
            <input formControlName="buyercode" type="text" class="form-control" placeholder="Enter buyer code" value="this.data.BuyerCode" autofocus />
        </div> 
            <span class="validator-label invalid" *ngIf="!this.applicationForm.controls.name.valid && !this.applicationForm.controls.name.pristine">
                <span class="glyphicon glyphicon-remove" aria-hidden="true"></span>
                invalid
            </span>
        </div>  
        <div class="form-group">
           Is Active? <input formControlName="isactive" type="checkbox" value="this.data.IsActive" autofocus />     
        </div>                    
        <div class="form-group">
            <input type="button" class="btn btn-primary btn-block" [disabled]="!applicationForm.valid" value="Add" (click)="onSubmit(this.applicationForm.value)" />
        </div>       
    </form>
  </div>
</div>
`,
    providers: [ApplicationService,FormBuilder]
})

export class ApplicationAddComponent {
    data: Application;
    title: string;
    applicationForm: FormGroup;
    errorMessage = null;
    @ViewChild('errorDiv') errorDiv: ElementRef;

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

        this.applicationForm = this.fb.group(
            {
                name: ["", [
                    Validators.required
                ]], 
                isactive: [true],
                buyercode:[""]                                     
            }
        );

        this.data = new Application("",null,null,false,"",false,"");
        this.title = "New Application";
    }

    ngAfterViewInit() {
        jQuery(this.errorDiv.nativeElement).hide();
    }

    ngOnDestroy() {
        this.applicationService.data = this.data;
    }

    onSubmit(data: any) {
        var application = new Application("", null, null, data.isactive, data.name, false,data.buyercode);
        this.applicationService.add(application).subscribe((data) => {
                if (data.error == null) {
                    this.data = data;
                    this.errorMessage = 'Acessory Desc added successfully';
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
        this.router.navigate(["application"]);
    }


    displayMessage(message: string, status: boolean) {
        jQuery(this.errorDiv.nativeElement).removeClass();
        this.errorDiv.nativeElement.innerHTML = message;

        if (status) { jQuery(this.errorDiv.nativeElement).addClass("success-message"); }
        else { jQuery(this.errorDiv.nativeElement).addClass("error-message"); }

        jQuery(this.errorDiv.nativeElement).slideDown(1000).delay(6000).slideUp(1000);
    }
}