import { Injectable } from '@angular/core';
import {SignInData} from '../../Models/signInData';
import {Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private baseUrl = environment.baseUrl;
  isAuthenticate = false;
  constructor(private http: HttpClient) { }

  loginByUsernamePassword(signInData: SignInData): Observable<any>{
    return this.http.post(`${this.baseUrl}/user/login/`, signInData);
  }

}
