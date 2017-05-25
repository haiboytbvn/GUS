import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from "@angular/core";
import { ApplicationService } from "../shared/application.service";
import { Application } from "../shared/application.model";
import { Router } from "@angular/router";
import { SearchGeneralFilter } from "../../SearchGeneralFilter/shared/searchGeneralFilter.model";
import { AuthService } from "../../auth.service";
declare var jQuery: any;

@Component({
    selector: 'application',
    template: `<div class="error-message" #errorDiv></div>
<div class="user-container">
   <h1 class="homeHeader">{{title}}</h1>
  <div class="form-inline mt-50">
    <div class="form-group">
      <label class="sr-only" for="name">Name:</label>
       <input type="text" [(ngModel)]="searchModel.Name" class="form-control" placeholder="Enter name">
    </div>
    <div class="form-group">
      <label class="sr-only" for="name">Code:</label>
      <input type="text" [(ngModel)]="searchModel.Code" class="form-control" placeholder="Enter code">
    </div>
    <div class="checkbox">
     <label class="sr-only" for="name">Buyer code:</label>
      <input type="text" [(ngModel)]="searchModel.BuyerCode" class="form-control" placeholder="Enter buyer code">
    </div>
    <input type="button" class="btn" value="Search" (click)="doSearch(searchModel)" />
  </div>
  <div class="col-right-s3 form-group">
    <input type="button" class="btn btn-primary btn-block" value="Add" (click)="addNewApplication()" />
  </div>
  <div class="clearDiv">
  </div>
  <div #actionDiv class="col-half-one-third leftPane">
     <div class="leftPaneContent form-group">
        <h2>Bulk Actions</h2>
        <button class="btn btn-danger btn-block"  (click)="deleteConfirm()" [disabled]="isLoading">                    
         <div [class.cssload-container]="isLoading">
           <div [class.cssload-zenith]="isLoading"></div>
         </div>
         <div [class.cssload-text]="isLoading">Delete</div>
        </button>
                         
        <div class="dialog" *ngIf="isDelete">
          <h3>Are you sure to delete checked items ?</h3>
            <input type="button" class="btn btn-danger btn-block"  value="Yes" (click)="onDelete()" />   <br/>          
            <input type="button" class="btn btn-primary btn-block"  value="No" (click)="close()" />             
       </div>
       <div *ngIf="isDelete" class="overlay" (click)="Close()"></div>

     </div>
  </div>
  <div class="col-half-two-third">
    <table class="table table-hover">
      <thead>
        <tr>
          <th>Select All<br/><input type="checkbox" [checked]="toggle" (change)="toggleAll()" /></th>         
          <th>Name</th>     
          <th>Code</th>              
          <th>Buyer Code</th>              
          <th>Is Active</th>           
       </tr>
     </thead>
     <tbody>
       <tr *ngFor="let application of applications" [class.selected]="application === selectedData">        
        <td><input type="checkbox" #chkSelect value="{{application.Id}}" [checked]="application.checked" (change)="toggleItem(application)" /></td>
         <td><a href="application/edit/{{application.Id}}">{{application.Name}}</a></td>  
        <td>{{application.Code}}</td>                 
        <td>{{application.BuyerCode}}</td>                 
         <td>{{application.IsActive}}</td>            
      </tr>
     </tbody>
    </table>
  </div>
  <div class="clearDiv">
  </div>
</div>
`,
    providers: [ApplicationService]
})

export class ApplicationListComponent {
    title = "Application";
    selectedData: Application;
    errorMessage: string;
    toggle = false;
    isDelete = false;
    isLoading = false;
    searchModel: SearchGeneralFilter;
    @ViewChild('actionDiv') actionDiv: ElementRef;
    @ViewChild('errorDiv') errorDiv: ElementRef;

    applications: Application[];
    constructor(private applicationService: ApplicationService, private authService: AuthService, private router: Router) {
    }

    ngOnInit() {
        if (!this.authService.isLoggedIn()) {
            this.router.navigate([""]);
        }
        this.searchModel = new SearchGeneralFilter("", "", "", "");
        this.applicationService.getApplicationList(this.searchModel).subscribe(items => this.applications = items, error => this.errorMessage = <any>error);
    }

    ngAfterViewInit() {
        jQuery(this.actionDiv.nativeElement).hide();
        jQuery(this.errorDiv.nativeElement).hide();
    }

    onSelect(data: Application) {
        this.selectedData = data;
        this.router.navigate(["application/edit", this.selectedData.Id]);
    }

    addNewApplication() {
        this.router.navigate(["application/add"]);
    }


    onDelete(data: Application) {
        this.isDelete = false;
        this.isLoading = true;

        this.applications.filter(data => data.checked).forEach(selectedData =>
            this.applicationService.delete(selectedData.Id).subscribe((data) => {
                if (data.error == null) {
                    this.errorMessage = 'deleted selected data(s) successfully';
                    setTimeout(() => {
                        this.isLoading = false,
                            jQuery(this.actionDiv.nativeElement).hide(1000),
                            this.applicationService.getApplicationList(this.searchModel).subscribe(items => this.applications = items, error => this.errorMessage = <any>error);
                    }, 2000);
                }
            })
        );
    }
    showActionDiv(status: boolean) {
        var boxWidth = jQuery(this.actionDiv.nativeElement).width();
        if (status)
            jQuery(this.actionDiv.nativeElement).show({ direction: "left" }, 1000);
        else
            jQuery(this.actionDiv.nativeElement).hide(1000);
    }

    deleteConfirm() {
        this.isDelete = true;
    }

    close() {
        this.isDelete = false;
    }

    toggleItem(data) {
        data.checked = !data.checked;
        this.toggle = this.applications.every(data => data.checked);

        this.showActionDiv(this.applications.filter(data => data.checked).length > 0);
    }
    toggleAll() {
        this.toggle = !this.toggle;
        this.applications.forEach(data => data.checked = this.toggle);
        this.showActionDiv(this.applications.filter(data => data.checked).length > 0);
    }


    displayMessage(message: string, status: boolean) {
        jQuery(this.errorDiv.nativeElement).removeClass();
        this.errorDiv.nativeElement.innerHTML = message;

        if (status) { jQuery(this.errorDiv.nativeElement).addClass("success-message"); }
        else { jQuery(this.errorDiv.nativeElement).addClass("error-message"); }

        jQuery(this.errorDiv.nativeElement).slideDown(1000).delay(6000).slideUp(1000);
    }
    doSearch(searchmodel: SearchGeneralFilter) {

        this.applicationService.getApplicationList(searchmodel).subscribe(items => this.applications = items, error => this.errorMessage = <any>error);
    }
}