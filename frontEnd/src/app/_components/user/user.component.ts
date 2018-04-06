import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../../_services/user/user.service';
import { LocalStorageService } from '../../_services/localStorage/local-storage.service';
import { AuthUser } from '../../_models/AuthUser';

@Component({
    selector: 'app-user',
    templateUrl: './user.component.html',
    styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
    user: any = {
        Id: 0,
        Email: "",

    };
    currentUser: AuthUser;

    constructor(
        private route: ActivatedRoute,
        private userService: UserService,
        private localStorageService: LocalStorageService
    ) { }

    ngOnInit() {
        let id = +this.route.snapshot.paramMap.get('id');
        this.userService.getUser(id).subscribe((data: AuthUser) => {
            if (data == null) {
                alert("No such user");
                window.open("/user/"+this.currentUser.Id);
            }
            this.user = data;
        });
        this.currentUser = this.localStorageService.get("currentUser");
    }

    checkLength(elem: any) {
        if(elem == undefined) return false
        else return elem.length > 0;
    }
}
