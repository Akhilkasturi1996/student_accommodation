import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {SignInData} from '../Models/signInData';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserServicesService {
  private baseUrl = environment.baseUrl;
  constructor(private http: HttpClient) { }

  loginByUsernamePassword(signInData: SignInData): Observable<any>{
    return this.http.post(`${this.baseUrl}/user/login/`, signInData);
  }

}
