import {Component, OnInit} from '@angular/core';
import {BookingService} from '../services/booking Service/booking.service';
import {SweetAlertsService} from '../services/alerts/sweet-alerts.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-booking-confirm',
  templateUrl: './booking-confirm.component.html',
  styleUrls: ['./booking-confirm.component.css']
})
export class BookingConfirmComponent implements OnInit {

  userData;
  tempUserData;

  constructor(private bookingService: BookingService,
              private sweetAlert: SweetAlertsService) {
  }

  ngOnInit(): void {
    this.getPendingBooking();
  }

  async getPendingBooking() {

    await this.bookingService.getPendingBookings().toPromise().then(
      res => {
        if (res['success']) {
          console.log(res);
          this.userData = res['data'];
          this.tempUserData = this.userData;
        }
      }
    ).catch(
      err => {
        console.log(err);
      }
    );
  }

  filterTableData(values: any) {

    if (values.value.trim() === '') {
      this.tempUserData = this.userData;
      return;
    }
    let value = values.value;
    this.tempUserData = [];
    this.userData.forEach(e => {
      if (e.uniID.toLowerCase().includes(value.toLowerCase())) {
        this.tempUserData.push(e);
      }
    });
  }

  async confirmBooking(id: number) {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You won\'t be able to revert this!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, Confirm it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.bookingService.updateBookingStatus({status: 'confirm', bookingID: id}).toPromise().then(res => {
            if (res['success']) {
              this.getPendingBooking();
              Swal.fire(
                'Updated!',
                'Booking has confirmed',
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

  async rejectBooking(id: number) {


    Swal.fire({
      title: 'Are you sure?',
      text: 'You won\'t be able to revert this!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, Reject it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.bookingService.updateBookingStatus({status: 'rejected', bookingID: id}).toPromise().then(res => {
            if (res['success']) {
              this.getPendingBooking();
              Swal.fire(
                'Updated!',
                'Booking has been rejected',
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

}
