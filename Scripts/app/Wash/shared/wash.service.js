System.register(["@angular/core", "@angular/http", "rxjs/Observable", "../../auth.http"], function (exports_1, context_1) {
    "use strict";
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var __moduleName = context_1 && context_1.id;
    var core_1, http_1, Observable_1, auth_http_1, WashService;
    return {
        setters: [
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
            },
            function (Observable_1_1) {
                Observable_1 = Observable_1_1;
            },
            function (auth_http_1_1) {
                auth_http_1 = auth_http_1_1;
            }
        ],
        execute: function () {
            WashService = (function () {
                function WashService(http) {
                    this.http = http;
                    this.baseUrl = "api/wash/"; // web api URL
                }
                // calls the [GET] /api/items/GetLatest/{n} Web API method to retrieve the latest items.  
                WashService.prototype.getWashList = function (data) {
                    var url = this.baseUrl + "GetWashList";
                    return this.http.post(url, JSON.stringify(data), this.getRequestOptions())
                        .map(function (response) { return response.json(); })
                        .catch(this.handleError);
                };
                // calls the [POST] /api/items/ Web API method to add a new item.
                WashService.prototype.add = function (data) {
                    console.log(data);
                    var url = this.baseUrl + "AddWash";
                    console.log(JSON.stringify(data));
                    return this.http.post(url, JSON.stringify(data), this.getRequestOptions())
                        .map(function (response) { return response.json(); })
                        .catch(this.handleError);
                };
                // calls the [GET] /api/items/{id} Web API method to retrieve the item with the given id.
                WashService.prototype.get = function (id) {
                    if (id == null) {
                        throw new Error("id is required.");
                    }
                    var url = this.baseUrl + "GetWashById/" + id;
                    return this.http.get(url)
                        .map(function (res) { return res.json(); })
                        .catch(this.handleError);
                };
                WashService.prototype.update = function (data) {
                    var url = this.baseUrl + "UpdateWash";
                    return this.http.put(url, JSON.stringify(data), this.getRequestOptions())
                        .map(function (response) { return response.json(); })
                        .catch(this.handleError);
                };
                // calls the [DELETE] /api/items/{id} Web API method to delete the item with the given id.
                WashService.prototype.delete = function (id) {
                    var url = this.baseUrl + "DeleteWash/" + id;
                    return this.http.delete(url, new http_1.RequestOptions())
                        .catch(this.handleError);
                };
                WashService.prototype.getRequestOptions = function () {
                    return new http_1.RequestOptions({
                        headers: new http_1.Headers({
                            "Content-Type": "application/json"
                        })
                    });
                };
                // returns a viable RequestOptions object to handle Json requests
                WashService.prototype.handleError = function (error) {
                    // output errors to the console.
                    console.error(error);
                    return Observable_1.Observable.throw(error.json().error || "Server error");
                };
                WashService.prototype.upload = function (data) {
                    var url = this.baseUrl + "UploadAngular";
                    var headers = new http_1.Headers();
                    headers.append('Accept', 'application/json');
                    var options = new http_1.RequestOptions({ headers: headers });
                    return this.http.post(url, data, options)
                        .map(function (res) { return res.json(); })
                        .catch(this.handleError);
                };
                return WashService;
            }());
            WashService = __decorate([
                core_1.Injectable(),
                __metadata("design:paramtypes", [auth_http_1.AuthHttp])
            ], WashService);
            exports_1("WashService", WashService);
        }
    };
});
