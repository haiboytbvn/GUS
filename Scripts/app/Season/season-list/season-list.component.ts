import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from "@angular/core";
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { SeasonService } from "../shared/season.service";
import { Season } from "../shared/season.model";
import { PaginationModel } from "../../Pagination/shared/pagination.model";
import { GeneralSearchModel } from "../../Pagination/shared/generalsearch.model";
import { SeasonListModel } from "../shared/season-list.model";
import { Router } from "@angular/router";
import { AuthService } from "../../auth.service";
import { SearchGeneralFilter } from "../../SearchGeneralFilter/shared/searchGeneralFilter.model";
declare var jQuery: any;

@Component({
    selector: 'season',
    templateUrl: 'app/Season/season-list/season-list.component.html',
    providers: [SeasonService, SeasonService, FormBuilder]
})

export class SeasonListComponent {
    data: Season;
    title = "Season";
    selectedData: Season;
    errorMessage: string;
    searchModel: GeneralSearchModel;
    paging: PaginationModel;
    seasonAddForm: FormGroup;
    accessorycategories: Season[];
    ACdata: SeasonListModel;
    pagesizearr: number[] = [10, 20, 30, 0];
    types: Season[];
    itemid: string;
    isFormValuesChanged = false;
    seasonEditForm: FormGroup;
    constructor(private seasonService: SeasonService,
        private authService: AuthService,
        private router: Router,
        private fb: FormBuilder,
        private acctypeService: SeasonService
    ) {
    }

    ngOnInit() {
        if (!this.authService.isLoggedIn()) {
            this.router.navigate([""]);
        }
        this.paging = new PaginationModel(10, 1, "Name", 0, [], 0);
        this.searchModel = new GeneralSearchModel("", "", "", "", this.paging);
        this.seasonService.getSeasonList(this.searchModel).subscribe(items => this.ACdata = items, error => this.errorMessage = <any>error);
        this.seasonAddForm = this.fb.group(
            {
                id: [""],
                name: ["", [Validators.required]],
                isactive: [true]
            }
        );
        this.data = new Season("", false, "");
        this.itemid = "";
    }
    changePage(i: number) {
        this.searchModel.Paging.PageNumber = i;
        this.seasonService.getSeasonList(this.searchModel).subscribe(items => this.ACdata = items, error => this.errorMessage = <any>error);
    }

    changeSize(i: number) {
        if (i == 0) {
            this.searchModel.Paging.PageNumber = 0;
        } else {
            this.searchModel.Paging.PageSize = i;
            this.searchModel.Paging.PageNumber = 1;
        }

        this.seasonService.getSeasonList(this.searchModel).subscribe(items => this.ACdata = items, error => this.errorMessage = <any>error);
    }

    onSubmit(data: any) {
        console.log(data);
        var season = new Season("", data.isactive, data.name);
        this.seasonService.add(season).subscribe((data) => {
            if (data.error == null) {


                this.seasonService.getSeasonList(this.searchModel).subscribe(items => this.ACdata = items, error => this.errorMessage = <any>error);
                alert("added successfully");
                this.data = new Season("", false, "");
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
        // var season = new Season(data.id, null, null, data.isactive, data.name, false, data.buyercode, data.acctype);
        console.log(data);
        this.seasonService.update(data).subscribe((data) => {
            if (data.error == null) {
                this.data = data;
                this.seasonService.getSeasonList(this.searchModel).subscribe(items => this.ACdata = items, error => this.errorMessage = <any>error);
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
            this.seasonService.get(id).subscribe((data) => {
                this.data = data;
            });
        }
    }
    isFormChanged(value) {
        this.seasonService.get(this.data.Id).subscribe((oldData) => {
            this.isFormDataChanged(oldData);
        });
    }

    isFormDataChanged(oldData: Season) {
        if (JSON.stringify(this.data) === JSON.stringify(oldData))
            this.isFormValuesChanged = false;
        else
            this.isFormValuesChanged = true;
    }
}