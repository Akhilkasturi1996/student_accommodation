import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BookingService {
  baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) {
  }

  getAvailableRooms(userdata: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/room/check-room`, userdata);
  }

  getBlockByGender(genderType: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/room/${genderType}`);
  }

  addNewBooking(newBookingData: Object): Observable<any> {
    return this.http.post(`${this.baseUrl}/booking/`, newBookingData);
  }

}

