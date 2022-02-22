import {Component, OnInit} from '@angular/core';
import {RegistrationService} from '../services/Registration/registration.service';
import {FormControl, FormGroup} from '@angular/forms';
import {SweetAlertsService} from '../services/alerts/sweet-alerts.service';

@Component({
  selector: 'app-user-account-activate',
  templateUrl: './user-account-activate.component.html',
  styleUrls: ['./user-account-activate.component.css']
})
export class UserAccountActivateComponent implements OnInit {

  constructor(private regService: RegistrationService,
              private sweetAlerts: SweetAlertsService) {
  }

  userData = null;
  user = null;
  submitted = false;
  loading = false;
  showTable = false;

  LoginForm = new FormGroup({
    userID: new FormControl(''),
    username: new FormControl({value: '', disabled: true}),
    password: new FormControl('')
  });

  ngOnInit(): void {
    this.getData();
  }

  async getData() {
    await this.regService.getAllAccounts().toPromise().then(
      res => {
        if (res['success']) {
          this.userData = res['data'];
        }
      }
    ).then(
      err => {
        console.log(err);
      }
    );
  }

  assignData(e) {
    this.user = e;
    this.showTable = true;
    this.LoginForm.get('username').patchValue(this.user.username);
  }

  async updateStatus(e) {
    this.submitted = true;
    this.user = e;

    let userData = {
      userID: this.user.userID,
      status: (this.user.status === 'active' ? 'inactive' : 'active')
    };
    console.log(userData);
    this.regService.updateAccountStatus(userData).toPromise().then(
      res => {
        if (res['success']) {
          let msg = 'Account has been ' + userData.status;
          this.sweetAlerts.customSuccessAlert(msg);
          this.getData();
        }
        console.log(res);
      }
    ).catch(
      err => {
        console.log(err);
      }
    );
  }

  close() {
    this.showTable = false;
  }

  updatePassword() {
    this.loading = true;
    let userData = {
      userID: this.user.userID,
      password: this.LoginForm.value.password
    };
    this.regService.updateAccountPassword(userData).toPromise().then(
      res => {
        if (res['success']) {
          this.showTable = false;
          this.sweetAlerts.customSuccessAlert('Account Password Has been Updated');
          this.getData();
        }
      }
    ).catch(
      err => {
        console.log(err);
      }
    );
  }


}
