import {Component, OnInit} from '@angular/core';
import {PaymentService} from '../services/payment/payment.service';
import {RegistrationService} from '../services/Registration/registration.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {formatDate} from '@angular/common';
import {SweetAlertsService} from '../services/alerts/sweet-alerts.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-payments',
  templateUrl: './payments.component.html',
  styleUrls: ['./payments.component.css']
})
export class PaymentsComponent implements OnInit {

  constructor(private paymentService: PaymentService,
              private regService: RegistrationService,
              private sweetAlerts: SweetAlertsService) {
  }

  showloading = false;
  userData = null;
  tempUserData = null;
  users = null;
  userLatePayment = null;
  hasLatePayment = false;
  latePayments = null;
  showTable = false;
  showModel = false;
  submitted = false;
  phistory = false;
  historyData = null;

  payForm = new FormGroup({
    uniID: new FormControl({value: '', disabled: true}),
    bookingID: new FormControl({value: '', disabled: true}),
    payAmount: new FormControl({value: '', disabled: false}, [Validators.required, Validators.pattern('^[0-9]*$')]),
    dueAmount: new FormControl({value: '', disabled: true}),
    date: new FormControl('')
  });


  ngOnInit(): void {
    this.showloading = true;
    this.getAllUsers();
    this.paymentService.getAllPayments().subscribe(
      res => {
        if (res['success']) {
          this.userData = res['data'];
          this.showloading = false;
        }
      },
      error => {
        console.log(error);
        this.showloading = false;
      }
    );
  }


  filterTableData(values: any) {

    if (values.value.trim() === '') {
      this.tempUserData = this.users;
      return;
    }
    let value = values.value;
    this.tempUserData = [];
    this.users.forEach(e => {
      if (e.uniID.toLowerCase().includes(value.toLowerCase())) {
        this.tempUserData.push(e);
      }
    });
  }

  async getAllUsers() {
    let userdata = [];
    this.users = [];
    await this.regService.getAllUsers().toPromise().then(
      res => {

        if (res['success']) {
          userdata = res['data'];
          userdata.forEach(data => {
            if (data.role === 'student') {
              this.users.push(data);
            }
          });
          this.showloading = false;
        }
      }).catch(
      error => {
        console.log(error);
        this.showloading = false;
      }
    );
    this.tempUserData = this.users;
  }

  getStudentPaymentData(stdID: string) {
    this.showloading = true;

    this.paymentService.getStudentPayment(stdID).subscribe(
      res => {
        if (res['success']) {
          this.historyData = res['data'];
          if (this.historyData.length > 0) {
            console.log(this.historyData);
            this.historyData.sort((a, b) => (a.paymentID < b.paymentID) ? 1 : ((b.paymentID > a.paymentID) ? -1 : 0));
            this.phistory = true;
          } else {
            this.phistory = false;
            this.sweetAlerts.errorAlerts('Records Not Found', 'No Payments Records Found');
          }
        }
      },
      error => {
        console.log(error);
      }
    );

    this.paymentService.getPaymentByUniId(stdID).subscribe(
      res => {
        if (res['success']) {
          this.userData = res['data'];
          if (this.userData.length > 0) {
            this.showTable = true;
            this.showloading = false;
          } else {
            this.showloading = false;
            this.showTable = false;
          }
        }
      },
      error => {
        console.log(error);
        this.showloading = false;
      }
    );
  }

  get p() {
    return this.payForm.controls;
  }

  toggleModel() {
    const userData = this.userData[0];
    this.payForm.get('uniID').setValue(userData.uniID);
    this.payForm.get('dueAmount').setValue(userData.dueAmount);
    this.payForm.get('bookingID').setValue(userData.bookingID);
    this.showModel = !this.showModel;
  }

  closeModel() {
    this.showModel = !this.showModel;
  }

  async payStudentDue() {
    this.submitted = true;

    const userDetails = {
      uniID: this.payForm.get('uniID').value,
      bookingID: this.payForm.get('bookingID').value,
      payAmount: Number(this.payForm.value.payAmount)
    };

    if (this.payForm.invalid) {
      return;
    }

    if (Number(this.payForm.get('dueAmount').value) < Number(this.payForm.value.payAmount)) {
      this.payForm.controls['payAmount'].setErrors({
        notLarge: true
      });
      return;
    }


    Swal.fire({
      title: 'Are you sure?',
      text: 'You won\'t be able to revert this!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, pay it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.paymentService.payDueAmount(userDetails).toPromise().then(res => {
            if (res['success']) {
              this.showModel = false;
              this.getStudentPaymentData(userDetails.uniID);
              Swal.fire(
                'Paid!',
                'Payment Has been Added',
                'success'
              );
            }
          }
        ).catch(error => {
          console.log(error);
        });
      }
    });
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
