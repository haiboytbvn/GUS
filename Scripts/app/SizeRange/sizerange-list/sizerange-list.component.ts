import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from "@angular/core";
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { SizeRangeService } from "../shared/sizerange.service";
import { SizeRange } from "../shared/sizerange.model";
import { PaginationModel } from "../../Pagination/shared/pagination.model";
import { GeneralSearchModel } from "../../Pagination/shared/generalsearch.model";
import { SizeRangeListModel } from "../shared/sizerange-list.model";
import { Router } from "@angular/router";
import { AuthService } from "../../auth.service";
import { SearchGeneralFilter } from "../../SearchGeneralFilter/shared/searchGeneralFilter.model";
declare var jQuery: any;

@Component({
    selector: 'sizerange',
    templateUrl: 'app/SizeRange/sizerange-list/sizerange-list.component.html',
    providers: [SizeRangeService, SizeRangeService, FormBuilder]
})

export class SizeRangeListComponent {
    data: SizeRange;
    title = "SizeRange";
    selectedData: SizeRange;
    errorMessage: string;
    searchModel: GeneralSearchModel;
    paging: PaginationModel;
    sizerangeAddForm: FormGroup;
    ACdata: SizeRangeListModel;
    pagesizearr: number[] = [10, 20, 30, 0];
    types: SizeRange[];
    itemid: string;
    isFormValuesChanged = false;
    sizenamecount: number;
    sizenamecountedit: number;
    sizerangeEditForm: FormGroup;
    constructor(private sizerangeService: SizeRangeService,
        private authService: AuthService,
        private router: Router,
        private fb: FormBuilder,
        private acctypeService: SizeRangeService
    ) {
    }

    ngOnInit() {
        if (!this.authService.isLoggedIn()) {
            this.router.navigate([""]);
        }
        this.sizenamecount = 1;
        this.sizenamecountedit = 0;
        this.paging = new PaginationModel(10, 1, "Name", 0, [], 0);
        this.searchModel = new GeneralSearchModel("", "", "", "", this.paging);
        this.sizerangeService.getSizeRangeList(this.searchModel).subscribe(items => this.ACdata = items, error => this.errorMessage = <any>error);
        this.sizerangeAddForm = this.fb.group(
            {
                id: [""],
                name: ["", [Validators.required]],
                isactive: [true]
            }
        );
        this.data = new SizeRange("", false, "","",[]);
        this.itemid = "";
    }
    changePage(i: number) {
        this.searchModel.Paging.PageNumber = i;
        this.sizerangeService.getSizeRangeList(this.searchModel).subscribe(items => this.ACdata = items, error => this.errorMessage = <any>error);
    }
    addName1() {
        this.isFormValuesChanged = true;
        this.sizenamecountedit += 1;
        jQuery('#sizeRangeContainer1').append("<div class=\"col_one_fifth\"></div><div class=\"col_four_fifth\"><input type=\"text\" id=\"txteditSizeName" + this.sizenamecountedit + "\" class=\"form-control\" /></div>")
    }
    changeSize(i: number) {
        if (i == 0) {
            this.searchModel.Paging.PageNumber = 0;
        } else {
            this.searchModel.Paging.PageSize = i;
            this.searchModel.Paging.PageNumber = 1;
        }

        this.sizerangeService.getSizeRangeList(this.searchModel).subscribe(items => this.ACdata = items, error => this.errorMessage = <any>error);
    }
    addName() {
        this.sizenamecount += 1;
        jQuery('#sizeRangeContainer').append("<div class=\"col_one_fifth\"></div><div class=\"col_four_fifth\"><input type=\"text\" id=\"txtSizeName" + this.sizenamecount + "\" class=\"form-control\" /></div>")
    }
    onSubmit(data: any) {

        //get name string
        var namestring = "";

        for (var i = 1; i <= this.sizenamecount; i++) {
            if (jQuery('#txtSizeName' + i).val !== "" && i < this.sizenamecount) {
                namestring += jQuery('#txtSizeName' + i).val() + "|";
            }
            else if (jQuery('#txtSizeName' + i).val !== "" && i === this.sizenamecount) {
                namestring += jQuery('#txtSizeName' + i).val();
            }
        }

       //====
        var sizerange = new SizeRange("", data.isactive, data.name,namestring,[]);
        this.sizerangeService.add(sizerange).subscribe((data) => {
            if (data.error == null) {


                this.sizerangeService.getSizeRangeList(this.searchModel).subscribe(items => this.ACdata = items, error => this.errorMessage = <any>error);
                alert("added successfully");
                this.data = new SizeRange("", false, "","",[]);
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
        //get name string
        var namestring = "";

        for (var i = 1; i <= this.sizenamecountedit; i++) {
            if (jQuery('#txteditSizeName' + i).val !== "" && i < this.sizenamecountedit) {
                namestring += jQuery('#txteditSizeName' + i).val() + "|";
            }
            else if (jQuery('#txteditSizeName' + i).val !== "" && i === this.sizenamecountedit) {
                namestring += jQuery('#txteditSizeName' + i).val();
            }
        }
        data.Value = namestring;
       //====
        this.sizerangeService.update(data).subscribe((data) => {
            if (data.error == null) {
                this.data = data;
                this.sizerangeService.getSizeRangeList(this.searchModel).subscribe(items => this.ACdata = items, error => this.errorMessage = <any>error);
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
            this.sizerangeService.get(id).subscribe((data) => {
                this.data = data;
                this.sizenamecountedit = this.data.ValueList.length;
            });
        }

        
    }
    isFormChanged(value) {
        this.sizerangeService.get(this.data.Id).subscribe((oldData) => {
            this.isFormDataChanged(oldData);
        });
    }

    isFormDataChanged(oldData: SizeRange) {
        if (JSON.stringify(this.data) === JSON.stringify(oldData))
            this.isFormValuesChanged = false;
        else
            this.isFormValuesChanged = true;
    }
}