import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, OnDestroy } from "@angular/core";
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { Router, ActivatedRoute } from "@angular/router";
import { VendorService } from "../shared/Vendor.service";
import { Vendor } from "../shared/Vendor.model";
import { VendorType } from "../../VendorType/shared/vendorType.model";
import { VendorTypeService } from "../../VendorType/shared/vendorType.service";
import { VendorProductType } from "../../VendorProductType/shared/VendorProductType.model";
import { VendorProductTypeService } from "../../VendorProductType/shared/VendorProductType.service";
import { AuthService } from "../../auth.service";

declare var jQuery: any;

@Component({
    selector: "Vendor-add",
    template: `
    <div class="error-message" #errorDiv></div>
    <div *ngIf="data">
        <h2>
            <a href="javascript:void(0)" (click)="onBack()">
                &laquo; Back to Vendor List
            </a>
        </h2>
        <div class="user-container">
            <form class="form-user" [formGroup]="VendorForm">
                <h2 class="form-user-heading">{{title}}</h2>

                <div class="form-group">
                    <input formControlName="username" type="text" class="form-control" placeholder="Enter name" value="this.data.UserName" autofocus />
                    <span class="validator-label valid" *ngIf="this.VendorForm.controls.username.valid">
                        <span class="glyphicon glyphicon-ok" aria-hidden="true"></span>
                        valid!
                    </span>
                    <span class="validator-label invalid" *ngIf="!this.VendorForm.controls.username.valid && !this.VendorForm.controls.username.pristine">
                        <span class="glyphicon glyphicon-remove" aria-hidden="true"></span>
                        invalid
                    </span>
                </div>


                <div class="form-group">
                    <input formControlName="email" type="text" class="form-control" placeholder="Enter email" value="this.data.Email" autofocus />
                    <span class="validator-label valid" *ngIf="this.VendorForm.controls.email.valid">
                        <span class="glyphicon glyphicon-ok" aria-hidden="true"></span>
                        valid!
                    </span>
                    <span class="validator-label invalid" *ngIf="!this.VendorForm.controls.email.valid && !this.VendorForm.controls.email.pristine">
                        <span class="glyphicon glyphicon-remove" aria-hidden="true"></span>
                        invalid
                    </span>
                </div>
                <div class="form-group">
                    <input formControlName="searchName" type="text" class="form-control" placeholder="Enter search name" value="this.data.SearchName" autofocus />
                    <span class="validator-label valid" *ngIf="this.VendorForm.controls.searchName.valid">
                        <span class="glyphicon glyphicon-ok" aria-hidden="true"></span>
                        valid!
                    </span>
                    <span class="validator-label invalid" *ngIf="!this.VendorForm.controls.searchName.valid && !this.VendorForm.controls.searchName.pristine">
                        <span class="glyphicon glyphicon-remove" aria-hidden="true"></span>
                        invalid
                    </span>
                </div>
                <div class="form-group">
                    <input formControlName="address" type="text" class="form-control" placeholder="Enter address" value="this.data.Address" autofocus />
                    <span class="validator-label valid" *ngIf="this.VendorForm.controls.address.valid">
                        <span class="glyphicon glyphicon-ok" aria-hidden="true"></span>
                        valid!
                    </span>
                    <span class="validator-label invalid" *ngIf="!this.VendorForm.controls.address.valid && !this.VendorForm.controls.address.pristine">
                        <span class="glyphicon glyphicon-remove" aria-hidden="true"></span>
                        invalid
                    </span>
                </div>
                <div class="form-group">
                    <input formControlName="postalCode" type="text" class="form-control" placeholder="Enter Postal Code" value="this.data.PostalCode" autofocus />
                    <span class="validator-label valid" *ngIf="this.VendorForm.controls.postalCode.valid">
                        <span class="glyphicon glyphicon-ok" aria-hidden="true"></span>
                        valid!
                    </span>
                    <span class="validator-label invalid" *ngIf="!this.VendorForm.controls.postalCode.valid && !this.VendorForm.controls.postalCode.pristine">
                        <span class="glyphicon glyphicon-remove" aria-hidden="true"></span>
                        invalid
                    </span>
                </div>
                <div class="form-group">
                    <input formControlName="city" type="text" class="form-control" placeholder="Enter city" value="this.data.City" autofocus />
                    <span class="validator-label valid" *ngIf="this.VendorForm.controls.city.valid">
                        <span class="glyphicon glyphicon-ok" aria-hidden="true"></span>
                        valid!
                    </span>
                    <span class="validator-label invalid" *ngIf="!this.VendorForm.controls.city.valid && !this.VendorForm.controls.city.pristine">
                        <span class="glyphicon glyphicon-remove" aria-hidden="true"></span>
                        invalid
                    </span>
                </div>
                <div class="form-group">
                    <input formControlName="country" type="text" class="form-control" placeholder="Enter country" value="this.data.Country" autofocus />
                    <span class="validator-label valid" *ngIf="this.VendorForm.controls.country.valid">
                        <span class="glyphicon glyphicon-ok" aria-hidden="true"></span>
                        valid!
                    </span>
                    <span class="validator-label invalid" *ngIf="!this.VendorForm.controls.country.valid && !this.VendorForm.controls.country.pristine">
                        <span class="glyphicon glyphicon-remove" aria-hidden="true"></span>
                        invalid
                    </span>
                </div>
                <div class="form-group">
                    <input formControlName="tel" type="text" class="form-control" placeholder="Enter telphone number" value="this.data.Tel" autofocus />
                    <span class="validator-label valid" *ngIf="this.VendorForm.controls.tel.valid">
                        <span class="glyphicon glyphicon-ok" aria-hidden="true"></span>
                        valid!
                    </span>
                    <span class="validator-label invalid" *ngIf="!this.VendorForm.controls.tel.valid && !this.VendorForm.controls.tel.pristine">
                        <span class="glyphicon glyphicon-remove" aria-hidden="true"></span>
                        invalid
                    </span>
                </div>
                <div class="form-group">
                    <input formControlName="fax" type="text" class="form-control" placeholder="Enter fax" value="this.data.Fax" autofocus />
                    <span class="validator-label valid" *ngIf="this.VendorForm.controls.fax.valid">
                        <span class="glyphicon glyphicon-ok" aria-hidden="true"></span>
                        valid!
                    </span>
                    <span class="validator-label invalid" *ngIf="!this.VendorForm.controls.fax.valid && !this.VendorForm.controls.fax.pristine">
                        <span class="glyphicon glyphicon-remove" aria-hidden="true"></span>
                        invalid
                    </span>
                </div>
                <div class="form-group">
                    <input formControlName="homepage" type="text" class="form-control" placeholder="Enter homepage" value="this.data.Homepage" autofocus />
                    <span class="validator-label valid" *ngIf="this.VendorForm.controls.homepage.valid">
                        <span class="glyphicon glyphicon-ok" aria-hidden="true"></span>
                        valid!
                    </span>
                    <span class="validator-label invalid" *ngIf="!this.VendorForm.controls.homepage.valid && !this.VendorForm.controls.homepage.pristine">
                        <span class="glyphicon glyphicon-remove" aria-hidden="true"></span>
                        invalid
                    </span>
                </div>
                <div class="form-group">
                    <input formControlName="paymentTerm" type="text" class="form-control" placeholder="Enter payment term" value="this.data.PaymentTerm" autofocus />
                    <span class="validator-label valid" *ngIf="this.VendorForm.controls.paymentTerm.valid">
                        <span class="glyphicon glyphicon-ok" aria-hidden="true"></span>
                        valid!
                    </span>
                    <span class="validator-label invalid" *ngIf="!this.VendorForm.controls.paymentTerm.valid && !this.VendorForm.controls.paymentTerm.pristine">
                        <span class="glyphicon glyphicon-remove" aria-hidden="true"></span>
                        invalid
                    </span>
                </div>
                <div class="form-group">
                    <input formControlName="deliveryTerm" type="text" class="form-control" placeholder="Enter delivery term" value="this.data.DeliveryTerm" autofocus />
                    <span class="validator-label valid" *ngIf="this.VendorForm.controls.deliveryTerm.valid">
                        <span class="glyphicon glyphicon-ok" aria-hidden="true"></span>
                        valid!
                    </span>
                    <span class="validator-label invalid" *ngIf="!this.VendorForm.controls.deliveryTerm.valid && !this.VendorForm.controls.deliveryTerm.pristine">
                        <span class="glyphicon glyphicon-remove" aria-hidden="true"></span>
                        invalid
                    </span>
                </div>
                <div class="form-group">
                    <select value="this.data.Type" class="form-control" style="width:332px" formControlName="type">
                        <option value="">Chose a type</option>
                        <option *ngFor="let type of types" value="{{type.Id}}">{{type.Name}}</option>
                    </select>
                    <span class="validator-label valid" *ngIf="this.VendorForm.controls.type.valid">
                        <span class="glyphicon glyphicon-ok" aria-hidden="true"></span>
                        valid!
                    </span>
                    <span class="validator-label invalid" *ngIf="!this.VendorForm.controls.type.valid && !this.VendorForm.controls.type.pristine">
                        <span class="glyphicon glyphicon-remove" aria-hidden="true"></span>
                        invalid
                    </span>
                </div>
                <div class="form-group">
                    <select value="this.data.ProductType" class="form-control" style="width:332px" formControlName="productType">
                        <option value="">Chose a product type</option>
                        <option *ngFor="let productType of productTypes" value="{{productType.Id}}">{{productType.Name}}</option>
                    </select>
                    <span class="validator-label valid" *ngIf="this.VendorForm.controls.productType.valid">
                        <span class="glyphicon glyphicon-ok" aria-hidden="true"></span>
                        valid!
                    </span>
                    <span class="validator-label invalid" *ngIf="!this.VendorForm.controls.productType.valid && !this.VendorForm.controls.productType.pristine">
                        <span class="glyphicon glyphicon-remove" aria-hidden="true"></span>
                        invalid
                    </span>
                </div>


                <div class="form-group">
                    Is Active? <input formControlName="isactive" type="checkbox" value="this.data.IsActive" autofocus />
                </div>
                <div class="form-group">
                    <input type="button" class="btn btn-primary btn-block" [disabled]="!VendorForm.valid" value="Add" (click)="onSubmit(this.VendorForm.value)" />
                </div>
            </form>
        </div>
    </div>
`,
    providers: [VendorService, FormBuilder, VendorTypeService, VendorProductTypeService]
})

