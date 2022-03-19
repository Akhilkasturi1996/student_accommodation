import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {MatMenuItem} from '@angular/material/menu';
import {FormControl, Validators} from '@angular/forms';
import {TokenStorageService} from '../services/tokenStorage/token-storage.service';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnInit {
  submenu = '';
  tempmenu = '';
  isAdmin = false;
  userType= 'student';
  @Input() showText = false;

  constructor(private tokenStorageService: TokenStorageService) {
  }

  ngOnInit(): void {
    this.userType = this.tokenStorageService.getUser();
    if (this.userType === 'admin') {
      this.isAdmin = true;
    } else {
      this.isAdmin = false;
    }
  }

  clickMenuItem(menuItem: string) {
    this.submenu = menuItem;
    if (this.tempmenu === this.submenu) {
      this.submenu = '';
      this.tempmenu = '';
    } else {
      this.tempmenu = this.submenu;
    }
  }


}
