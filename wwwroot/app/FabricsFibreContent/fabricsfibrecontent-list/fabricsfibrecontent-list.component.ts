import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from "@angular/core";
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { FabricsFibreContentService } from "../shared/fabricsfibrecontent.service";
import { FabricsFibreContent } from "../shared/fabricsfibrecontent.model";
import { PaginationModel } from "../../Pagination/shared/pagination.model";
import { GeneralSearchModel } from "../../Pagination/shared/generalsearch.model";
import { FabricsFibreContentListModel } from "../shared/fabricsfibrecontent-list.model";
import { Router } from "@angular/router";
import { AuthService } from "../../auth.service";
import { SearchGeneralFilter } from "../../SearchGeneralFilter/shared/searchGeneralFilter.model";
declare var jQuery: any;

@Component({
    selector: 'fabricsfibrecontent',
    templateUrl: 'app/FabricsFibreContent/fabricsfibrecontent-list/fabricsfibrecontent-list.component.html',
    providers: [FabricsFibreContentService, FabricsFibreContentService, FormBuilder]
})

export class FabricsFibreContentListComponent {
    data: FabricsFibreContent;
    title = "Fabrics Fibre Content";
    selectedData: FabricsFibreContent;
    errorMessage: string;
    searchModel: GeneralSearchModel;
    paging: PaginationModel;
    fabricsfibrecontentAddForm: FormGroup;
    accessorycategories: FabricsFibreContent[];
    ACdata: FabricsFibreContentListModel;
    pagesizearr: number[] = [10, 20, 30, 0];
    types: FabricsFibreContent[];
    itemid: string;
    isFormValuesChanged = false;
    fabricsfibrecontentEditForm: FormGroup;
    constructor(private fabricsfibrecontentService: FabricsFibreContentService,
        private authService: AuthService,
        private router: Router,
        private fb: FormBuilder,
        private acctypeService: FabricsFibreContentService
    ) {
    }

    ngOnInit() {
        if (!this.authService.isLoggedIn()) {
            this.router.navigate([""]);
        }
        this.paging = new PaginationModel(10, 1, "Name", 0, [], 0);
        this.searchModel = new GeneralSearchModel("", "", "", "", this.paging);
        this.fabricsfibrecontentService.getFabricsFibreContentList(this.searchModel).subscribe(items => this.ACdata = items, error => this.errorMessage = <any>error);
        this.fabricsfibrecontentAddForm = this.fb.group(
            {
                id: [""],
                name: ["", [Validators.required]],
                isactive: [true]
            }
        );
        this.data = new FabricsFibreContent("", false, "");
        this.itemid = "";
    }
    changePage(i: number) {
        this.searchModel.Paging.PageNumber = i;
        this.fabricsfibrecontentService.getFabricsFibreContentList(this.searchModel).subscribe(items => this.ACdata = items, error => this.errorMessage = <any>error);
    }

    changeSize(i: number) {
        if (i == 0) {
            this.searchModel.Paging.PageNumber = 0;
        } else {
            this.searchModel.Paging.PageSize = i;
            this.searchModel.Paging.PageNumber = 1;
        }

        this.fabricsfibrecontentService.getFabricsFibreContentList(this.searchModel).subscribe(items => this.ACdata = items, error => this.errorMessage = <any>error);
    }

    onSubmit(data: any) {
        console.log(data);
        var fabricsfibrecontent = new FabricsFibreContent("", data.isactive, data.name);
        this.fabricsfibrecontentService.add(fabricsfibrecontent).subscribe((data) => {
            if (data.error == null) {


                this.fabricsfibrecontentService.getFabricsFibreContentList(this.searchModel).subscribe(items => this.ACdata = items, error => this.errorMessage = <any>error);
                alert("added successfully");
                this.data = new FabricsFibreContent("", false, "");
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
        // var fabricsfibrecontent = new FabricsFibreContent(data.id, null, null, data.isactive, data.name, false, data.buyercode, data.acctype);
        console.log(data);
        this.fabricsfibrecontentService.update(data).subscribe((data) => {
            if (data.error == null) {
                this.data = data;
                this.fabricsfibrecontentService.getFabricsFibreContentList(this.searchModel).subscribe(items => this.ACdata = items, error => this.errorMessage = <any>error);
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
            this.fabricsfibrecontentService.get(id).subscribe((data) => {
                this.data = data;
            });
        }
    }
    isFormChanged(value) {
        this.fabricsfibrecontentService.get(this.data.Id).subscribe((oldData) => {
            this.isFormDataChanged(oldData);
        });
    }

    isFormDataChanged(oldData: FabricsFibreContent) {
        if (JSON.stringify(this.data) === JSON.stringify(oldData))
            this.isFormValuesChanged = false;
        else
            this.isFormValuesChanged = true;
    }
}