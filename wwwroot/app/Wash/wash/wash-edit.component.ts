import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from "@angular/core";
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { Router, ActivatedRoute } from "@angular/router";
import { Wash } from "../../Wash/shared/wash.model";
import { WashService } from "../../Wash/shared/wash.service";

import { WashCategory } from "../../WashCategory/shared/washcategory.model";
import { WashCategoryService } from "../../WashCategory/shared/washcategory.service";

import { WashProductName } from "../../WashProductName/shared/washproductname.model";
import { WashProductNameService } from "../../WashProductName/shared/washproductname.service";

import { Color } from "../../Color/shared/color.model";
import { ColorService } from "../../Color/shared/color.service";
import { ColorSearchModel } from "../../Color/shared/color-search.model";

import { WashType } from "../../WashType/shared/washtype.model";
import { WashTypeService } from "../../WashType/shared/washtype.service";


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
    selector: "wash-edit",
    templateUrl: "app/Wash/wash/wash-edit.component.html",
    providers: [WashService, FormBuilder, WashCategoryService, WashProductNameService, BrandService, WashTypeService, DepartmentService, DivisionService, ColorService]
})

export class WashEditComponent {
    data: Wash;
    title = "Edit Wash";
    washForm: FormGroup;
    errorMessage = null;
    isDelete = false;
    isFormValuesChanged = false;
    oldData: Wash;
    categories: WashCategory[];
    productnames: WashProductName[];
    types: WashType[];
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
        private washService: WashService,
        private categoryService: WashCategoryService,
        private productnameService: WashProductNameService,
        private acctypeService: WashTypeService,
        private brandService: BrandService,
        private deptService: DepartmentService,
        private divisionService: DivisionService,
        private colorService: ColorService,
        private router: Router,
        private authService: AuthService,
        private activatedRoute: ActivatedRoute) {
    }
    changeType(id: string) {
        this.categoryService.getWashCateogryListByType(id).subscribe(items => this.categories = items, error => this.errorMessage = <any>error);
    }
    changeCategory(id: string) {
        if (id === "") {

            this.disableProductName = true;
        } else {
            this.disableProductName = false;
            this.productnameService.getWashProductNameByCategory(id).subscribe(items => this.productnames = items, error => this.errorMessage = <any>error);
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
            url: "api/wash/UploadImage",
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
                    appendstring += "<li><a href=\"javascript:void(0);\" [(click)]=\"changeImage(" + data[i].UploadPath + ")\"><img src=\"" + data[i].UploadPath + "\" alt=\"wash image\"></a></li>"
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

        var id = this.activatedRoute.snapshot.params["id"];
        if (id) {
            this.washService.get(id).subscribe((data) => {
                this.data = data;
            });
        }
        else {
            this.router.navigate(["wash/add"]);
        }
        this.paging = new PaginationModel(10, 1, "Name", 0, [], 0);
        this.searchModel = new GeneralSearchModel("", "", "", "", this.paging);
        var pageall = new PaginationModel(10, 0, "Name", 0, [], 0);
        var getAll = new GeneralSearchModel("", "", "", "", pageall);
        this.categoryService.getWashCategoryList(getAll).subscribe(items => this.categories = items.Data, error => this.errorMessage = <any>error);
        this.productnameService.getWashProductNameList(getAll).subscribe(items => this.productnames = items.Data, error => this.errorMessage = <any>error);
        this.acctypeService.getWashTypeList(getAll).subscribe(items => this.types = items.Data, error => this.errorMessage = <any>error);
        this.brandService.getBrandList(getAll).subscribe(items => this.brands = items.Data, error => this.errorMessage = <any>error);
        this.deptService.getDepartmentList(getAll).subscribe(items => this.departments = items.Data, error => this.errorMessage = <any>error);
        this.divisionService.getDivisionList(getAll).subscribe(items => this.divisions = items.Data, error => this.errorMessage = <any>error);
        this.colorService.getColorList(getAll).subscribe(items => this.colors = items.Data, error => this.errorMessage = <any>error);
        this.title = "Edit Wash";
        this.iseditting = false;
        this.buttonvalue = "Edit";
    }

    onUpdate(data: Wash) {

        if (this.iseditting) {
            data.Image = jQuery('#hdImagepath').val();
            this.washService.update(data).subscribe((data) => {
                if (data.error == null) {
                    this.data = data;
                    alert('Wash details updated successfully');
                    this.router.navigate(["/wash"]);

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
        this.washService.get(this.data.Id).subscribe((oldData) => {
            this.isFormDataChanged(oldData);
        });
    }
    changeImage(path: string) {
        jQuery('#imgPreview').prop("src", path);
    }
    isFormDataChanged(oldData: Wash) {
        console.log(this.data);
        console.log(oldData);
        if (JSON.stringify(this.data) === JSON.stringify(oldData))
            this.isFormValuesChanged = false;
        else
            this.isFormValuesChanged = true;
    }
}