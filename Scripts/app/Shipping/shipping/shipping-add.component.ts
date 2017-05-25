import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, OnDestroy } from "@angular/core";
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { Router, ActivatedRoute } from "@angular/router";
import { Shipping } from "../../Shipping/shared/shipping.model";
import { ShippingService } from "../../Shipping/shared/shipping.service";
import { EndBuyerService } from "../../EndBuyer/shared/endbuyer.service";
import { EndBuyer } from "../../EndBuyer/shared/endbuyer.model";
import { Department } from "../../Department/shared/department.model";
import { DepartmentService } from "../../Department/shared/department.service";
import { Division } from "../../Division/shared/division.model";
import { DivisionService } from "../../Division/shared/division.service";
import { ShippingTypeService } from "../../ShippingType/shared/shippingtype.service";
import { ShippingType } from "../../ShippingType/shared/shippingtype.model";
import { Brand } from "../../Brand/shared/brand.model";
import { BrandService } from "../../Brand/shared/brand.service";
import { AuthService } from "../../auth.service";
import { GeneralSearchModel } from "../../Pagination/shared/generalsearch.model";
import { PaginationModel } from "../../Pagination/shared/pagination.model";
declare var jQuery: any;
@Component({
    selector: "shipping-add",
    template: `
<div class="error-message" #errorDiv></div>
<div *ngIf="data">
    <h2>
        <a href="javascript:void(0)" (click)="onBack()">
            &laquo; Back to Shipping List
        </a>
    </h2>
  <div class="user-container">    
    <form class="form-user" [formGroup]="shippingForm" >
        <h2 class="form-user-heading">{{title}}</h2>
          <input type="hidden" id="hdImage" value=""/>
           <div class="form-group">
            <input formControlName="name" type="text" class="form-control" placeholder="Enter shipping name" value="this.data.Name"  />
            <span class="validator-label valid" *ngIf="this.shippingForm.controls.name.valid">
                <span class="glyphicon glyphicon-ok" aria-hidden="true"></span>
                valid!
            </span>
            <span class="validator-label invalid" *ngIf="!this.shippingForm.controls.name.valid && !this.shippingForm.controls.name.pristine">
                <span class="glyphicon glyphicon-remove" aria-hidden="true"></span>
                invalid
            </span>
        </div>
        <div class="form-group">
            <input formControlName="buyercode" type="text" class="form-control" placeholder="Enter buyer code" value="this.data.BuyerCode" autofocus />            
        </div>     
        <div class="form-group">
            <select value="this.data.Brand" class="form-control" style="width:332px" formControlName="brand">
                 <option value="">Chose a brand</option>
                 <option *ngFor="let brand of brands" value="{{brand.Id}}">{{brand.Name}}</option>
            </select>
        </div>   
         <div class="form-group">
            <select value="this.data.Department" class="form-control input-medium" style="width:332px" formControlName="department">
                    <option value="">Chose a department</option>
                    <option *ngFor="let dept of depts" value="{{dept.Id}}">{{dept.Name}}</option>
            </select>
        </div>  
        <div class="form-group">
            <select value="this.data.Division" class="form-control input-medium" style="width:332px" formControlName="division">
                    <option value="">Chose a division</option>
              <option *ngFor="let division of divisions" value="{{division.Id}}">{{division.Name}}</option>
            </select>
        </div> 
        <div class="form-group">
            <select value="this.data.ShippingType" class="form-control input-medium" style="width:332px" formControlName="shippingtype">
                 <option value="">Chose a shipping type</option>
                 <option *ngFor="let type of shippingtypes" value="{{type.Id}}">{{type.Name}}</option>
            </select>
        </div> 
         <div class="form-group">
            <select value="this.data.EndBuyer" class="form-control input-medium" style="width:332px" formControlName="endbuyer">
                 <option value="">Chose an end buyer</option>             
                 <option *ngFor="let buyer of endbuyers" value="{{buyer.Id}}">{{buyer.Name}}</option>
            </select>
        </div> 
       <div class="form-group">
                    <input formControlName="address" type="text" class="form-control" placeholder="Enter address" value="this.data.Address" autofocus />            
                </div>   
 <div class="form-group">
                    <input formControlName="contact" type="text" class="form-control" placeholder="Enter contact" value="this.data.Contact" autofocus />            
                </div>   
 <div class="form-group">
                    <input formControlName="country" type="text" class="form-control" placeholder="Enter country" value="this.data.Country" autofocus />            
                </div>   
        <div class="form-group">
                    <input formControlName="regname" type="text" class="form-control" placeholder="Enter reg name" value="this.data.Regname" autofocus />            
                </div> 
<div class="form-group">
                    <input formControlName="searchname" type="text" class="form-control" placeholder="Enter search name" value="this.data.SearchName" autofocus />            
                </div>   
<div class="form-group">
                    <input formControlName="email" type="email" class="form-control" placeholder="Enter email" value="this.data.Email" autofocus />            
                </div>  
<div class="form-group">
                    <input formControlName="fax" type="text" class="form-control" placeholder="Enter fax" value="this.data.Fax" autofocus />            
                </div>
<div class="form-group">
                    <input formControlName="postalcode" type="text" class="form-control" placeholder="Enter postal code" value="this.data.PostalCode" autofocus />            
                </div>     
<div class="form-group">
                    <input formControlName="tel" type="tel" class="form-control" placeholder="Enter tel" value="this.data.Tel" autofocus />            
                </div>  
<div class="form-group">
                    <input formControlName="city" type="tel" class="form-control" placeholder="Enter city" value="this.data.City" autofocus />            
                </div>  
        <div class="form-group">
                    <input formControlName="remark" type="text" class="form-control" placeholder="Enter remark" value="this.data.Remark" autofocus />            
                </div> 
       <div class="form-group">       
                <input type="file" id="files" name="files" multiple />
                <input type="button" id="upload" (click)="fileChangeEvent()" value="Upload" />
                <img src="" alt="" height="42" width="42" id="imgPreview">
 <div class="alert alert-success" id="lblinFo">
                </div>
        </div> 
        <div class="form-group">
           Is Active? <input formControlName="isactive" type="checkbox" value="this.data.IsActive" autofocus />     
        </div>                   
        <div class="form-group">
            <input type="button" class="btn btn-primary btn-block" [disabled]="!shippingForm.valid" value="Add" (click)="onSubmit(this.shippingForm.value)" />
        </div>       
    </form>
  </div>
</div>
`,
    providers: [ShippingService, FormBuilder, ShippingTypeService, EndBuyerService, DepartmentService, BrandService, DivisionService]
})

