import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, OnDestroy } from "@angular/core";
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { Router, ActivatedRoute } from "@angular/router";
import { VendorTypeService } from "../shared/vendorType.service";
import { VendorType } from "../shared/vendorType.model";
import { AuthService } from "../../auth.service";

declare var jQuery: any;

@Component({
    selector: "VendorType-add",
    template: `
    <div class="error-message" #errorDiv></div>
    <div *ngIf="data">
        <h2>
            <a href="javascript:void(0)" (click)="onBack()">
                &laquo; Back to VendorType List
            </a>
        </h2>
        <div class="user-container">
            <form class="form-user" [formGroup]="VendorTypeForm">
                <h2 class="form-user-heading">{{title}}</h2>

                <div class="form-group">
                    <input formControlName="name" type="text" class="form-control" placeholder="Enter name" value="this.data.Name" autofocus />
                    <span class="validator-label valid" *ngIf="this.VendorTypeForm.controls.name.valid">
                        <span class="glyphicon glyphicon-ok" aria-hidden="true"></span>
                        valid!
                    </span>
                    <span class="validator-label invalid" *ngIf="!this.VendorTypeForm.controls.name.valid && !this.VendorTypeForm.controls.name.pristine">
                        <span class="glyphicon glyphicon-remove" aria-hidden="true"></span>
                        invalid
                    </span>
                </div>
                <div class="form-group">
                    Is Active? <input formControlName="isactive" type="checkbox" value="this.data.IsActive" autofocus />
                </div>
                <div class="form-group">
                    <input type="button" class="btn btn-primary btn-block" [disabled]="!VendorTypeForm.valid" value="Add" (click)="onSubmit(this.VendorTypeForm.value)" />
                </div>
            </form>
        </div>
    </div>
`,
    providers: [VendorTypeService, FormBuilder]
})

export class VendorTypeAddComponent {
    data: VendorType;
    title: string;
    VendorTypeForm: FormGroup;
    errorMessage = null;
    @ViewChild('errorDiv') errorDiv: ElementRef;

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

        this.VendorTypeForm = this.fb.group(
            {
                name: ["", [
                    Validators.required
                ]],
                isactive: [true],
                buyercode: [""]
            }
        );

        this.data = new VendorType("", null, null, false, "", false);
        this.title = "New VendorType";
    }

    ngAfterViewInit() {
        jQuery(this.errorDiv.nativeElement).hide();
    }

    ngOnDestroy() {
        this.vendorTypeService.data = this.data;
    }

    onSubmit(data: any) {
        console.log(data);
        var vendorType = new VendorType("", null, null, data.isactive, data.name, false);
        this.vendorTypeService.add(vendorType).subscribe((data) => {
            if (data.error == null) {
                this.data = data;
                this.errorMessage = 'VendorType added successfully';
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
        this.router.navigate(["vendortypelist"]);
    }


    displayMessage(message: string, status: boolean) {
        jQuery(this.errorDiv.nativeElement).removeClass();
        this.errorDiv.nativeElement.innerHTML = message;

        if (status) { jQuery(this.errorDiv.nativeElement).addClass("success-message"); }
        else { jQuery(this.errorDiv.nativeElement).addClass("error-message"); }

        jQuery(this.errorDiv.nativeElement).slideDown(1000).delay(6000).slideUp(1000);
    }
}