import { Injectable } from "@angular/core";
import { Http, Response, Headers, RequestOptions } from "@angular/http";
import { Observable } from "rxjs/Observable";
import { AuthHttp } from "../../auth.http";
import { GraphicCategory } from "../../GraphicCategory/shared/graphiccategory.model";
import { SearchGeneralFilter } from "../../SearchGeneralFilter/shared/searchGeneralFilter.model";

@Injectable()
export class GraphicCategoryService {
    public data: GraphicCategory;
    constructor(private http: AuthHttp) { }
    private baseUrl = "api/graphiccategory/";  // web api URL

    // calls the [GET] /api/items/GetLatest/{n} Web API method to retrieve the latest items.  

    getGraphicCategoryList(data: SearchGeneralFilter) {
        var url = this.baseUrl + "GetGraphicCategoryList";
        return this.http.post(url, JSON.stringify(data), this.getRequestOptions())
            .map(response => response.json())
            .catch(this.handleError);
    }

// calls the [POST] /api/items/ Web API method to add a new item.
    add(data: GraphicCategory) {
        console.log(data);
        var url = this.baseUrl + "AddGraphicCategory";
        return this.http.post(url, JSON.stringify(data), this.getRequestOptions())
            .map(response => response.json())
            .catch(this.handleError);
    }
    getGraphicCategoryListByType(id: string) {
        if (id == null) { throw new Error("id is required."); }
        var url = this.baseUrl + "GetGraphicCategoryListByType/" + id;
        return this.http.get(url)
            .map(res => <GraphicCategory>res.json())
            .catch(this.handleError);
    }
    // calls the [GET] /api/items/{id} Web API method to retrieve the item with the given id.
    get(id: string) {
        if (id == null) { throw new Error("id is required."); }
        var url = this.baseUrl + "GetGraphicCategoryById/" + id;
        return this.http.get(url)
            .map(res => <GraphicCategory>res.json())
            .catch(this.handleError);
    }
    update(data: GraphicCategory) {
        var url = this.baseUrl + "UpdateGraphicCategory";
        return this.http.put(url, JSON.stringify(data), this.getRequestOptions())
            .map(response => response.json())
            .catch(this.handleError);
    }

    // calls the [DELETE] /api/items/{id} Web API method to delete the item with the given id.
    delete(id: string) {
        var url = this.baseUrl + "DeleteGraphicCategory/" + id;
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
