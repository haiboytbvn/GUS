import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, OnDestroy } from "@angular/core";
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { Router, ActivatedRoute } from "@angular/router";
import { Color } from "../../Color/shared/color.model";
import { ColorService } from "../../Color/shared/color.service";
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
import { DivisionListModel } from "../../Division/shared/division-list.model";
declare var jQuery: any;
@Component({
    selector: "color-add",
    templateUrl: "app/Color/color/color-add.component.html",
    providers: [ColorService, FormBuilder, DepartmentService, BrandService, DivisionService]
})

export class ColorAddComponent {

    data: Color;
    title: string;
    colorForm: FormGroup;
    errorMessage = null;
    @ViewChild('errorDiv') errorDiv: ElementRef;
    depts: Department[];
    brands: Brand[];
    divisions: DivisionListModel;
    searchModel: GeneralSearchModel;
    paging: PaginationModel;
    constructor(
        private fb: FormBuilder,
        private divisionService: DivisionService,
        private deptServcie: DepartmentService,
        private brandService: BrandService,
        private colorService: ColorService,
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
            url: "api/color/UploadImage",
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
    doUpload() {
        jQuery("#files").trigger("click");
    }
    ngOnInit() {
        if (!this.authService.isLoggedIn()) {
            this.router.navigate([""]);
        }

        this.colorForm = this.fb.group(
            {
                buyercode: [""],
                name: ["", [
                    Validators.required]],
                brand: ["", [
                    Validators.required]],
                department: ["", [
                    Validators.required]],
                division: ["", [
                    Validators.required]],
                isactive: [true],
                remark:[""]
            }
        );

        var searchGeneralFilter = new SearchGeneralFilter("", "", "", "");
        this.paging = new PaginationModel(10, 1, "Name", 0, [], 0);
        this.searchModel = new GeneralSearchModel("", "", "", "", this.paging);
        this.brandService.getBrandList(this.searchModel).subscribe(item => this.brands = item.Data, error => this.errorMessage = <any>error);
        this.deptServcie.getDepartmentList(this.searchModel).subscribe(item => this.depts = item.Data, error => this.errorMessage = <any>error);       
        this.divisionService.getDivisionList(this.searchModel).subscribe(items => this.divisions = items.Data, error => this.errorMessage = <any>error);
        this.data = new Color("", false, "", "", "", "", "", "","","");
        this.title = "New Color";
    }
   
    ngOnDestroy() {
        this.colorService.data = this.data;
    }

    onSubmit(data: any) {
        var newData = new Color("", data.isactive, data.code, data.buyercode, data.name, data.brand, data.department, data.division, jQuery('#hdImage').val(),data.remark);
        this.colorService.add(newData).subscribe((data) => {
            if (data.error == null) {
                this.data = data;
                alert('Color added successfully');
                this.router.navigate(["/color"]);
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

    onBack() {
        this.router.navigate(["color"]);
    }
    changeDivision(value: string) {
        console.log(value);
    }
    onUpdate(data: Color) {

    }

}