import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { debug } from 'util';
import { LocalStorageService } from '../../_services/localStorage/local-storage.service';
import { AuthUser } from '../../_models/AuthUser';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

    currentUser: AuthUser = null;

    constructor(
        private localStorage: LocalStorageService
    ) { }

    ngOnInit() {
        this.currentUser = this.localStorage.get("currentUser");
    }


}
