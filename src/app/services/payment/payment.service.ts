import {Injectable} from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) {
  }


  getPaymentByUniId(UniId: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/payment/payment/${UniId}`);
  }

  getAllPayments(): Observable<any> {
    return this.http.get(`${this.baseUrl}/payment/get-all`);
  }

  getStudentPayment(studentId: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/payment/paid/${studentId}`);
  }

  getStudentDuePayment(studentId: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/payment/due/${studentId}`);
  }

  payDueAmount(userData: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/payment/`, userData);
  }
}
