import { Injectable } from '@angular/core';
import { HttpService, HeaderType } from '../http/http.service';
import { HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { AuthUser } from '../../_models/AuthUser';

@Injectable()
export class UserService {

    constructor(private http: HttpService) { }

    getUser(id: number): Observable<AuthUser> {
        return this.http.get("api/Users/" + id, HeaderType.Json);
    }

    getUsers(): Observable<AuthUser[]> {
      return this.http.get("api/Users", HeaderType.Json, "userList");
    }

    postUser(user: any): Observable<any> {
        return this.http.post("api/Users", user, HeaderType.Json);
    }
}
