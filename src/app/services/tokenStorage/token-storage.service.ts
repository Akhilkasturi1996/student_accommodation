import { Injectable } from '@angular/core';

const TOKEN_KEY = 'token';

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
    console.log("user authenticated");
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.setItem(TOKEN_KEY, JSON.stringify(user));
    window.localStorage.removeItem(TOKEN_KEY);
    window.localStorage.setItem(TOKEN_KEY, JSON.stringify(user));
    //}
  }

  getToken(): string {
    if (sessionStorage.getItem('token') != null){
      return sessionStorage.getItem(TOKEN_KEY);
    }
  }
}
