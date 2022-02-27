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

  getAllBookings(): Observable<any> {
    return this.http.get(`${this.baseUrl}/booking/get-all-booking`);
  }

  getPendingBookings(): Observable<any> {
    return this.http.get(`${this.baseUrl}/booking/`);
  }

  getBlockByGender(genderType: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/room/${genderType}`);
  }

  addNewBooking(newBookingData: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/booking/`, newBookingData);
  }

  getBookingByUniID(uniID: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/booking/${uniID}`);
  }

  updateBookingStatus(userData: any): Observable<any> {
    return this.http.patch(`${this.baseUrl}/booking/update-status`, userData);
  }
}

