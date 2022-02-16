import { Component, OnInit } from '@angular/core';
import {AbstractControl, FormBuilder, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {validate} from 'codelyzer/walkerFactory/walkerFn';
import {RegistrationService} from '../services/Registration/registration.service';

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
    private router: Router,
    private registrationService: RegistrationService
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
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
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
  idExists = false;


  ngOnInit() {
    this.registrationForm.removeControl("staffId");
  }

  selectAccount(){
    this.acctype = this.registrationForm.value.accountType;
  }


    async onSubmit() {
     this.idExists = false;
    this.submitted = true;

    if (this.registrationForm.invalid) {
      return;
    }
    let maxId;

    await this.registrationService.getmaxUserId().toPromise().then(res =>  {console.log(res),
      maxId = res['data']},
      err => console.log(err));

    this.loading = true;
    let newUserdata = {
      userID: maxId+1,
      firstName: this.registrationForm.value.firstName,
      lastName: this.registrationForm.value.lastName,
      gender: this.registrationForm.value.gender,
      address: this.registrationForm.value.address,
      email: this.registrationForm.value.email,
      telno: this.registrationForm.value.phoneNumber,
      role: this.registrationForm.value.accountType,
      password: this.registrationForm.value.password,
      profile:'pending',
      uniID: this.registrationForm.value.studentId
    };

    if (this.registrationForm.value.accountType === 'student'){
      newUserdata['status'] = 'active';
    } else {
      newUserdata['status'] = 'inactive';
    }

    this.registrationService.createUser(newUserdata).subscribe(resposne =>{
    console.log(resposne), this.loading =false,
      this.router.navigate(['login']);},
    error => {console.log(error),
      this.idExists = true,
      this.loading =false});

  }

}

