import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from "@angular/core";
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { FabricsProductNameService } from "../shared/fabricsproductname.service";
import { FabricsProductName } from "../shared/fabricsproductname.model";
import { FabricsCategory} from "../../FabricsCategory/shared/fabricscategory.model";
import { FabricsCategoryService} from "../../FabricsCategory/shared/fabricscategory.service";
import { PaginationModel } from "../../Pagination/shared/pagination.model";
import { GeneralSearchModel } from "../../Pagination/shared/generalsearch.model";
import { FabricsProductNameListModel } from "../shared/fabricsproductname-list.model";
import { Router } from "@angular/router";
import { AuthService } from "../../auth.service";
import { SearchGeneralFilter } from "../../SearchGeneralFilter/shared/searchGeneralFilter.model";
declare var jQuery: any;

@Component({
    selector: 'fabricsproductname',
    templateUrl: 'app/FabricsProductName/fabricsproductname-list/fabricsproductname-list.component.html',
    providers: [ FabricsProductNameService, FormBuilder, FabricsCategoryService]
})

export class FabricsProductNameListComponent {
    data: FabricsProductName;
    title = "Fabrics Product Name";
    selectedData: FabricsProductName;
    errorMessage: string;
    searchModel: GeneralSearchModel;
    paging: PaginationModel;
    fabricsproductnameAddForm: FormGroup;
    fabricscategories: FabricsProductName[];
    ACdata: FabricsProductNameListModel;
    pagesizearr: number[] = [10, 20, 30, 0];
    types: FabricsProductName[];
    itemid: string;
    isFormValuesChanged = false;
    fabricsproductnameEditForm: FormGroup;
    categories: FabricsCategory[];
    constructor(private fabricsproductnameService: FabricsProductNameService,
        private authService: AuthService,
        private fabcategoryService:FabricsCategoryService,
        private router: Router,
        private fb: FormBuilder,
        private acctypeService: FabricsProductNameService
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
        this.fabricsproductnameService.getFabricsProductNameList(this.searchModel).subscribe(items => this.ACdata = items, error => this.errorMessage = <any>error);
        this.fabcategoryService.getFabricsCategoryList(getAll).subscribe(items => this.categories = items.Data, error => this.errorMessage = <any>error);
        this.fabricsproductnameAddForm = this.fb.group(
            {
                id: [""],
                name: ["", [Validators.required]],
                isactive: [true],
                acccategory:["",[Validators.required]]
            }
        );   
        this.data = new FabricsProductName("",false, "","");
        this.itemid = "";
    }
    changePage(i: number) {
        this.searchModel.Paging.PageNumber = i;
        this.fabricsproductnameService.getFabricsProductNameList(this.searchModel).subscribe(items => this.ACdata = items, error => this.errorMessage = <any>error);
    }

    changeSize(i: number) {
        if (i == 0) {
            this.searchModel.Paging.PageNumber = 0;
        } else {
            this.searchModel.Paging.PageSize = i;
            this.searchModel.Paging.PageNumber = 1;
        }

        this.fabricsproductnameService.getFabricsProductNameList(this.searchModel).subscribe(items => this.ACdata = items, error => this.errorMessage = <any>error);
    }
   
    onSubmit(data: any) {
        var apn = new FabricsProductName("", data.isactive, data.name, data.acccategory);
        this.fabricsproductnameService.add(apn).subscribe((data) => {
            if (data.error == null) {


                this.fabricsproductnameService.getFabricsProductNameList(this.searchModel).subscribe(items => this.ACdata = items, error => this.errorMessage = <any>error);
                alert("added successfully");
                this.data = new FabricsProductName("", false, "","");
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
        // var fabricsproductname = new FabricsProductName(data.id, null, null, data.isactive, data.name, false, data.buyercode, data.acctype);
        console.log(data);
        this.fabricsproductnameService.update(data).subscribe((data) => {
            if (data.error == null) {
                this.data = data;
                this.fabricsproductnameService.getFabricsProductNameList(this.searchModel).subscribe(items => this.ACdata = items, error => this.errorMessage = <any>error);
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
            this.fabricsproductnameService.get(id).subscribe((data) => {
                this.data = data;
            });
        }
    }
    isFormChanged(value) {
        this.fabricsproductnameService.get(this.data.Id).subscribe((oldData) => {
            this.isFormDataChanged(oldData);
        });
    }

    isFormDataChanged(oldData: FabricsProductName) {
        if (JSON.stringify(this.data) === JSON.stringify(oldData))
            this.isFormValuesChanged = false;
        else
            this.isFormValuesChanged = true;
    }
}