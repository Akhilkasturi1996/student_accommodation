import {Component, OnInit} from '@angular/core';
import {TokenStorageService} from '../services/tokenStorage/token-storage.service';
import {BookingService} from '../services/booking Service/booking.service';
import {SweetAlertsService} from '../services/alerts/sweet-alerts.service';
import {RegistrationService} from '../services/Registration/registration.service';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-user-account-update',
  templateUrl: './user-account-update.component.html',
  styleUrls: ['./user-account-update.component.css']
})
export class UserAccountUpdateComponent implements OnInit {

  constructor(private tokenStorageService: TokenStorageService,
              private formBuilder: FormBuilder,
              private regService: RegistrationService,
              private sweetAlerts: SweetAlertsService) {
    this.registrationForm = this.formBuilder.group({
      firstName: new FormControl({value: '', disabled: true}),
      lastName: new FormControl({value: '', disabled: true}),
      address: new FormControl({value: '', disabled: true}),
      role: new FormControl({value: 'student', disabled: true}),
      gender: new FormControl({value: '', disabled: true}),
      telno: new FormControl({value: '', disabled: true}),
      email: new FormControl({value: '', disabled: true}),
      uniID: new FormControl({value: '', disabled: true}),
      userID: new FormControl({value: '', disabled: true}),
      profile: new FormControl({value: '', disabled: true})
    });

  }

  registrationForm: FormGroup;
  submitted = false;
  studentHistory;
  studentId;
  showTable = false;
  user = null;
  userData = null;
  acctype = 'student';
  loading = false;
  tempUserData = null;

   ngOnInit() {
    this.getData();
  }

  async getData(){
    await this.regService.getAllUsers().toPromise().then(
      res => {
        console.log(res);
        if (res['success']) {
          this.userData = res['data'];
          this.tempUserData = this.userData;
        }
        // this.assignData();
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


  assignData(e) {
    this.showTable = true;
    this.user = e;

    if (this.user.role === 'student') {
      this.acctype = 'student';
    } else {
      this.acctype = 'admin';
    }

    this.registrationForm.get('firstName').patchValue(this.user.firstName);
    this.registrationForm.get('lastName').patchValue(this.user.lastName);
    this.registrationForm.get('address').patchValue(this.user.address);
    this.registrationForm.get('telno').patchValue(this.user.telno);
    this.registrationForm.get('gender').patchValue(this.user.gender);
    this.registrationForm.get('role').patchValue(this.user.role);
    this.registrationForm.get('email').patchValue(this.user.email);
    this.registrationForm.get('uniID').patchValue(this.user.uniID);
    this.registrationForm.get('profile').patchValue(this.user.profile);

  }

  get f() {
    return this.registrationForm.controls;
  }

  close() {
    this.showTable = false;
  }


  async onSubmit() {
    this.submitted = true;
    let userVerify = {
      uniID: this.user.uniID,
      profile: 'verified'
    };
    console.log('here');

    this.regService.verifyUser(userVerify).toPromise().then(
      res => {
        console.log(res);
        if (res['success']) {
          this.sweetAlerts.customSuccessAlert('Profile Details Have Been Updated');
          this.getData();
          this.showTable = false;
        }
      }
    ).catch(
      err => {
        console.log(err);
      }
    );
  }

}
