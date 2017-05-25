import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from "@angular/core";
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { TrainingItemService } from "../shared/trainingitem.service";
import { TrainingItem } from "../shared/trainingitem.model";
import { PaginationModel } from "../../Pagination/shared/pagination.model";
import { GeneralSearchModel } from "../../Pagination/shared/generalsearch.model";
import { TrainingItemListModel } from "../shared/trainingitem-list.model";
import { Router } from "@angular/router";
import { AuthService } from "../../auth.service";
import { SearchGeneralFilter } from "../../SearchGeneralFilter/shared/searchGeneralFilter.model";
declare var jQuery: any;

@Component({
    selector: 'trainingitem',
    templateUrl: 'app/TrainingItem/trainingitem-list/trainingitem-list.component.html',
    providers: [TrainingItemService, FormBuilder]
})

export class TrainingItemListComponent {
    data: TrainingItem;
    title = "TrainingItem";
    selectedData: TrainingItem;
    errorMessage: string;
    searchModel: GeneralSearchModel;
    paging: PaginationModel;
    trainingitemAddForm: FormGroup;
    accessorycategories: TrainingItem[];
    ACdata: TrainingItemListModel;
    pagesizearr: number[] = [10, 20, 30, 0];
    types: TrainingItem[];
    itemid: string;
    isFormValuesChanged = false;
    trainingitemEditForm: FormGroup;
    constructor(private trainingitemService: TrainingItemService,
        private authService: AuthService,
        private router: Router,
        private fb: FormBuilder,
        private acctypeService: TrainingItemService
    ) {
    }

    ngOnInit() {
        if (!this.authService.isLoggedIn()) {
            this.router.navigate([""]);
        }
        this.paging = new PaginationModel(10, 1, "Name", 0, [], 0);
        this.searchModel = new GeneralSearchModel("", "", "", "", this.paging);
        this.trainingitemService.getTrainingItemList(this.searchModel).subscribe(items => this.ACdata = items, error => this.errorMessage = <any>error);
        this.trainingitemAddForm = this.fb.group(
            {
                id: [""],
                value: ["", [Validators.required]],
                isactive: [true]
            }
        );
        this.data = new TrainingItem("", false, "", null, null);
        this.itemid = "";
    }
    changePage(i: number) {
        this.searchModel.Paging.PageNumber = i;
        this.trainingitemService.getTrainingItemList(this.searchModel).subscribe(items => this.ACdata = items, error => this.errorMessage = <any>error);
    }

    changeSize(i: number) {
        if (i == 0) {
            this.searchModel.Paging.PageNumber = 0;
        } else {
            this.searchModel.Paging.PageSize = i;
            this.searchModel.Paging.PageNumber = 1;
        }

        this.trainingitemService.getTrainingItemList(this.searchModel).subscribe(items => this.ACdata = items, error => this.errorMessage = <any>error);
    }

    onSubmit(data: any) {
        console.log(data);
        var trainingitem = new TrainingItem("", data.isactive, data.value, null, null);
        this.trainingitemService.add(trainingitem).subscribe((data) => {
            if (data.error == null) {


                this.trainingitemService.getTrainingItemList(this.searchModel).subscribe(items => this.ACdata = items, error => this.errorMessage = <any>error);
                alert("added successfully");
                this.data = new TrainingItem("", false, "", null,null);
                jQuery('#txtName').val('');
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
        jQuery('#ckIsActive').prop('checked', true);
    }
    onUpdate(data: any) {
        // else, update it
        // var trainingitem = new trainingitem(data.id, null, null, data.isactive, data.name, false, data.buyercode, data.acctype);
        console.log(data);
        this.trainingitemService.update(data).subscribe((data) => {
            if (data.error == null) {
                this.data = data;
                this.trainingitemService.getTrainingItemList(this.searchModel).subscribe(items => this.ACdata = items, error => this.errorMessage = <any>error);
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
            this.trainingitemService.get(id).subscribe((data) => {
                console.log(data);
                this.data = data;
            });
        }
    }
    isFormChanged(value) {
        this.trainingitemService.get(this.data.Id).subscribe((oldData) => {
            this.isFormDataChanged(oldData);
        });
    }

    isFormDataChanged(oldData: TrainingItem) {
        if (JSON.stringify(this.data) === JSON.stringify(oldData))
            this.isFormValuesChanged = false;
        else
            this.isFormValuesChanged = true;
    }
}