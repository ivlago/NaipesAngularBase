import { Injectable } from '@angular/core';
import { Router} from "@angular/router";

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
    this.token = '';
    this.exist = false;
    this.router.navigate(['/home']);
  }

  public getToken() {
    return this.token;
  }
}
