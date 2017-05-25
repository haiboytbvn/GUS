import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from "@angular/core";
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { EndBuyerService } from "../shared/endbuyer.service";
import { EndBuyer } from "../shared/endbuyer.model";
import { PaginationModel } from "../../Pagination/shared/pagination.model";
import { GeneralSearchModel } from "../../Pagination/shared/generalsearch.model";
import { EndBuyerListModel } from "../shared/endbuyer-list.model";
import { Router } from "@angular/router";
import { AuthService } from "../../auth.service";
import { SearchGeneralFilter } from "../../SearchGeneralFilter/shared/searchGeneralFilter.model";
declare var jQuery: any;

@Component({
    selector: 'endbuyer',
    templateUrl: 'app/EndBuyer/endbuyer-list/endbuyer-list.component.html',
    providers: [EndBuyerService, EndBuyerService, FormBuilder]
})

export class EndBuyerListComponent {
    data: EndBuyer;
    title = "EndBuyer";
    selectedData: EndBuyer;
    errorMessage: string;
    searchModel: GeneralSearchModel;
    paging: PaginationModel;
    endbuyerAddForm: FormGroup;
    ACdata: EndBuyerListModel;
    pagesizearr: number[] = [10, 20, 30, 0];
    types: EndBuyer[];
    itemid: string;
    isFormValuesChanged = false;
    endbuyerEditForm: FormGroup;
    constructor(private endbuyerService: EndBuyerService,
        private authService: AuthService,
        private router: Router,
        private fb: FormBuilder,
        private acctypeService: EndBuyerService
    ) {
    }

    ngOnInit() {
        if (!this.authService.isLoggedIn()) {
            this.router.navigate([""]);
        }
        this.paging = new PaginationModel(10, 1, "Name", 0, [], 0);
        this.searchModel = new GeneralSearchModel("", "", "", "", this.paging);
        this.endbuyerService.getEndBuyerList(this.searchModel).subscribe(items => this.ACdata = items, error => this.errorMessage = <any>error);
        this.endbuyerAddForm = this.fb.group(
            {
                id: [""],
                name: ["", [Validators.required]],
                isactive: [true]
            }
        );
        this.data = new EndBuyer("", false, "");
        this.itemid = "";
    }
    changePage(i: number) {
        this.searchModel.Paging.PageNumber = i;
        this.endbuyerService.getEndBuyerList(this.searchModel).subscribe(items => this.ACdata = items, error => this.errorMessage = <any>error);
    }

    changeSize(i: number) {
        if (i == 0) {
            this.searchModel.Paging.PageNumber = 0;
        } else {
            this.searchModel.Paging.PageSize = i;
            this.searchModel.Paging.PageNumber = 1;
        }

        this.endbuyerService.getEndBuyerList(this.searchModel).subscribe(items => this.ACdata = items, error => this.errorMessage = <any>error);
    }

    onSubmit(data: any) {
        console.log(data);
        var endbuyer = new EndBuyer("", data.isactive, data.name);
        this.endbuyerService.add(endbuyer).subscribe((data) => {
            if (data.error == null) {


                this.endbuyerService.getEndBuyerList(this.searchModel).subscribe(items => this.ACdata = items, error => this.errorMessage = <any>error);
                alert("added successfully");
                this.data = new EndBuyer("", false, "");
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
        // var endbuyer = new EndBuyer(data.id, null, null, data.isactive, data.name, false, data.buyercode, data.acctype);
        console.log(data);
        this.endbuyerService.update(data).subscribe((data) => {
            if (data.error == null) {
                this.data = data;
                this.endbuyerService.getEndBuyerList(this.searchModel).subscribe(items => this.ACdata = items, error => this.errorMessage = <any>error);
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
            this.endbuyerService.get(id).subscribe((data) => {
                this.data = data;
            });
        }
    }
    isFormChanged(value) {
        this.endbuyerService.get(this.data.Id).subscribe((oldData) => {
            this.isFormDataChanged(oldData);
        });
    }

    isFormDataChanged(oldData: EndBuyer) {
        if (JSON.stringify(this.data) === JSON.stringify(oldData))
            this.isFormValuesChanged = false;
        else
            this.isFormValuesChanged = true;
    }
}