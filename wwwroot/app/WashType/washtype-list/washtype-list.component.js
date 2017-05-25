System.register(["@angular/core","@angular/forms","../shared/washtype.service","../shared/washtype.model","../../Pagination/shared/pagination.model","../../Pagination/shared/generalsearch.model","@angular/router","../../auth.service"],function(exports_1,context_1){"use strict";var core_1,forms_1,washtype_service_1,washtype_model_1,pagination_model_1,generalsearch_model_1,router_1,auth_service_1,WashTypeListComponent,__decorate=(context_1&&context_1.id,this&&this.__decorate||function(decorators,target,key,desc){var d,c=arguments.length,r=c<3?target:null===desc?desc=Object.getOwnPropertyDescriptor(target,key):desc;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)r=Reflect.decorate(decorators,target,key,desc);else for(var i=decorators.length-1;i>=0;i--)(d=decorators[i])&&(r=(c<3?d(r):c>3?d(target,key,r):d(target,key))||r);return c>3&&r&&Object.defineProperty(target,key,r),r}),__metadata=this&&this.__metadata||function(k,v){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(k,v)};return{setters:[function(core_1_1){core_1=core_1_1},function(forms_1_1){forms_1=forms_1_1},function(washtype_service_1_1){washtype_service_1=washtype_service_1_1},function(washtype_model_1_1){washtype_model_1=washtype_model_1_1},function(pagination_model_1_1){pagination_model_1=pagination_model_1_1},function(generalsearch_model_1_1){generalsearch_model_1=generalsearch_model_1_1},function(router_1_1){router_1=router_1_1},function(auth_service_1_1){auth_service_1=auth_service_1_1}],execute:function(){WashTypeListComponent=function(){function WashTypeListComponent(washtypeService,authService,router,fb,acctypeService){this.washtypeService=washtypeService,this.authService=authService,this.router=router,this.fb=fb,this.acctypeService=acctypeService,this.title="Wash Type",this.pagesizearr=[10,20,30,0],this.isFormValuesChanged=!1}return WashTypeListComponent.prototype.ngOnInit=function(){var _this=this;this.authService.isLoggedIn()||this.router.navigate([""]),this.paging=new pagination_model_1.PaginationModel(10,1,"Name",0,[],0),this.searchModel=new generalsearch_model_1.GeneralSearchModel("","","","",this.paging),this.washtypeService.getWashTypeList(this.searchModel).subscribe(function(items){return _this.ACdata=items},function(error){return _this.errorMessage=error}),this.washtypeAddForm=this.fb.group({id:[""],name:["",[forms_1.Validators.required]],isactive:[!0]}),this.data=new washtype_model_1.WashType("",!1,""),this.itemid=""},WashTypeListComponent.prototype.changePage=function(i){var _this=this;this.searchModel.Paging.PageNumber=i,this.washtypeService.getWashTypeList(this.searchModel).subscribe(function(items){return _this.ACdata=items},function(error){return _this.errorMessage=error})},WashTypeListComponent.prototype.changeSize=function(i){var _this=this;0==i?this.searchModel.Paging.PageNumber=0:(this.searchModel.Paging.PageSize=i,this.searchModel.Paging.PageNumber=1),this.washtypeService.getWashTypeList(this.searchModel).subscribe(function(items){return _this.ACdata=items},function(error){return _this.errorMessage=error})},WashTypeListComponent.prototype.onSubmit=function(data){var _this=this;console.log(data);var washtype=new washtype_model_1.WashType("",data.isactive,data.name);this.washtypeService.add(washtype).subscribe(function(data){null==data.error?(_this.washtypeService.getWashTypeList(_this.searchModel).subscribe(function(items){return _this.ACdata=items},function(error){return _this.errorMessage=error}),alert("added successfully"),_this.data=new washtype_model_1.WashType("",!1,""),jQuery("#txtName").val(""),jQuery("#drType").val(""),jQuery("#ckIsActive").prop("checked",!0)):(_this.errorMessage=data.error,alert(_this.errorMessage))},function(error){_this.errorMessage=error,alert(_this.errorMessage)}),jQuery("#myModalAdd").modal("hide")},WashTypeListComponent.prototype.onAdd=function(){jQuery("#txtName").val(""),jQuery("#drType").val(""),jQuery("#ckIsActive").prop("checked",!0)},WashTypeListComponent.prototype.onUpdate=function(data){var _this=this;console.log(data),this.washtypeService.update(data).subscribe(function(data){null==data.error?(_this.data=data,_this.washtypeService.getWashTypeList(_this.searchModel).subscribe(function(items){return _this.ACdata=items},function(error){return _this.errorMessage=error}),alert("updated successfully"),jQuery("#myModalEdit").modal("hide"),_this.itemid):(_this.errorMessage=data.error,alert(_this.errorMessage))},function(error){_this.errorMessage=error,alert(_this.errorMessage)})},WashTypeListComponent.prototype.onEdit=function(id){var _this=this;this.itemid=id,""!==id&&this.washtypeService.get(id).subscribe(function(data){_this.data=data})},WashTypeListComponent.prototype.isFormChanged=function(value){var _this=this;this.washtypeService.get(this.data.Id).subscribe(function(oldData){_this.isFormDataChanged(oldData)})},WashTypeListComponent.prototype.isFormDataChanged=function(oldData){JSON.stringify(this.data)===JSON.stringify(oldData)?this.isFormValuesChanged=!1:this.isFormValuesChanged=!0},WashTypeListComponent=__decorate([core_1.Component({selector:"washtype",templateUrl:"app/WashType/washtype-list/washtype-list.component.html",providers:[washtype_service_1.WashTypeService,washtype_service_1.WashTypeService,forms_1.FormBuilder]}),__metadata("design:paramtypes",[washtype_service_1.WashTypeService,auth_service_1.AuthService,router_1.Router,forms_1.FormBuilder,washtype_service_1.WashTypeService])],WashTypeListComponent)}(),exports_1("WashTypeListComponent",WashTypeListComponent)}}});
//# sourceMappingURL=washtype-list.component.js.map