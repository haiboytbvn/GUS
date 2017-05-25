import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from "@angular/core";
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { TrainingService } from "../shared/training.service";
import { Training } from "../shared/training.model";
import { PaginationModel } from "../../Pagination/shared/pagination.model";
import { GeneralSearchModel } from "../../Pagination/shared/generalsearch.model";
import { TrainingListModel } from "../shared/training-list.model";
import { Router } from "@angular/router";
import { AuthService } from "../../auth.service";
import { SearchGeneralFilter } from "../../SearchGeneralFilter/shared/searchGeneralFilter.model";
import { Brand } from "../../Brand/shared/brand.model";
import { BrandService } from "../../Brand/shared/brand.service";
import { TrainingItem } from "../../TrainingItem/shared/trainingitem.model";
import { TrainingItemService } from "../../TrainingItem/shared/trainingitem.service";
declare var jQuery: any;

@Component({
    selector: 'training',
    templateUrl: 'app/Training/training-list/training-list.component.html',
    providers: [TrainingService, FormBuilder, BrandService, TrainingItemService]
})

export class TrainingListComponent {
    data: Training;
    title = "Training";
    selectedData: Training;
    errorMessage: string;
    searchModel: GeneralSearchModel;
    paging: PaginationModel;
    trainingAddForm: FormGroup;
    accessorycategories: Training[];
    ACdata: TrainingListModel;
    pagesizearr: number[] = [10, 20, 30, 0];
    types: Training[];
    itemid: string;
    isFormValuesChanged = false;
    trainingEditForm: FormGroup;
    brands: Brand[];
    trainingitems: TrainingItem[];

    constructor(
        private trainingService: TrainingService,
        private authService: AuthService,
        private router: Router,
        private fb: FormBuilder,
        private acctypeService: TrainingService,
        private brandService: BrandService,
        private trainingItemService: TrainingItemService
    ) {
    }

    ngOnInit() {
        if (!this.authService.isLoggedIn()) {
            this.router.navigate([""]);
        }
        this.paging = new PaginationModel(10, 1, "Name", 0, [], 0);
        this.searchModel = new GeneralSearchModel("", "", "", "", this.paging);
        this.trainingService.getTrainingList(this.searchModel).subscribe(items => this.ACdata = items, error => this.errorMessage = <any>error);
        this.brandService.getBrandList(this.searchModel).subscribe(items => this.brands = items.Data, error => this.errorMessage = <any>error);
        this.trainingAddForm = this.fb.group(
            {
                id: [""],
                name: ["", [Validators.required]],
                age: ["", [Validators.required]],
                isactive: [true]
            }
        );
        this.data = new Training("", false, "", "");
        this.itemid = "";
    }
    changePage(i: number) {
        this.searchModel.Paging.PageNumber = i;
        this.trainingService.getTrainingList(this.searchModel).subscribe(items => this.ACdata = items, error => this.errorMessage = <any>error);
    }

    changeSize(i: number) {
        if (i == 0) {
            this.searchModel.Paging.PageNumber = 0;
        } else {
            this.searchModel.Paging.PageSize = i;
            this.searchModel.Paging.PageNumber = 1;
        }

        this.trainingService.getTrainingList(this.searchModel).subscribe(items => this.ACdata = items, error => this.errorMessage = <any>error);
    }

    onSubmit(data: any) {
        console.log(data);
        var training = new Training("", data.isactive, data.name, data.age);
        this.trainingService.add(training).subscribe((data) => {
            if (data.error == null) {


                this.trainingService.getTrainingList(this.searchModel).subscribe(items => this.ACdata = items, error => this.errorMessage = <any>error);
                alert("added successfully");
                this.data = new Training("", false, "", "");
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
        this.trainingItemService.getTrainingItemList(this.searchModel).subscribe(items => this.trainingitems = items.Data, error => this.errorMessage = <any>error);
    }
    onUpdate(data: any) {
        // else, update it
        // var training = new Training(data.id, null, null, data.isactive, data.name, false, data.buyercode, data.acctype);
        console.log(data);
        this.trainingService.update(data).subscribe((data) => {
            if (data.error == null) {
                this.data = data;
                this.trainingService.getTrainingList(this.searchModel).subscribe(items => this.ACdata = items, error => this.errorMessage = <any>error);
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
            this.trainingService.get(id).subscribe((data) => {
                this.data = data;
            });
            this.trainingItemService.getTrainingItemList(this.searchModel).subscribe(items => this.trainingitems = items.Data, error => this.errorMessage = <any>error);

        }
    }
    isFormChanged(value) {
        this.trainingService.get(this.data.Id).subscribe((oldData) => {
            this.isFormDataChanged(oldData);
        });
    }

    isFormDataChanged(oldData: Training) {
        if (JSON.stringify(this.data) === JSON.stringify(oldData))
            this.isFormValuesChanged = false;
        else
            this.isFormValuesChanged = true;
    }
}