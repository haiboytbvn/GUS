System.register(["@angular/core","@angular/http","./auth.http"],function(exports_1,context_1){"use strict";var core_1,http_1,auth_http_1,AuthService,__decorate=(context_1&&context_1.id,this&&this.__decorate||function(decorators,target,key,desc){var d,c=arguments.length,r=c<3?target:null===desc?desc=Object.getOwnPropertyDescriptor(target,key):desc;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)r=Reflect.decorate(decorators,target,key,desc);else for(var i=decorators.length-1;i>=0;i--)(d=decorators[i])&&(r=(c<3?d(r):c>3?d(target,key,r):d(target,key))||r);return c>3&&r&&Object.defineProperty(target,key,r),r}),__metadata=this&&this.__metadata||function(k,v){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(k,v)};return{setters:[function(core_1_1){core_1=core_1_1},function(http_1_1){http_1=http_1_1},function(auth_http_1_1){auth_http_1=auth_http_1_1}],execute:function(){AuthService=function(){function AuthService(http){this.http=http,this.authKey="auth"}return AuthService.prototype.login=function(username,password){var _this=this,data={username:username,password:password,client_id:"GUSLibrary",grant_type:"password",scope:"offline_access profile email"};return this.http.post("api/connect/token",this.toUrlEncodedString(data),new http_1.RequestOptions({headers:new http_1.Headers({"Content-Type":"application/x-www-form-urlencoded"})})).map(function(response){var auth=response.json();return console.log("The following auth JSON object has been received:"),console.log(auth),_this.setAuth(auth),auth})},AuthService.prototype.logout=function(){return this.setAuth(null),!1},AuthService.prototype.toUrlEncodedString=function(data){var body="";for(var key in data)body.length&&(body+="&"),body+=key+"=",body+=encodeURIComponent(data[key]);return body},AuthService.prototype.setAuth=function(auth){return auth?localStorage.setItem(this.authKey,JSON.stringify(auth)):localStorage.removeItem(this.authKey),!0},AuthService.prototype.getAuth=function(){var i=localStorage.getItem(this.authKey);return i?JSON.parse(i):null},AuthService.prototype.isLoggedIn=function(){return null!=localStorage.getItem(this.authKey)},AuthService=__decorate([core_1.Injectable(),__metadata("design:paramtypes",[auth_http_1.AuthHttp])],AuthService)}(),exports_1("AuthService",AuthService)}}});
//# sourceMappingURL=auth.service.js.map
