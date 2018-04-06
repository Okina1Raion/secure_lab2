import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './/app-routing.module';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { HomeComponent } from './_components/home/home.component';
import { UserComponent } from './_components/user/user.component';
import { RegistrationComponent } from './_components/registration/registration.component';
import { AuthorisationComponent } from './_components/authorisation/authorisation.component';

import { HttpService } from './_services/http/http.service';
import { LocalStorageService } from './_services/localStorage/local-storage.service';
import { UserService } from './_services/user/user.service';
import { AuthService } from "./_services/auth/auth.service";

@NgModule({
    declarations: [
        AppComponent,
        HomeComponent,
        UserComponent,
        RegistrationComponent,
        AuthorisationComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        AppRoutingModule,
        HttpClientModule
    ],
    providers: [
        HttpService,
        LocalStorageService,
        UserService,
        AuthService
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
