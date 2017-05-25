import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from "@angular/core";
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { AccessoryTypeService } from "../shared/accessorytype.service";
import { AccessoryType } from "../shared/accessorytype.model";
import { PaginationModel } from "../../Pagination/shared/pagination.model";
import { GeneralSearchModel } from "../../Pagination/shared/generalsearch.model";
import { AccessoryTypeListModel } from "../shared/accessorytype-list.model";
import { Router } from "@angular/router";
import { AuthService } from "../../auth.service";
import { SearchGeneralFilter } from "../../SearchGeneralFilter/shared/searchGeneralFilter.model";
declare var jQuery: any;

@Component({
    selector: 'accessorytype',
    templateUrl: 'app/AccessoryType/accessorytype-list/accessorytype-list.component.html',
    providers: [AccessoryTypeService, AccessoryTypeService, FormBuilder]
})

export class AccessoryTypeListComponent {
    data: AccessoryType;
    title = "Accessory Type";
    selectedData: AccessoryType;
    errorMessage: string;
    searchModel: GeneralSearchModel;
    paging: PaginationModel;
    accessorytypeAddForm: FormGroup;
    accessorycategories: AccessoryType[];
    ACdata: AccessoryTypeListModel;
    pagesizearr: number[] = [10, 20, 30, 0];
    types: AccessoryType[];
    itemid: string;
    isFormValuesChanged = false;
    accessorytypeEditForm: FormGroup;
    constructor(private accessorytypeService: AccessoryTypeService,
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
        this.accessorytypeService.getAccessoryTypeList(this.searchModel).subscribe(items => this.ACdata = items, error => this.errorMessage = <any>error);
        this.accessorytypeAddForm = this.fb.group(
            {
                id: [""],
                name: ["", [Validators.required]],
                isactive: [true]
            }
        );   
        this.data = new AccessoryType("",false, "");
        this.itemid = "";
    }
    changePage(i: number) {
        this.searchModel.Paging.PageNumber = i;
        this.accessorytypeService.getAccessoryTypeList(this.searchModel).subscribe(items => this.ACdata = items, error => this.errorMessage = <any>error);
    }

    changeSize(i: number) {
        if (i == 0) {
            this.searchModel.Paging.PageNumber = 0;
        } else {
            this.searchModel.Paging.PageSize = i;
            this.searchModel.Paging.PageNumber = 1;
        }

        this.accessorytypeService.getAccessoryTypeList(this.searchModel).subscribe(items => this.ACdata = items, error => this.errorMessage = <any>error);
    }
   
    onSubmit(data: any) {
        console.log(data);
        var accessorytype = new AccessoryType("", data.isactive, data.name);
        this.accessorytypeService.add(accessorytype).subscribe((data) => {
            if (data.error == null) {


                this.accessorytypeService.getAccessoryTypeList(this.searchModel).subscribe(items => this.ACdata = items, error => this.errorMessage = <any>error);
                alert("added successfully");
                this.data = new AccessoryType("", false, "");
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
        // var accessorytype = new AccessoryType(data.id, null, null, data.isactive, data.name, false, data.buyercode, data.acctype);
        console.log(data);
        this.accessorytypeService.update(data).subscribe((data) => {
            if (data.error == null) {
                this.data = data;
                this.accessorytypeService.getAccessoryTypeList(this.searchModel).subscribe(items => this.ACdata = items, error => this.errorMessage = <any>error);
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
            this.accessorytypeService.get(id).subscribe((data) => {
                this.data = data;
            });
        }
    }
    isFormChanged(value) {
        this.accessorytypeService.get(this.data.Id).subscribe((oldData) => {
            this.isFormDataChanged(oldData);
        });
    }

    isFormDataChanged(oldData: AccessoryType) {
        if (JSON.stringify(this.data) === JSON.stringify(oldData))
            this.isFormValuesChanged = false;
        else
            this.isFormValuesChanged = true;
    }
}