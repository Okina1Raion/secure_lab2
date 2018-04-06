import { Injectable } from '@angular/core';
import { HttpService, HeaderType } from '../http/http.service';
import { HttpHeaders } from '@angular/common/http';
import { RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { AuthUser } from '../../_models/AuthUser';
import { LocalStorageService } from '../localStorage/local-storage.service';
import { of } from 'rxjs/observable/of';
import * as sha1 from 'sha1';

@Injectable()
export class AuthService {

    // header = );

    constructor(
        private http: HttpService,
        private localStorageService: LocalStorageService) { }

    authoriseUser(user: AuthUser): Observable<AuthUser> {
        let localStorageUser: AuthUser = this.localStorageService.get("currentUser");
        if (localStorageUser != null)
            if (localStorageUser.Email == user.Email) {
                return of(localStorageUser);
            }
        //TODO change authorise!
        return this.authOnServer(user);
    }

    registrateUser(user: any): Observable<any> {
        return this.http.post("reg", user, HeaderType.Json);
    }

    authOnServer(user: any): Observable<any> {
        return this.http.post("auth", user, HeaderType.Json);
    }

    private getToken(user: AuthUser): string {
        return sha1(user.Email + user.Password);
    }

}
