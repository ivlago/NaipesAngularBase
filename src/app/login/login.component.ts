import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {UserService} from "../user.service";
import {TokenService} from "../token.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  public login: FormGroup;
  /////////////////
  public auth: Object;
  public error: boolean = false;
  private subscriptions = [];

  constructor(private loginService: UserService,
              private tokenService: TokenService) { }

  ngOnInit(): void {
    this.login = new FormGroup({
      nameLog: new FormControl(''),
      passwordLog: new FormControl(''),
    });
  }

  public userLogin() {
    const login = this.loginService.userLoginService(this.login.value).subscribe(
      value => {
        this.auth = value;
        this.tokenService.saveToken(value.toString());
        this.error = false;
        console.log("login: " + value);
      }, err => {
        this.error = true;
      })
    this.subscriptions.push(login);
  }

  ngOnDestroy() : void {
    if(this.subscriptions.length > 0) {
      this.subscriptions.forEach((subscription) => {
        subscription.unsubscribe();
      });
    }
  }
}
