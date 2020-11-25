import { Component, OnInit } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  private baseurl: string = 'http://fenw.etsisi.upm.es:10000';

  constructor(private http: HttpClient) {
  }

  public register() {
    console.log('enviar');
    return this.http.get(this.baseurl);
  }

  ngOnInit(): void {
    this.register().subscribe(value => {
      console.log("recibido: " + value);
    })
  }
}
