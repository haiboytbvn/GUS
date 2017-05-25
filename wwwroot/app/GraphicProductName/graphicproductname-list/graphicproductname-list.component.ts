import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from "@angular/core";
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { GraphicProductNameService } from "../shared/graphicproductname.service";
import { GraphicProductName } from "../shared/graphicproductname.model";
import { GraphicCategory} from "../../GraphicCategory/shared/graphiccategory.model";
import { GraphicCategoryService} from "../../GraphicCategory/shared/graphiccategory.service";
import { PaginationModel } from "../../Pagination/shared/pagination.model";
import { GeneralSearchModel } from "../../Pagination/shared/generalsearch.model";
import { GraphicProductNameListModel } from "../shared/graphicproductname-list.model";
import { Router } from "@angular/router";
import { AuthService } from "../../auth.service";
import { SearchGeneralFilter } from "../../SearchGeneralFilter/shared/searchGeneralFilter.model";
declare var jQuery: any;

@Component({
    selector: 'graphicproductname',
    templateUrl: 'app/GraphicProductName/graphicproductname-list/graphicproductname-list.component.html',
    providers: [ GraphicProductNameService, FormBuilder, GraphicCategoryService]
})

export class GraphicProductNameListComponent {
    data: GraphicProductName;
    title = "Wash Product Name";
    selectedData: GraphicProductName;
    errorMessage: string;
    searchModel: GeneralSearchModel;
    paging: PaginationModel;
    graphicproductnameAddForm: FormGroup;
    graphiccategories: GraphicProductName[];
    ACdata: GraphicProductNameListModel;
    pagesizearr: number[] = [10, 20, 30, 0];
    types: GraphicProductName[];
    itemid: string;
    isFormValuesChanged = false;
    graphicproductnameEditForm: FormGroup;
    categories: GraphicCategory[];
    constructor(private graphicproductnameService: GraphicProductNameService,
        private authService: AuthService,
        private fabcategoryService:GraphicCategoryService,
        private router: Router,
        private fb: FormBuilder,
        private acctypeService: GraphicProductNameService
    ) {
    }

    ngOnInit() {
        if (!this.authService.isLoggedIn()) {
            this.router.navigate([""]);
        }
        this.paging = new PaginationModel(10, 1, "Name", 0, [], 0);
        this.searchModel = new GeneralSearchModel("", "", "", "", this.paging);

        var pageall = new PaginationModel(10, 0, "Name", 0, [], 0);
        var getAll = new GeneralSearchModel("", "", "", "", pageall);
        this.graphicproductnameService.getGraphicProductNameList(this.searchModel).subscribe(items => this.ACdata = items, error => this.errorMessage = <any>error);
        this.fabcategoryService.getGraphicCategoryList(getAll).subscribe(items => this.categories = items.Data, error => this.errorMessage = <any>error);
        this.graphicproductnameAddForm = this.fb.group(
            {
                id: [""],
                name: ["", [Validators.required]],
                isactive: [true],
                acccategory:["",[Validators.required]]
            }
        );   
        this.data = new GraphicProductName("",false, "","");
        this.itemid = "";
    }
    changePage(i: number) {
        this.searchModel.Paging.PageNumber = i;
        this.graphicproductnameService.getGraphicProductNameList(this.searchModel).subscribe(items => this.ACdata = items, error => this.errorMessage = <any>error);
    }

    changeSize(i: number) {
        if (i == 0) {
            this.searchModel.Paging.PageNumber = 0;
        } else {
            this.searchModel.Paging.PageSize = i;
            this.searchModel.Paging.PageNumber = 1;
        }

        this.graphicproductnameService.getGraphicProductNameList(this.searchModel).subscribe(items => this.ACdata = items, error => this.errorMessage = <any>error);
    }
   
    onSubmit(data: any) {
        var apn = new GraphicProductName("", data.isactive, data.name, data.acccategory);
        this.graphicproductnameService.add(apn).subscribe((data) => {
            if (data.error == null) {


                this.graphicproductnameService.getGraphicProductNameList(this.searchModel).subscribe(items => this.ACdata = items, error => this.errorMessage = <any>error);
                alert("added successfully");
                this.data = new GraphicProductName("", false, "","");
                jQuery('#txtName').val('');
                jQuery('#drType').val('');
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
        jQuery('#drType').val('');
        jQuery('#ckIsActive').prop('checked', true);
    }
    onUpdate(data: any) {
        // else, update it
        // var graphicproductname = new GraphicProductName(data.id, null, null, data.isactive, data.name, false, data.buyercode, data.acctype);
        console.log(data);
        this.graphicproductnameService.update(data).subscribe((data) => {
            if (data.error == null) {
                this.data = data;
                this.graphicproductnameService.getGraphicProductNameList(this.searchModel).subscribe(items => this.ACdata = items, error => this.errorMessage = <any>error);
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
            this.graphicproductnameService.get(id).subscribe((data) => {
                this.data = data;
            });
        }
    }
    isFormChanged(value) {
        this.graphicproductnameService.get(this.data.Id).subscribe((oldData) => {
            this.isFormDataChanged(oldData);
        });
    }

    isFormDataChanged(oldData: GraphicProductName) {
        if (JSON.stringify(this.data) === JSON.stringify(oldData))
            this.isFormValuesChanged = false;
        else
            this.isFormValuesChanged = true;
    }
}