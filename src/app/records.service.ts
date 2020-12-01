import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class RecordsService {
  private baseurl: string = 'http://fenw.etsisi.upm.es:10000';

  constructor(private http: HttpClient) {
  }

  public topTenService() {
    return this.http.get(this.baseurl + '/records');
  }

  public userTopTenService(userLog: string, token: string) {
    const headers = new HttpHeaders().set('Content-Type', 'application/json')
                                .set('Authorization', token);
    return this.http.get(this.baseurl + '/records/' + userLog, {headers, observe: 'response'});
  }

  public newRecordService(token: string, jsonNewRecord: any) {
    const headers = new HttpHeaders().set('Content-Type', 'application/json')
        .set('Authorization', token);
    return this.http.post(this.baseurl + '/records', jsonNewRecord, {headers, observe: 'response'});
  }

  public deleteUserRecordsService(token: string) {
    const headers = new HttpHeaders().set('Content-Type', 'application/json')
                                .set('Authorization', token);
    return this.http.delete(this.baseurl + '/records', {headers});
  }
}
