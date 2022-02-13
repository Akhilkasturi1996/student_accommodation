import { Injectable } from '@angular/core';

const TOKEN_KEY = 'token';
const USER_ROLE = 'role';

@Injectable({
  providedIn: 'root'
})
export class TokenStorageService {

  constructor() { }

  signOut() {
    window.localStorage.removeItem(TOKEN_KEY);
    window.localStorage.clear();

    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.clear();
  }
  saveToken(token: string) {
    window.localStorage.removeItem(TOKEN_KEY);
    window.localStorage.setItem(TOKEN_KEY, 'Bearer ' + token);
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.setItem(TOKEN_KEY, localStorage.getItem(TOKEN_KEY));
  }

  saveUser(user) {
    window.sessionStorage.removeItem(USER_ROLE);
    window.sessionStorage.setItem(USER_ROLE, user);
    window.localStorage.removeItem(USER_ROLE);
    window.localStorage.setItem(USER_ROLE, user);
    //}
  }

  getToken(): string {
    if (sessionStorage.getItem('token') != null){
      return sessionStorage.getItem(TOKEN_KEY);
    }
  }
}
