import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, OnDestroy } from "@angular/core";
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { Router, ActivatedRoute } from "@angular/router";
import { Graphic } from "../../Graphic/shared/graphic.model";
import { GraphicService } from "../../Graphic/shared/graphic.service";

import { GraphicCategory } from "../../GraphicCategory/shared/graphiccategory.model";
import { GraphicCategoryService } from "../../GraphicCategory/shared/graphiccategory.service";

import { GraphicProductName } from "../../GraphicProductName/shared/graphicproductname.model";
import { GraphicProductNameService } from "../../GraphicProductName/shared/graphicproductname.service";

import { Color } from "../../Color/shared/color.model";
import { ColorService } from "../../Color/shared/color.service";
import { ColorSearchModel } from "../../Color/shared/color-search.model";

import { GraphicType } from "../../GraphicType/shared/graphictype.model";
import { GraphicTypeService } from "../../GraphicType/shared/graphictype.service";

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
    selector: "graphic-add",
    templateUrl: 'app/Graphic/graphic/graphic-add.component.html',
    providers: [GraphicService, FormBuilder, GraphicCategoryService, GraphicProductNameService, BrandService, GraphicTypeService, DepartmentService, DivisionService, ColorService]
})

export class GraphicAddComponent {
    data: Graphic;
    title: string;
    graphicForm: FormGroup;
    errorMessage = null;
    @ViewChild('errorDiv') errorDiv: ElementRef;
    categories: GraphicCategory[];
    productnames: GraphicProductName[];
    types: GraphicType[];
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
        private graphicService: GraphicService,
        private categoryService: GraphicCategoryService,
        private graphicproductnameService: GraphicProductNameService,
        private acctypeService: GraphicTypeService,
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
            this.categoryService.getGraphicCategoryListByType(id).subscribe(items => this.categories = items, error => this.errorMessage = <any>error);
        }


    }
    changeCategory(id: string) {
        if (id === "") {

            this.disableProductName = true;
        } else {
            this.disableProductName = false;
            this.graphicproductnameService.getGraphicProductNameByCategory(id).subscribe(items => this.productnames = items, error => this.errorMessage = <any>error);
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
        this.graphicForm = this.fb.group(
            {
                buyercode: [""],
                isactive: [true],
                graphiccategory: ["", [Validators.required]],
                productname: ["", [Validators.required]],
                graphictype: ["", [Validators.required]],
                itemsize: [""],
                supplier: [""],
                suppliercode: [""],
                description: [""],
                brand: ["", [Validators.required]],
                division: ["", [Validators.required]],
                remark: [""],
                department: ["", [Validators.required]],
                color: ["", [Validators.required]]


            }
        );
        var pageall = new PaginationModel(10, 0, "Name", 0, [], 0);
        var getAll = new GeneralSearchModel("", "", "", "", pageall);

        this.categoryService.getGraphicCategoryList(getAll).subscribe(items => this.categories = items.Data, error => this.errorMessage = <any>error);
        this.graphicproductnameService.getGraphicProductNameList(getAll).subscribe(items => this.productnames = items.Data, error => this.errorMessage = <any>error);
        this.acctypeService.getGraphicTypeList(getAll).subscribe(items => this.types = items.Data, error => this.errorMessage = <any>error);
        this.brandService.getBrandList(getAll).subscribe(items => this.brands = items.Data, error => this.errorMessage = <any>error);
        this.deptService.getDepartmentList(getAll).subscribe(items => this.departments = items.Data, error => this.errorMessage = <any>error);
        this.divisionService.getDivisionList(getAll).subscribe(items => this.divisions = items.Data, error => this.errorMessage = <any>error);
        this.colorService.getColorList(getAll).subscribe(items => this.colors = items.Data, error => this.errorMessage = <any>error);
        this.data = new Graphic("", false, "", "", "", "", "", "", "", "", "", "", "", "", "", "", [], "");
        this.title = "New Graphic";
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
            url: "api/graphic/UploadImage",
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
                    appendstring += "<li><a href=\"javascript:void(0);\" [(click)]=\"changeImage(" + data[i].UploadPath + ")\"><img src=\"" + data[i].UploadPath + "\" alt=\"graphic image\"></a></li>"
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
        var newData = new Graphic("", data.isactive, data.buyercode, data.brand, data.department, data.division, jQuery('#hdImage').val(), data.productname, data.graphictype,
            data.graphiccategory, data.description,data.itemsize,data.supplier,data.suppliercode,data.remark,data.color,[],"")
        this.graphicService.add(newData).subscribe((data) => {
            if (data.error == null) {
                this.data = data;
                alert("Added successfully!");
                this.router.navigate(["/graphic"]);
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