import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from "@angular/core";
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { AccessoryProductNameService } from "../shared/accessoryproductname.service";
import { AccessoryProductName } from "../shared/accessoryproductname.model";
import { AccessoryCategory} from "../../AccessoryCategory/shared/accessorycategory.model";
import { AccessoryCategoryService} from "../../AccessoryCategory/shared/accessorycategory.service";
import { PaginationModel } from "../../Pagination/shared/pagination.model";
import { GeneralSearchModel } from "../../Pagination/shared/generalsearch.model";
import { AccessoryProductNameListModel } from "../shared/accessoryproductname-list.model";
import { Router } from "@angular/router";
import { AuthService } from "../../auth.service";
import { SearchGeneralFilter } from "../../SearchGeneralFilter/shared/searchGeneralFilter.model";
declare var jQuery: any;

@Component({
    selector: 'accessoryproductname',
    templateUrl: 'app/AccessoryProductName/accessoryproductname-list/accessoryproductname-list.component.html',
    providers: [AccessoryProductNameService, AccessoryProductNameService, FormBuilder]
})

export class AccessoryProductNameListComponent {
    data: AccessoryProductName;
    title = "Accessory Product Name";
    selectedData: AccessoryProductName;
    errorMessage: string;
    searchModel: GeneralSearchModel;
    paging: PaginationModel;
    accessoryproductnameAddForm: FormGroup;
    accessorycategories: AccessoryProductName[];
    ACdata: AccessoryProductNameListModel;
    pagesizearr: number[] = [10, 20, 30, 0];
    types: AccessoryProductName[];
    itemid: string;
    isFormValuesChanged = false;
    accessoryproductnameEditForm: FormGroup;
    categories: AccessoryCategory[];
    constructor(private accessoryproductnameService: AccessoryProductNameService,
        private authService: AuthService,
        private acccategoryService:AccessoryCategoryService,
        private router: Router,
        private fb: FormBuilder,
        private acctypeService: AccessoryProductNameService
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
        this.accessoryproductnameService.getAccessoryProductNameList(this.searchModel).subscribe(items => this.ACdata = items, error => this.errorMessage = <any>error);
        this.acccategoryService.getAccessoryCategoryList(getAll).subscribe(items => this.categories = items.Data, error => this.errorMessage = <any>error);
        this.accessoryproductnameAddForm = this.fb.group(
            {
                id: [""],
                name: ["", [Validators.required]],
                isactive: [true],
                acccategory:["",[Validators.required]]
            }
        );   
        this.data = new AccessoryProductName("",false, "","");
        this.itemid = "";
    }
    changePage(i: number) {
        this.searchModel.Paging.PageNumber = i;
        this.accessoryproductnameService.getAccessoryProductNameList(this.searchModel).subscribe(items => this.ACdata = items, error => this.errorMessage = <any>error);
    }

    changeSize(i: number) {
        if (i == 0) {
            this.searchModel.Paging.PageNumber = 0;
        } else {
            this.searchModel.Paging.PageSize = i;
            this.searchModel.Paging.PageNumber = 1;
        }

        this.accessoryproductnameService.getAccessoryProductNameList(this.searchModel).subscribe(items => this.ACdata = items, error => this.errorMessage = <any>error);
    }
   
    onSubmit(data: any) {
        var apn = new AccessoryProductName("", data.isactive, data.name, data.acccategory);
        this.accessoryproductnameService.add(apn).subscribe((data) => {
            if (data.error == null) {


                this.accessoryproductnameService.getAccessoryProductNameList(this.searchModel).subscribe(items => this.ACdata = items, error => this.errorMessage = <any>error);
                alert("added successfully");
                this.data = new AccessoryProductName("", false, "","");
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
        // var accessoryproductname = new AccessoryProductName(data.id, null, null, data.isactive, data.name, false, data.buyercode, data.acctype);
        console.log(data);
        this.accessoryproductnameService.update(data).subscribe((data) => {
            if (data.error == null) {
                this.data = data;
                this.accessoryproductnameService.getAccessoryProductNameList(this.searchModel).subscribe(items => this.ACdata = items, error => this.errorMessage = <any>error);
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
            this.accessoryproductnameService.get(id).subscribe((data) => {
                this.data = data;
            });
        }
    }
    isFormChanged(value) {
        this.accessoryproductnameService.get(this.data.Id).subscribe((oldData) => {
            this.isFormDataChanged(oldData);
        });
    }

    isFormDataChanged(oldData: AccessoryProductName) {
        if (JSON.stringify(this.data) === JSON.stringify(oldData))
            this.isFormValuesChanged = false;
        else
            this.isFormValuesChanged = true;
    }
}