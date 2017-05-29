import { Injectable } from "@angular/core";
import { Http, Response, Headers, RequestOptions } from "@angular/http";
import { Observable } from "rxjs/Observable";
import { AuthHttp } from "../../auth.http";
import { AccessoryProductName } from "../../AccessoryProductName/shared/accessoryproductname.model";
import { GeneralSearchModel } from "../../Pagination/shared/generalsearch.model";

@Injectable()
export class AccessoryProductNameService {
    public data: AccessoryProductName;
    constructor(private http: AuthHttp) { }
    private baseUrl = "api/accessoryproductname/";  // web api URL

    getAccessoryProductNameList(data: GeneralSearchModel) {
        var url = this.baseUrl + "GetAccessoryProductNameList";
        return this.http.post(url, JSON.stringify(data), this.getRequestOptions())
            .map(response => response.json())
            .catch(this.handleError);
    }

    // calls the [POST] /api/items/ Web API method to add a new item.
    add(data: AccessoryProductName) {
        var url = this.baseUrl + "AddAccessoryProductName";
        return this.http.post(url, JSON.stringify(data), this.getRequestOptions())
            .map(response => response.json())
            .catch(this.handleError);
    } 
    GetAccProductNameByCategory(id: string) {
        if (id == null) { throw new Error("id is required."); }
        var url = this.baseUrl + "GetAccProductNameByCategory/" + id;
        return this.http.get(url)
            .map(res => <AccessoryProductName>res.json())
            .catch(this.handleError);
    }
    // calls the [GET] /api/items/{id} Web API method to retrieve the item with the given id.
    get(id: string) {

        if (id == null || id == "" ) { throw new Error("id is required."); }
        var url = this.baseUrl + "GetAccessoryProductNamebyId/" + id;
        return this.http.get(url)
            .map(res => <AccessoryProductName>res.json())
            .catch(this.handleError);
    }
    update(data: AccessoryProductName) {
        var url = this.baseUrl + "UpdateAccessoryProductName";
        return this.http.put(url, JSON.stringify(data), this.getRequestOptions())
            .map(response => response.json())
            .catch(this.handleError);
    }

    // calls the [DELETE] /api/items/{id} Web API method to delete the item with the given id.
    delete(id: string) {
        var url = this.baseUrl + "DeleteAccessoryProductName/" + id;
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
