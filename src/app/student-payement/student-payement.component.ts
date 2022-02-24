import {Component, OnInit} from '@angular/core';
import {PaymentService} from '../services/payment/payment.service';

@Component({
  selector: 'app-student-payement',
  templateUrl: './student-payement.component.html',
  styleUrls: ['./student-payement.component.css']
})
export class StudentPayementComponent implements OnInit {

  constructor(private paymentService: PaymentService) {
  }

  showloading = false;
  userData = null;
  userLatePayment = null;
  hasLatePayment = false;
  latePayments = null;



  ngOnInit(): void {
    this.showloading = true;
    let uniID = localStorage.getItem('userID');
    this.paymentService.getStudentPayment(uniID).subscribe(
      res => {
        if (res['success']) {
          console.log(res);
          this.userData = res['data'];
          this.showloading = false;
        }
      },
      error => {
        console.log(error);
        this.showloading = false;
      }
    );

    this.paymentService.getStudentDuePayment(uniID).subscribe(
      res => {
        if (res['success']) {
          this.userLatePayment = res['data'];
          this.latePayData();
        }
      },
      error => {
        console.log(error);
      }
    );
    // this.getData();
  }

  latePayData() {
    this.latePayments = [];
    if (this.userLatePayment.length > 0) {
      this.userLatePayment.forEach(e => {
        if (e.DateDiff > 30) {
          this.latePayments.push(e);
          this.hasLatePayment = true;
        }
      });
    }
  }

}
