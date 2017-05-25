import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from "@angular/core";
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { BrandService } from "../shared/brand.service";
import { Brand } from "../shared/brand.model";
import { PaginationModel } from "../../Pagination/shared/pagination.model";
import { GeneralSearchModel } from "../../Pagination/shared/generalsearch.model";
import { BrandListModel } from "../shared/brand-list.model";
import { Router } from "@angular/router";
import { AuthService } from "../../auth.service";
import { SearchGeneralFilter } from "../../SearchGeneralFilter/shared/searchGeneralFilter.model";
declare var jQuery: any;

@Component({
    selector: 'brand',
    templateUrl: 'app/Brand/brand-list/brand-list.component.html',
    providers: [BrandService, BrandService, FormBuilder]
})

export class BrandListComponent {
    data: Brand;
    title = "Brand";
    selectedData: Brand;
    errorMessage: string;
    searchModel: GeneralSearchModel;
    paging: PaginationModel;
    brandAddForm: FormGroup;
    accessorycategories: Brand[];
    ACdata: BrandListModel;
    pagesizearr: number[] = [10, 20, 30, 0];
    types: Brand[];
    itemid: string;
    isFormValuesChanged = false;
    brandEditForm: FormGroup;
    constructor(private brandService: BrandService,
        private authService: AuthService,
        private router: Router,
        private fb: FormBuilder,
        private acctypeService: BrandService
    ) {
    }

    ngOnInit() {
        if (!this.authService.isLoggedIn()) {
            this.router.navigate([""]);
        }
        this.paging = new PaginationModel(10, 1, "Name", 0, [], 0);
        this.searchModel = new GeneralSearchModel("", "", "", "", this.paging);
        this.brandService.getBrandList(this.searchModel).subscribe(items => this.ACdata = items, error => this.errorMessage = <any>error);
        this.brandAddForm = this.fb.group(
            {
                id: [""],
                name: ["", [Validators.required]],
                isactive: [true]
            }
        );
        this.data = new Brand("", false, "");
        this.itemid = "";
    }
    changePage(i: number) {
        this.searchModel.Paging.PageNumber = i;
        this.brandService.getBrandList(this.searchModel).subscribe(items => this.ACdata = items, error => this.errorMessage = <any>error);
    }

    changeSize(i: number) {
        if (i == 0) {
            this.searchModel.Paging.PageNumber = 0;
        } else {
            this.searchModel.Paging.PageSize = i;
            this.searchModel.Paging.PageNumber = 1;
        }

        this.brandService.getBrandList(this.searchModel).subscribe(items => this.ACdata = items, error => this.errorMessage = <any>error);
    }

    onSubmit(data: any) {
        console.log(data);
        var brand = new Brand("", data.isactive, data.name);
        this.brandService.add(brand).subscribe((data) => {
            if (data.error == null) {


                this.brandService.getBrandList(this.searchModel).subscribe(items => this.ACdata = items, error => this.errorMessage = <any>error);
                alert("added successfully");
                this.data = new Brand("", false, "");
                jQuery('#txtName').val('');
                jQuery('#drType').val('');
                jQuery('#ckIsActive').prop('checked', true);
            } else {
                // update failure
                this.errorMessage = data.error;
                alert(this.errorMessage);
            }
        },
            (error) => {
                this.errorMessage = error;
                alert(this.errorMessage);
            }
        );
        jQuery('#myModalAdd').modal('hide');



    }
    onAdd() {
        jQuery('#txtName').val('');
        jQuery('#drType').val('');
        jQuery('#ckIsActive').prop('checked', true);
    }
    onUpdate(data: any) {
        // else, update it
        // var brand = new Brand(data.id, null, null, data.isactive, data.name, false, data.buyercode, data.acctype);
        console.log(data);
        this.brandService.update(data).subscribe((data) => {
            if (data.error == null) {
                this.data = data;
                this.brandService.getBrandList(this.searchModel).subscribe(items => this.ACdata = items, error => this.errorMessage = <any>error);
                alert("updated successfully");
                jQuery('#myModalEdit').modal('hide');
                this.itemid == "";
            }
            else {
                // update failure
                this.errorMessage = data.error;
                alert(this.errorMessage);
            }
        },
            (error) => {
                this.errorMessage = error;
                alert(this.errorMessage);
            }
        );
    }
    onEdit(id: string) {
        this.itemid = id;
        if (id !== "") {
            this.brandService.get(id).subscribe((data) => {
                this.data = data;
            });
        }
    }
    isFormChanged(value) {
        this.brandService.get(this.data.Id).subscribe((oldData) => {
            this.isFormDataChanged(oldData);
        });
    }

    isFormDataChanged(oldData: Brand) {
        if (JSON.stringify(this.data) === JSON.stringify(oldData))
            this.isFormValuesChanged = false;
        else
            this.isFormValuesChanged = true;
    }
}