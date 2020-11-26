import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

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

  public userTopTenService() {
    return this.http.get(this.baseurl + '/records');
  }

  public newRecordService(points: number, cards: number, time: number) {
    return this.http.post(this.baseurl + '/records', 'punctuation=' + points + '&cards=' +
                            cards + '&disposedTime=' + time);
    // "punctuation=12&cards=13&disposedTime=14"
  }

  public deleteUserRecordsService() {
    return this.http.delete(this.baseurl + '/records');
  }
}
