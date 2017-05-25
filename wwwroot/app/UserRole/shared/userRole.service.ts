import { Injectable } from "@angular/core";
import { Http, Response, Headers, RequestOptions } from "@angular/http";
import { Observable } from "rxjs/Observable";
import { AuthHttp } from "../../auth.http";
import { UserRole } from "../../UserRole/shared/userRole.model";
import { UserRoleMatrix } from "../../UserRole/shared/UserRoleMatrix.model";

@Injectable()
export class UserRoleService {
    public data: UserRoleMatrix;
    constructor(private http: AuthHttp) { }
    private baseUrl = "api/userRole/";  // web api URL


    // calls the [GET] /api/items/GetLatest/{n} Web API method to retrieve the latest items.  
    getUserRoleList() {
        var url = this.baseUrl + "GetUserRoleList";
        return this.http.get(url)
            .map(response => response.json())
            .catch(this.handleError);
    }

    get(id: string) {
        if (id == null) { throw new Error("id is required."); }
        var url = this.baseUrl + "GetUserRole/" + id;
        return this.http.get(url)
            .map(res => <UserRole>res.json())
            .catch(this.handleError);
    }

    getUserMatrix(id: string) {
        if (id == null) { throw new Error("id is required."); }
        var url = this.baseUrl + "GetUserMatrixValue/" + id;
        return this.http.get(url)
            .map(response => response.json())
            .catch(this.handleError);
    }

    add(data: UserRoleMatrix) {
        console.log(data);
        var url = this.baseUrl + "AddUserRole";
        return this.http.post(url, JSON.stringify(data), this.getRequestOptions())
            .map(response => response.json())
            .catch(this.handleError);
    }

    update(data: UserRoleMatrix) {
        var url = this.baseUrl + "UpdateUserRole";
        return this.http.put(url, JSON.stringify(data), this.getRequestOptions())
            .map(response => response.json())
            .catch(this.handleError);
    }

    delete(id: string) {
        var url = this.baseUrl + "DeleteUserRole/" + id;
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
