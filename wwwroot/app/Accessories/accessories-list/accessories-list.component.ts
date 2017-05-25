import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { AccessoryService } from "../shared/accessories.service";
import { Accessory} from "../shared/accessories.model";
import { AccessoryListModel} from "../shared/accessory-list.model";
import { AuthService } from "../../auth.service";
import { AccessorySearchModel } from "../../Accessories/shared/accessory-search.model";
import { PaginationModel } from "../../Pagination/shared/pagination.model";
import { GeneralSearchModel } from "../../Pagination/shared/generalsearch.model";
declare var jQuery: any;

@Component({
    selector: 'accessories',
    templateUrl:'app/Accessories/accessories-list/accessories-list.component.html',
    providers: [AccessoryService]
})

export class AccessoriesListComponent {
    title: "Accessories List";
    selectedData: Accessory;
    errorMessage: string;
    toggle = false;
    isDelete = false;
    isLoading = false;
    paging: PaginationModel;
    ACdata: AccessoryListModel;
    pagesizearr: number[] = [10, 20, 30, 0];
    accessories: Accessory[];
    searchModel: AccessorySearchModel;
    Dropdowndata: AccessoryListModel;
    constructor(private accessoriesService: AccessoryService, private authService: AuthService, private router: Router, private activatedRoute: ActivatedRoute) {
    }

    ngOnInit() {
        if (!this.authService.isLoggedIn()) {
            this.router.navigate([""]);
        }
        // get params from leftmenu 

        var typeid = this.activatedRoute.snapshot.params["typeid"];
        var cateid = this.activatedRoute.snapshot.params["cateid"];
        var productnameid = this.activatedRoute.snapshot.params["productnameid"]; 

        this.title = "Accessories List";
        this.paging = new PaginationModel(10, 1, "Name", 0, [], 0);
        this.searchModel = new AccessorySearchModel("", "", "", "", this.paging, typeid, cateid, productnameid);
        this.accessoriesService.getAccessoryList(this.searchModel).subscribe(items => this.ACdata = items, error => this.errorMessage = <any>error);
        this.accessoriesService.getAccessoryList(this.searchModel).subscribe(items => this.Dropdowndata = items, error => this.errorMessage = <any>error);
    }


    onSelect(data: Accessory) {
        this.selectedData = data;
        this.router.navigate(["accessories/edit", this.selectedData.Id]);
    }
    onEdit(id: string) {
        this.router.navigate(["accessories/edit", id]);
    }
    onAdd() {
        this.router.navigate(["accessories/add"]);
    }
    onsearchSubmit(data: any) {
        this.paging = new PaginationModel(10, 1, "Name", 0, [], 0);
        this.searchModel = new AccessorySearchModel(data.keyword, data.code, data.buyercode, "", this.paging, "", "", "");
        this.accessoriesService.getAccessoryList(this.searchModel).subscribe(items => this.ACdata = items, error => this.errorMessage = <any>error);
    }
    changePage(i: number) {
        this.searchModel.Paging.PageNumber = i;
        this.accessoriesService.getAccessoryList(this.searchModel).subscribe(items => this.ACdata = items, error => this.errorMessage = <any>error);
    }

    changeSize(i: number) {
        if (i == 0) {
            this.searchModel.Paging.PageNumber = 0;
        } else {
            this.searchModel.Paging.PageSize = i;
            this.searchModel.Paging.PageNumber = 1;
        }

        this.accessoriesService.getAccessoryList(this.searchModel).subscribe(items => this.ACdata = items, error => this.errorMessage = <any>error);
    }
}