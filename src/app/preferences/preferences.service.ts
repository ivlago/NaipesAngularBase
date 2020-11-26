import { Injectable } from '@angular/core';
import {Observable, Subject} from "rxjs";
import {Preferences} from "./preferences.component.model";

@Injectable({
  providedIn: 'root'
})
export class PreferencesService {
  public Pref$: Subject<Preferences> = new Subject<Preferences>();

  constructor() { }

  public getPreferences$() {
    return this.Pref$.asObservable();
  }

  public prefService(cardsPref, timePref) {
    this.Pref$.next({cards: cardsPref, time: timePref});
  }
}
