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
    var core_1, http_1, Observable_1, auth_http_1, POMService;
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
            POMService = (function () {
                function POMService(http) {
                    this.http = http;
                    this.baseUrl = "api/pom/"; // web api URL
                }
                // calls the [GET] /api/items/GetLatest/{n} Web API method to retrieve the latest items.  
                POMService.prototype.getPOMList = function (data) {
                    var url = this.baseUrl + "GetPOMList";
                    return this.http.post(url, JSON.stringify(data), this.getRequestOptions())
                        .map(function (response) { return response.json(); })
                        .catch(this.handleError);
                };
                // calls the [POST] /api/items/ Web API method to add a new item.
                POMService.prototype.add = function (data) {
                    console.log(data);
                    var url = this.baseUrl + "AddPOM";
                    return this.http.post(url, JSON.stringify(data), this.getRequestOptions())
                        .map(function (response) { return response.json(); })
                        .catch(this.handleError);
                };
                // calls the [GET] /api/items/{id} Web API method to retrieve the item with the given id.
                POMService.prototype.get = function (id) {
                    if (id == null) {
                        throw new Error("id is required.");
                    }
                    var url = this.baseUrl + "GetPOMById/" + id;
                    return this.http.get(url)
                        .map(function (res) { return res.json(); })
                        .catch(this.handleError);
                };
                POMService.prototype.update = function (data) {
                    var url = this.baseUrl + "UpdatePOM";
                    return this.http.put(url, JSON.stringify(data), this.getRequestOptions())
                        .map(function (response) { return response.json(); })
                        .catch(this.handleError);
                };
                // calls the [DELETE] /api/items/{id} Web API method to delete the item with the given id.
                POMService.prototype.delete = function (id) {
                    var url = this.baseUrl + "DeletePOM/" + id;
                    return this.http.delete(url, new http_1.RequestOptions())
                        .catch(this.handleError);
                };
                POMService.prototype.getRequestOptions = function () {
                    return new http_1.RequestOptions({
                        headers: new http_1.Headers({
                            "Content-Type": "application/json"
                        })
                    });
                };
                // returns a viable RequestOptions object to handle Json requests
                POMService.prototype.handleError = function (error) {
                    // output errors to the console.
                    console.error(error);
                    return Observable_1.Observable.throw(error.json().error || "Server error");
                };
                return POMService;
            }());
            POMService = __decorate([
                core_1.Injectable(),
                __metadata("design:paramtypes", [auth_http_1.AuthHttp])
            ], POMService);
            exports_1("POMService", POMService);
        }
    };
});
