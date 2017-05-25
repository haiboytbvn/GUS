import { Injectable } from "@angular/core";
import { Http, Response, Headers, RequestOptions } from "@angular/http";
import { Observable } from "rxjs/Observable";
import { AuthHttp } from "../../auth.http";
import { AccessoryType } from "../../AccessoryType/shared/accessorytype.model";
import { GeneralSearchModel } from "../../Pagination/shared/generalsearch.model";

@Injectable()
export class AccessoryTypeService {
    public data: AccessoryType;
    constructor(private http: AuthHttp) { }
    private baseUrl = "api/accessorytype/";  // web api URL

    getAccessoryTypeList(data: GeneralSearchModel) {
        var url = this.baseUrl + "GetAccessoryTypeList";
        return this.http.post(url, JSON.stringify(data), this.getRequestOptions())
            .map(response => response.json())
            .catch(this.handleError);
    }

    // calls the [POST] /api/items/ Web API method to add a new item.
    add(data: AccessoryType) {
        var url = this.baseUrl + "AddAccessoryType";
        return this.http.post(url, JSON.stringify(data), this.getRequestOptions())
            .map(response => response.json())
            .catch(this.handleError);
    } 
    // calls the [GET] /api/items/{id} Web API method to retrieve the item with the given id.
    get(id: string) {

        if (id == null || id == "" ) { throw new Error("id is required."); }
        var url = this.baseUrl + "GetAccessoryTypebyId/" + id;
        return this.http.get(url)
            .map(res => <AccessoryType>res.json())
            .catch(this.handleError);
    }
    update(data: AccessoryType) {
        var url = this.baseUrl + "UpdateAccessoryType";
        return this.http.put(url, JSON.stringify(data), this.getRequestOptions())
            .map(response => response.json())
            .catch(this.handleError);
    }

    // calls the [DELETE] /api/items/{id} Web API method to delete the item with the given id.
    delete(id: string) {
        var url = this.baseUrl + "DeleteAccessoryType/" + id;
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
