import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {MatMenuItem} from '@angular/material/menu';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnInit {
  submenu = '';
  tempmenu = '';

  constructor() {
  }

  ngOnInit(): void {
  }

  clickMenuItem(menuItem: string) {
    this.submenu = menuItem;

    if (this.tempmenu === this.submenu){
      this.submenu = '';
      this.tempmenu = '';
    }
    else {
      this.tempmenu = this.submenu;
    }
  }




}
