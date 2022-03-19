import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router} from '@angular/router';
import { Observable } from 'rxjs';
import {AuthenticationService} from '../services/auth/authentication.service';
import {TokenStorageService} from '../services/tokenStorage/token-storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authenticateService: AuthenticationService,
              private tokenStorage: TokenStorageService,
              private router: Router) {
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (this.tokenStorage.getToken() != null){
      this.authenticateService.isAuthenticate=true;
      return true;
    }
    this.router.navigate(['login']);
    return false;
  }

}
