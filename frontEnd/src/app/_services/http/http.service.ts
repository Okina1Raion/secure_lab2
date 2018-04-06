import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import 'rxjs/add/operator/map';
import { LocalStorageService } from '../localStorage/local-storage.service';

export enum HeaderType {
    Json,
    Form,
    Xml,
    Html,
    Text
}


@Injectable()
export class HttpService {
    serverUrl = window['serverUrl'];

    constructor(
        private http: HttpClient,
        private localStorageService: LocalStorageService
    ) { }

    createAuthorizationHeader(headers: HttpHeaders) {
        let token = this.getToken();
        if (token) {
            headers.append('Authorization', 'Bearer ' + token);
        }
    }

    get(url: string, type: HeaderType, parametersObject?: any, sessionStorageKey?: string): Observable<any> {
        let valueFromSessionStorage = this.localStorageService.get(sessionStorageKey);
        let options = parametersObject
            ? {
                headers: this.getHeaders(type),
                search: this.buildSearchParams(parametersObject)
            }
            : { headers: this.getHeaders(type) };
        if (valueFromSessionStorage != null) {
            return of(valueFromSessionStorage);
        }
        return this.returnObservableRequest(this.http.get(this.prependUrlWithVirtualDirecoryPath(url), options), sessionStorageKey);
    }

    private prependUrlWithVirtualDirecoryPath(url: string): string {
        return this.serverUrl + url;
    }

    private returnObservableRequest(value: Observable<any>, sessionStorageKey?: string): Observable<any> {
        return value;
    }

    post(url: string, body: any, type?: HeaderType): Observable<any> {
        let headers = type != null ? { headers: this.getHeaders(type) } : undefined;
        return this.returnObservableRequest(this.http.post(this.prependUrlWithVirtualDirecoryPath(url), this.stringifyBody(body), headers));
    }

    put(url: string, body: any, type?: HeaderType): Observable<any>{
        let headers = type != null ? { headers: this.getHeaders(type) } : undefined;
        return this.returnObservableRequest(this.http.put(this.prependUrlWithVirtualDirecoryPath(url), this.stringifyBody(body), headers));
    }

    delete(url: string, type?: HeaderType): Observable<any>{
        let headers = type != null ? { headers: this.getHeaders(type) } : undefined;
        return this.returnObservableRequest(this.http.delete(this.prependUrlWithVirtualDirecoryPath(url), headers));
    }

    private getToken() {
        let currentUser = this.localStorageService.get("currentUser");
        if (currentUser && currentUser.access_token)
            return currentUser.access_token;
        return null;
    }

    private getHeaders(type: HeaderType): HttpHeaders {
        let headers: HttpHeaders;

        switch (type) {
            case HeaderType.Form: {
                headers = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' });
                break;
            }
            case HeaderType.Json: {
                headers = new HttpHeaders({ 'Content-Type': 'application/json' });
                break;
            }
            default: {
                headers = new HttpHeaders();
                break;
            }
        }
        this.createAuthorizationHeader(headers);
        return headers;
    }

    private tryParseJson(value: string) {
        try {
            return JSON.parse(value);
        } catch (e) {
            return { message: value };
        }
    }

    private buildSearchParams(value: any): URLSearchParams {
        let params = new URLSearchParams();
        for (var key in value)
            if (value.hasOwnProperty(key))
                if (value[key] !== undefined && value[key] !== null)
                    params.set(key, value[key].toString());
        return params;
    }

    private stringifyBody(value: any) {
        if (typeof value === 'string' || Object.getPrototypeOf(value).constructor.name === 'FormData')
            return value;
        return JSON.stringify(value);
    }
}
