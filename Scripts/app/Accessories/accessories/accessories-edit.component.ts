import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from "@angular/core";
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
import { SearchGeneralFilter } from "../../SearchGeneralFilter/shared/searchGeneralFilter.model";
import { GeneralSearchModel } from "../../Pagination/shared/generalsearch.model";
import { PaginationModel } from "../../Pagination/shared/pagination.model";
declare var jQuery: any;

@Component({
    selector: "accessories-edit",
    templateUrl: "app/Accessories/accessories/accessories-edit.component.html",
    providers: [AccessoryService, FormBuilder, AccessoryCategoryService, AccessoryProductNameService, BrandService, AccessoryTypeService, DepartmentService, DivisionService, ColorService]
})

export class AccessoriesEditComponent {
    data: Accessory;
    title = "Edit Accessories";
    accessoriesForm: FormGroup;
    errorMessage = null;
    isDelete = false;
    isFormValuesChanged = false;
    oldData: Accessory;
    categories: AccessoryCategory[];
    productnames: AccessoryProductName[];
    types: AccessoryType[];
    brands: Brand[];
    departments: Department[];
    divisions: Division[];

    colors: Color[];
    searchModel: GeneralSearchModel;
    paging: PaginationModel;
    iseditting: boolean;
    buttonvalue: string;
    disableProductName: boolean;
    disableCategory: boolean;
    constructor(
        private fb: FormBuilder,
        private accessoriesService: AccessoryService,
        private categoryService: AccessoryCategoryService,
        private productnameService: AccessoryProductNameService,
        private acctypeService: AccessoryTypeService,
        private brandService: BrandService,
        private deptService: DepartmentService,
        private divisionService: DivisionService,
        private colorService: ColorService,
        private router: Router,
        private authService: AuthService,
        private activatedRoute: ActivatedRoute) {
    }
    changeType(id: string) {
        this.categoryService.getAccCateogryListByType(id).subscribe(items => this.categories = items, error => this.errorMessage = <any>error);
    }
    changeCategory(id: string) {
        if (id === "") {

            this.disableProductName = true;
        } else {
            this.disableProductName = false;
            this.productnameService.GetAccProductNameByCategory(id).subscribe(items => this.productnames = items, error => this.errorMessage = <any>error);
        }

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
    ngOnInit() {
        if (!this.authService.isLoggedIn()) {
            this.router.navigate([""]);
        }
        this.disableCategory = true;
        this.disableProductName = true;
        var id = this.activatedRoute.snapshot.params["id"];
        if (id) {
            this.accessoriesService.get(id).subscribe((data) => {
                this.data = data;
            });
        }
        else {
            this.router.navigate(["accessories/add"]);
        }
        this.paging = new PaginationModel(10, 1, "Name", 0, [], 0);
        this.searchModel = new GeneralSearchModel("", "", "", "", this.paging);
        var pageall = new PaginationModel(10, 0, "Name", 0, [], 0);
        var getAll = new GeneralSearchModel("", "", "", "", pageall);
        this.categoryService.getAccessoryCategoryList(getAll).subscribe(items => this.categories = items.Data, error => this.errorMessage = <any>error);
        this.productnameService.getAccessoryProductNameList(getAll).subscribe(items => this.productnames = items.Data, error => this.errorMessage = <any>error);
        this.acctypeService.getAccessoryTypeList(getAll).subscribe(items => this.types = items.Data, error => this.errorMessage = <any>error);
        this.brandService.getBrandList(getAll).subscribe(items => this.brands = items.Data, error => this.errorMessage = <any>error);
        this.deptService.getDepartmentList(getAll).subscribe(items => this.departments = items.Data, error => this.errorMessage = <any>error);
        this.divisionService.getDivisionList(getAll).subscribe(items => this.divisions = items.Data, error => this.errorMessage = <any>error);
        this.colorService.getColorList(getAll).subscribe(items => this.colors = items.Data, error => this.errorMessage = <any>error);
        this.title = "Edit Accessories";
        this.iseditting = false;
        this.buttonvalue = "Edit";
    }
  
    onUpdate(data: Accessory) {

        if (this.iseditting) {
            data.Image = jQuery('#hdImagepath').val();
            this.accessoriesService.update(data).subscribe((data) => {
                    if (data.error == null) {
                        this.data = data;
                        alert('Accessorie details updated successfully');
                        this.router.navigate(["/accessories"]);
                    } else {
                        // update failure
                        this.errorMessage = data.error;
                        alert(this.errorMessage);
                    }
                },
                (error) => {
                    this.errorMessage = error;

                }
            );
        } else {
            this.buttonvalue = "Save";
            this.iseditting = true;
        }
    }

    isFormChanged(value) {
        this.accessoriesService.get(this.data.Id).subscribe((oldData) => {
            this.isFormDataChanged(oldData);
        });
    }
    changeImage(path: string) {
        jQuery('#imgPreview').prop("src", path);
    }
    isFormDataChanged(oldData: Accessory) {
        console.log(this.data);
        console.log(oldData);
        if (JSON.stringify(this.data) === JSON.stringify(oldData))
            this.isFormValuesChanged = false;
        else
            this.isFormValuesChanged = true;
    }
}