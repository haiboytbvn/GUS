import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from "@angular/core";
import { ColorService } from "../shared/color.service";
import { Color } from "../shared/color.model";
import { ColorListModel } from "../shared/color-list.model";
import { Router } from "@angular/router";
import { AuthService } from "../../auth.service";
import { ColorSearchModel } from "../../Color/shared/color-search.model";
import { PaginationModel } from "../../Pagination/shared/pagination.model";
declare var jQuery: any;

@Component({
    selector: 'color',
    templateUrl: 'app/Color/color-list/color-list.component.html',
    providers: [ColorService]
})

export class ColorListComponent {
    title: "Color List";
    selectedData: Color;
    errorMessage: string;
    toggle = false;
    isDelete = false;
    isLoading = false;
    paging: PaginationModel;
    ACdata: ColorListModel;
    Dropdowndata: ColorListModel;
    pagesizearr: number[] = [10, 20, 30, 0];
    color: Color[];
    searchModel: ColorSearchModel;
    isListing: boolean;
    constructor(private colorService: ColorService, private authService: AuthService, private router: Router) {
    }

    ngOnInit() {
        if (!this.authService.isLoggedIn()) {
            this.router.navigate([""]);
        }
        this.isListing = true;
        this.paging = new PaginationModel(10, 1, "Name", 0, [], 0);
        this.searchModel = new ColorSearchModel("", "", "", "", this.paging);
        this.colorService.getColorList(this.searchModel).subscribe(items => this.ACdata = items, error => this.errorMessage = <any>error);
        this.colorService.getColorList(this.searchModel).subscribe(items => this.Dropdowndata = items, error => this.errorMessage = <any>error);
    }


    onSelect(data: Color) {
        this.selectedData = data;
        this.router.navigate(["color/edit", this.selectedData.Id]);
    }
    onEdit(id: string) {
        this.router.navigate(["color/edit", id]);
    }
    changeListViewMode() {
        this.isListing = true;
        this.colorService.getColorList(this.searchModel).subscribe(items => this.ACdata = items, error => this.errorMessage = <any>error);

    }
    changeThumbMode() {

        this.isListing = false;
        this.colorService.getColorList(this.searchModel).subscribe(items => this.ACdata = items, error => this.errorMessage = <any>error);

    }
    onAdd() {
        this.router.navigate(["color/add"]);
    }
    onsearchSubmit(data:any) {
        this.paging = new PaginationModel(10, 1, "Name", 0, [], 0);
        this.searchModel = new ColorSearchModel(data.keyword,data.code,data.buyercode,"",this.paging);
        this.colorService.getColorList(this.searchModel).subscribe(items => this.ACdata = items, error => this.errorMessage = <any>error);
    }
    changePage(i: number) {
        this.searchModel.Paging.PageNumber = i;
        this.colorService.getColorList(this.searchModel).subscribe(items => this.ACdata = items, error => this.errorMessage = <any>error);
    }

    changeSize(i: number) {
        if (i == 0) {
            this.searchModel.Paging.PageNumber = 0;
        } else {
            this.searchModel.Paging.PageSize = i;
            this.searchModel.Paging.PageNumber = 1;
        }

        this.colorService.getColorList(this.searchModel).subscribe(items => this.ACdata = items, error => this.errorMessage = <any>error);
    }

}