export class ShippingAddComponent {

    data: Shipping;
    title: string;
    shippingForm: FormGroup;
    errorMessage = null;
    @ViewChild('errorDiv') errorDiv: ElementRef;
    shippingtypes: ShippingType[];
    endbuyers: EndBuyer[];
    depts: Department[];
    brands: Brand[];
    divisions: Division[];
    searchModel: GeneralSearchModel;
    paging: PaginationModel;
    constructor(
        private fb: FormBuilder,
        private shippingtypeService: ShippingTypeService,
        private endbuyerService: EndBuyerService,
        private divisionService: DivisionService,
        private deptServcie: DepartmentService,
        private brandService: BrandService,
        private shippingService: ShippingService,
        private router: Router,
        private authService: AuthService,
        private activatedRoute: ActivatedRoute) {
    }
    fileChangeEvent() {

        var fileUpload = jQuery("#files").get(0);
        var files = fileUpload.files;
        var data = new FormData();
        for (var i = 0; i < files.length; i++) {
            data.append(files[i].name, files[i]);
        }
        jQuery.ajax({
            type: "POST",
            url: "api/shipping/UploadImage",
            contentType: false,
            processData: false,
            data: data,
            success: function (data) {
                jQuery('#hdImage').val(data.UploadPath);
                jQuery('#imgPreview').attr("src", data.UploadPath);
                this.data.Image = data.UploadPath;
                jQuery('#lblinFo').append('File ' + data.FileName + ' size ' + data.Size + ' uploaded successfully');
            },
            error: function () {
                alert("There was error uploading files!");
            }
        });

    }
    ngOnInit() {
        if (!this.authService.isLoggedIn()) {
            this.router.navigate([""]);
        }

        this.shippingForm = this.fb.group(
        {
            code: [""],
            buyercode: [""],
            name: [
                "", [
                    Validators.required
                ]
            ],
            brand: [""],
            department: [""],
            remark: [""],
            division: [""],
            shippingtype: [""],
            endbuyer: [""],
            isactive: [true],
            regname: [""],
            searchname: [""],
            email: [""],
            fax: [""],
            tel: [""],
            city: [""],
            country: [""],
            postalcode: [""],
            contact: [""],
            address:[""]

            }
        );
        var pageall = new PaginationModel(10, 0, "Name", 0, [], 0);
        var getAll = new GeneralSearchModel("", "", "", "", pageall);

   
        this.paging = new PaginationModel(10, 1, "Name", 0, [], 0);
        this.searchModel = new GeneralSearchModel("", "", "", "", this.paging);
        this.shippingtypeService.getShippingTypeList(getAll).subscribe(items => this.shippingtypes = items, error => this.errorMessage = <any>error);
        this.endbuyerService.getEndBuyerList(getAll).subscribe(items => this.endbuyers = items, error => this.errorMessage = <any>error);
        this.brandService.getBrandList(this.searchModel).subscribe(items => this.brands = items, error => this.errorMessage = <any>error);
        this.deptServcie.getDepartmentList(this.searchModel).subscribe(items => this.depts = items, error => this.errorMessage = <any>error);
        this.divisionService.getDivisionList(this.searchModel).subscribe(items => this.divisions = items, error => this.errorMessage = <any>error);
       this.data = new Shipping("",false,"","","","","","",false,"","","","","","","","","","","","","");
        this.title = "New Shipping";
    }

    ngAfterViewInit() {
        jQuery(this.errorDiv.nativeElement).hide();
    }

    ngOnDestroy() {
        this.shippingService.data = this.data;
    }

    onSubmit(shippingData: any) {
        var newData = new Shipping("", shippingData.isactive, shippingData.name, shippingData.buyercode, shippingData.brand, shippingData.department, shippingData.division, jQuery("#hdImage").val(), false, shippingData.remark,shippingData.shippingtype,
shippingData.address,shippingData.regname,shippingData.searchname,shippingData.email,shippingData.endbuyer,shippingData.fax,shippingData.tel,shippingData.city,shippingData.country,shippingData.postalcode,shippingData.contact);
        this.shippingService.add(newData).subscribe((data) => {
            if (data.error == null) {
                this.data = data;
                this.errorMessage = 'Shipping added successfully';
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
        this.router.navigate(["shipping"]);
    }

    onUpdate(data: Shipping) {

    }

    displayMessage(message: string, status: boolean) {
        jQuery(this.errorDiv.nativeElement).removeClass();
        this.errorDiv.nativeElement.innerHTML = message;

        if (status) { jQuery(this.errorDiv.nativeElement).addClass("success-message"); }
        else { jQuery(this.errorDiv.nativeElement).addClass("error-message"); }

        jQuery(this.errorDiv.nativeElement).slideDown(1000).delay(6000).slideUp(1000);
    }
}