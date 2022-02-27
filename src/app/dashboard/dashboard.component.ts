import {Component, OnInit} from '@angular/core';
import {TokenStorageService} from '../services/tokenStorage/token-storage.service';
import {DashboardService} from '../services/dashboard/dashboard.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(private tokenStorageService: TokenStorageService,
              private dashboardService: DashboardService) {
  }

  isAdmin = false;
  userType = 'student';
  totalBooking = 0;
  totalBookingRequest = 0;
  availableRoomCount = 0;

  ngOnInit(): void {
    this.userType = this.tokenStorageService.getUser();
    if (this.userType === 'admin') {
      this.isAdmin = true;
    } else {
      this.isAdmin = false;
    }

    this.gteDashboardData();
  }

  async gteDashboardData() {
    await this.dashboardService.getBookingCount().toPromise().then(res => {

      if (res['success']) {
        this.totalBooking = res['data'][0]['count'];
      }
    }).catch(err => {
      console.log(err);
    });

    await this.dashboardService.getBookingRequestCount().toPromise().then(res => {
      // console.log(res);
      if (res['success']) {
        this.totalBookingRequest = res['data'][0]['count'];
      }
    }).catch(err => {
      console.log(err);
    });

    await this.dashboardService.getAvailableRoomCount().toPromise().then(res => {
      // console.log(res);
      if (res['success']) {
        this.availableRoomCount = res['data'][0]['count'];
      }
    }).catch(err => {
      console.log(err);
    });
  }

}
