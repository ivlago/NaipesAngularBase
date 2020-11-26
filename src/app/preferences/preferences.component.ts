import { Component, OnInit } from '@angular/core';
import { PreferencesService } from "./preferences.service";

@Component({
  selector: 'app-preferences',
  templateUrl: './preferences.component.html',
  styleUrls: ['./preferences.component.scss']
})
export class PreferencesComponent implements OnInit {
  public cardsPref: number;
  public timePref: number;

  constructor(private prefService: PreferencesService) { }

  ngOnInit(): void {
    this.cardsPref = 20;
    this.timePref = 0;
  }

  public preferences() {
    this.prefService.prefService(this.cardsPref, this.timePref);
  }
}
