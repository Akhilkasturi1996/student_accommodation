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

  getUserByUniId(id: string): Observable<any>{
    return this.http.get(`${this.baseUrl}/user/${id}`);
  }


}
