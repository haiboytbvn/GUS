import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from "@angular/core";
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { FabricsTypeService } from "../shared/fabricstype.service";
import { FabricsType } from "../shared/fabricstype.model";
import { PaginationModel } from "../../Pagination/shared/pagination.model";
import { GeneralSearchModel } from "../../Pagination/shared/generalsearch.model";
import { FabricsTypeListModel } from "../shared/fabricstype-list.model";
import { Router } from "@angular/router";
import { AuthService } from "../../auth.service";
import { SearchGeneralFilter } from "../../SearchGeneralFilter/shared/searchGeneralFilter.model";
declare var jQuery: any;

@Component({
    selector: 'fabricstype',
    templateUrl: 'app/FabricsType/fabricstype-list/fabricstype-list.component.html',
    providers: [FabricsTypeService, FabricsTypeService, FormBuilder]
})

export class FabricsTypeListComponent {
    data: FabricsType;
    title = "Fabrics Type";
    selectedData: FabricsType;
    errorMessage: string;
    searchModel: GeneralSearchModel;
    paging: PaginationModel;
    fabricstypeAddForm: FormGroup;
    accessorycategories: FabricsType[];
    ACdata: FabricsTypeListModel;
    pagesizearr: number[] = [10, 20, 30, 0];
    types: FabricsType[];
    itemid: string;
    isFormValuesChanged = false;
    fabricstypeEditForm: FormGroup;
    constructor(private fabricstypeService: FabricsTypeService,
        private authService: AuthService,
        private router: Router,
        private fb: FormBuilder,
        private acctypeService: FabricsTypeService
    ) {
    }

    ngOnInit() {
        if (!this.authService.isLoggedIn()) {
            this.router.navigate([""]);
        }
        this.paging = new PaginationModel(10, 1, "Name", 0, [], 0);
        this.searchModel = new GeneralSearchModel("", "", "", "", this.paging);
        this.fabricstypeService.getFabricsTypeList(this.searchModel).subscribe(items => this.ACdata = items, error => this.errorMessage = <any>error);
        this.fabricstypeAddForm = this.fb.group(
            {
                id: [""],
                name: ["", [Validators.required]],
                isactive: [true]
            }
        );
        this.data = new FabricsType("", false, "");
        this.itemid = "";
    }
    changePage(i: number) {
        this.searchModel.Paging.PageNumber = i;
        this.fabricstypeService.getFabricsTypeList(this.searchModel).subscribe(items => this.ACdata = items, error => this.errorMessage = <any>error);
    }

    changeSize(i: number) {
        if (i == 0) {
            this.searchModel.Paging.PageNumber = 0;
        } else {
            this.searchModel.Paging.PageSize = i;
            this.searchModel.Paging.PageNumber = 1;
        }

        this.fabricstypeService.getFabricsTypeList(this.searchModel).subscribe(items => this.ACdata = items, error => this.errorMessage = <any>error);
    }

    onSubmit(data: any) {
        console.log(data);
        var fabricstype = new FabricsType("", data.isactive, data.name);
        this.fabricstypeService.add(fabricstype).subscribe((data) => {
            if (data.error == null) {


                this.fabricstypeService.getFabricsTypeList(this.searchModel).subscribe(items => this.ACdata = items, error => this.errorMessage = <any>error);
                alert("added successfully");
                this.data = new FabricsType("", false, "");
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
        // var fabricstype = new FabricsType(data.id, null, null, data.isactive, data.name, false, data.buyercode, data.acctype);
        console.log(data);
        this.fabricstypeService.update(data).subscribe((data) => {
            if (data.error == null) {
                this.data = data;
                this.fabricstypeService.getFabricsTypeList(this.searchModel).subscribe(items => this.ACdata = items, error => this.errorMessage = <any>error);
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
            this.fabricstypeService.get(id).subscribe((data) => {
                this.data = data;
            });
        }
    }
    isFormChanged(value) {
        this.fabricstypeService.get(this.data.Id).subscribe((oldData) => {
            this.isFormDataChanged(oldData);
        });
    }

    isFormDataChanged(oldData: FabricsType) {
        if (JSON.stringify(this.data) === JSON.stringify(oldData))
            this.isFormValuesChanged = false;
        else
            this.isFormValuesChanged = true;
    }
}