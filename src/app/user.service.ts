import {Injectable, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class UserService implements OnInit{
  private baseurl: string = 'http://fenw.etsisi.upm.es:10000';

  constructor(private http: HttpClient) {
  }

  public userService(user: any) {
    return this.http.get(this.baseurl + '/users/' + user['name']);
  }

  public registerService(user: any) {
    return this.http.post(this.baseurl + '/users', 'username=' + user['name'] + ' &email=' +
                       user['email'] + '&password=' + user['password']);
    //"username=user&email=email&password=password"
  }

  public userLoginService(login: any) {
    return this.http.get(this.baseurl + '/users/login?username=' + login['nameLog'] +
                          '&password=' + login['passwordLog']);
  }

  ngOnInit(): void {

  }
}
