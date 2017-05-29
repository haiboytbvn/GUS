import { Injectable } from "@angular/core";
import { Http, Response, Headers, RequestOptions } from "@angular/http";
import { Observable } from "rxjs/Observable";
import { AuthHttp } from "../../auth.http";
import { VendorType } from "../../VendorType/shared/vendorType.model";
@Injectable()
export class VendorTypeService {
    public data: VendorType;
    constructor(private http: AuthHttp) { }
    private baseUrl = "api/vendortype/";  // web api URL

    // calls the [GET] /api/items/{id} Web API method to retrieve the item with the given id.
    get(id: string) {
        if (id == null) { throw new Error("id is required."); }
        var url = this.baseUrl + "GetVendorTypebyId/" + id;
        return this.http.get(url)
            .map(res => <VendorType>res.json())
            .catch(this.handleError);
    }

    // calls the [GET] /api/items/GetLatest/{n} Web API method to retrieve the latest items.  
    getVendorTypeList() {
        var url = this.baseUrl + "GetVendorTypeList";
        return this.http.get(url)
            .map(response => response.json())
            .catch(this.handleError);
    }

    // calls the [POST] /api/items/ Web API method to add a new item.
    add(data: VendorType) {
        console.log(data);
        var url = this.baseUrl + "AddVendorType";
        return this.http.post(url, JSON.stringify(data), this.getRequestOptions())
            .map(response => response.json())
            .catch(this.handleError);
    }

    update(data: VendorType) {
        var url = this.baseUrl + "UpdateVendorType";
        return this.http.put(url, JSON.stringify(data), this.getRequestOptions())
            .map(response => response.json())
            .catch(this.handleError);
    }

    // calls the [DELETE] /api/items/{id} Web API method to delete the item with the given id.
    delete(id: string) {
        var url = this.baseUrl + "DeleteVendorType/" + id;
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