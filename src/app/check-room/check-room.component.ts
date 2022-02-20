import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {TokenStorageService} from '../services/tokenStorage/token-storage.service';
import {BookingService} from '../services/booking Service/booking.service';
import {DatePipe} from '@angular/common';
import {SweetAlertsService} from '../services/alerts/sweet-alerts.service';


@Component({
  selector: 'app-check-room',
  templateUrl: './check-room.component.html',
  styleUrls: ['./check-room.component.css']
})
export class CheckRoomComponent implements OnInit {

  userType: string;
  isAdmin = false;
  submitted = false;
  rooms = [];
  showTable = false;
  blockId = [];
  today = new Date();
  today1;

  constructor(private tokenStorageService: TokenStorageService,
              private bookingService: BookingService,
              private datePipe: DatePipe,
              private sweetAlerts: SweetAlertsService) {
    this.today1 = this.datePipe.transform(this.today, 'yyyy-MM-dd');

  }

  checkRoomForm = new FormGroup({
    startDate: new FormControl('', [Validators.required]),
    endDate: new FormControl('', [Validators.required]),
    blockID: new FormControl('', [Validators.required])
  });


  ngOnInit() {
    this.userType = this.tokenStorageService.getUser();
    this.showTable = false;
    if (this.userType === 'admin') {
      this.isAdmin = true;
    } else {
      this.isAdmin = false;
    }
    this.getBlockByGenderId();
  }

  getBlockByGenderIdforAdmin(e: any) {
    let gentype;
    if (e.value == 1) {
      gentype = 'male';
    } else {
      gentype = 'female';
    }

    this.blockId = [];
    this.bookingService.getBlockByGender(gentype).subscribe(
      res => {
        console.log(res);
        if (res['data'].length > 0) {
          const room = res['data'];
          // tslint:disable-next-line:prefer-for-of
          for (let x = 0; x < room.length; x++) {
            this.blockId.push(room[x]);
          }
        }

      },
      error => {
        console.log(error);
      }
    );
  }

  getBlockByGenderId() {
    this.blockId = [];
    this.bookingService.getBlockByGender(localStorage.getItem('gender')).subscribe(
      res => {
        if (res['data'].length > 0) {
          const room = res['data'];
          // tslint:disable-next-line:prefer-for-of
          for (let x = 0; x < room.length; x++) {
            this.blockId.push(room[x]);
          }
        }

      },
      error => {
        console.log(error);
      }
    );
  }

  get c() {
    return this.checkRoomForm.controls;
  }

  async submit() {
    this.showTable = false;
    this.rooms = [];
    this.submitted = true;

    if (this.checkRoomForm.value.startDate <this.today1 || this.today <= this.checkRoomForm.value.endDate1) {
      this.checkRoomForm.controls['startDate'].setErrors({
        smallDate: true
      });
      this.checkRoomForm.controls['endDate'].setErrors({
        smallDate: true
      });
      return;
    }


    if (this.checkRoomForm.value.startDate > this.checkRoomForm.value.endDate) {
      this.checkRoomForm.controls['startDate'].setErrors({
        notLarge: true
      });
      this.checkRoomForm.controls['endDate'].setErrors({
        notLarge: true
      });
      return;
    }

    if (this.checkRoomForm.invalid) {
      return;
    }


    await this.bookingService.getAvailableRooms(this.checkRoomForm.value).toPromise().then(
      res => {
        if (res['success']) {
          console.log(res['data'].length);
          if (res['data'].length > 0) {
            const room = res['data'];
            // tslint:disable-next-line:prefer-for-of
            for (let x = 0; x < room.length; x++) {
              this.rooms.push(room[x]);
            }
            this.showTable = true;
          } else {
            this.sweetAlerts.errorAlerts('Unavailable',
              'There are no rooms available for selected dates');
          }
        }
      }
    ).catch(
      err => {
        console.log(err);
      }
    );
  }


}





