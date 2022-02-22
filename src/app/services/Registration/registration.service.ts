import { Injectable } from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {

  private baseUrl = environment.baseUrl;
  constructor(private http: HttpClient) { }

  createUser(user: any): Observable<any>{
    return this.http.post(`${this.baseUrl}/user/`, user);
  }

  getmaxUserId(): Observable<any>{
    return this.http.get(`${this.baseUrl}/user/maxid`);
  }

  getAllUsers(): Observable<any[]>{
    // @ts-ignore
    return this.http.get(`${this.baseUrl}/user/`);
  }

  getAllAccounts(): Observable<any>{
    // @ts-ignore
    return this.http.get(`${this.baseUrl}/user/get-login-users`);
  }

  getUserByUniId(id: string): Observable<any>{
    return this.http.get(`${this.baseUrl}/user/${id}`);
  }

  updateUserDetails(userData: Object){
    return this.http.patch(`${this.baseUrl}/user/`, userData);
  }

  verifyUser(userData: Object){
  return this.http.patch(`${this.baseUrl}/user/update-profile`, userData);
}

  updateAccountStatus(userData: Object){
    return this.http.patch(`${this.baseUrl}/user/update-status`, userData);
  }

  updateAccountPassword(userData: Object){
    return this.http.patch(`${this.baseUrl}/user/update-password`, userData);
  }

}
