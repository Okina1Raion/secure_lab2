import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from './_services/localStorage/local-storage.service';
import { AuthUser } from './_models/AuthUser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css', '../css/bootstrap.css']
})
export class AppComponent implements OnInit {
  title = 'DroneParkingProject';
  currentUser: AuthUser = null;

  constructor(
    private localStorage: LocalStorageService
  ) {

  }

  ngOnInit(): void {
    this.currentUser = this.localStorage.get("currentUser");
  }

  goTo(url: string) {
    window.location.href = "/" + url;
  }

  logOut() {
    this.localStorage.delete("currentUser");
    window.location.href = "/auth";
  }
}