export class VendorAddComponent {
    data: Vendor;
    title: string;
    VendorForm: FormGroup;
    errorMessage = null;
    types: VendorType[];
    productTypes: VendorProductType[];

    @ViewChild('errorDiv') errorDiv: ElementRef;

    constructor(
        private fb: FormBuilder,
        private vendorService: VendorService,
        private vendorTypeService: VendorTypeService,
        private vendorProductTypeService: VendorProductTypeService,
        private router: Router,
        private authService: AuthService,
        private activatedRoute: ActivatedRoute) {
    }

    ngOnInit() {
        if (!this.authService.isLoggedIn()) {
            this.router.navigate([""]);
        }

        this.VendorForm = this.fb.group(
            {
                username: ["", [
                    Validators.required
                ]],
                email: ["", [
                    Validators.required
                ]],
                searchName: ["", [
                    Validators.required
                ]],
                address: ["", [
                    Validators.required
                ]],
                postalCode: ["", [
                    Validators.required
                ]],
                city: ["", [
                    Validators.required
                ]],
                country: ["", [
                    Validators.required
                ]],
                tel: ["", [
                    Validators.required
                ]],
                fax: ["", [
                    Validators.required
                ]],
                homepage: ["", [
                    Validators.required
                ]],
                paymentTerm: ["", [
                    Validators.required
                ]],
                deliveryTerm: ["", [
                    Validators.required
                ]],
                type: ["", [
                    Validators.required
                ]],
                productType: ["", [
                    Validators.required
                ]],
                isactive: [true]
            }
        );

        this.vendorTypeService.getVendorTypeList().subscribe(items => this.types = items, error => this.errorMessage = <any>error);
        this.vendorProductTypeService.getVendorProductTypeList().subscribe(items => this.productTypes = items, error => this.errorMessage = <any>error);

        this.data = new Vendor("", null, null, null, false, "", "", "", "", "", "", "", "", "", "", "", "", "", "", false);
        this.title = "New Vendor";
    }

    ngAfterViewInit() {
        jQuery(this.errorDiv.nativeElement).hide();
    }

    ngOnDestroy() {
        this.vendorService.data = this.data;
    }

    onSubmit(data: any) {
        console.log(data);
        var vendor = new Vendor("", null, null, null, data.isactive, data.username, data.email, data.searchName, data.address, data.postalCode, data.city, data.country, data.tel, data.fax, data.homepage, data.paymentTerm, data.deliveryTerm, data.type, data.productType, false);
        console.log(vendor);
        this.vendorService.add(vendor).subscribe((data) => {
            if (data.error == null) {
                this.data = data;
                this.errorMessage = 'Vendor added successfully';
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
        this.router.navigate(["vendorlist"]);
    }


    displayMessage(message: string, status: boolean) {
        jQuery(this.errorDiv.nativeElement).removeClass();
        this.errorDiv.nativeElement.innerHTML = message;

        if (status) { jQuery(this.errorDiv.nativeElement).addClass("success-message"); }
        else { jQuery(this.errorDiv.nativeElement).addClass("error-message"); }

        jQuery(this.errorDiv.nativeElement).slideDown(1000).delay(6000).slideUp(1000);
    }
}