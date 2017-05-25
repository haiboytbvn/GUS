import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from "@angular/core";
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { FabricProductTypeService } from "../shared/fabricproducttype.service";
import { FabricProductType } from "../shared/fabricproducttype.model";
import { PaginationModel } from "../../Pagination/shared/pagination.model";
import { GeneralSearchModel } from "../../Pagination/shared/generalsearch.model";
import { FabricProductTypeListModel } from "../shared/fabricproducttype-list.model";
import { Router } from "@angular/router";
import { AuthService } from "../../auth.service";
import { SearchGeneralFilter } from "../../SearchGeneralFilter/shared/searchGeneralFilter.model";
declare var jQuery: any;

@Component({
    selector: 'fabricproducttype',
    templateUrl: 'app/FabricProductType/fabricproducttype-list/fabricproducttype-list.component.html',
    providers: [FabricProductTypeService, FabricProductTypeService, FormBuilder]
})

export class FabricProductTypeListComponent {
    data: FabricProductType;
    title = "Fabric Product Type";
    selectedData: FabricProductType;
    errorMessage: string;
    searchModel: GeneralSearchModel;
    paging: PaginationModel;
    fabricproducttypeAddForm: FormGroup;
    accessorycategories: FabricProductType[];
    ACdata: FabricProductTypeListModel;
    pagesizearr: number[] = [10, 20, 30, 0];
    types: FabricProductType[];
    itemid: string;
    isFormValuesChanged = false;
    fabricproducttypeEditForm: FormGroup;
    constructor(private fabricproducttypeService: FabricProductTypeService,
        private authService: AuthService,
        private router: Router,
        private fb: FormBuilder,
        private acctypeService: FabricProductTypeService
    ) {
    }

    ngOnInit() {
        if (!this.authService.isLoggedIn()) {
            this.router.navigate([""]);
        }
        this.paging = new PaginationModel(10, 1, "Name", 0, [], 0);
        this.searchModel = new GeneralSearchModel("", "", "", "", this.paging);
        this.fabricproducttypeService.getFabricProductTypeList(this.searchModel).subscribe(items => this.ACdata = items, error => this.errorMessage = <any>error);
        this.fabricproducttypeAddForm = this.fb.group(
            {
                id: [""],
                name: ["", [Validators.required]],
                isactive: [true]
            }
        );
        this.data = new FabricProductType("", false, "");
        this.itemid = "";
    }
    changePage(i: number) {
        this.searchModel.Paging.PageNumber = i;
        this.fabricproducttypeService.getFabricProductTypeList(this.searchModel).subscribe(items => this.ACdata = items, error => this.errorMessage = <any>error);
    }

    changeSize(i: number) {
        if (i == 0) {
            this.searchModel.Paging.PageNumber = 0;
        } else {
            this.searchModel.Paging.PageSize = i;
            this.searchModel.Paging.PageNumber = 1;
        }

        this.fabricproducttypeService.getFabricProductTypeList(this.searchModel).subscribe(items => this.ACdata = items, error => this.errorMessage = <any>error);
    }

    onSubmit(data: any) {
        console.log(data);
        var fabricproducttype = new FabricProductType("", data.isactive, data.name);
        this.fabricproducttypeService.add(fabricproducttype).subscribe((data) => {
            if (data.error == null) {


                this.fabricproducttypeService.getFabricProductTypeList(this.searchModel).subscribe(items => this.ACdata = items, error => this.errorMessage = <any>error);
                alert("added successfully");
                this.data = new FabricProductType("", false, "");
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
        // var fabricproducttype = new FabricProductType(data.id, null, null, data.isactive, data.name, false, data.buyercode, data.acctype);
        console.log(data);
        this.fabricproducttypeService.update(data).subscribe((data) => {
            if (data.error == null) {
                this.data = data;
                this.fabricproducttypeService.getFabricProductTypeList(this.searchModel).subscribe(items => this.ACdata = items, error => this.errorMessage = <any>error);
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
            this.fabricproducttypeService.get(id).subscribe((data) => {
                this.data = data;
            });
        }
    }
    isFormChanged(value) {
        this.fabricproducttypeService.get(this.data.Id).subscribe((oldData) => {
            this.isFormDataChanged(oldData);
        });
    }

    isFormDataChanged(oldData: FabricProductType) {
        if (JSON.stringify(this.data) === JSON.stringify(oldData))
            this.isFormValuesChanged = false;
        else
            this.isFormValuesChanged = true;
    }
}