import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, OnDestroy } from "@angular/core";
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import 'rxjs/Rx';
import { AuthHttp } from "../../auth.http";
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
import { GeneralSearchModel } from "../../Pagination/shared/generalsearch.model";
import { PaginationModel } from "../../Pagination/shared/pagination.model";
import { ImageListModel } from "../../FileUpload/shared/imagelist.model";
declare var jQuery: any;

@Component({
    selector: "wash-add",
    templateUrl: 'app/Wash/wash/wash-add.component.html',
    providers: [WashService, FormBuilder, WashCategoryService, WashProductNameService, BrandService, WashTypeService, DepartmentService, DivisionService, ColorService]
})

export class WashAddComponent {
    data: Wash;
    title: string;
    washForm: FormGroup;
    errorMessage = null;
    @ViewChild('errorDiv') errorDiv: ElementRef;
    categories: WashCategory[];
    productnames: WashProductName[];
    types: WashType[];
    brands: Brand[];
    departments: Department[];
    divisions: Division[];
    colors: Color[];
    disableProductName: boolean;
    disableCategory: boolean;
    imageList: ImageListModel;
    constructor(
        private fb: FormBuilder,
        private washService: WashService,
        private categoryService: WashCategoryService,
        private accproductnameService: WashProductNameService,
        private washtypeService: WashTypeService,
        private brandService: BrandService,
        private deptService: DepartmentService,
        private divisionService: DivisionService,
        private colorService: ColorService,
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
            this.categoryService.getWashCateogryListByType(id).subscribe(items => this.categories = items, error => this.errorMessage = <any>error);
        }


    }
    changeCategory(id: string) {
        if (id === "") {

            this.disableProductName = true;
        } else {
            this.disableProductName = false;
            this.accproductnameService.getWashProductNameByCategory(id).subscribe(items => this.productnames = items, error => this.errorMessage = <any>error);
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
        this.washForm = this.fb.group(
            {
                buyercode: [""],
                isactive: [true],
                washcategory: ["", [Validators.required]],
                washproductname: ["", [Validators.required]],
                washtype: ["", [Validators.required]],
                recipe: [""],
                supplier: [""],
                suppliercode: [""],
                brand: ["", [Validators.required]],
                division: ["", [Validators.required]],
                remark: [""],
                department: ["", [Validators.required]],
                color: ["", [Validators.required]],
                description: [""]


            }
        );
        var pageall = new PaginationModel(10, 0, "Name", 0, [], 0);
        var getAll = new GeneralSearchModel("", "", "", "", pageall);

        this.categoryService.getWashCategoryList(getAll).subscribe(items => this.categories = items.Data, error => this.errorMessage = <any>error);
        this.accproductnameService.getWashProductNameList(getAll).subscribe(items => this.productnames = items.Data, error => this.errorMessage = <any>error);
        this.washtypeService.getWashTypeList(getAll).subscribe(items => this.types = items.Data, error => this.errorMessage = <any>error);
        this.brandService.getBrandList(getAll).subscribe(items => this.brands = items.Data, error => this.errorMessage = <any>error);
        this.deptService.getDepartmentList(getAll).subscribe(items => this.departments = items.Data, error => this.errorMessage = <any>error);
        this.divisionService.getDivisionList(getAll).subscribe(items => this.divisions = items.Data, error => this.errorMessage = <any>error);
        this.colorService.getColorList(getAll).subscribe(items => this.colors = items.Data, error => this.errorMessage = <any>error);
        this.data = new Wash("", false, "", "", "", "", "", "", "", "", "", "", "", "", "", "",[],"");
        this.title = "New Wash";
    }

     
    fileChangeEvent(fileInput: any) {
       // UPLOAD BY ANGULAR 2

        let FileList: FileList = fileInput.target.files;
        let formData: FormData = new FormData();
        if (FileList.length > 5 || (this.imageList !==undefined && this.imageList.Images.length + FileList.length > 5)) {
            alert("Files number cannot exceed 5!");
            return;
        }
        for (let i = 0, length = FileList.length; i < length; i++) {
            formData.append('uploadFile' + i, FileList[i], FileList[i].name);
        }
        
        this.washService.upload(formData).subscribe(items => this.imageList = items, error => this.errorMessage = <any>error);   
        
    }
    changeImage(path: string) {
        this.imageList.MainImage = path;
    }
    onSubmit(data: any) {
        //get images
        var imagestring = "";
        for (let i = 0; i < this.imageList.Images.length; i++) {
            imagestring += this.imageList.Images[i].UploadPath + "|";
        }
       
        var newData = new Wash("", data.isactive, data.buyercode, data.washcategory, data.washproductname, data.washtype, data.description, data.brand, data.department, data.division, data.color
            , data.supplier, data.suppliercode, data.recipe, data.remark, imagestring,[],"")
        this.washService.add(newData).subscribe((data) => {
            if (data.error == null) {
                this.data = data;
                alert("Added successfully!");
                this.router.navigate(["/wash"]);
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