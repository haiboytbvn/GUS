import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from "@angular/core";
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { Router, ActivatedRoute } from "@angular/router";
import { Shipping } from "../../Shipping/shared/shipping.model";
import { ShippingService } from "../../Shipping/shared/shipping.service";
import { ShippingTypeService } from "../../ShippingType/shared/shippingtype.service";
import { ShippingType } from "../../ShippingType/shared/shippingtype.model";
import { EndBuyerService } from "../../EndBuyer/shared/endbuyer.service";
import { EndBuyer } from "../../EndBuyer/shared/endbuyer.model";
import { Department } from "../../Department/shared/department.model";
import { DepartmentService } from "../../Department/shared/department.service";
import { Division } from "../../Division/shared/division.model";
import { DivisionService } from "../../Division/shared/division.service";
import { Brand } from "../../Brand/shared/brand.model";
import { BrandService } from "../../Brand/shared/brand.service";
import { AuthService } from "../../auth.service";
import { SearchGeneralFilter } from "../../SearchGeneralFilter/shared/searchGeneralFilter.model";
import { GeneralSearchModel } from "../../Pagination/shared/generalsearch.model";
import { PaginationModel } from "../../Pagination/shared/pagination.model";
declare var jQuery: any;

@Component({
    selector: "shipping-edit",
    template: `
<div class="error-message" #errorDiv></div>
<div>
    <h2>
        <a href="javascript:void(0)" (click)="onBack()">
            &laquo; Back to Shipping List
        </a>
    </h2>
  <div class="user-container">    
    <form class="form-user" #shippingForm="ngForm" *ngIf="data"  >
        <h2 class="form-user-heading">{{title}}</h2>
        <div class="form-group">
            <input type="hidden" value="{{this.data.Image}}" id="hdImagepath"/>
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
            <input name="input-buyercode" type="text" class="form-control" placeholder="Enter buyer code" [(ngModel)]="data.BuyerCode" #buyercode="ngModel" autofocus required (ngModelChange)="isFormChanged($event)"  />         
        </div>      
        <div class="form-group">
            <select name="input-brand" class="form-control" style="width:332px" [(ngModel)]="data.Brand" #brand="ngModel" (ngModelChange)="isFormChanged($event)">
                 <option value="">Chose a brand</option>
                 <option *ngFor="let brand of brands" value="{{brand.Id}}">{{brand.Name}}</option>
            </select>
        </div>   
        <div class="form-group">
            <select name="input-department" class="form-control" style="width:332px" [(ngModel)]="data.Department" #department="ngModel" (ngModelChange)="isFormChanged($event)">
                 <option value="">Chose a department</option>
                    <option *ngFor="let dept of depts" value="{{dept.Id}}">{{dept.Name}}</option>
            </select>
        </div>   
         <div class="form-group">
            <select name="input-division" class="form-control" style="width:332px" [(ngModel)]="data.Division" #division="ngModel" (ngModelChange)="isFormChanged($event)">
                  <option value="">Chose a division</option>
              <option *ngFor="let division of divisions" value="{{division.Id}}">{{division.Name}}</option>
            </select>
        </div>
        <div class="form-group">
            <select name="input-shippingtype" class="form-control" style="width:332px" [(ngModel)]="data.ShippingType" #shippingtype="ngModel" (ngModelChange)="isFormChanged($event)">
                  <option value="">Chose a shipping type</option>
              <option *ngFor="let type of shippingtypes" value="{{type.Id}}">{{type.Name}}</option>
            </select>
        </div>
         <div class="form-group">
            <select name="input-endbuyer" class="form-control" style="width:332px" [(ngModel)]="data.EndBuyer" #endbuyer="ngModel" (ngModelChange)="isFormChanged($event)">
                  <option value="">Chose a endbuyer</option>
              <option *ngFor="let buyer of endbuyers" value="{{buyer.Id}}">{{buyer.Name}}</option>
            </select>
        </div>      
        <div class="form-group">
            <input name="input-address" type="text" class="form-control" placeholder="Enter address" [(ngModel)]="data.Address" #address="ngModel" autofocus required (ngModelChange)="isFormChanged($event)"  />         
        </div> 
  <div class="form-group">
            <input name="input-contact" type="text" class="form-control" placeholder="Enter contact" [(ngModel)]="data.Contact" #contact="ngModel" autofocus required (ngModelChange)="isFormChanged($event)"  />         
        </div> 
  <div class="form-group">
            <input name="input-country" type="text" class="form-control" placeholder="Enter country" [(ngModel)]="data.Country" #country="ngModel" autofocus required (ngModelChange)="isFormChanged($event)"  />         
        </div> 
        <div class="form-group">
            <input name="input-regname" type="text" class="form-control" placeholder="Enter reg name" [(ngModel)]="data.RegName" #regname="ngModel" autofocus required (ngModelChange)="isFormChanged($event)"  />         
        </div> 
<div class="form-group">
            <input name="input-searchname" type="text" class="form-control" placeholder="Enter search name" [(ngModel)]="data.SearchName" #searchname="ngModel" autofocus required (ngModelChange)="isFormChanged($event)"  />         
        </div> 
<div class="form-group">
            <input name="input-email" type="email" class="form-control" placeholder="Enter email" [(ngModel)]="data.Email" #email="ngModel" autofocus required (ngModelChange)="isFormChanged($event)"  />         
        </div> 
<div class="form-group">
            <input name="input-fax" type="text" class="form-control" placeholder="Enter fax" [(ngModel)]="data.Fax" #fax="ngModel" autofocus required (ngModelChange)="isFormChanged($event)"  />         
        </div> 
<div class="form-group">
            <input name="input-postalcode" type="text" class="form-control" placeholder="Enter postal code" [(ngModel)]="data.PostalCode" #postalcode="ngModel" autofocus required (ngModelChange)="isFormChanged($event)"  />         
        </div> 
<div class="form-group">
            <input name="input-tel" type="tel" class="form-control" placeholder="Enter tel" [(ngModel)]="data.Tel" #tel="ngModel" autofocus required (ngModelChange)="isFormChanged($event)"  />         
        </div>
<div class="form-group">
            <input name="input-city" type="text" class="form-control" placeholder="Enter city" [(ngModel)]="data.City" #city="ngModel" autofocus required (ngModelChange)="isFormChanged($event)"  />         
        </div> 
 <div class="form-group">
            <input name="input-remark" type="text" class="form-control" placeholder="Enter type" [(ngModel)]="data.Remark" #remark="ngModel" autofocus required (ngModelChange)="isFormChanged($event)"  />         
        </div> 
         <div class="form-group">
         
                <input type="file" id="files" name="files" multiple />
                <input type="button" id="upload" (click)="fileChangeEvent()" value="Upload" />
                <img src="{{this.data.Image}}" alt="" height="42" width="42" id="imgPreview">
<div class="alert alert-success" id="lblinFo">
                </div>
        </div> 
        <div class="form-group">
           Is Active? <input name="input-isActive" type="checkbox" [(ngModel)]="data.IsActive" #isActive="ngModel" autofocus required (ngModelChange)="isFormChanged($event)"/>           
        </div>             
        <div class="form-group">
            <input type="button" class="btn btn-primary btn-block" [disabled]="!shippingForm.valid || !isFormValuesChanged" value="Update" (click)="onUpdate(data)" /><br/>
            <input type="button" class="btn btn-danger btn-block" [disabled]="!shippingForm.valid" value="Delete" (click)="deleteConfirm()" />             
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
    providers: [ShippingService, FormBuilder, ShippingTypeService, EndBuyerService, DepartmentService, BrandService, DivisionService]
})

export class ShippingEditComponent {
    data: Shipping;
    title = "Edit Shipping";
    shippingForm: FormGroup;
    errorMessage = null;
    @ViewChild('errorDiv') errorDiv: ElementRef;
    isDelete = false;
    isFormValuesChanged = false;
    oldData: Shipping;
    endbuyers: EndBuyer[];
    shippingtypes: ShippingType[];
    depts: Department[];
    brands: Brand[];
    divisions: Division[];
    searchModel: GeneralSearchModel;
    paging: PaginationModel;
    constructor(
        private fb: FormBuilder,
        private shippingService: ShippingService,
        private shippingtypeService: ShippingTypeService,
        private endbuyerService: EndBuyerService,
        private divisionService: DivisionService,
        private deptServcie: DepartmentService,
        private brandService: BrandService,
        private router: Router,
        private authService: AuthService,
        private activatedRoute: ActivatedRoute) {
    }

    ngOnInit() {
        if (!this.authService.isLoggedIn()) {
            this.router.navigate([""]);
        }

        var id =  this.activatedRoute.snapshot.params["id"];
        if (id) {
            this.shippingService.get(id).subscribe((data) => {
                this.data = data;
            });
        }
        else {
            this.router.navigate(["shipping/add"]);
        }
        var pageall = new PaginationModel(10, 0, "Name", 0, [], 0);
        var getAll = new GeneralSearchModel("", "", "", "", pageall);
        var searchGeneralFilter = new SearchGeneralFilter("", "", "", "");
        this.paging = new PaginationModel(10, 1, "Name", 0, [], 0);
        this.searchModel = new GeneralSearchModel("", "", "", "", this.paging);
        this.shippingtypeService.getShippingTypeList(getAll).subscribe(items => this.shippingtypes = items, error => this.errorMessage = <any>error);
        this.endbuyerService.getEndBuyerList(getAll).subscribe(items => this.endbuyers = items, error => this.errorMessage = <any>error);
        this.brandService.getBrandList(this.searchModel).subscribe(items => this.brands = items, error => this.errorMessage = <any>error);
        this.deptServcie.getDepartmentList(this.searchModel).subscribe(items => this.depts = items, error => this.errorMessage = <any>error);
        this.divisionService.getDivisionList(this.searchModel).subscribe(items => this.divisions = items, error => this.errorMessage = <any>error);


   
    }

    ngAfterViewInit() {
        jQuery(this.errorDiv.nativeElement).hide();
    }
    fileChangeEvent() {
        this.isFormValuesChanged = true;
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
                jQuery('#hdImagepath').val(data.UploadPath);
                jQuery('#imgPreview').attr("src", data.UploadPath);
                this.data.Image = data.UploadPath;
                jQuery('#lblinFo').append('File ' + data.FileName + ' size ' + data.Size + ' uploaded successfully');
            },
            error: function () {
                alert("There was error uploading files!");
            }
        });

    }
    onUpdate(data: Shipping) {
        data.Image = jQuery('#hdImagepath').val();
        this.shippingService.update(data).subscribe((data) => {
            if (data.error == null) {
                this.data = data;
                this.errorMessage = 'Shipping details updated successfully';
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

    onDelete(data: Shipping) {
        this.shippingService.delete(data.Id).subscribe((data) => {
            if (data.error == null) {
                this.router.navigate(["shipping"]);
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
        this.router.navigate(["shipping"]);
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
        this.shippingService.get(this.data.Id).subscribe((oldData) => {
            this.isFormDataChanged(oldData);
        });
    }

    isFormDataChanged(oldData: Shipping) {
        if (JSON.stringify(this.data) === JSON.stringify(oldData))
            this.isFormValuesChanged = false;
        else
            this.isFormValuesChanged = true;
    }
}