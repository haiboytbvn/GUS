import { Injectable } from "@angular/core";
import { Http, Response, Headers, RequestOptions } from "@angular/http";
import { Observable } from "rxjs/Observable";
import { AuthHttp } from "../../auth.http";
import { Application } from "../../Application/shared/application.model";
import { SearchGeneralFilter } from "../../SearchGeneralFilter/shared/searchGeneralFilter.model";

@Injectable()
export class ApplicationService {
    public data: Application;
    constructor(private http: AuthHttp) { }
    private baseUrl = "api/application/";  // web api URL

    // calls the [GET] /api/items/GetLatest/{n} Web API method to retrieve the latest items.  


    getApplicationList(data: SearchGeneralFilter) {
        var url = this.baseUrl + "GetApplicationList";
        return this.http.post(url, JSON.stringify(data), this.getRequestOptions())
            .map(response => response.json())
            .catch(this.handleError);
    }
    // calls the [POST] /api/items/ Web API method to add a new item.
    add(data: Application) {
        var url = this.baseUrl + "AddApplication";
        return this.http.post(url, JSON.stringify(data), this.getRequestOptions())
            .map(response => response.json())
            .catch(this.handleError);
    }
    // calls the [GET] /api/items/{id} Web API method to retrieve the item with the given id.
    getbyId(id: string) {
        if (id == null) { throw new Error("id is required."); }
        var url = this.baseUrl + "GetApplicationbyId/" + id;
        return this.http.get(url)
            .map(res => <Application>res.json())
            .catch(this.handleError);
    }

    // calls the [GET] /api/items/{slug} Web API method to retrieve the item with the given slug.
    get(id: string) {
        if (id == null || id == "") { throw new Error("id is required."); }
        var url = this.baseUrl + "GetApplicationById/" + id;
        return this.http.get(url)
            .map(res => <Application>res.json())
            .catch(this.handleError);
    }
    update(data: Application) {
        var url = this.baseUrl + "UpdateApplication";
        return this.http.put(url, JSON.stringify(data), this.getRequestOptions())
            .map(response => response.json())
            .catch(this.handleError);
    }

    // calls the [DELETE] /api/items/{id} Web API method to delete the item with the given id.
    delete(id: string) {
        var url = this.baseUrl + "DeleteApplication/" + id;
        return this.http.delete(url, new RequestOptions())
            .catch(this.handleError);
    }

    private getRequestOptions() {
        return new RequestOptions({
            headers: new Headers({
                "Content-Type": "application/json"
            })
        });
    }



    // returns a viable RequestOptions object to handle Json requests
    private handleError(error: Response) {
        // output errors to the console.
        console.error(error);
        return Observable.throw(error.json().error || "Server error");
    }
}
