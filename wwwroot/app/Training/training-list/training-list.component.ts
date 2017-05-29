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
import { RelTrainingTrainingItem } from "../../RelTrainingTrainingItem/shared/reltrainingtrainingitem.model";
import { RelTrainingTrainingItemService } from "../../RelTrainingTrainingItem/shared/reltrainingtrainingitem.service";
declare var jQuery: any;

@Component({
    selector: 'training',
    templateUrl: 'app/Training/training-list/training-list.component.html',
    providers: [TrainingService, FormBuilder, BrandService, TrainingItemService, RelTrainingTrainingItemService]
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
    reltrainingtrainingitems: RelTrainingTrainingItem[];
    items: string[];
    trainingItems: string[];
    constructor(
        private trainingService: TrainingService,
        private authService: AuthService,
        private router: Router,
        private fb: FormBuilder,
        private acctypeService: TrainingService,
        private brandService: BrandService,
        private trainingItemService: TrainingItemService,
        private relTrainingTrainingTtemService: RelTrainingTrainingItemService
    ) {
    }

    ngOnInit() {
        if (!this.authService.isLoggedIn()) {
            this.router.navigate([""]);
        }
        this.items = [];
        this.trainingItems = [];
        this.paging = new PaginationModel(10, 1, "Name", 0, [], 0);
        this.searchModel = new GeneralSearchModel("", "", "", "", this.paging);
        this.trainingService.getTrainingList(this.searchModel).subscribe(items => this.ACdata = items, error => this.errorMessage = <any>error);
        this.brandService.getBrandList(this.searchModel).subscribe(items => this.brands = items.Data, error => this.errorMessage = <any>error);
        this.trainingAddForm = this.fb.group(
            {
                id: [""],
                name: ["", [Validators.required]],
                age: ["", [Validators.required]],
                isactive: [true],
                isselected: [false]
            }
        );
        this.data = new Training("", false, "", "", []);
        this.itemid = "";
        this.reltrainingtrainingitems = new Array<RelTrainingTrainingItem>();
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
        // get items id arry



        var training = new Training("", data.isactive, data.name, data.age, this.trainingItems);
        this.trainingService.add(training).subscribe((data) => {
            if (data.error == null) {

                this.trainingService.getTrainingList(this.searchModel).subscribe(items => this.ACdata = items, error => this.errorMessage = <any>error);
                alert("added successfully");

                this.data = new Training("", false, "", "", []);
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
        jQuery('#txtAge').val('');
        jQuery('#ckIsActive').prop('checked', true);
        this.trainingItemService.getTrainingItemListForModal(this.searchModel).subscribe(items => this.trainingitems = items, error => this.errorMessage = <any>error);
        this.trainingItems = [];
    }
    onUpdate(data: any) {

        this.data.Items = this.trainingItems;
        this.trainingService.update(this.data).subscribe((data) => {
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
        // get training item ids and save into trainingItems array

        this.trainingItems = [];
        this.itemid = id;
        if (id !== "") {
            this.trainingService.get(id).subscribe((data) => {
                this.data = data;
                for (var i = 0; i < data.Items.length; i++) {
                    this.trainingItems.push(data.Items[i]);
                }
            });
            this.trainingItemService.getTrainingItemListForModal(this.searchModel).subscribe(items => this.trainingitems = items, error => this.errorMessage = <any>error);
            console.log(this.data.Items);
            //for (var j = 0; j < this.data.Items.length; j++){
            //    this.isCheck(this.data.Items[j]);
            //}
        }

    }


    IsIntheList(id: string) {
        for (var i = 0; i < this.trainingItems.length; i++) {
            if (this.trainingItems[i] === id) {
                return true;
            }
        }
        return false;
    }

    //isCheck(item: string) {
    //    for (var i = 0; i < this.trainingitems.length; i++) {
    //        if (item == this.trainingitems[i].Id) {
    //            (jQuery('#chkItem-' + i).attr("checked", "checked"));
    //            break;
    //        }
    //    }
    //}

    isFormChanged(value) {
        this.trainingService.get(this.data.Id).subscribe((oldData) => {
            this.isFormDataChanged(oldData);
        });
    }
    onChangeItem(e: any, id: string) {
        this.isFormValuesChanged = true;
        if (e.target.checked) {
            this.trainingItems.push(id);
            console.log(this.trainingItems);
        }
        else {
            for (var i = 0; i < this.trainingItems.length; i++) {
                if (this.trainingItems[i] === id) {
                    this.trainingItems.splice(i, 1);
                }
            }
        }
    }

    isFormDataChanged(oldData: Training) {
        if (JSON.stringify(this.data) === JSON.stringify(oldData))
            this.isFormValuesChanged = false;
        else
            this.isFormValuesChanged = true;
    }


    onDelete(id: string) {
        this.itemid = id;
        if (id !== "") {
            this.trainingService.get(id).subscribe((data) => {
                this.data = data;
            });
        }
    }

    onRemove(id: string) {
        this.trainingService.delete(id).subscribe((data) => {
            if (data.error == null) {
                this.data = data;
                this.trainingService.getTrainingList(this.searchModel).subscribe(items => this.ACdata = items, error => this.errorMessage = <any>error);
                alert("deleted successfully");
                jQuery('#myModalDelete').modal('hide');
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

}