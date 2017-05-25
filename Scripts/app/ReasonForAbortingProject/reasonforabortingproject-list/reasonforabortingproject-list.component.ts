import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from "@angular/core";
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { ReasonForAbortingProjectService } from "../shared/reasonforabortingproject.service";
import { ReasonForAbortingProject } from "../shared/reasonforabortingproject.model";
import { PaginationModel } from "../../Pagination/shared/pagination.model";
import { GeneralSearchModel } from "../../Pagination/shared/generalsearch.model";
import { ReasonForAbortingProjectListModel } from "../shared/reasonforabortingproject-list.model";
import { Router } from "@angular/router";
import { AuthService } from "../../auth.service";
import { SearchGeneralFilter } from "../../SearchGeneralFilter/shared/searchGeneralFilter.model";
declare var jQuery: any;

@Component({
    selector: 'reasonforabortingproject',
    templateUrl: 'app/ReasonForAbortingProject/reasonforabortingproject-list/reasonforabortingproject-list.component.html',
    providers: [ReasonForAbortingProjectService, ReasonForAbortingProjectService, FormBuilder]
})

export class ReasonForAbortingProjectListComponent {
    data: ReasonForAbortingProject;
    title = "Reasons for aborting project";
    selectedData: ReasonForAbortingProject;
    errorMessage: string;
    searchModel: GeneralSearchModel;
    paging: PaginationModel;
    reasonforabortingprojectAddForm: FormGroup;
    accessorycategories: ReasonForAbortingProject[];
    ACdata: ReasonForAbortingProjectListModel;
    pagesizearr: number[] = [10, 20, 30, 0];
    types: ReasonForAbortingProject[];
    itemid: string;
    isFormValuesChanged = false;
    reasonforabortingprojectEditForm: FormGroup;
    constructor(private reasonforabortingprojectService: ReasonForAbortingProjectService,
        private authService: AuthService,
        private router: Router,
        private fb: FormBuilder,
        private acctypeService: ReasonForAbortingProjectService
    ) {
    }

    ngOnInit() {
        if (!this.authService.isLoggedIn()) {
            this.router.navigate([""]);
        }
        this.paging = new PaginationModel(10, 1, "Name", 0, [], 0);
        this.searchModel = new GeneralSearchModel("", "", "", "", this.paging);
        this.reasonforabortingprojectService.getReasonForAbortingProjectList(this.searchModel).subscribe(items => this.ACdata = items, error => this.errorMessage = <any>error);
        this.reasonforabortingprojectAddForm = this.fb.group(
            {
                id: [""],
                name: ["", [Validators.required]],
                isactive: [true]
            }
        );
        this.data = new ReasonForAbortingProject("", false, "");
        this.itemid = "";
    }
    changePage(i: number) {
        this.searchModel.Paging.PageNumber = i;
        this.reasonforabortingprojectService.getReasonForAbortingProjectList(this.searchModel).subscribe(items => this.ACdata = items, error => this.errorMessage = <any>error);
    }

    changeSize(i: number) {
        if (i == 0) {
            this.searchModel.Paging.PageNumber = 0;
        } else {
            this.searchModel.Paging.PageSize = i;
            this.searchModel.Paging.PageNumber = 1;
        }

        this.reasonforabortingprojectService.getReasonForAbortingProjectList(this.searchModel).subscribe(items => this.ACdata = items, error => this.errorMessage = <any>error);
    }

    onSubmit(data: any) {
        console.log(data);
        var reasonforabortingproject = new ReasonForAbortingProject("", data.isactive, data.name);
        this.reasonforabortingprojectService.add(reasonforabortingproject).subscribe((data) => {
            if (data.error == null) {


                this.reasonforabortingprojectService.getReasonForAbortingProjectList(this.searchModel).subscribe(items => this.ACdata = items, error => this.errorMessage = <any>error);
                alert("added successfully");
                this.data = new ReasonForAbortingProject("", false, "");
                jQuery('#txtName').val('');
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
        jQuery('#ckIsActive').prop('checked', true);
    }
    onUpdate(data: any) {
        // else, update it
        // var reasonforabortingproject = new ReasonForAbortingProject(data.id, null, null, data.isactive, data.name, false, data.buyercode, data.acctype);
        console.log(data);
        this.reasonforabortingprojectService.update(data).subscribe((data) => {
            if (data.error == null) {
                this.data = data;
                this.reasonforabortingprojectService.getReasonForAbortingProjectList(this.searchModel).subscribe(items => this.ACdata = items, error => this.errorMessage = <any>error);
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
            this.reasonforabortingprojectService.get(id).subscribe((data) => {
                this.data = data;
            });
        }
    }
    isFormChanged(value) {
        this.reasonforabortingprojectService.get(this.data.Id).subscribe((oldData) => {
            this.isFormDataChanged(oldData);
        });
    }

    isFormDataChanged(oldData: ReasonForAbortingProject) {
        if (JSON.stringify(this.data) === JSON.stringify(oldData))
            this.isFormValuesChanged = false;
        else
            this.isFormValuesChanged = true;
    }
}