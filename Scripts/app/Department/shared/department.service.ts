import { Injectable } from "@angular/core";
import { Http, Response, Headers, RequestOptions } from "@angular/http";
import { Observable } from "rxjs/Observable";
import { AuthHttp } from "../../auth.http";
import { Department } from "../../Department/shared/department.model";
import { GeneralSearchModel } from "../../Pagination/shared/generalsearch.model";
@Injectable()
export class DepartmentService {
    public data: Department;
    constructor(private http: AuthHttp) { }
    private baseUrl = "api/department/";  // web api URL

    // calls the [GET] /api/items/GetLatest/{n} Web API method to retrieve the latest items.  



    getDepartmentList(data: GeneralSearchModel){
        var url = this.baseUrl + "GetDepartmentList";
        return this.http.post(url, JSON.stringify(data), this.getRequestOptions())
            .map(response => response.json())
            .catch(this.handleError);
    }

    // calls the [POST] /api/items/ Web API method to add a new item.
    add(data: Department) {
        console.log(data);
        var url = this.baseUrl + "AddDepartment";
        return this.http.post(url, JSON.stringify(data), this.getRequestOptions())
            .map(response => response.json())
            .catch(this.handleError);
    }
  
    get(id: string) {
        if (id == null || id == "") { throw new Error("id is required."); }
        var url = this.baseUrl + "GetDepartmentById/" + id;
        return this.http.get(url)
            .map(res => <Department>res.json())
            .catch(this.handleError);
    }
    update(data: Department) {
        var url = this.baseUrl + "UpdateDepartment";
        return this.http.put(url, JSON.stringify(data), this.getRequestOptions())
            .map(response => response.json())
            .catch(this.handleError);
    }

    // calls the [DELETE] /api/items/{id} Web API method to delete the item with the given id.
    delete(id: string) {
        var url = this.baseUrl + "DeleteDepartment/" + id;
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
