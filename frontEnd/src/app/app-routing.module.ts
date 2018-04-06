import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from "./_components/home/home.component"
import { UserComponent } from "./_components/user/user.component"
import { RegistrationComponent } from "./_components/registration/registration.component"
import { AuthorisationComponent } from './_components/authorisation/authorisation.component';

const routes: Routes = [
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: 'home', component: HomeComponent },
    { path: 'user/:id', component: UserComponent },
    { path: 'registration', component: RegistrationComponent },
    { path: 'auth', component: AuthorisationComponent },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }