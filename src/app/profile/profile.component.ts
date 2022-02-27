import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {RegistrationService} from '../services/Registration/registration.service';
import {SweetAlertsService} from '../services/alerts/sweet-alerts.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  registrationForm: FormGroup;
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private registrationService: RegistrationService,
    private sweetAlerts: SweetAlertsService
  ) {
    this.registrationForm = this.formBuilder.group({
      firstName: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(30),
        Validators.pattern('^[a-zA-Z ]*$')]),
      lastName: new FormControl('', []),
      address: new FormControl('', [
        Validators.required,
        Validators.maxLength(255)
      ]),
      role: new FormControl({value: 'student', disabled: true}),
      gender: new FormControl({value: '', disabled: true}),
      telno: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(12),
        Validators.pattern('^[0-9]*$')]),
      email: new FormControl('', [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(80),
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ]),
      uniID: new FormControl({value: '', disabled: true}, [
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(15)
      ]),
      userID: new FormControl({value: '', disabled: true}),
      profile: new FormControl({value: '', disabled: true})
    });
  }

  acctype = 'student';
  loading = false;
  user = null;

  async ngOnInit() {
    let uniID = localStorage.getItem('userID');
    await this.registrationService.getUserByUniId(uniID).toPromise().then(
      res => {
        if (res.success) {
          this.user = res.data;
        }
        console.log(this.user);
        this.assignData();
      }
    ).catch(
      err => {
        console.log(err);
      }
    );
  }

  assignData() {

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


  async onSubmit() {
    this.submitted = true;

    if (this.registrationForm.invalid) {
      return;
    }

    this.registrationService.updateUserDetails(this.registrationForm.value).toPromise().then(
      res => {
        if (res['success']) {
            this.sweetAlerts.customSuccessAlert('Profile Details Have Been Updated');
        }
      }
    ).catch(
      err => {
        console.log(err);
      }
    );
  }

}
