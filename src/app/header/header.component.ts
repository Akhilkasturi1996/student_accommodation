import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AuthenticationService} from '../services/auth/authentication.service';
import {TokenStorageService} from '../services/tokenStorage/token-storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private router: Router, private authenticateService: AuthenticationService,
              private tokenStorageService : TokenStorageService) { }

  ngOnInit(): void {
  }



  // tslint:disable-next-line:typedef
  logout(){
    this.authenticateService.isAuthenticate = false;
    this.tokenStorageService.signOut();
    this.router.navigate(['login']);
  }

}
