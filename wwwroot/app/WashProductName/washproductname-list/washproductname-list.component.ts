import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from "@angular/core";
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { WashProductNameService } from "../shared/washproductname.service";
import { WashProductName } from "../shared/washproductname.model";
import { WashCategory} from "../../WashCategory/shared/washcategory.model";
import { WashCategoryService} from "../../WashCategory/shared/washcategory.service";
import { PaginationModel } from "../../Pagination/shared/pagination.model";
import { GeneralSearchModel } from "../../Pagination/shared/generalsearch.model";
import { WashProductNameListModel } from "../shared/washproductname-list.model";
import { Router } from "@angular/router";
import { AuthService } from "../../auth.service";
import { SearchGeneralFilter } from "../../SearchGeneralFilter/shared/searchGeneralFilter.model";
declare var jQuery: any;

@Component({
    selector: 'washproductname',
    templateUrl: 'app/WashProductName/washproductname-list/washproductname-list.component.html',
    providers: [ WashProductNameService, FormBuilder, WashCategoryService]
})

export class WashProductNameListComponent {
    data: WashProductName;
    title = "Wash Product Name";
    selectedData: WashProductName;
    errorMessage: string;
    searchModel: GeneralSearchModel;
    paging: PaginationModel;
    washproductnameAddForm: FormGroup;
    washcategories: WashProductName[];
    ACdata: WashProductNameListModel;
    pagesizearr: number[] = [10, 20, 30, 0];
    types: WashProductName[];
    itemid: string;
    isFormValuesChanged = false;
    washproductnameEditForm: FormGroup;
    categories: WashCategory[];
    constructor(private washproductnameService: WashProductNameService,
        private authService: AuthService,
        private fabcategoryService:WashCategoryService,
        private router: Router,
        private fb: FormBuilder,
        private acctypeService: WashProductNameService
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
        this.washproductnameService.getWashProductNameList(this.searchModel).subscribe(items => this.ACdata = items, error => this.errorMessage = <any>error);
        this.fabcategoryService.getWashCategoryList(getAll).subscribe(items => this.categories = items.Data, error => this.errorMessage = <any>error);
        this.washproductnameAddForm = this.fb.group(
            {
                id: [""],
                name: ["", [Validators.required]],
                isactive: [true],
                acccategory:["",[Validators.required]]
            }
        );   
        this.data = new WashProductName("",false, "","");
        this.itemid = "";
    }
    changePage(i: number) {
        this.searchModel.Paging.PageNumber = i;
        this.washproductnameService.getWashProductNameList(this.searchModel).subscribe(items => this.ACdata = items, error => this.errorMessage = <any>error);
    }

    changeSize(i: number) {
        if (i == 0) {
            this.searchModel.Paging.PageNumber = 0;
        } else {
            this.searchModel.Paging.PageSize = i;
            this.searchModel.Paging.PageNumber = 1;
        }

        this.washproductnameService.getWashProductNameList(this.searchModel).subscribe(items => this.ACdata = items, error => this.errorMessage = <any>error);
    }
   
    onSubmit(data: any) {
        var apn = new WashProductName("", data.isactive, data.name, data.acccategory);
        this.washproductnameService.add(apn).subscribe((data) => {
            if (data.error == null) {


                this.washproductnameService.getWashProductNameList(this.searchModel).subscribe(items => this.ACdata = items, error => this.errorMessage = <any>error);
                alert("added successfully");
                this.data = new WashProductName("", false, "","");
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
        // var washproductname = new WashProductName(data.id, null, null, data.isactive, data.name, false, data.buyercode, data.acctype);
        console.log(data);
        this.washproductnameService.update(data).subscribe((data) => {
            if (data.error == null) {
                this.data = data;
                this.washproductnameService.getWashProductNameList(this.searchModel).subscribe(items => this.ACdata = items, error => this.errorMessage = <any>error);
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
            this.washproductnameService.get(id).subscribe((data) => {
                this.data = data;
            });
        }
    }
    isFormChanged(value) {
        this.washproductnameService.get(this.data.Id).subscribe((oldData) => {
            this.isFormDataChanged(oldData);
        });
    }

    isFormDataChanged(oldData: WashProductName) {
        if (JSON.stringify(this.data) === JSON.stringify(oldData))
            this.isFormValuesChanged = false;
        else
            this.isFormValuesChanged = true;
    }
}