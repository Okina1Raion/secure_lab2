import { Injectable } from '@angular/core';

@Injectable()
export class LocalStorageService implements IClientStorage {
    constructor() { }

    get(token: string, specialTimeLimit?: number) {
        let item = JSON.parse(localStorage.getItem(token));
        let expireDate = specialTimeLimit || +(new Date().getTime() / 1000 / 60 / 60 / 24);
        if (!item || +item.expiresDate > specialTimeLimit) {
            return null;
        }
        return item.data;
    }
    put(token: string, obj: any): void {
        let item = {
            expiresDate: new Date().getTime() / 1000 / 60 / 60 / 24 + 7,
            data: obj
        };
        localStorage.setItem(token, JSON.stringify(item));
    }
    delete(token: string): void {
        localStorage.removeItem(token);
    }
    clear(): void {
        localStorage.clear();
    }

}

export interface IClientStorage {
    get(token: string): any;
    put(token: string, obj: any): void;
    delete(token: string): void;
    clear(): void;
}
