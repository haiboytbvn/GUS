import { Injectable } from "@angular/core";
import { Http, Response, Headers, RequestOptions } from "@angular/http";
import { Observable } from "rxjs/Observable";
import { AuthHttp } from "../../auth.http";
import { Graphic } from "../../Graphic/shared/graphic.model";
import { GraphicSearchModel } from "../../Graphic/shared/graphic-search.model";

@Injectable()
export class GraphicService {
    public data: Graphic;
    constructor(private http: AuthHttp) { }
    private baseUrl = "api/graphic/";  // web api URL

    // calls the [GET] /api/items/GetLatest/{n} Web API method to retrieve the latest items.  



    getGraphicList(data: GraphicSearchModel){

        var url = this.baseUrl + "GetGraphicList";
        return this.http.post(url, JSON.stringify(data), this.getRequestOptions())
            .map(response => response.json())
            .catch(this.handleError);
    }
    uploadImage(imageData: File) {
        let uploaddata = JSON.stringify(imageData);
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        console.log(imageData);
        var url = this.baseUrl + "UploadImage";
        return this.http.post(url, uploaddata, options)
            .map(response => response.json())
            .catch(this.handleError);
    }

    // calls the [POST] /api/items/ Web API method to add a new item.
    add(data: Graphic) {
        console.log(data);
        var url = this.baseUrl + "AddGraphic";
        console.log(JSON.stringify(data));
        return this.http.post(url, JSON.stringify(data), this.getRequestOptions())
            .map(response => response.json())
            .catch(this.handleError);
    }
    // calls the [GET] /api/items/{id} Web API method to retrieve the item with the given id.
    get(id: string) {
        if (id == null) { throw new Error("id is required."); }
        var url = this.baseUrl + "GetGraphicById/" + id;
        return this.http.get(url)
            .map(res => <Graphic>res.json())
            .catch(this.handleError);
    }

    // get Graphic type for dropdownlist
    getGraphicType() {
        var url = this.baseUrl + "GetGraphicType";
        return this.http.get(url)
            .map(res => <string>res.json())
            .catch(this.handleError);
    }
    update(data: Graphic) {
        var url = this.baseUrl + "UpdateGraphic";
        return this.http.put(url, JSON.stringify(data), this.getRequestOptions())
            .map(response => response.json())
            .catch(this.handleError);
    }

    // calls the [DELETE] /api/items/{id} Web API method to delete the item with the given id.
    delete(id: string) {
        var url = this.baseUrl + "DeleteGraphic/" + id;
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
