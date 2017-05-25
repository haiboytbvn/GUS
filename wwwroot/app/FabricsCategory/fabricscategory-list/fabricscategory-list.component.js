System.register(["@angular/core","@angular/forms","../shared/fabricscategory.service","../shared/fabricscategory.model","../../Pagination/shared/pagination.model","@angular/router","../../auth.service","../../FabricsType/shared/fabricstype.service","../../Pagination/shared/generalsearch.model"],function(exports_1,context_1){"use strict";var core_1,forms_1,fabricscategory_service_1,fabricscategory_model_1,pagination_model_1,router_1,auth_service_1,fabricstype_service_1,generalsearch_model_1,FabricsCategoryListComponent,__decorate=(context_1&&context_1.id,this&&this.__decorate||function(decorators,target,key,desc){var d,c=arguments.length,r=c<3?target:null===desc?desc=Object.getOwnPropertyDescriptor(target,key):desc;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)r=Reflect.decorate(decorators,target,key,desc);else for(var i=decorators.length-1;i>=0;i--)(d=decorators[i])&&(r=(c<3?d(r):c>3?d(target,key,r):d(target,key))||r);return c>3&&r&&Object.defineProperty(target,key,r),r}),__metadata=this&&this.__metadata||function(k,v){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(k,v)};return{setters:[function(core_1_1){core_1=core_1_1},function(forms_1_1){forms_1=forms_1_1},function(fabricscategory_service_1_1){fabricscategory_service_1=fabricscategory_service_1_1},function(fabricscategory_model_1_1){fabricscategory_model_1=fabricscategory_model_1_1},function(pagination_model_1_1){pagination_model_1=pagination_model_1_1},function(router_1_1){router_1=router_1_1},function(auth_service_1_1){auth_service_1=auth_service_1_1},function(fabricstype_service_1_1){fabricstype_service_1=fabricstype_service_1_1},function(generalsearch_model_1_1){generalsearch_model_1=generalsearch_model_1_1}],execute:function(){FabricsCategoryListComponent=function(){function FabricsCategoryListComponent(fabricscategoryService,authService,router,fb,fabricstypeService){this.fabricscategoryService=fabricscategoryService,this.authService=authService,this.router=router,this.fb=fb,this.fabricstypeService=fabricstypeService,this.title="Fabrics Category",this.pagesizearr=[10,20,30,0],this.isFormValuesChanged=!1}return FabricsCategoryListComponent.prototype.ngOnInit=function(){var _this=this;this.authService.isLoggedIn()||this.router.navigate([""]),this.paging=new pagination_model_1.PaginationModel(10,1,"Name",0,[],0),this.searchModel=new generalsearch_model_1.GeneralSearchModel("","","","",this.paging),this.fabricscategoryService.getFabricsCategoryList(this.searchModel).subscribe(function(items){return _this.ACdata=items},function(error){return _this.errorMessage=error}),this.fabricscategoryAddForm=this.fb.group({name:["",[forms_1.Validators.required]],isactive:[!0],acctype:["",[forms_1.Validators.required]]});var pageall=new pagination_model_1.PaginationModel(10,0,"Name",0,[],0),getAll=new generalsearch_model_1.GeneralSearchModel("","","","",pageall);this.fabricstypeService.getFabricsTypeList(getAll).subscribe(function(items){return _this.types=items},function(error){return _this.errorMessage=error}),this.data=new fabricscategory_model_1.FabricsCategory("",!1,"",""),this.itemid=""},FabricsCategoryListComponent.prototype.changePage=function(i){var _this=this;this.searchModel.Paging.PageNumber=i,this.fabricscategoryService.getFabricsCategoryList(this.searchModel).subscribe(function(items){return _this.ACdata=items},function(error){return _this.errorMessage=error})},FabricsCategoryListComponent.prototype.changeSize=function(i){var _this=this;0==i?this.searchModel.Paging.PageNumber=0:(this.searchModel.Paging.PageSize=i,this.searchModel.Paging.PageNumber=1),this.fabricscategoryService.getFabricsCategoryList(this.searchModel).subscribe(function(items){return _this.ACdata=items},function(error){return _this.errorMessage=error})},FabricsCategoryListComponent.prototype.onSubmit=function(data){var _this=this,fabricscategory=new fabricscategory_model_1.FabricsCategory("",data.isactive,data.name,data.acctype);this.fabricscategoryService.add(fabricscategory).subscribe(function(data){null==data.error?(_this.fabricscategoryService.getFabricsCategoryList(_this.searchModel).subscribe(function(items){return _this.ACdata=items},function(error){return _this.errorMessage=error}),alert("added successfully"),_this.data=new fabricscategory_model_1.FabricsCategory("",!1,"",""),jQuery("#txtName").val(""),jQuery("#drType").val(""),jQuery("#ckIsActive").prop("checked",!0)):(_this.errorMessage=data.error,alert(_this.errorMessage))},function(error){_this.errorMessage=error,alert(_this.errorMessage)}),jQuery("#myModalAdd").modal("hide")},FabricsCategoryListComponent.prototype.onAdd=function(){jQuery("#txtName").val(""),jQuery("#drType").val(""),jQuery("#ckIsActive").prop("checked",!0)},FabricsCategoryListComponent.prototype.onUpdate=function(data){var _this=this;console.log(data),this.fabricscategoryService.update(data).subscribe(function(data){null==data.error?(_this.data=data,_this.fabricscategoryService.getFabricsCategoryList(_this.searchModel).subscribe(function(items){return _this.ACdata=items},function(error){return _this.errorMessage=error}),alert("updated successfully"),jQuery("#myModalEdit").modal("hide"),_this.itemid):(_this.errorMessage=data.error,alert(_this.errorMessage))},function(error){_this.errorMessage=error,alert(_this.errorMessage)})},FabricsCategoryListComponent.prototype.onEdit=function(id){var _this=this;this.itemid=id,""!==id&&this.fabricscategoryService.get(id).subscribe(function(data){_this.data=data})},FabricsCategoryListComponent.prototype.isFormChanged=function(value){var _this=this;this.fabricscategoryService.get(this.data.Id).subscribe(function(oldData){_this.isFormDataChanged(oldData)})},FabricsCategoryListComponent.prototype.isFormDataChanged=function(oldData){JSON.stringify(this.data)===JSON.stringify(oldData)?this.isFormValuesChanged=!1:this.isFormValuesChanged=!0},FabricsCategoryListComponent=__decorate([core_1.Component({selector:"fabricscategory",templateUrl:"app/FabricsCategory/fabricscategory-list/fabricscategory-list.component.html",providers:[fabricscategory_service_1.FabricsCategoryService,fabricstype_service_1.FabricsTypeService,forms_1.FormBuilder]}),__metadata("design:paramtypes",[fabricscategory_service_1.FabricsCategoryService,auth_service_1.AuthService,router_1.Router,forms_1.FormBuilder,fabricstype_service_1.FabricsTypeService])],FabricsCategoryListComponent)}(),exports_1("FabricsCategoryListComponent",FabricsCategoryListComponent)}}});
//# sourceMappingURL=fabricscategory-list.component.js.map
