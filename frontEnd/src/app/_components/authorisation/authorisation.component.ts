import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../_services/auth/auth.service';
import { LocalStorageService } from '../../_services/localStorage/local-storage.service';
import { AuthUser } from '../../_models/AuthUser';

@Component({
  selector: 'app-authorisation',
  templateUrl: './authorisation.component.html',
  styleUrls: ['./authorisation.component.css']
})
export class AuthorisationComponent implements OnInit {

  constructor(
    private authService: AuthService,
    private localStorage: LocalStorageService
  ) { }

  user: AuthUser = {
    Id: 0,
    Email: "",
    Password: ""
  }

  emptyUser: string;

  ngOnInit() {
    this.emptyUser = JSON.stringify(this.user);
  }

  submit() {
    this.authService.authoriseUser(this.user).subscribe((data: any) => {
      if (data == null) this.user = JSON.parse(this.emptyUser);
      else {
        this.localStorage.put("currentUser", data);
        window.location.href = '/user/' + data.Id;
      }
    });
  }

  cancel(){
    window.location.href ="/home";
  }
}
