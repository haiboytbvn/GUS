import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from "@angular/core";
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { FabricsCategoryService } from "../shared/fabricscategory.service";
import { FabricsCategory } from "../shared/fabricscategory.model";
import { PaginationModel } from "../../Pagination/shared/pagination.model";
import { FabricsCategoryListModel } from "../shared/fabricscategory-list.model";
import { Router } from "@angular/router";
import { AuthService } from "../../auth.service";
import { FabricsTypeService } from "../../FabricsType/shared/fabricstype.service";
import { FabricsType } from "../../FabricsType/shared/fabricstype.model";
import { FabricsTypeListModel } from "../../FabricsType/shared/fabricstype-list.model";
import { SearchGeneralFilter } from "../../SearchGeneralFilter/shared/searchGeneralFilter.model";
import { GeneralSearchModel } from "../../Pagination/shared/generalsearch.model";
declare var jQuery: any;

@Component({
    selector: 'fabricscategory',
    templateUrl: 'app/FabricsCategory/fabricscategory-list/fabricscategory-list.component.html',
    providers: [FabricsCategoryService, FabricsTypeService, FormBuilder]
})

export class FabricsCategoryListComponent {
    data: FabricsCategory;
    title = "Fabrics Category";
    selectedData: FabricsCategory;
    errorMessage: string;
    searchModel: GeneralSearchModel;
    paging: PaginationModel;
    fabricscategoryAddForm: FormGroup;
    accessorycategories: FabricsCategory[];
    ACdata: FabricsCategoryListModel;
    pagesizearr: number[] = [10, 20, 30, 0];
    types: FabricsTypeListModel;
    itemid: string;
    isFormValuesChanged = false;
    fabricscategoryEditForm: FormGroup;
    constructor(private fabricscategoryService: FabricsCategoryService,
        private authService: AuthService,
        private router: Router,
        private fb: FormBuilder,
        private fabricstypeService: FabricsTypeService
    ) {
    }

    ngOnInit() {
        if (!this.authService.isLoggedIn()) {
            this.router.navigate([""]);
        }
        this.paging = new PaginationModel(10, 1, "Name", 0, [], 0);
        this.searchModel = new GeneralSearchModel("", "", "", "", this.paging);
        this.fabricscategoryService.getFabricsCategoryList(this.searchModel).subscribe(items => this.ACdata = items, error => this.errorMessage = <any>error);
        this.fabricscategoryAddForm = this.fb.group(
            {
                name: ["", [Validators.required]],
                isactive: [true],
                acctype: ["", [Validators.required]]
            }
        );

        var pageall = new PaginationModel(10, 0, "Name", 0, [], 0);
        var getAll = new GeneralSearchModel("", "", "", "", pageall);
        this.fabricstypeService.getFabricsTypeList(getAll).subscribe(items => this.types = items, error => this.errorMessage = <any>error);
        this.data = new FabricsCategory("", false, "", "");
        this.itemid = "";
    }
    changePage(i: number) {
        this.searchModel.Paging.PageNumber = i;
        this.fabricscategoryService.getFabricsCategoryList(this.searchModel).subscribe(items => this.ACdata = items, error => this.errorMessage = <any>error);
    }

    changeSize(i: number) {
        if (i == 0) {
            this.searchModel.Paging.PageNumber = 0;
        } else {
            this.searchModel.Paging.PageSize = i;
            this.searchModel.Paging.PageNumber = 1;
        }

        this.fabricscategoryService.getFabricsCategoryList(this.searchModel).subscribe(items => this.ACdata = items, error => this.errorMessage = <any>error);
    }



    onSubmit(data: any) {

        var fabricscategory = new FabricsCategory("", data.isactive, data.name, data.acctype);
        this.fabricscategoryService.add(fabricscategory).subscribe((data) => {
            if (data.error == null) {


                this.fabricscategoryService.getFabricsCategoryList(this.searchModel).subscribe(items => this.ACdata = items, error => this.errorMessage = <any>error);
                alert("added successfully");
                this.data = new FabricsCategory("", false, "", "");
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
        // var fabricscategory = new FabricsCategory(data.id, null, null, data.isactive, data.name, false, data.buyercode, data.acctype);
        console.log(data);
        this.fabricscategoryService.update(data).subscribe((data) => {
            if (data.error == null) {
                this.data = data;
                this.fabricscategoryService.getFabricsCategoryList(this.searchModel).subscribe(items => this.ACdata = items, error => this.errorMessage = <any>error);
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
            this.fabricscategoryService.get(id).subscribe((data) => {
                this.data = data;
            });
        }
    }
    isFormChanged(value) {
        this.fabricscategoryService.get(this.data.Id).subscribe((oldData) => {
            this.isFormDataChanged(oldData);
        });
    }

    isFormDataChanged(oldData: FabricsCategory) {
        if (JSON.stringify(this.data) === JSON.stringify(oldData))
            this.isFormValuesChanged = false;
        else
            this.isFormValuesChanged = true;
    }
}