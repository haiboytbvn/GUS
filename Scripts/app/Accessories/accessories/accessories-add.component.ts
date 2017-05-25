import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, OnDestroy } from "@angular/core";
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { Router, ActivatedRoute } from "@angular/router";
import { Accessory } from "../../Accessories/shared/accessories.model";
import { AccessoryService } from "../../Accessories/shared/accessories.service";

import { AccessoryCategory } from "../../AccessoryCategory/shared/accessorycategory.model";
import { AccessoryCategoryService } from "../../AccessoryCategory/shared/accessorycategory.service";

import { AccessoryProductName } from "../../AccessoryProductName/shared/accessoryproductname.model";
import { AccessoryProductNameService } from "../../AccessoryProductName/shared/accessoryproductname.service";

import { Color } from "../../Color/shared/color.model";
import { ColorService } from "../../Color/shared/color.service";
import { ColorSearchModel } from "../../Color/shared/color-search.model"; 

import { AccessoryType } from "../../AccessoryType/shared/accessorytype.model";
import { AccessoryTypeService } from "../../AccessoryType/shared/accessorytype.service";

import { Department } from "../../Department/shared/department.model";
import { DepartmentService } from "../../Department/shared/department.service";
import { Division } from "../../Division/shared/division.model";
import { DivisionService } from "../../Division/shared/division.service";
import { Brand } from "../../Brand/shared/brand.model";
import { BrandService } from "../../Brand/shared/brand.service";
import { AuthService } from "../../auth.service";
import { GeneralSearchModel } from "../../Pagination/shared/generalsearch.model";
import { PaginationModel } from "../../Pagination/shared/pagination.model";
declare var jQuery: any;

@Component({
    selector: "accessories-add",
    templateUrl:'app/Accessories/accessories/accessories-add.component.html',
    providers: [AccessoryService, FormBuilder, AccessoryCategoryService, AccessoryProductNameService, BrandService, AccessoryTypeService, DepartmentService, DivisionService, ColorService]
})

export class AccessoriesAddComponent {
    data: Accessory;
    title: string;
    accessoriesForm: FormGroup;
    errorMessage = null;
    @ViewChild('errorDiv') errorDiv: ElementRef;
    categories: AccessoryCategory[];
    productnames: AccessoryProductName[];
    types: AccessoryType[];
    brands: Brand[];
    departments: Department[];
    divisions: Division[];
    colors: Color[];
    disableProductName: boolean;
    disableCategory: boolean;
    listimages: string[];
    mainimage: string;

    constructor(
        private fb: FormBuilder,
        private accessoriesService: AccessoryService,
        private categoryService: AccessoryCategoryService,
        private accproductnameService: AccessoryProductNameService,
        private acctypeService: AccessoryTypeService,
        private brandService: BrandService,
        private deptService: DepartmentService,
        private divisionService: DivisionService,
        private colorService:ColorService,
        private router: Router,
        private authService: AuthService,
        private activatedRoute: ActivatedRoute) {
    }
    changeType(id: string) {
        if (id === "") {

            this.disableCategory = true;
            this.disableProductName = true;
        } else {

            this.disableCategory = false;
            this.categoryService.getAccCateogryListByType(id).subscribe(items => this.categories = items, error => this.errorMessage = <any>error);
        }       
       
       
    }
    changeCategory(id: string) {
        if (id === "") {

            this.disableProductName = true;
        } else {
            this.disableProductName = false;
            this.accproductnameService.GetAccProductNameByCategory(id).subscribe(items => this.productnames = items, error => this.errorMessage = <any>error);
        }
        
    }
    doUpload() {
        jQuery("#files").trigger("click");
    }
    ngOnInit() {
        if (!this.authService.isLoggedIn()) {
            this.router.navigate([""]);
        }
        this.disableCategory = true;
        this.disableProductName = true;

        this.listimages = [];
        this.mainimage = "";
        this.accessoriesForm = this.fb.group(
            {            
                buyercode: [""],
                isactive:[true],
                acccategory: ["", [Validators.required]],
                productname: ["", [Validators.required]],
                acctype: ["", [Validators.required]],
                itemsize:[""],
                supplier: [""],
                suppliercode: [""],
                brand: ["", [Validators.required]],
                division: ["", [Validators.required]],
                remark:[""],
                department: ["", [Validators.required]],
                color: ["", [Validators.required]],
                description:[""]

                          
            }
        );
        var pageall = new PaginationModel(10, 0, "Name", 0, [], 0);
        var getAll = new GeneralSearchModel("", "", "", "", pageall);

        this.categoryService.getAccessoryCategoryList(getAll).subscribe(items => this.categories = items.Data, error => this.errorMessage = <any>error);
        this.accproductnameService.getAccessoryProductNameList(getAll).subscribe(items => this.productnames = items.Data, error => this.errorMessage = <any>error);
        this.acctypeService.getAccessoryTypeList(getAll).subscribe(items => this.types = items.Data, error => this.errorMessage = <any>error);
        this.brandService.getBrandList(getAll).subscribe(items => this.brands = items.Data, error => this.errorMessage = <any>error);
        this.deptService.getDepartmentList(getAll).subscribe(items => this.departments = items.Data, error => this.errorMessage = <any>error);
        this.divisionService.getDivisionList(getAll).subscribe(items => this.divisions = items.Data, error => this.errorMessage = <any>error);
        this.colorService.getColorList(getAll).subscribe(items => this.colors = items.Data, error => this.errorMessage = <any>error);
        this.data = new Accessory("", false, "","", "", "", "", "", "", "", "", "", "", "", "", "",[],"");
        this.title = "New Accessories";
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
            url: "api/accessory/UploadImage",
            contentType: false,
            processData: false,
            data: data,
            success: function (data) {
                jQuery('#imgPreview').prop("src", data[0].UploadPath);
                this.mainimage = data[0].UploadPath;
                var imagepath = "";
                var appendstring = "";
                for (var i = 0; i < data.length; i++) {
                    
                    imagepath += data[i].UploadPath + "|";
                    appendstring += "<li><a href=\"javascript:void(0);\" [(click)]=\"changeImage(" + data[i].UploadPath + ")\"><img src=\"" + data[i].UploadPath + "\" alt=\"accessory image\"></a></li>"
                   // this.listimages.push(data[i].UploadPath);
                }
                jQuery('#hdImage').val(imagepath);
                jQuery('#imagecontainer').html('');
                jQuery('#imagecontainer').html(appendstring);
                this.data.Image = imagepath;
            },
            error: function () {
                alert("There was error uploading files!");
            }
        });

    }
    changeImage(path: string) {
        alert(path);
    }
    onSubmit(data: any) {
        console.log(data);
        var newData = new Accessory("", data.isactive, data.buyercode, data.acctype, data.acccategory, data.description, data.brand, data.department, data.division, data.itemsize, data.supplier, data.suppliercode, jQuery('#hdImage').val(),data.color,data.remark,data.productname,[],"")
        this.accessoriesService.add(newData).subscribe((data) => {
                if (data.error == null) {
                    this.data = data;
                    alert("Added successfully!");
                    this.router.navigate(["/accessories"]);
                }
                else {
                    // update failure
                    this.errorMessage = data.error;
                    alert(this.errorMessage);
                }
            },
                (error) => {
                    this.errorMessage = error;

                }
            );
       
    }

   

   
}