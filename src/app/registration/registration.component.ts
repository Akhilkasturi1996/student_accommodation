import { Component, OnInit } from '@angular/core';
import {AbstractControl, FormBuilder, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {validate} from 'codelyzer/walkerFactory/walkerFn';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  registrationForm: FormGroup;
  isSubmitted = false;
  constructor(
    private formBuilder: FormBuilder,
    private router: Router
  ) {
    this.registrationForm = this.formBuilder.group({
      firstName: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(30),
        Validators.pattern('^[a-zA-Z ]*$')]),
      lastName: new FormControl('', []),
      addressGroup: this.formBuilder.group({
        address: new FormControl('', [
          Validators.required,
          Validators.maxLength(255)
        ]),
      }),
      accountType: new FormControl('student', []),
      gender: new FormControl( '', [Validators.required]),
      phoneNumber: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(12),
        Validators.pattern('^[0-9]*$')]),
      email: new FormControl('', [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(80),
        Validators.pattern("^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$")
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(12)
      ]),
      confPassword: new FormControl('', [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(12)
      ]),
      studentId: new FormControl('', [
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(15)
      ]),
      staffId: new FormControl('', [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(10)
      ])
    });
  }



  // convenience getter for easy access to form fields
  get f() { return this.registrationForm.controls; }
  acctype = 'student';
  loading = false;
  submitted = false;


  ngOnInit() {
    console.log(this.registrationForm.value.addressGroup.address);
  }

  selectAccount(){
    this.acctype = this.registrationForm.value.accountType;
  }


    onSubmit() {
    this.submitted = true;

    if (this.registrationForm.invalid) {
      return;
    }

    this.loading = true;

  }

}

