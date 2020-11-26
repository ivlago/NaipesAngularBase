import {Injectable, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class UserService implements OnInit{
  private baseurl: string = 'http://fenw.etsisi.upm.es:10000';
  public userLog: string;

  constructor(private http: HttpClient) {
  }

  public userService(user: any) {
    return this.http.get(this.baseurl + '/users/' + user['name']);
  }

  public registerService(user: any) {
    return this.http.post(this.baseurl + '/users', user);
  }

  public userLoginService(login: any) {
    this.userLog = login['nameLog'];
    return this.http.get(this.baseurl + '/users/login?username=' + login['nameLog'] +
                          '&password=' + login['passwordLog']);
  }

  ngOnInit(): void {

  }
}
