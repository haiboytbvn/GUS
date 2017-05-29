import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import {WashService } from "../shared/wash.service";
import {Wash } from "../shared/wash.model";
import {WashListModel } from "../shared/wash-list.model";
import { AuthService } from "../../auth.service";
import {WashSearchModel } from "../../Wash/shared/wash-search.model";
import { PaginationModel } from "../../Pagination/shared/pagination.model";
import { GeneralSearchModel } from "../../Pagination/shared/generalsearch.model";
declare var jQuery: any;

@Component({
    selector: 'wash',
    templateUrl: 'app/Wash/wash-list/wash-list.component.html',
    providers: [WashService]
})

export class WashListComponent {
    title: "Wash List";
    selectedData:Wash;
    errorMessage: string;
    toggle = false;
    isDelete = false;
    isLoading = false;
    paging: PaginationModel;
    ACdata:WashListModel;
    pagesizearr: number[] = [10, 20, 30, 0];
    wash:Wash[];
    searchModel: WashSearchModel;
    Dropdowndata: WashListModel;
    constructor(private washService:WashService, private authService: AuthService, private router: Router, private activatedRoute: ActivatedRoute) {
    }

    ngOnInit() {
        if (!this.authService.isLoggedIn()) {
            this.router.navigate([""]);
        }
        // get params from leftmenu 

        var typeid = this.activatedRoute.snapshot.params["typeid"];
        var cateid = this.activatedRoute.snapshot.params["cateid"];
        var productnameid = this.activatedRoute.snapshot.params["productnameid"];

        this.title = "Wash List";
        this.paging = new PaginationModel(10, 1, "Name", 0, [], 0);
        var getAllpaging = new PaginationModel(10, 0, "Name", 0, [], 0);
        this.searchModel = new WashSearchModel("", "", "", "", this.paging, typeid, cateid, productnameid);
        var getAllsearch = new WashSearchModel("", "", "", "", getAllpaging, typeid, cateid, productnameid);
        this.washService.getWashList(this.searchModel).subscribe(items => this.ACdata = items, error => this.errorMessage = <any>error);
        this.washService.getWashList(getAllsearch).subscribe(items => this.Dropdowndata = items, error => this.errorMessage = <any>error);
    }


    onSelect(data:Wash) {
        this.selectedData = data;
        this.router.navigate(["wash/edit", this.selectedData.Id]);
    }
    onEdit(id: string) {
        this.router.navigate(["wash/edit", id]);
    }

    onAdd() {
        this.router.navigate(["wash/add"]);
    }
    onsearchSubmit(data: any) {
        console.log(data);
        this.paging = new PaginationModel(10, 1, "Name", 0, [], 0);
        this.searchModel = new WashSearchModel(data.keyword, data.code, data.buyercode, "", this.paging, "", "", "")
        this.washService.getWashList(this.searchModel).subscribe(items => this.ACdata = items, error => this.errorMessage = <any>error);
    }
    changePage(i: number) {
        this.searchModel.Paging.PageNumber = i;
        this.washService.getWashList(this.searchModel).subscribe(items => this.ACdata = items, error => this.errorMessage = <any>error);
    }

    changeSize(i: number) {
        if (i == 0) {
            this.searchModel.Paging.PageNumber = 0;
        } else {
            this.searchModel.Paging.PageSize = i;
            this.searchModel.Paging.PageNumber = 1;
        }

        this.washService.getWashList(this.searchModel).subscribe(items => this.ACdata = items, error => this.errorMessage = <any>error);
    }

}