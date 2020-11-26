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
  private subscriptions = [];

  constructor(private registerService: UserService) {
  }

  ngOnInit(): void {
    this.user = new FormGroup({
      name: new FormControl(''),
      email: new FormControl(''),
      password: new FormControl(''),
      password2: new FormControl('')
    });
  }

  public sendRegister() {
    if (this.user.value['password'] === this.user.value['password2']) {
      const register = this.registerService.userService(this.user.value).subscribe(
        value => {
          console.log("registro: " + value);
          ///////////////////////////
          this.registerService.registerService(this.user.value).subscribe(
            value1 => {
              console.log("notrepeat: " + value1);
              alert('Te has registrado correctamente!');
            })
        })
      this.subscriptions.push(register);
    }else{
      alert("Contraseñas distintas!");
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
