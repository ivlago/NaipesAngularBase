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

  public sendRegister() {
    if (this.user.value['name'] >= 8) {
      if (this.user.value['password'] === this.user.value['password2']) {
        const register = this.registerService.userService(this.user.value).subscribe(
          value => {
            this.menssageError = '"' + value + '" no está disponible ';
          }, err => {
            if (err.status === 404) {
              this.registerService.registerService(this.user.value).subscribe(
                value1 => {
                  console.log("notrepeat: " + value1);
                  this.menssageError = 'Te has registrado correctamente!';
                }, err => {
                  this.menssageError = ' Se ha producido un error en el registro ';
                })
            }
        })
        this.subscriptions.push(register);
      }else{
        this.menssageError = ' Las contraseñas no son iguales ';
      }
  } else {
      this.menssageError = ' El usuario debe tener una longitud de 8 ';
    }
  }

  ngOnDestroy() : void {
    if(this.subscriptions.length > 0) {
      this.subscriptions.forEach((subscription) => {
        subscription.unsubscribe();
      });
    }
  }
}
