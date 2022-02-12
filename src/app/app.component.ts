import {Component, EventEmitter, Output} from '@angular/core';
import {AuthenticationService} from './services/auth/authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'student-accommodation';
  sideBarOpen = true;
  show = false;
  setwidth = '65px';
  @Output() toggleSidebarForMe: EventEmitter<any> = new EventEmitter();

  constructor(public authenticateservice: AuthenticationService) {
  }


  // tslint:disable-next-line:typedef
  sideBarToggler() {
    this.sideBarOpen = !this.sideBarOpen;
  }

  maximise() {
    document.getElementById('drawer').style.width = '200px';
  }

  minimise() {
    document.getElementById('drawer').style.width = '65px';
  }

  minimiseSidebar() {
    if (this.show) {
      document.getElementById('drawer').style.width = '65px';
      this.show = !this.show;
    }
  }

  toggleSidebar() {
    this.toggleSidebarForMe.emit();
    this.show = !this.show;
    if (this.show) {
      document.getElementById('drawer').style.width = '200px';
    } else {
      document.getElementById('drawer').style.width = '65px';
    }
  }
}
