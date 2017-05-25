System.register(["@angular/core","../shared/vendorType.service","@angular/router","../../auth.service"],function(exports_1,context_1){"use strict";var core_1,vendorType_service_1,router_1,auth_service_1,VendorTypeListComponent,__decorate=(context_1&&context_1.id,this&&this.__decorate||function(decorators,target,key,desc){var d,c=arguments.length,r=c<3?target:null===desc?desc=Object.getOwnPropertyDescriptor(target,key):desc;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)r=Reflect.decorate(decorators,target,key,desc);else for(var i=decorators.length-1;i>=0;i--)(d=decorators[i])&&(r=(c<3?d(r):c>3?d(target,key,r):d(target,key))||r);return c>3&&r&&Object.defineProperty(target,key,r),r}),__metadata=this&&this.__metadata||function(k,v){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(k,v)};return{setters:[function(core_1_1){core_1=core_1_1},function(vendorType_service_1_1){vendorType_service_1=vendorType_service_1_1},function(router_1_1){router_1=router_1_1},function(auth_service_1_1){auth_service_1=auth_service_1_1}],execute:function(){VendorTypeListComponent=function(){function VendorTypeListComponent(vendorTypeService,authService,router){this.vendorTypeService=vendorTypeService,this.authService=authService,this.router=router,this.title="Vendor Type List",this.toggle=!1,this.isDelete=!1,this.isLoading=!1}return VendorTypeListComponent.prototype.ngOnInit=function(){var _this=this;this.authService.isLoggedIn()||this.router.navigate([""]),this.vendorTypeService.getVendorTypeList().subscribe(function(items){return _this.VendorTypes=items},function(error){return _this.errorMessage=error})},VendorTypeListComponent.prototype.ngAfterViewInit=function(){jQuery(this.actionDiv.nativeElement).hide(),jQuery(this.errorDiv.nativeElement).hide()},VendorTypeListComponent.prototype.onSelect=function(data){this.selectedData=data,this.router.navigate(["VendorTypeList/edit",this.selectedData.Id])},VendorTypeListComponent.prototype.addNewCategory=function(){this.router.navigate(["vendortypelist/add"])},VendorTypeListComponent.prototype.onDelete=function(data){var _this=this;this.isDelete=!1,this.isLoading=!0,this.VendorTypes.filter(function(data){return data.checked}).forEach(function(selectedData){return _this.vendorTypeService.delete(selectedData.Id).subscribe(function(data){null==data.error&&(_this.errorMessage="deleted selected data(s) successfully",setTimeout(function(){_this.isLoading=!1,jQuery(_this.actionDiv.nativeElement).hide(1e3),_this.vendorTypeService.getVendorTypeList().subscribe(function(items){return _this.VendorTypes=items},function(error){return _this.errorMessage=error})},2e3))})})},VendorTypeListComponent.prototype.showActionDiv=function(status){jQuery(this.actionDiv.nativeElement).width();status?jQuery(this.actionDiv.nativeElement).show({direction:"left"},1e3):jQuery(this.actionDiv.nativeElement).hide(1e3)},VendorTypeListComponent.prototype.deleteConfirm=function(){this.isDelete=!0},VendorTypeListComponent.prototype.close=function(){this.isDelete=!1},VendorTypeListComponent.prototype.toggleItem=function(data){data.checked=!data.checked,this.toggle=this.VendorTypes.every(function(data){return data.checked}),this.showActionDiv(this.VendorTypes.filter(function(data){return data.checked}).length>0)},VendorTypeListComponent.prototype.toggleAll=function(){var _this=this;this.toggle=!this.toggle,this.VendorTypes.forEach(function(data){return data.checked=_this.toggle}),this.showActionDiv(this.VendorTypes.filter(function(data){return data.checked}).length>0)},VendorTypeListComponent.prototype.displayMessage=function(message,status){jQuery(this.errorDiv.nativeElement).removeClass(),this.errorDiv.nativeElement.innerHTML=message,status?jQuery(this.errorDiv.nativeElement).addClass("success-message"):jQuery(this.errorDiv.nativeElement).addClass("error-message"),jQuery(this.errorDiv.nativeElement).slideDown(1e3).delay(6e3).slideUp(1e3)},__decorate([core_1.ViewChild("actionDiv"),__metadata("design:type",core_1.ElementRef)],VendorTypeListComponent.prototype,"actionDiv",void 0),__decorate([core_1.ViewChild("errorDiv"),__metadata("design:type",core_1.ElementRef)],VendorTypeListComponent.prototype,"errorDiv",void 0),VendorTypeListComponent=__decorate([core_1.Component({selector:"VendorType",template:'<div class="error-message" #errorDiv></div>\n<div class="user-container">\n   <h1 class="homeHeader">{{title}}</h1>\n\n  <div class="col-right-s3 form-group">\n    <input type="button" class="btn btn-primary btn-block" value="Add" (click)="addNewCategory()" />\n  </div>\n  <div class="clearDiv">\n  </div>\n  <div #actionDiv class="col-half-one-third leftPane">\n     <div class="leftPaneContent form-group">\n        <h2>Bulk Actions</h2>\n        <button class="btn btn-danger btn-block"  (click)="deleteConfirm()" [disabled]="isLoading">                    \n         <div [class.cssload-container]="isLoading">\n           <div [class.cssload-zenith]="isLoading"></div>\n         </div>\n         <div [class.cssload-text]="isLoading">Delete</div>\n        </button>\n                         \n        <div class="dialog" *ngIf="isDelete">\n          <h3>Are you sure to delete checked items ?</h3>\n            <input type="button" class="btn btn-danger btn-block"  value="Yes" (click)="onDelete()" />   <br/>          \n            <input type="button" class="btn btn-primary btn-block"  value="No" (click)="close()" />             \n       </div>\n       <div *ngIf="isDelete" class="overlay" (click)="Close()"></div>\n\n     </div>\n  </div>\n  <div class="col-half-two-third">\n    <table class="table table-hover">\n      <thead>\n        <tr>\n          <th>Select All<br/><input type="checkbox" [checked]="toggle" (change)="toggleAll()" /></th>         \n          <th>Name</th>         \n          <th>Is Active</th>           \n       </tr>\n     </thead>\n     <tbody>\n       <tr *ngFor="let VendorType of VendorTypes" [class.selected]="VendorType === selectedData">        \n        <td><input type="checkbox" #chkSelect value="{{VendorType.Id}}" [checked]="VendorType.checked" (change)="toggleItem(VendorType)" /></td>\n         <td><a href="vendortypelist/edit/{{VendorType.Id}}">{{VendorType.Name}}</a></td>            \n         <td>{{VendorType.IsActive}}</td>            \n      </tr>\n     </tbody>\n    </table>\n  </div>\n  <div class="clearDiv">\n  </div>\n</div>\n',providers:[vendorType_service_1.VendorTypeService]}),__metadata("design:paramtypes",[vendorType_service_1.VendorTypeService,auth_service_1.AuthService,router_1.Router])],VendorTypeListComponent)}(),exports_1("VendorTypeListComponent",VendorTypeListComponent)}}});
//# sourceMappingURL=vendorType-list.component.js.map
