﻿import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from "@angular/core";
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { FabricsFinishingService } from "../shared/fabricsfinishing.service";
import { FabricsFinishing } from "../shared/fabricsfinishing.model";
import { PaginationModel } from "../../Pagination/shared/pagination.model";
import { GeneralSearchModel } from "../../Pagination/shared/generalsearch.model";
import { FabricsFinishingListModel } from "../shared/fabricsfinishing-list.model";
import { Router } from "@angular/router";
import { AuthService } from "../../auth.service";
import { SearchGeneralFilter } from "../../SearchGeneralFilter/shared/searchGeneralFilter.model";
declare var jQuery: any;

@Component({
    selector: 'fabircsfinishing',
    templateUrl: 'app/FabricsFinishing/fabricsfinishing-list/fabricsfinishing-list.component.html',
    providers: [FabricsFinishingService, FabricsFinishingService, FormBuilder]
})

export class FabricsFinishingListComponent {
    data: FabricsFinishing;
    title = "Fabrics Finishing";
    selectedData: FabricsFinishing;
    errorMessage: string;
    searchModel: GeneralSearchModel;
    paging: PaginationModel;
    fabircsfinishingAddForm: FormGroup;
    accessorycategories: FabricsFinishing[];
    ACdata: FabricsFinishingListModel;
    pagesizearr: number[] = [10, 20, 30, 0];
    types: FabricsFinishing[];
    itemid: string;
    isFormValuesChanged = false;
    fabircsfinishingEditForm: FormGroup;
    constructor(private fabircsfinishingService: FabricsFinishingService,
        private authService: AuthService,
        private router: Router,
        private fb: FormBuilder,
        private acctypeService: FabricsFinishingService
    ) {
    }

    ngOnInit() {
        if (!this.authService.isLoggedIn()) {
            this.router.navigate([""]);
        }
        this.paging = new PaginationModel(10, 1, "Name", 0, [], 0);
        this.searchModel = new GeneralSearchModel("", "", "", "", this.paging);
        this.fabircsfinishingService.getFabricsFinishingList(this.searchModel).subscribe(items => this.ACdata = items, error => this.errorMessage = <any>error);
        this.fabircsfinishingAddForm = this.fb.group(
            {
                id: [""],
                name: ["", [Validators.required]],
                isactive: [true]
            }
        );
        this.data = new FabricsFinishing("", false, "");
        this.itemid = "";
    }
    changePage(i: number) {
        this.searchModel.Paging.PageNumber = i;
        this.fabircsfinishingService.getFabricsFinishingList(this.searchModel).subscribe(items => this.ACdata = items, error => this.errorMessage = <any>error);
    }

    changeSize(i: number) {
        if (i == 0) {
            this.searchModel.Paging.PageNumber = 0;
        } else {
            this.searchModel.Paging.PageSize = i;
            this.searchModel.Paging.PageNumber = 1;
        }

        this.fabircsfinishingService.getFabricsFinishingList(this.searchModel).subscribe(items => this.ACdata = items, error => this.errorMessage = <any>error);
    }

    onSubmit(data: any) {
        console.log(data);
        var fabircsfinishing = new FabricsFinishing("", data.isactive, data.name);
        this.fabircsfinishingService.add(fabircsfinishing).subscribe((data) => {
            if (data.error == null) {


                this.fabircsfinishingService.getFabricsFinishingList(this.searchModel).subscribe(items => this.ACdata = items, error => this.errorMessage = <any>error);
                alert("added successfully");
                this.data = new FabricsFinishing("", false, "");
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
        // var fabircsfinishing = new FabricsFinishing(data.id, null, null, data.isactive, data.name, false, data.buyercode, data.acctype);
        console.log(data);
        this.fabircsfinishingService.update(data).subscribe((data) => {
            if (data.error == null) {
                this.data = data;
                this.fabircsfinishingService.getFabricsFinishingList(this.searchModel).subscribe(items => this.ACdata = items, error => this.errorMessage = <any>error);
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
            this.fabircsfinishingService.get(id).subscribe((data) => {
                this.data = data;
            });
        }
    }
    isFormChanged(value) {
        this.fabircsfinishingService.get(this.data.Id).subscribe((oldData) => {
            this.isFormDataChanged(oldData);
        });
    }

    isFormDataChanged(oldData: FabricsFinishing) {
        if (JSON.stringify(this.data) === JSON.stringify(oldData))
            this.isFormValuesChanged = false;
        else
            this.isFormValuesChanged = true;
    }
}