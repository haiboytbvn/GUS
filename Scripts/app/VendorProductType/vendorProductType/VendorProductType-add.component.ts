import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, OnDestroy } from "@angular/core";
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { Router, ActivatedRoute } from "@angular/router";
import { VendorProductTypeService } from "../shared/VendorProductType.service";
import { VendorProductType } from "../shared/VendorProductType.model";
import { AuthService } from "../../auth.service";

declare var jQuery: any;

@Component({
    selector: "VendorProductType-add",
    template: `
    <div class="error-message" #errorDiv></div>
    <div *ngIf="data">
        <h2>
            <a href="javascript:void(0)" (click)="onBack()">
                &laquo; Back to VendorProductType List
            </a>
        </h2>
        <div class="user-container">
            <form class="form-user" [formGroup]="VendorProductTypeForm">
                <h2 class="form-user-heading">{{title}}</h2>

                <div class="form-group">
                    <input formControlName="name" type="text" class="form-control" placeholder="Enter name" value="this.data.Name" autofocus />
                    <span class="validator-label valid" *ngIf="this.VendorProductTypeForm.controls.name.valid">
                        <span class="glyphicon glyphicon-ok" aria-hidden="true"></span>
                        valid!
                    </span>
                    <span class="validator-label invalid" *ngIf="!this.VendorProductTypeForm.controls.name.valid && !this.VendorProductTypeForm.controls.name.pristine">
                        <span class="glyphicon glyphicon-remove" aria-hidden="true"></span>
                        invalid
                    </span>
                </div>
                <div class="form-group">
                    Is Active? <input formControlName="isactive" type="checkbox" value="this.data.IsActive" autofocus />
                </div>
                <div class="form-group">
                    <input type="button" class="btn btn-primary btn-block" [disabled]="!VendorProductTypeForm.valid" value="Add" (click)="onSubmit(this.VendorProductTypeForm.value)" />
                </div>
            </form>
        </div>
    </div>
`,
    providers: [VendorProductTypeService, FormBuilder]
})

export class VendorProductTypeAddComponent {
    data: VendorProductType;
    title: string;
    VendorProductTypeForm: FormGroup;
    errorMessage = null;
    @ViewChild('errorDiv') errorDiv: ElementRef;

    constructor(
        private fb: FormBuilder,
        private vendorProductTypeService: VendorProductTypeService,
        private router: Router,
        private authService: AuthService,
        private activatedRoute: ActivatedRoute) {
    }

    ngOnInit() {
        if (!this.authService.isLoggedIn()) {
            this.router.navigate([""]);
        }

        this.VendorProductTypeForm = this.fb.group(
            {
                name: ["", [
                    Validators.required
                ]],
                isactive: [true],
                buyercode: [""]
            }
        );

        this.data = new VendorProductType("", null, null, false, "", false);
        this.title = "New VendorProductType";
    }

    ngAfterViewInit() {
        jQuery(this.errorDiv.nativeElement).hide();
    }

    ngOnDestroy() {
        this.vendorProductTypeService.data = this.data;
    }

    onSubmit(data: any) {
        console.log(data);
        var vendorProductType = new VendorProductType("", null, null, data.isactive, data.name, false);
        this.vendorProductTypeService.add(vendorProductType).subscribe((data) => {
            if (data.error == null) {
                this.data = data;
                this.errorMessage = 'VendorProductType added successfully';
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
        this.router.navigate(["vendorproducttypelist"]);
    }


    displayMessage(message: string, status: boolean) {
        jQuery(this.errorDiv.nativeElement).removeClass();
        this.errorDiv.nativeElement.innerHTML = message;

        if (status) { jQuery(this.errorDiv.nativeElement).addClass("success-message"); }
        else { jQuery(this.errorDiv.nativeElement).addClass("error-message"); }

        jQuery(this.errorDiv.nativeElement).slideDown(1000).delay(6000).slideUp(1000);
    }
}