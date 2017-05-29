import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from "@angular/core";
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { RelTrainingTrainingItemService } from "../shared/reltrainingtrainingitem.service";
import { RelTrainingTrainingItem } from "../shared/reltrainingtrainingitem.model";
import { PaginationModel } from "../../Pagination/shared/pagination.model";
import { GeneralSearchModel } from "../../Pagination/shared/generalsearch.model";

import { Router } from "@angular/router";
import { AuthService } from "../../auth.service";
import { SearchGeneralFilter } from "../../SearchGeneralFilter/shared/searchGeneralFilter.model";
import { TrainingItem } from "../../TrainingItem/shared/trainingitem.model";
import { TrainingItemService } from "../../TrainingItem/shared/trainingitem.service";
declare var jQuery: any;

@Component({
    selector: 'reltrainingtrainingitem',
    templateUrl: 'app/RelTrainingTrainingItem/reltrainingtrainingitem/reltrainingtrainingitem.component.html',
    providers: [RelTrainingTrainingItemService, RelTrainingTrainingItemService, FormBuilder, TrainingItemService]
})

export class RelTrainingTrainingItemComponent {
    data: RelTrainingTrainingItem[];
    title = "RelTrainingTrainingItem";
    selectedData: RelTrainingTrainingItem;
    errorMessage: string;
    searchModel: GeneralSearchModel;
    paging: PaginationModel;
    reltrainingtrainingitemAddForm: FormGroup;
    accessorycategories: RelTrainingTrainingItem[];
    pagesizearr: number[] = [10, 20, 30, 0];
    types: RelTrainingTrainingItem[];
    itemid: string;
    isFormValuesChanged = false;
    reltrainingtrainingitemEditForm: FormGroup;
    trainingitems: TrainingItem[];


    constructor(private reltrainingtrainingitemService: RelTrainingTrainingItemService,
        private authService: AuthService,
        private router: Router,
        private fb: FormBuilder,
        private acctypeService: RelTrainingTrainingItemService,
        private trainingItemService: TrainingItemService
    ) {
    }

    ngOnInit() {
        if (!this.authService.isLoggedIn()) {
            this.router.navigate([""]);
        }
        this.trainingItemService.getTrainingItemList(this.searchModel).subscribe(items => this.trainingitems = items.Data, error => this.errorMessage = <any>error);

    }
  
   
}