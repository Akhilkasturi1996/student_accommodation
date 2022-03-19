import { Injectable } from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) {
  }

  getBookingCount(): Observable<any> {
    return this.http.get(`${this.baseUrl}/dashboard/booking-count-today`);
  }
  getBookingRequestCount(): Observable<any> {
    return this.http.get(`${this.baseUrl}/dashboard/booking-request-count`);
  }
  getAvailableRoomCount(): Observable<any> {
    return this.http.get(`${this.baseUrl}/dashboard/abailable-room-count`);
  }
}
