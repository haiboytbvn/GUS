import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from "@angular/core";
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { GraphicTypeService } from "../shared/graphictype.service";
import { GraphicType } from "../shared/graphictype.model";
import { PaginationModel } from "../../Pagination/shared/pagination.model";
import { GeneralSearchModel } from "../../Pagination/shared/generalsearch.model";
import { GraphicTypeListModel } from "../shared/graphictype-list.model";
import { Router } from "@angular/router";
import { AuthService } from "../../auth.service";
import { SearchGeneralFilter } from "../../SearchGeneralFilter/shared/searchGeneralFilter.model";
declare var jQuery: any;

@Component({
    selector: 'graphictype',
    templateUrl: 'app/GraphicType/graphictype-list/graphictype-list.component.html',
    providers: [GraphicTypeService, GraphicTypeService, FormBuilder]
})

export class GraphicTypeListComponent {
    data: GraphicType;
    title = "Graphic Type";
    selectedData: GraphicType;
    errorMessage: string;
    searchModel: GeneralSearchModel;
    paging: PaginationModel;
    graphictypeAddForm: FormGroup;
    accessorycategories: GraphicType[];
    ACdata: GraphicTypeListModel;
    pagesizearr: number[] = [10, 20, 30, 0];
    types: GraphicType[];
    itemid: string;
    isFormValuesChanged = false;
    graphictypeEditForm: FormGroup;
    constructor(private graphictypeService: GraphicTypeService,
        private authService: AuthService,
        private router: Router,
        private fb: FormBuilder,
        private acctypeService: GraphicTypeService
    ) {
    }

    ngOnInit() {
        if (!this.authService.isLoggedIn()) {
            this.router.navigate([""]);
        }
        this.paging = new PaginationModel(10, 1, "Name", 0, [], 0);
        this.searchModel = new GeneralSearchModel("", "", "", "", this.paging);
        this.graphictypeService.getGraphicTypeList(this.searchModel).subscribe(items => this.ACdata = items, error => this.errorMessage = <any>error);
        this.graphictypeAddForm = this.fb.group(
            {
                id: [""],
                name: ["", [Validators.required]],
                isactive: [true]
            }
        );   
        this.data = new GraphicType("",false, "");
        this.itemid = "";
    }
    changePage(i: number) {
        this.searchModel.Paging.PageNumber = i;
        this.graphictypeService.getGraphicTypeList(this.searchModel).subscribe(items => this.ACdata = items, error => this.errorMessage = <any>error);
    }

    changeSize(i: number) {
        if (i == 0) {
            this.searchModel.Paging.PageNumber = 0;
        } else {
            this.searchModel.Paging.PageSize = i;
            this.searchModel.Paging.PageNumber = 1;
        }

        this.graphictypeService.getGraphicTypeList(this.searchModel).subscribe(items => this.ACdata = items, error => this.errorMessage = <any>error);
    }
   
    onSubmit(data: any) {
        console.log(data);
        var graphictype = new GraphicType("", data.isactive, data.name);
        this.graphictypeService.add(graphictype).subscribe((data) => {
            if (data.error == null) {


                this.graphictypeService.getGraphicTypeList(this.searchModel).subscribe(items => this.ACdata = items, error => this.errorMessage = <any>error);
                alert("added successfully");
                this.data = new GraphicType("", false, "");
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
        // var graphictype = new GraphicType(data.id, null, null, data.isactive, data.name, false, data.buyercode, data.acctype);
        console.log(data);
        this.graphictypeService.update(data).subscribe((data) => {
            if (data.error == null) {
                this.data = data;
                this.graphictypeService.getGraphicTypeList(this.searchModel).subscribe(items => this.ACdata = items, error => this.errorMessage = <any>error);
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
            this.graphictypeService.get(id).subscribe((data) => {
                this.data = data;
            });
        }
    }
    isFormChanged(value) {
        this.graphictypeService.get(this.data.Id).subscribe((oldData) => {
            this.isFormDataChanged(oldData);
        });
    }

    isFormDataChanged(oldData: GraphicType) {
        if (JSON.stringify(this.data) === JSON.stringify(oldData))
            this.isFormValuesChanged = false;
        else
            this.isFormValuesChanged = true;
    }
}