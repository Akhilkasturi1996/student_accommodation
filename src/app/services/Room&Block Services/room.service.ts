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

  createBlock(newBlock: Object): Observable<any> {
    return this.http.post(`${this.baseUrl}/room/add-new-block`, newBlock);
  }

  createRoom(newRoom: Object): Observable<any> {
    return this.http.post(`${this.baseUrl}/room/add-new-room`, newRoom);
  }

  updateRoombyId(updatedRoomDate: Object): Observable<any> {
    return this.http.patch(`${this.baseUrl}/room/update-room`, updatedRoomDate);
  }

  deleteRoomById(deleteRoom: any): Observable<any> {
    return this.http.delete(`${this.baseUrl}/room/delete-room/${deleteRoom}`, deleteRoom);
  }

  updateBlockById(updateBlockData: Object): Observable<any> {
    return this.http.patch(`${this.baseUrl}/room/update-block`, updateBlockData);
  }

  deleteBlockById(deleteBlock: Object): Observable<any> {
    return this.http.delete(`${this.baseUrl}/room/delete-block/${deleteBlock}`, deleteBlock);
  }

}
