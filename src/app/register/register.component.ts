import {Component, OnDestroy, OnInit} from '@angular/core';
import {UserService} from "../user.service";
import {FormControl, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit, OnDestroy {
  public user: FormGroup;
  public menssageError: string;
  private subscriptions = [];

  constructor(private registerService: UserService) {
  }

  ngOnInit(): void {
    this.user = new FormGroup({
      username: new FormControl(''),
      email: new FormControl(''),
      password: new FormControl(''),
      password2: new FormControl('')
    });
  }

  public userValid() {
    const userValid = this.registerService.userService(this.user.value).subscribe(
      value => {
        this.menssageError = '"' + value + '" no está disponible ';
      }, err => {
        if (err.status === 404) {
          this.menssageError = ' Nombre de usuario válido ';
        }
      })
    this.subscriptions.push(userValid);
  }

  public sendRegister() {
    const register = this.registerService.registerService(this.user.value).subscribe(
      value1 => {
        console.log("notrepeat: " + value1);
        this.menssageError = 'Te has registrado correctamente!';
      }, err => {
        err.status === 409 ? this.menssageError = ' Usuario duplicado ' :
        this.menssageError = ' Se ha producido un error en el registro ';
      })
    this.subscriptions.push(register);
  }

  ngOnDestroy() : void {
    if(this.subscriptions.length > 0) {
      this.subscriptions.forEach((subscription) => {
        subscription.unsubscribe();
      });
    }
  }
}
