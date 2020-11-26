import {Component, OnChanges, OnInit, ViewChild} from '@angular/core';
import {LoginComponent} from "../login/login.component";
import {TokenService} from "../token.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(public tokenService: TokenService) { }

  ngOnInit(): void {
  }
}
