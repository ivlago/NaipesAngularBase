import { Injectable } from '@angular/core';
import {Route, Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class TokenService {
  public exist: boolean = false;
  public token: string;

  constructor(private router: Router) { }

  public saveToken(token: string) {
    this.token = token;
    this.exist = true;
  }

  public destroyToken() {
    console.log("destroyToken");
    this.token = '';
    this.exist = false;
    this.router.navigate(['/home']);
  }

  public getToken() {
    console.log("get: " + this.token)
    return this.token;
  }
}
