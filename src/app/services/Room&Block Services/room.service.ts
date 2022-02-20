import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RoomService {
  private baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) {
  }

  getRooms(): Observable<any> {
    return this.http.get(`${this.baseUrl}/room/get-room/`);
  }

  getBlock(): Observable<any> {
    return this.http.get(`${this.baseUrl}/room/get-block/`);
  }

}
