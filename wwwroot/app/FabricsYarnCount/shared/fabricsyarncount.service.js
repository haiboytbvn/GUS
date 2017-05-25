System.register(["@angular/core","@angular/http","rxjs/Observable","../../auth.http"],function(exports_1,context_1){"use strict";var core_1,http_1,Observable_1,auth_http_1,FabricsYarnCountService,__decorate=(context_1&&context_1.id,this&&this.__decorate||function(decorators,target,key,desc){var d,c=arguments.length,r=c<3?target:null===desc?desc=Object.getOwnPropertyDescriptor(target,key):desc;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)r=Reflect.decorate(decorators,target,key,desc);else for(var i=decorators.length-1;i>=0;i--)(d=decorators[i])&&(r=(c<3?d(r):c>3?d(target,key,r):d(target,key))||r);return c>3&&r&&Object.defineProperty(target,key,r),r}),__metadata=this&&this.__metadata||function(k,v){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(k,v)};return{setters:[function(core_1_1){core_1=core_1_1},function(http_1_1){http_1=http_1_1},function(Observable_1_1){Observable_1=Observable_1_1},function(auth_http_1_1){auth_http_1=auth_http_1_1}],execute:function(){FabricsYarnCountService=function(){function FabricsYarnCountService(http){this.http=http,this.baseUrl="api/fabricsyarncount/"}return FabricsYarnCountService.prototype.getFabricsYarnCountList=function(data){var url=this.baseUrl+"GetFabricsYarnCountList";return this.http.post(url,JSON.stringify(data),this.getRequestOptions()).map(function(response){return response.json()}).catch(this.handleError)},FabricsYarnCountService.prototype.add=function(data){var url=this.baseUrl+"AddFabricsYarnCount";return this.http.post(url,JSON.stringify(data),this.getRequestOptions()).map(function(response){return response.json()}).catch(this.handleError)},FabricsYarnCountService.prototype.get=function(id){if(null==id)throw new Error("id is required.");var url=this.baseUrl+"GetFabricsYarnCountById/"+id;return this.http.get(url).map(function(res){return res.json()}).catch(this.handleError)},FabricsYarnCountService.prototype.update=function(data){var url=this.baseUrl+"UpdateFabricsYarnCount";return this.http.put(url,JSON.stringify(data),this.getRequestOptions()).map(function(response){return response.json()}).catch(this.handleError)},FabricsYarnCountService.prototype.delete=function(id){var url=this.baseUrl+"DeleteFabricsYarnCount/"+id;return this.http.delete(url,new http_1.RequestOptions).catch(this.handleError)},FabricsYarnCountService.prototype.getRequestOptions=function(){return new http_1.RequestOptions({headers:new http_1.Headers({"Content-Type":"application/json"})})},FabricsYarnCountService.prototype.handleError=function(error){return console.error(error),Observable_1.Observable.throw(error.json().error||"Server error")},FabricsYarnCountService=__decorate([core_1.Injectable(),__metadata("design:paramtypes",[auth_http_1.AuthHttp])],FabricsYarnCountService)}(),exports_1("FabricsYarnCountService",FabricsYarnCountService)}}});
//# sourceMappingURL=fabricsyarncount.service.js.map