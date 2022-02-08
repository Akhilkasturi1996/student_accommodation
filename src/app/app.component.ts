import { Component, OnInit } from '@angular/core';
import { LoginComponent } from './Login Component/login/login.component';
import {Router} from '@angular/router';
import {AuthenticationService} from './services/auth/authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'student-accommodation';
  sideBarOpen = true;

  constructor(public authenticateservice: AuthenticationService) {
  }

  // tslint:disable-next-line:typedef
  sideBarToggler() {
    this.sideBarOpen = !this.sideBarOpen;
  }
}
