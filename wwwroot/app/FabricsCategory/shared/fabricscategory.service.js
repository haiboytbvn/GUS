System.register(["@angular/core","@angular/http","rxjs/Observable","../../auth.http"],function(exports_1,context_1){"use strict";var core_1,http_1,Observable_1,auth_http_1,FabricsCategoryService,__decorate=(context_1&&context_1.id,this&&this.__decorate||function(decorators,target,key,desc){var d,c=arguments.length,r=c<3?target:null===desc?desc=Object.getOwnPropertyDescriptor(target,key):desc;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)r=Reflect.decorate(decorators,target,key,desc);else for(var i=decorators.length-1;i>=0;i--)(d=decorators[i])&&(r=(c<3?d(r):c>3?d(target,key,r):d(target,key))||r);return c>3&&r&&Object.defineProperty(target,key,r),r}),__metadata=this&&this.__metadata||function(k,v){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(k,v)};return{setters:[function(core_1_1){core_1=core_1_1},function(http_1_1){http_1=http_1_1},function(Observable_1_1){Observable_1=Observable_1_1},function(auth_http_1_1){auth_http_1=auth_http_1_1}],execute:function(){FabricsCategoryService=function(){function FabricsCategoryService(http){this.http=http,this.baseUrl="api/fabricscategory/"}return FabricsCategoryService.prototype.getFabricsCategoryList=function(data){var url=this.baseUrl+"GetFabricsCategoryList";return this.http.post(url,JSON.stringify(data),this.getRequestOptions()).map(function(response){return response.json()}).catch(this.handleError)},FabricsCategoryService.prototype.getFabCateogryListByType=function(id){if(null==id)throw new Error("id is required.");var url=this.baseUrl+"GetFabCategoryListByType/"+id;return this.http.get(url).map(function(res){return res.json()}).catch(this.handleError)},FabricsCategoryService.prototype.add=function(data){console.log(data);var url=this.baseUrl+"AddFabricsCategory";return this.http.post(url,JSON.stringify(data),this.getRequestOptions()).map(function(response){return response.json()}).catch(this.handleError)},FabricsCategoryService.prototype.get=function(id){if(null==id)throw new Error("id is required.");var url=this.baseUrl+"GetFabricsCategoryById/"+id;return this.http.get(url).map(function(res){return res.json()}).catch(this.handleError)},FabricsCategoryService.prototype.update=function(data){var url=this.baseUrl+"UpdateFabricsCategory";return this.http.put(url,JSON.stringify(data),this.getRequestOptions()).map(function(response){return response.json()}).catch(this.handleError)},FabricsCategoryService.prototype.delete=function(id){var url=this.baseUrl+"DeleteFabricsCategory/"+id;return this.http.delete(url,new http_1.RequestOptions).catch(this.handleError)},FabricsCategoryService.prototype.getRequestOptions=function(){return new http_1.RequestOptions({headers:new http_1.Headers({"Content-Type":"application/json"})})},FabricsCategoryService.prototype.handleError=function(error){return console.error(error),Observable_1.Observable.throw(error.json().error||"Server error")},FabricsCategoryService=__decorate([core_1.Injectable(),__metadata("design:paramtypes",[auth_http_1.AuthHttp])],FabricsCategoryService)}(),exports_1("FabricsCategoryService",FabricsCategoryService)}}});
//# sourceMappingURL=fabricscategory.service.js.map