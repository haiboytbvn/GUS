import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { FabricsService } from "../shared/fabric.service";
import { Fabrics } from "../shared/fabric.model";
import { FabricListModel } from "../shared/fabric-list.model";
import { AuthService } from "../../auth.service";
import { FabricsSearchModel } from "../../Fabrics/shared/fabrics-search.model";
import { PaginationModel } from "../../Pagination/shared/pagination.model";
import { GeneralSearchModel } from "../../Pagination/shared/generalsearch.model";
declare var jQuery: any;

@Component({
    selector: 'fabrics',
    templateUrl: 'app/Fabrics/fabrics-list/fabrics-list.component.html',
    providers: [FabricsService]
})

export class FabricsListComponent {
    title: "Fabrics List";
    selectedData: Fabrics;
    errorMessage: string;
    toggle = false;
    isDelete = false;
    isLoading = false;
    paging: PaginationModel;
    ACdata: FabricListModel;
    pagesizearr: number[] = [10, 20, 30, 0];
    searchModel: FabricsSearchModel;
    Dropdowndata: FabricListModel;
    constructor(private fabricsService: FabricsService, private authService: AuthService, private router: Router, private activatedRoute: ActivatedRoute) {
    }

    ngOnInit() {
        if (!this.authService.isLoggedIn()) {
            this.router.navigate([""]);
        }

        var typeid = this.activatedRoute.snapshot.params["typeid"];
        var cateid = this.activatedRoute.snapshot.params["cateid"];
        var productnameid = this.activatedRoute.snapshot.params["productnameid"];

        this.title = "Fabrics List";
        this.paging = new PaginationModel(10, 1, "Name", 0, [], 0);
        this.searchModel = new FabricsSearchModel("", "", "", "", this.paging, typeid, cateid, productnameid);
        this.fabricsService.getFabricsList(this.searchModel).subscribe(items => this.ACdata = items, error => this.errorMessage = <any>error);
        this.fabricsService.getFabricsList(this.searchModel).subscribe(items => this.Dropdowndata = items, error => this.errorMessage = <any>error);
    }


    onSelect(data: Fabrics) {
        this.selectedData = data;
        this.router.navigate(["fabrics/edit", this.selectedData.Id]);
    }
    onEdit(id: string) {
        this.router.navigate(["fabrics/edit", id]);
    }

    onAdd() {
        this.router.navigate(["fabrics/add"]);
    }
    onsearchSubmit(data: any) {
        this.paging = new PaginationModel(10, 1, "Name", 0, [], 0);
        this.searchModel = new FabricsSearchModel(data.keyword, data.code, data.buyercode, "", this.paging, "", "", "");
        this.fabricsService.getFabricsList(this.searchModel).subscribe(items => this.ACdata = items, error => this.errorMessage = <any>error);
    }
    changePage(i: number) {
        this.searchModel.Paging.PageNumber = i;
        this.fabricsService.getFabricsList(this.searchModel).subscribe(items => this.ACdata = items, error => this.errorMessage = <any>error);
    }

    changeSize(i: number) {
        if (i == 0) {
            this.searchModel.Paging.PageNumber = 0;
        } else {
            this.searchModel.Paging.PageSize = i;
            this.searchModel.Paging.PageNumber = 1;
        }

        this.fabricsService.getFabricsList(this.searchModel).subscribe(items => this.ACdata = items, error => this.errorMessage = <any>error);
    }

}