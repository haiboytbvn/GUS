import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from "@angular/core";
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
declare var jQuery: any;

@Component({
    selector: "color-edit",
    templateUrl: "app/Color/color/color-edit.component.html",
    providers: [ColorService, FormBuilder, DepartmentService, BrandService, DivisionService]
})

export class ColorEditComponent {
    data: Color;
    title = "Edit Color";
    colorForm: FormGroup;
    errorMessage = null;
    isDelete = false;
    isFormValuesChanged = false;
    oldData: Color;
    depts: Department[];
    brands: Brand[];
    divisions: Division[];
    searchModel: GeneralSearchModel;
    paging: PaginationModel;
    iseditting: boolean;
    buttonvalue: string;
    constructor(
        private fb: FormBuilder,
        private colorService: ColorService,
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
            this.colorService.get(id).subscribe((data) => {
                this.data = data;
            });
        }
        else {
            this.router.navigate(["color/add"]);
        }
        this.paging = new PaginationModel(10, 1, "Name", 0, [], 0);
        this.searchModel = new GeneralSearchModel("", "", "", "", this.paging);
        var searchGeneralFilter = new SearchGeneralFilter("", "", "", "");
        this.brandService.getBrandList(this.searchModel).subscribe(items => this.brands = items.Data, error => this.errorMessage = <any>error);
        this.deptServcie.getDepartmentList(this.searchModel).subscribe(items => this.depts = items.Data, error => this.errorMessage = <any>error);
        this.divisionService.getDivisionList(this.searchModel).subscribe(items => this.divisions = items.Data, error => this.errorMessage = <any>error);
        this.iseditting = false;
        this.buttonvalue = "Edit";

   
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
            url: "api/color/UploadImage",
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
    onUpdate(data: Color) {
        if (this.iseditting) {
            data.Image = jQuery('#hdImagepath').val();
            this.colorService.update(data).subscribe((data) => {
                    if (data.error == null) {
                        this.data = data;
                        alert('Color details updated successfully');
                        this.router.navigate(["/color"]);

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
        this.colorService.get(this.data.Id).subscribe((oldData) => {
            this.isFormDataChanged(oldData);
        });
    }

    isFormDataChanged(oldData: Color) {
        if (JSON.stringify(this.data) === JSON.stringify(oldData))
            this.isFormValuesChanged = false;
        else
            this.isFormValuesChanged = true;
    }
}