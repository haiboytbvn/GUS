import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from "@angular/core";
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { GraphicCategoryService } from "../shared/graphiccategory.service";
import { GraphicCategory } from "../shared/graphiccategory.model";
import { PaginationModel } from "../../Pagination/shared/pagination.model";
import { GraphicCategoryListModel } from "../shared/graphiccategory-list.model";
import { Router } from "@angular/router";
import { AuthService } from "../../auth.service";
import { GraphicTypeService } from "../../GraphicType/shared/graphictype.service";
import { GraphicType } from "../../GraphicType/shared/graphictype.model";
import { GraphicTypeListModel } from "../../GraphicType/shared/graphictype-list.model";
import { SearchGeneralFilter } from "../../SearchGeneralFilter/shared/searchGeneralFilter.model";
import { GeneralSearchModel } from "../../Pagination/shared/generalsearch.model";
declare var jQuery: any;

@Component({
    selector: 'graphiccategory',
    templateUrl: 'app/GraphicCategory/graphiccategory-list/graphiccategory-list.component.html',
    providers: [GraphicCategoryService, GraphicTypeService, FormBuilder]
})

export class GraphicCategoryListComponent {
    data: GraphicCategory;
    title = "Graphic Category";
    selectedData: GraphicCategory;
    errorMessage: string;
    searchModel: GeneralSearchModel;
    paging: PaginationModel;
    graphiccategoryAddForm: FormGroup;
    accessorycategories: GraphicCategory[];
    ACdata: GraphicCategoryListModel;
    pagesizearr: number[] = [10, 20, 30, 0];
    types: GraphicTypeListModel;
    itemid: string;
    isFormValuesChanged = false;
    graphiccategoryEditForm: FormGroup;
    constructor(private graphiccategoryService: GraphicCategoryService,
        private authService: AuthService,
        private router: Router,
        private fb: FormBuilder,
        private graphictypeService: GraphicTypeService
    ) {
    }

    ngOnInit() {
        if (!this.authService.isLoggedIn()) {
            this.router.navigate([""]);
        }
        this.paging = new PaginationModel(10, 1, "Name", 0, [], 0);
        this.searchModel = new GeneralSearchModel("", "", "", "", this.paging);
        this.graphiccategoryService.getGraphicCategoryList(this.searchModel).subscribe(items => this.ACdata = items, error => this.errorMessage = <any>error);
        this.graphiccategoryAddForm = this.fb.group(
            {
                name: ["", [Validators.required]],
                isactive: [true],
                acctype: ["", [Validators.required]]
            }
        );

        var pageall = new PaginationModel(10, 0, "Name", 0, [], 0);
        var getAll = new GeneralSearchModel("", "", "", "", pageall);
        this.graphictypeService.getGraphicTypeList(getAll).subscribe(items => this.types = items, error => this.errorMessage = <any>error);
        this.data = new GraphicCategory("", false, "", "");
        this.itemid = "";
    }
    changePage(i: number) {
        this.searchModel.Paging.PageNumber = i;
        this.graphiccategoryService.getGraphicCategoryList(this.searchModel).subscribe(items => this.ACdata = items, error => this.errorMessage = <any>error);
    }

    changeSize(i: number) {
        if (i == 0) {
            this.searchModel.Paging.PageNumber = 0;
        } else {
            this.searchModel.Paging.PageSize = i;
            this.searchModel.Paging.PageNumber = 1;
        }

        this.graphiccategoryService.getGraphicCategoryList(this.searchModel).subscribe(items => this.ACdata = items, error => this.errorMessage = <any>error);
    }



    onSubmit(data: any) {

        var graphiccategory = new GraphicCategory("", data.isactive, data.name, data.acctype);
        this.graphiccategoryService.add(graphiccategory).subscribe((data) => {
            if (data.error == null) {


                this.graphiccategoryService.getGraphicCategoryList(this.searchModel).subscribe(items => this.ACdata = items, error => this.errorMessage = <any>error);
                alert("added successfully");
                this.data = new GraphicCategory("", false, "", "");
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
        // var graphiccategory = new GraphicCategory(data.id, null, null, data.isactive, data.name, false, data.buyercode, data.acctype);
        console.log(data);
        this.graphiccategoryService.update(data).subscribe((data) => {
            if (data.error == null) {
                this.data = data;
                this.graphiccategoryService.getGraphicCategoryList(this.searchModel).subscribe(items => this.ACdata = items, error => this.errorMessage = <any>error);
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
            this.graphiccategoryService.get(id).subscribe((data) => {
                this.data = data;
            });
        }
    }
    isFormChanged(value) {
        this.graphiccategoryService.get(this.data.Id).subscribe((oldData) => {
            this.isFormDataChanged(oldData);
        });
    }

    isFormDataChanged(oldData: GraphicCategory) {
        if (JSON.stringify(this.data) === JSON.stringify(oldData))
            this.isFormValuesChanged = false;
        else
            this.isFormValuesChanged = true;
    }
}