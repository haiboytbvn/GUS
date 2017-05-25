import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from "@angular/core";
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { WashTypeService } from "../shared/washtype.service";
import { WashType } from "../shared/washtype.model";
import { PaginationModel } from "../../Pagination/shared/pagination.model";
import { GeneralSearchModel } from "../../Pagination/shared/generalsearch.model";
import { WashTypeListModel } from "../shared/washtype-list.model";
import { Router } from "@angular/router";
import { AuthService } from "../../auth.service";
import { SearchGeneralFilter } from "../../SearchGeneralFilter/shared/searchGeneralFilter.model";
declare var jQuery: any;

@Component({
    selector: 'washtype',
    templateUrl: 'app/WashType/washtype-list/washtype-list.component.html',
    providers: [WashTypeService, WashTypeService, FormBuilder]
})

export class WashTypeListComponent {
    data: WashType;
    title = "Wash Type";
    selectedData: WashType;
    errorMessage: string;
    searchModel: GeneralSearchModel;
    paging: PaginationModel;
    washtypeAddForm: FormGroup;
    accessorycategories: WashType[];
    ACdata: WashTypeListModel;
    pagesizearr: number[] = [10, 20, 30, 0];
    types: WashType[];
    itemid: string;
    isFormValuesChanged = false;
    washtypeEditForm: FormGroup;
    constructor(private washtypeService: WashTypeService,
        private authService: AuthService,
        private router: Router,
        private fb: FormBuilder,
        private acctypeService: WashTypeService
    ) {
    }

    ngOnInit() {
        if (!this.authService.isLoggedIn()) {
            this.router.navigate([""]);
        }
        this.paging = new PaginationModel(10, 1, "Name", 0, [], 0);
        this.searchModel = new GeneralSearchModel("", "", "", "", this.paging);
        this.washtypeService.getWashTypeList(this.searchModel).subscribe(items => this.ACdata = items, error => this.errorMessage = <any>error);
        this.washtypeAddForm = this.fb.group(
            {
                id: [""],
                name: ["", [Validators.required]],
                isactive: [true]
            }
        );   
        this.data = new WashType("",false, "");
        this.itemid = "";
    }
    changePage(i: number) {
        this.searchModel.Paging.PageNumber = i;
        this.washtypeService.getWashTypeList(this.searchModel).subscribe(items => this.ACdata = items, error => this.errorMessage = <any>error);
    }

    changeSize(i: number) {
        if (i == 0) {
            this.searchModel.Paging.PageNumber = 0;
        } else {
            this.searchModel.Paging.PageSize = i;
            this.searchModel.Paging.PageNumber = 1;
        }

        this.washtypeService.getWashTypeList(this.searchModel).subscribe(items => this.ACdata = items, error => this.errorMessage = <any>error);
    }
   
    onSubmit(data: any) {
        console.log(data);
        var washtype = new WashType("", data.isactive, data.name);
        this.washtypeService.add(washtype).subscribe((data) => {
            if (data.error == null) {


                this.washtypeService.getWashTypeList(this.searchModel).subscribe(items => this.ACdata = items, error => this.errorMessage = <any>error);
                alert("added successfully");
                this.data = new WashType("", false, "");
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
        // var washtype = new WashType(data.id, null, null, data.isactive, data.name, false, data.buyercode, data.acctype);
        console.log(data);
        this.washtypeService.update(data).subscribe((data) => {
            if (data.error == null) {
                this.data = data;
                this.washtypeService.getWashTypeList(this.searchModel).subscribe(items => this.ACdata = items, error => this.errorMessage = <any>error);
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
            this.washtypeService.get(id).subscribe((data) => {
                this.data = data;
            });
        }
    }
    isFormChanged(value) {
        this.washtypeService.get(this.data.Id).subscribe((oldData) => {
            this.isFormDataChanged(oldData);
        });
    }

    isFormDataChanged(oldData: WashType) {
        if (JSON.stringify(this.data) === JSON.stringify(oldData))
            this.isFormValuesChanged = false;
        else
            this.isFormValuesChanged = true;
    }
}