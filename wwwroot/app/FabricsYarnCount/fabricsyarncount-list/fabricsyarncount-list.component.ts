import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from "@angular/core";
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { FabricsYarnCountService } from "../shared/fabricsyarncount.service";
import { FabricsYarnCount } from "../shared/fabricsyarncount.model";
import { PaginationModel } from "../../Pagination/shared/pagination.model";
import { GeneralSearchModel } from "../../Pagination/shared/generalsearch.model";
import { FabricsYarnCountListModel } from "../shared/fabricsyarncount-list.model";
import { Router } from "@angular/router";
import { AuthService } from "../../auth.service";
import { SearchGeneralFilter } from "../../SearchGeneralFilter/shared/searchGeneralFilter.model";
declare var jQuery: any;

@Component({
    selector: 'fabricsyarncount',
    templateUrl: 'app/FabricsYarnCount/fabricsyarncount-list/fabricsyarncount-list.component.html',
    providers: [FabricsYarnCountService, FabricsYarnCountService, FormBuilder]
})

export class FabricsYarnCountListComponent {
    data: FabricsYarnCount;
    title = "Fabrics YarnCount";
    selectedData: FabricsYarnCount;
    errorMessage: string;
    searchModel: GeneralSearchModel;
    paging: PaginationModel;
    fabricsyarncountAddForm: FormGroup;
    accessorycategories: FabricsYarnCount[];
    ACdata: FabricsYarnCountListModel;
    pagesizearr: number[] = [10, 20, 30, 0];
    types: FabricsYarnCount[];
    itemid: string;
    isFormValuesChanged = false;
    fabricsyarncountEditForm: FormGroup;
    constructor(private fabricsyarncountService: FabricsYarnCountService,
        private authService: AuthService,
        private router: Router,
        private fb: FormBuilder,
        private acctypeService: FabricsYarnCountService
    ) {
    }

    ngOnInit() {
        if (!this.authService.isLoggedIn()) {
            this.router.navigate([""]);
        }
        this.paging = new PaginationModel(10, 1, "Name", 0, [], 0);
        this.searchModel = new GeneralSearchModel("", "", "", "", this.paging);
        this.fabricsyarncountService.getFabricsYarnCountList(this.searchModel).subscribe(items => this.ACdata = items, error => this.errorMessage = <any>error);
        this.fabricsyarncountAddForm = this.fb.group(
            {
                id: [""],
                name: ["", [Validators.required]],
                isactive: [true]
            }
        );
        this.data = new FabricsYarnCount("", false, "");
        this.itemid = "";
    }
    changePage(i: number) {
        this.searchModel.Paging.PageNumber = i;
        this.fabricsyarncountService.getFabricsYarnCountList(this.searchModel).subscribe(items => this.ACdata = items, error => this.errorMessage = <any>error);
    }

    changeSize(i: number) {
        if (i == 0) {
            this.searchModel.Paging.PageNumber = 0;
        } else {
            this.searchModel.Paging.PageSize = i;
            this.searchModel.Paging.PageNumber = 1;
        }

        this.fabricsyarncountService.getFabricsYarnCountList(this.searchModel).subscribe(items => this.ACdata = items, error => this.errorMessage = <any>error);
    }

    onSubmit(data: any) {
        console.log(data);
        var fabricsyarncount = new FabricsYarnCount("", data.isactive, data.name);
        this.fabricsyarncountService.add(fabricsyarncount).subscribe((data) => {
            if (data.error == null) {


                this.fabricsyarncountService.getFabricsYarnCountList(this.searchModel).subscribe(items => this.ACdata = items, error => this.errorMessage = <any>error);
                alert("added successfully");
                this.data = new FabricsYarnCount("", false, "");
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
        // var fabricsyarncount = new FabricsYarnCount(data.id, null, null, data.isactive, data.name, false, data.buyercode, data.acctype);
        console.log(data);
        this.fabricsyarncountService.update(data).subscribe((data) => {
            if (data.error == null) {
                this.data = data;
                this.fabricsyarncountService.getFabricsYarnCountList(this.searchModel).subscribe(items => this.ACdata = items, error => this.errorMessage = <any>error);
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
            this.fabricsyarncountService.get(id).subscribe((data) => {
                this.data = data;
            });
        }
    }
    isFormChanged(value) {
        this.fabricsyarncountService.get(this.data.Id).subscribe((oldData) => {
            this.isFormDataChanged(oldData);
        });
    }

    isFormDataChanged(oldData: FabricsYarnCount) {
        if (JSON.stringify(this.data) === JSON.stringify(oldData))
            this.isFormValuesChanged = false;
        else
            this.isFormValuesChanged = true;
    }
}