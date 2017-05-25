import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { GraphicService } from "../shared/graphic.service";
import {Graphic } from "../shared/graphic.model";
import { GraphicListModel } from "../shared/graphic-list.model";
import { AuthService } from "../../auth.service";
import { GraphicSearchModel } from "../../Graphic/shared/graphic-search.model";
import { PaginationModel } from "../../Pagination/shared/pagination.model";
import { GeneralSearchModel } from "../../Pagination/shared/generalsearch.model";
declare var jQuery: any;

@Component({
    selector: 'graphic',
    templateUrl: 'app/Graphic/graphic-list/graphic-list.component.html',
    providers: [GraphicService]
})

export class GraphicListComponent {
    title: "Graphic List";
    selectedData:Graphic;
    errorMessage: string;
    toggle = false;
    isDelete = false;
    isLoading = false;
    paging: PaginationModel;
    ACdata: GraphicListModel;
    pagesizearr: number[] = [10, 20, 30, 0];
    graphic:Graphic[];
    searchModel: GraphicSearchModel;
    Dropdowndata: GraphicListModel;
    constructor(private graphicService: GraphicService, private authService: AuthService, private router: Router, private activatedRoute: ActivatedRoute) {
    }

    ngOnInit() {
        if (!this.authService.isLoggedIn()) {
            this.router.navigate([""]);
        }
        // get params from leftmenu 

        var typeid = this.activatedRoute.snapshot.params["typeid"];
        var cateid = this.activatedRoute.snapshot.params["cateid"];
        var productnameid = this.activatedRoute.snapshot.params["productnameid"];

        this.title = "Graphic List";
        this.paging = new PaginationModel(10, 1, "Name", 0, [], 0);
        var getAll = new PaginationModel(10, 0, "Name", 0, [], 0);
        this.searchModel = new GraphicSearchModel("", "", "", "", this.paging, typeid, cateid, productnameid);
        var getallSearchModel = new GraphicSearchModel("", "", "", "", this.paging, typeid, cateid, productnameid);
        this.graphicService.getGraphicList(this.searchModel).subscribe(items => this.ACdata = items, error => this.errorMessage = <any>error);
        this.graphicService.getGraphicList(getallSearchModel).subscribe(items => this.Dropdowndata = items, error => this.errorMessage = <any>error);
    }
    onEdit(id: string) {
        this.router.navigate(["graphic/edit", id]);
    }

    onSelect(data:Graphic) {
        this.selectedData = data;
        this.router.navigate(["graphic/edit", this.selectedData.Id]);
    }
 
    onAdd() {
        this.router.navigate(["graphic/add"]);
    }

    onsearchSubmit(data: any) {
        this.paging = new PaginationModel(10, 1, "Name", 0, [], 0);
        this.searchModel = new GraphicSearchModel(data.keyword, data.code, data.buyercode, "", this.paging, "", "", "");
        this.graphicService.getGraphicList(this.searchModel).subscribe(items => this.Dropdowndata = items, error => this.errorMessage = <any>error);
    }
    changePage(i: number) {
        this.searchModel.Paging.PageNumber = i;
        this.graphicService.getGraphicList(this.searchModel).subscribe(items => this.Dropdowndata = items, error => this.errorMessage = <any>error);
    }

    changeSize(i: number) {
        if (i == 0) {
            this.searchModel.Paging.PageNumber = 0;
        } else {
            this.searchModel.Paging.PageSize = i;
            this.searchModel.Paging.PageNumber = 1;
        }

        this.graphicService.getGraphicList(this.searchModel).subscribe(items => this.Dropdowndata = items, error => this.errorMessage = <any>error);
    }
}