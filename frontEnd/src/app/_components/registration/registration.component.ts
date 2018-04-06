import { Component, OnInit } from '@angular/core';
import { AuthService } from "../../_services/auth/auth.service";
import { UserService } from "../../_services/user/user.service";
import { AuthUser } from '../../_models/AuthUser';
import { LocalStorageService } from '../../_services/localStorage/local-storage.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  user: AuthUser = {
    Id: 0,
    Email: '',
    Password: ''
  };
  repeatedPassword: string = "";
  originalUser: string;

  constructor(
    private authService: AuthService,
    private localStorageService: LocalStorageService,
    private userService: UserService
  ) { }

  ngOnInit() {
    this.originalUser = JSON.stringify(this.user);
  }

  submit() {
    console.log(JSON.stringify(this.user));
    this.authService.registrateUser(this.user).subscribe((data: any) => {
      if (data == null) this.user = JSON.parse(this.originalUser);
      else {
        this.localStorageService.put("currentUser", data);
        window.location.href = '/user/' + data.Id;
      }
    });
  }

  verify(): boolean {
    return (this.user.Email == '' || this.user.Password == '' || this.repeatedPassword == '' || this.user.Password != this.repeatedPassword);
  }

  cancel() {
    window.location.href = "/home";
  }
}
