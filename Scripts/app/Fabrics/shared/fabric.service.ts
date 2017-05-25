import { Injectable } from "@angular/core";
import { Http, Response, Headers, RequestOptions } from "@angular/http";
import { Observable } from "rxjs/Observable";
import { AuthHttp } from "../../auth.http";
import { Fabrics } from "../../Fabrics/shared/fabric.model";
import { FabricsSearchModel } from "../../Fabrics/shared/fabrics-search.model";
@Injectable()
export class FabricsService {
    public data: Fabrics;
    constructor(private http: AuthHttp) { }
    private baseUrl = "api/fabric/";  // web api URL

    // calls the [GET] /api/items/GetLatest/{n} Web API method to retrieve the latest items.  



    getFabricsList(data: FabricsSearchModel) {
        console.log(data);
        var url = this.baseUrl + "GetFabricsList";
        return this.http.post(url, JSON.stringify(data), this.getRequestOptions())
            .map(response => response.json())
            .catch(this.handleError);
    }
 
    // calls the [POST] /api/items/ Web API method to add a new item.
    add(data: Fabrics) {
        console.log(data);
        var url = this.baseUrl + "AddFabrics";
        console.log(JSON.stringify(data));
        return this.http.post(url, JSON.stringify(data), this.getRequestOptions())
            .map(response => response.json())
            .catch(this.handleError);
    }
    // calls the [GET] /api/items/{id} Web API method to retrieve the item with the given id.
    get(id: string) {
        if (id == null) { throw new Error("id is required."); }
        var url = this.baseUrl + "GetFabricsById/" + id;
        return this.http.get(url)
            .map(res => <Fabrics>res.json())
            .catch(this.handleError);
    }
    update(data: Fabrics) {
        var url = this.baseUrl + "UpdateFabrics";
        return this.http.put(url, JSON.stringify(data), this.getRequestOptions())
            .map(response => response.json())
            .catch(this.handleError);
    }

    // calls the [DELETE] /api/items/{id} Web API method to delete the item with the given id.
    delete(id: string) {
        var url = this.baseUrl + "DeleteFabrics/" + id;
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
