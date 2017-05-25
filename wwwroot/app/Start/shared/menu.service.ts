import { Injectable } from "@angular/core";
import { Http, Response, Headers, RequestOptions } from "@angular/http";
import { Observable } from "rxjs/Observable";
import { AuthHttp } from "../../auth.http";
import { AncestorMenuItem } from "../../Start/shared/ancestormenu.model";


@Injectable()
export class MenuService {
    public data: AncestorMenuItem;
    constructor(private http: AuthHttp) { }
    private baseUrl = "api/navigation/";  // web api URL

    getAccessoryLeftMenu() {
        var url = this.baseUrl + "GetAccessoryLeftMenu";
        console.log(this.http.get(url)
            .map(res => <AncestorMenuItem>res.json())
            .catch(this.handleError));
        return this.http.get(url)
            .map(res => <AncestorMenuItem>res.json())
            .catch(this.handleError);
    }
  
    getFabLeftMenu() {
        var url = this.baseUrl + "GetFabLeftMenu";
        console.log(this.http.get(url)
            .map(res => <AncestorMenuItem>res.json())
            .catch(this.handleError));
        return this.http.get(url)
            .map(res => <AncestorMenuItem>res.json())
            .catch(this.handleError);
    }
    getWashLeftMenu() {
        var url = this.baseUrl + "GetWashLeftMenu";
        console.log(this.http.get(url)
            .map(res => <AncestorMenuItem>res.json())
            .catch(this.handleError));
        return this.http.get(url)
            .map(res => <AncestorMenuItem>res.json())
            .catch(this.handleError);
    }
    getGraphicLeftMenu() {
        var url = this.baseUrl + "getGraphicLeftMenu";
        console.log(this.http.get(url)
            .map(res => <AncestorMenuItem>res.json())
            .catch(this.handleError));
        return this.http.get(url)
            .map(res => <AncestorMenuItem>res.json())
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
