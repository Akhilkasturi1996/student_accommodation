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
  showText = false;

  constructor(public authenticateservice: AuthenticationService) {
  }


  // tslint:disable-next-line:typedef
  sideBarToggler() {
    this.sideBarOpen = !this.sideBarOpen;
  }

  maximise() {
    document.getElementById('drawer').style.width = '200px';
    this.showText = true;
  }

  minimise() {
    document.getElementById('drawer').style.width = '65px';
    this.showText = false;
  }

  minimiseSidebar() {
    if (this.show) {
      document.getElementById('drawer').style.width = '65px';
      this.show = !this.show;
      this.showText = false;
    }
  }

  toggleSidebar() {
    this.toggleSidebarForMe.emit();
    this.show = !this.show;
    if (this.show) {
      document.getElementById('drawer').style.width = '200px';
      this.showText = true;
    } else {
      document.getElementById('drawer').style.width = '65px';
      this.showText = false;
    }
  }
}
