import {Component, OnInit} from '@angular/core';
import {TokenStorageService} from '../../../services/tokenStorage/token-storage.service';
import {BookingService} from '../../../services/booking Service/booking.service';
import {FormControl, FormGroup} from '@angular/forms';
import {SweetAlertsService} from '../../../services/alerts/sweet-alerts.service';
import {DatePipe} from '@angular/common';

@Component({
  selector: 'app-booking-history',
  templateUrl: './booking-history.component.html',
  styleUrls: ['./booking-history.component.css']
})
export class BookingHistoryComponent implements OnInit {

  shistoryForm = new FormGroup({
    stdId: new FormControl('')
  });

  constructor(private tokenStorageService: TokenStorageService,
              private bookingService: BookingService,
              private sweetAlerts: SweetAlertsService,
              private datePipe: DatePipe) {
    this.today1 = this.datePipe.transform(this.today, 'yyyy-MM-dd');
  }

  userType = 'student';
  isAdmin = false;
  studentHistory;
  currentHistory;
  currenTemptHistory = null;
  today = new Date();
  today1;
  studentId;
  showTable = false;
  currenthistory = false;

  ngOnInit(): void {
    this.showTable = false;
    this.userType = this.tokenStorageService.getUser();
    if (this.userType === 'admin') {
      this.isAdmin = true;
      this.getAllBookings();
    } else {
      this.studentId = localStorage.getItem('userID');
      this.isAdmin = false;
      this.getBookingsByStudentID();
    }
  }

  getAllBookings() {
    this.currenTemptHistory = [];
    this.currentHistory = null;
    this.bookingService.getAllBookings().subscribe(res => {
        if (res['success']) {
          if (res['data'].length > 0) {
            this.currentHistory = res['data'];
            console.log(this.currenthistory);
            this.currentHistory.forEach(e => {
              if (e.endDate > this.today1) {
                console.log(e);
              }

              if (e.endDate >= this.today1 && e.status !== 'rejected') {
                console.log(e);
                this.currenTemptHistory.push(e);
              }
            });
          } else {
            let message = 'No Booking Records for  Student ID: ' + this.studentId;
            this.sweetAlerts.errorAlerts('No Records Found', message);
          }
        }
      },
      error => {
        console.log(error);
      });
  }

  showcurrentHistroy() {
    this.currenthistory = !this.currenthistory;
    this.showTable = false;
  }

  getStudentId() {
    this.currenthistory = false;
    this.studentId = this.shistoryForm.get('stdId').value;
    if (this.studentId === null || this.studentId.trim() === '') {
      this.sweetAlerts.errorAlerts('No Value Found','Please Provide Student ID');
      return;
    }
    console.log(this.studentId);
    this.getBookingsByStudentID();
  }

  async getBookingsByStudentID() {
    await this.bookingService.getBookingByUniID(this.studentId).toPromise().then(
      res => {
        if (res['success']) {
          if (res['data'].length > 0) {
            this.studentHistory = res['data'];
            this.showTable = true;
          } else {
            let message = 'No Booking Records for  Student ID: ' + this.studentId;
            this.sweetAlerts.errorAlerts('No Records Found', message);
          }

        }
      }
    ).catch(
      err => console.log(err)
    );
  }
}
