import {Component, OnInit, Output} from '@angular/core';
import {Subject} from "rxjs";
import {Preferences} from "./preferences.component.model";

@Component({
  selector: 'app-preferences',
  templateUrl: './preferences.component.html',
  styleUrls: ['./preferences.component.scss']
})
export class PreferencesComponent implements OnInit {
  public cardsPref: number;
  public timePref: number;
  public Pref$: Subject<Preferences> = new Subject<Preferences>();

  constructor() { }

  ngOnInit(): void {
    this.cardsPref = 20;
    this.timePref = 0;
  }

  // tslint:disable-next-line:typedef
  public preferences() {
    this.Pref$.next({cards: this.cardsPref, time: this.timePref});
  }
}
