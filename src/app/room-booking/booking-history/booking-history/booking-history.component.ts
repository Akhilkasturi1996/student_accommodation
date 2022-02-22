import {Component, OnInit} from '@angular/core';
import {TokenStorageService} from '../../../services/tokenStorage/token-storage.service';
import {BookingService} from '../../../services/booking Service/booking.service';
import {FormControl, FormGroup} from '@angular/forms';
import {SweetAlertsService} from '../../../services/alerts/sweet-alerts.service';

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
              private sweetAlerts: SweetAlertsService) {
  }

  userType = 'student';
  isAdmin = false;
  studentHistory;
  studentId;
  showTable = false;

  ngOnInit(): void {
    this.showTable = false;
    this.userType = this.tokenStorageService.getUser();
    if (this.userType === 'admin') {
      this.isAdmin = true;
    } else {
      this.studentId = localStorage.getItem('userID');
      this.isAdmin = false;
      this.getBookingsByStudentID();
    }
  }

  getStudentId() {
    this.studentId = this.shistoryForm.get('stdId').value;
    this.getBookingsByStudentID();
  }

  async getBookingsByStudentID() {
    await this.bookingService.getBookingByUniID(this.studentId).toPromise().then(
      res => {
        console.log(res);
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
