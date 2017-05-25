import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from "@angular/core";
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { WashCategoryService } from "../shared/washcategory.service";
import { WashCategory } from "../shared/washcategory.model";
import { PaginationModel } from "../../Pagination/shared/pagination.model";
import { WashCategoryListModel } from "../shared/washcategory-list.model";
import { Router } from "@angular/router";
import { AuthService } from "../../auth.service";
import { WashTypeService } from "../../WashType/shared/washtype.service";
import { WashType } from "../../WashType/shared/washtype.model";
import { WashTypeListModel } from "../../WashType/shared/washtype-list.model";
import { SearchGeneralFilter } from "../../SearchGeneralFilter/shared/searchGeneralFilter.model";
import { GeneralSearchModel } from "../../Pagination/shared/generalsearch.model";
declare var jQuery: any;

@Component({
    selector: 'washcategory',
    templateUrl: 'app/WashCategory/washcategory-list/washcategory-list.component.html',
    providers: [WashCategoryService, WashTypeService, FormBuilder]
})

export class WashCategoryListComponent {
    data: WashCategory;
    title = "Wash Category";
    selectedData: WashCategory;
    errorMessage: string;
    searchModel: GeneralSearchModel;
    paging: PaginationModel;
    washcategoryAddForm: FormGroup;
    accessorycategories: WashCategory[];
    ACdata: WashCategoryListModel;
    pagesizearr: number[] = [10, 20, 30, 0];
    types: WashTypeListModel;
    itemid: string;
    isFormValuesChanged = false;
    washcategoryEditForm: FormGroup;
    constructor(private washcategoryService: WashCategoryService,
        private authService: AuthService,
        private router: Router,
        private fb: FormBuilder,
        private washtypeService: WashTypeService
    ) {
    }

    ngOnInit() {
        if (!this.authService.isLoggedIn()) {
            this.router.navigate([""]);
        }
        this.paging = new PaginationModel(10, 1, "Name", 0, [], 0);
        this.searchModel = new GeneralSearchModel("", "", "", "", this.paging);
        this.washcategoryService.getWashCategoryList(this.searchModel).subscribe(items => this.ACdata = items, error => this.errorMessage = <any>error);
        this.washcategoryAddForm = this.fb.group(
            {
                name: ["", [Validators.required]],
                isactive: [true],
                acctype: ["", [Validators.required]]
            }
        );

        var pageall = new PaginationModel(10, 0, "Name", 0, [], 0);
        var getAll = new GeneralSearchModel("", "", "", "", pageall);
        this.washtypeService.getWashTypeList(getAll).subscribe(items => this.types = items, error => this.errorMessage = <any>error);
        this.data = new WashCategory("", false, "", "");
        this.itemid = "";
    }
    changePage(i: number) {
        this.searchModel.Paging.PageNumber = i;
        this.washcategoryService.getWashCategoryList(this.searchModel).subscribe(items => this.ACdata = items, error => this.errorMessage = <any>error);
    }

    changeSize(i: number) {
        if (i == 0) {
            this.searchModel.Paging.PageNumber = 0;
        } else {
            this.searchModel.Paging.PageSize = i;
            this.searchModel.Paging.PageNumber = 1;
        }

        this.washcategoryService.getWashCategoryList(this.searchModel).subscribe(items => this.ACdata = items, error => this.errorMessage = <any>error);
    }



    onSubmit(data: any) {

        var washcategory = new WashCategory("", data.isactive, data.name, data.acctype);
        this.washcategoryService.add(washcategory).subscribe((data) => {
            if (data.error == null) {


                this.washcategoryService.getWashCategoryList(this.searchModel).subscribe(items => this.ACdata = items, error => this.errorMessage = <any>error);
                alert("added successfully");
                this.data = new WashCategory("", false, "", "");
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
        // var washcategory = new WashCategory(data.id, null, null, data.isactive, data.name, false, data.buyercode, data.acctype);
        console.log(data);
        this.washcategoryService.update(data).subscribe((data) => {
            if (data.error == null) {
                this.data = data;
                this.washcategoryService.getWashCategoryList(this.searchModel).subscribe(items => this.ACdata = items, error => this.errorMessage = <any>error);
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
            this.washcategoryService.get(id).subscribe((data) => {
                this.data = data;
            });
        }
    }
    isFormChanged(value) {
        this.washcategoryService.get(this.data.Id).subscribe((oldData) => {
            this.isFormDataChanged(oldData);
        });
    }

    isFormDataChanged(oldData: WashCategory) {
        if (JSON.stringify(this.data) === JSON.stringify(oldData))
            this.isFormValuesChanged = false;
        else
            this.isFormValuesChanged = true;
    }
}