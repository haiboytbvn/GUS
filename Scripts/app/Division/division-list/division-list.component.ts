import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from "@angular/core";
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { DivisionService } from "../shared/division.service";
import { Division } from "../shared/division.model";
import { PaginationModel } from "../../Pagination/shared/pagination.model";
import { GeneralSearchModel } from "../../Pagination/shared/generalsearch.model";
import { DivisionListModel } from "../shared/division-list.model";
import { Router } from "@angular/router";
import { AuthService } from "../../auth.service";
import { SearchGeneralFilter } from "../../SearchGeneralFilter/shared/searchGeneralFilter.model";
declare var jQuery: any;

@Component({
    selector: 'division',
    templateUrl: 'app/Division/division-list/division-list.component.html',
    providers: [DivisionService, DivisionService, FormBuilder]
})

export class DivisionListComponent {
    data: Division;
    title = "Division";
    selectedData: Division;
    errorMessage: string;
    searchModel: GeneralSearchModel;
    paging: PaginationModel;
    divisionAddForm: FormGroup;
    accessorycategories: Division[];
    ACdata: DivisionListModel;
    pagesizearr: number[] = [10, 20, 30, 0];
    types: Division[];
    itemid: string;
    isFormValuesChanged = false;
    divisionEditForm: FormGroup;
    constructor(private divisionService: DivisionService,
        private authService: AuthService,
        private router: Router,
        private fb: FormBuilder,
        private acctypeService: DivisionService
    ) {
    }

    ngOnInit() {
        if (!this.authService.isLoggedIn()) {
            this.router.navigate([""]);
        }
        this.paging = new PaginationModel(10, 1, "Name", 0, [], 0);
        this.searchModel = new GeneralSearchModel("", "", "", "", this.paging);
        this.divisionService.getDivisionList(this.searchModel).subscribe(items => this.ACdata = items, error => this.errorMessage = <any>error);
        this.divisionAddForm = this.fb.group(
            {
                id: [""],
                name: ["", [Validators.required]],
                isactive: [true]
            }
        );
        this.data = new Division("", false, "");
        this.itemid = "";
    }
    changePage(i: number) {
        this.searchModel.Paging.PageNumber = i;
        this.divisionService.getDivisionList(this.searchModel).subscribe(items => this.ACdata = items, error => this.errorMessage = <any>error);
    }

    changeSize(i: number) {
        if (i == 0) {
            this.searchModel.Paging.PageNumber = 0;
        } else {
            this.searchModel.Paging.PageSize = i;
            this.searchModel.Paging.PageNumber = 1;
        }

        this.divisionService.getDivisionList(this.searchModel).subscribe(items => this.ACdata = items, error => this.errorMessage = <any>error);
    }

    onSubmit(data: any) {
        console.log(data);
        var division = new Division("", data.isactive, data.name);
        this.divisionService.add(division).subscribe((data) => {
            if (data.error == null) {


                this.divisionService.getDivisionList(this.searchModel).subscribe(items => this.ACdata = items, error => this.errorMessage = <any>error);
                alert("added successfully");
                this.data = new Division("", false, "");
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
        // var division = new Division(data.id, null, null, data.isactive, data.name, false, data.buyercode, data.acctype);
        console.log(data);
        this.divisionService.update(data).subscribe((data) => {
            if (data.error == null) {
                this.data = data;
                this.divisionService.getDivisionList(this.searchModel).subscribe(items => this.ACdata = items, error => this.errorMessage = <any>error);
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
            this.divisionService.get(id).subscribe((data) => {
                this.data = data;
            });
        }
    }
    isFormChanged(value) {
        this.divisionService.get(this.data.Id).subscribe((oldData) => {
            this.isFormDataChanged(oldData);
        });
    }

    isFormDataChanged(oldData: Division) {
        if (JSON.stringify(this.data) === JSON.stringify(oldData))
            this.isFormValuesChanged = false;
        else
            this.isFormValuesChanged = true;
    }
}