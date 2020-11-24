import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomeComponent} from './home/home.component';
import {PreferencesComponent} from "./preferences/preferences.component";
import {PlayComponent} from "./play/play.component";
import {RecordsComponent} from "./records/records.component";
import {RegisterComponent} from "./register/register.component";
import {LoginComponent} from './login/login.component';

const routes: Routes = [
  {path: 'home', component: HomeComponent},
  {path: 'preferences', component: PreferencesComponent},
  {path: 'play', component: PlayComponent},
  {path: 'records', component: RecordsComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'login', component: LoginComponent},
/*  {path: 'home', loadChildren: './home/home.module#HomeModule'},
  {path: 'preferences', loadChildren: './preferences/preferences.module#PreferencesModule'},
  {path: 'play', loadChildren: './play/play.module#PlayModule'},
  {path: 'records', loadChildren: './records/records.module#RecordsModule'},
  {path: 'register', loadChildren: './register/register.module#RegisterModule'},
  {path: 'login', loadChildren: 'src/app/login/login.module#LoginModule'},*/
  {path: '**', redirectTo: 'home', pathMatch: 'full'},
  {path: '', redirectTo: 'home', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
