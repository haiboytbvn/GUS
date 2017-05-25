import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from "@angular/core";
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { AccessoryCategoryService } from "../shared/accessorycategory.service";
import { AccessoryCategory } from "../shared/accessorycategory.model";
import { PaginationModel } from "../../Pagination/shared/pagination.model";
import { AccessoryCategoryListModel } from "../shared/accessorycategory-list.model";
import { Router } from "@angular/router";
import { AuthService } from "../../auth.service";
import { AccessoryTypeService } from "../../AccessoryType/shared/accessorytype.service";
import { AccessoryType } from "../../AccessoryType/shared/accessorytype.model";
import { AccessoryTypeListModel } from "../../AccessoryType/shared/accessorytype-list.model";
import { SearchGeneralFilter } from "../../SearchGeneralFilter/shared/searchGeneralFilter.model";
import { GeneralSearchModel } from "../../Pagination/shared/generalsearch.model";
declare var jQuery: any;

@Component({
    selector: 'accessorycategory',
    templateUrl: 'app/AccessoryCategory/accessorycategory-list/accessorycategory-list.component.html',
    providers: [AccessoryCategoryService, AccessoryTypeService, FormBuilder]
})

export class AccessoryCategoryListComponent {
    data: AccessoryCategory;
    title = "Accessory Category";
    selectedData: AccessoryCategory;
    errorMessage: string;
    searchModel: GeneralSearchModel;
    paging: PaginationModel;
    accessorycategoryAddForm: FormGroup;
    accessorycategories: AccessoryCategory[];
    ACdata: AccessoryCategoryListModel;
    pagesizearr: number[] = [10, 20, 30, 0];
    types: AccessoryTypeListModel;
    itemid: string;
    isFormValuesChanged = false;
    accessorycategoryEditForm: FormGroup;
    constructor(private accessorycategoryService: AccessoryCategoryService,
        private authService: AuthService,
        private router: Router,
        private fb: FormBuilder,
        private acctypeService: AccessoryTypeService
    ) {
    }

    ngOnInit() {
        if (!this.authService.isLoggedIn()) {
            this.router.navigate([""]);
        }
        this.paging = new PaginationModel(10, 1, "Name", 0, [], 0);
        this.searchModel = new GeneralSearchModel("", "", "", "", this.paging);
        this.accessorycategoryService.getAccessoryCategoryList(this.searchModel).subscribe(items => this.ACdata = items, error => this.errorMessage = <any>error);
        this.accessorycategoryAddForm = this.fb.group(
            {
                name: ["", [Validators.required]],
                isactive: [true],
                acctype: ["", [Validators.required]]
            }
        );

        var pageall = new PaginationModel(10, 0, "Name", 0, [], 0);
        var getAll = new GeneralSearchModel("", "", "", "", pageall);
        this.acctypeService.getAccessoryTypeList(getAll).subscribe(items => this.types = items, error => this.errorMessage = <any>error);
        this.data = new AccessoryCategory("",false,"","");
        this.itemid = "";
    }
    changePage(i: number) {
        this.searchModel.Paging.PageNumber = i;
        this.accessorycategoryService.getAccessoryCategoryList(this.searchModel).subscribe(items => this.ACdata = items, error => this.errorMessage = <any>error);
    }

    changeSize(i: number) {
        if (i == 0) {
            this.searchModel.Paging.PageNumber = 0;
        } else {
            this.searchModel.Paging.PageSize = i;
            this.searchModel.Paging.PageNumber = 1;
        }

        this.accessorycategoryService.getAccessoryCategoryList(this.searchModel).subscribe(items => this.ACdata = items, error => this.errorMessage = <any>error);
    }
  


    onSubmit(data: any) {

        var accessorycategory = new AccessoryCategory("", data.isactive, data.name, data.acctype);
            this.accessorycategoryService.add(accessorycategory).subscribe((data) => {
                if (data.error == null) {
                   

                    this.accessorycategoryService.getAccessoryCategoryList(this.searchModel).subscribe(items => this.ACdata = items, error => this.errorMessage = <any>error);
                    alert("added successfully");
                    this.data = new AccessoryCategory("",false,"","");
                    jQuery('#txtName').val('');
                    jQuery('#drType').val('');
                    jQuery('#ckIsActive').prop('checked',true);
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
       // var accessorycategory = new AccessoryCategory(data.id, null, null, data.isactive, data.name, false, data.buyercode, data.acctype);
        console.log(data);
        this.accessorycategoryService.update(data).subscribe((data) => {
            if (data.error == null) {
                this.data = data;
                this.accessorycategoryService.getAccessoryCategoryList(this.searchModel).subscribe(items => this.ACdata = items, error => this.errorMessage = <any>error);
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
            this.accessorycategoryService.get(id).subscribe((data) => {
                this.data = data;
            });
        }
    }
    isFormChanged(value) {
        this.accessorycategoryService.get(this.data.Id).subscribe((oldData) => {
            this.isFormDataChanged(oldData);
        });
    }

    isFormDataChanged(oldData: AccessoryCategory) {
        if (JSON.stringify(this.data) === JSON.stringify(oldData))
            this.isFormValuesChanged = false;
        else
            this.isFormValuesChanged = true;
    }
}