import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PreferencesService {

  constructor() { }

  public prefService(cardsPref, timePref) {
    localStorage.setItem('cardsPref', cardsPref);
    localStorage.setItem('timePref', timePref);
  }
}
