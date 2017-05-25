import { Injectable } from "@angular/core";
import { Http, Response, Headers, RequestOptions } from "@angular/http";
import { Observable } from "rxjs/Observable";
import { AuthHttp } from "../../auth.http";
import { Division } from "../../Division/shared/division.model";
import { GeneralSearchModel } from "../../Pagination/shared/generalsearch.model";

@Injectable()
export class DivisionService {
    public data: Division;
    constructor(private http: AuthHttp) { }
    private baseUrl = "api/division/";  // web api URL

    getDivisionList(data: GeneralSearchModel) {
        var url = this.baseUrl + "GetDivisionList";
        return this.http.post(url, JSON.stringify(data), this.getRequestOptions())
            .map(response => response.json())
            .catch(this.handleError);
    }

    // calls the [POST] /api/items/ Web API method to add a new item.
    add(data: Division) {
        var url = this.baseUrl + "AddDivision";
        return this.http.post(url, JSON.stringify(data), this.getRequestOptions())
            .map(response => response.json())
            .catch(this.handleError);
    } 
    // calls the [GET] /api/items/{id} Web API method to retrieve the item with the given id.
    get(id: string) {

        if (id == null || id == "" ) { throw new Error("id is required."); }
        var url = this.baseUrl + "GetDivisionbyId/" + id;
        return this.http.get(url)
            .map(res => <Division>res.json())
            .catch(this.handleError);
    }
    update(data: Division) {
        var url = this.baseUrl + "UpdateDivision";
        return this.http.put(url, JSON.stringify(data), this.getRequestOptions())
            .map(response => response.json())
            .catch(this.handleError);
    }

    // calls the [DELETE] /api/items/{id} Web API method to delete the item with the given id.
    delete(id: string) {
        var url = this.baseUrl + "DeleteDivision/" + id;
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
