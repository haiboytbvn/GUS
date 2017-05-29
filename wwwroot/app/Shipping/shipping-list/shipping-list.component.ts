import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from "@angular/core";
import { ShippingService } from "../shared/shipping.service";
import { Shipping } from "../shared/shipping.model";
import { Router } from "@angular/router";
import { AuthService } from "../../auth.service";
import { ShippingSearchModel } from "../../Shipping/shared/shipping-search.model";
declare var jQuery: any;

@Component({
    selector: 'shipping',
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
    <input type="button" class="btn btn-primary btn-block" value="Add" (click)="addNewShipping()" />
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
            <th>Shipping Name</th>         
           <th>Buyer Code</th>
           <th>Brand</th>
           <th>Division</th>
           <th>Department</th>
           <th>Type</th>
           <th>End Buyer</th>
          <th>Reg Name</th>         
          <th>Search Name</th>         
          <th>Address</th>         
          <th>Image</th>                 
       </tr>
     </thead>
     <tbody>
       <tr *ngFor="let shipping of shippings" [class.selected]="shipping === selectedData">        
        <td><input type="checkbox" #chkSelect value="{{shipping.Id}}" [checked]="shipping.checked" (change)="toggleItem(shipping)" /></td>
         <td><a href="/shipping/edit/{{shipping.Id}}">{{shipping.Name}}</a></td>              
         <td>{{shipping.BuyerCode}}</td>        
         <td>{{shipping.Brand}}</td>        
         <td>{{shipping.Division}}</td>        
         <td>{{shipping.Department}}</td>        
         <td>{{shipping.ShippingType}}</td>        
         <td>{{shipping.EndBuyer}}</td>
         <td>{{shipping.RegName}}</td>
         <td>{{shipping.SearchName}}</td>
         <td>{{shipping.Address}}</td>
         <td> <img src="{{shipping.Image}}" alt="{{shipping.Name}}" height="42" width="42"></td>
      </tr>
     </tbody>
    </table>
  </div>
  <div class="clearDiv">
  </div>
</div>
`,
    providers: [ShippingService]
})

export class ShippingListComponent {
    title: "Shipping List";
    selectedData: Shipping;
    errorMessage: string;
    toggle = false;
    isDelete = false;
    isLoading = false;
    searchModel: ShippingSearchModel;
    @ViewChild('actionDiv') actionDiv: ElementRef;
    @ViewChild('errorDiv') errorDiv: ElementRef;

    shippings: Shipping[];
    constructor(private shippingService: ShippingService, private authService: AuthService, private router: Router) {
    }

    ngOnInit() {
        if (!this.authService.isLoggedIn()) {
            this.router.navigate([""]);
        }

        this.title = "Shipping List";
    
        this.searchModel = new ShippingSearchModel("", "", "", "");
        this.shippingService.getShippingList(this.searchModel).subscribe(items => this.shippings = items, error => this.errorMessage = <any>error);
    }

    ngAfterViewInit() {
        jQuery(this.actionDiv.nativeElement).hide();
        jQuery(this.errorDiv.nativeElement).hide();
    }

    onSelect(data: Shipping) {
        this.selectedData = data;
        this.router.navigate(["shipping/edit", this.selectedData.Id]);
    }

    addNewShipping() {
        this.router.navigate(["shipping/add"]);
    }


    onDelete(data: Shipping) {
        this.isDelete = false;
        this.isLoading = true;

        this.shippings.filter(data => data.checked).forEach(selectedData =>
            this.shippingService.delete(selectedData.Id).subscribe((data) => {
                if (data.error == null) {
                    this.errorMessage = 'deleted selected data(s) successfully';
                    setTimeout(() => {
                        this.isLoading = false,
                            jQuery(this.actionDiv.nativeElement).hide(1000),
                            this.shippingService.getShippingList(this.searchModel).subscribe(items => this.shippings = items, error => this.errorMessage = <any>error);
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
        this.toggle = this.shippings.every(data => data.checked);

        this.showActionDiv(this.shippings.filter(data => data.checked).length > 0);
    }
    toggleAll() {
        this.toggle = !this.toggle;
        this.shippings.forEach(data => data.checked = this.toggle);
        this.showActionDiv(this.shippings.filter(data => data.checked).length > 0);
    }


    displayMessage(message: string, status: boolean) {
        jQuery(this.errorDiv.nativeElement).removeClass();
        this.errorDiv.nativeElement.innerHTML = message;

        if (status) { jQuery(this.errorDiv.nativeElement).addClass("success-message"); }
        else { jQuery(this.errorDiv.nativeElement).addClass("error-message"); }

        jQuery(this.errorDiv.nativeElement).slideDown(1000).delay(6000).slideUp(1000);
    }

    doSearch(searchmodel: ShippingSearchModel) {

        this.shippingService.getShippingList(searchmodel).subscribe(items => this.shippings = items, error => this.errorMessage = <any>error);
    }
}