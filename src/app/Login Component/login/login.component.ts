import {Component, OnInit} from '@angular/core';
import {FormGroup, FormControl, Validators} from '@angular/forms';
import {AuthenticationService} from '../../services/auth/authentication.service';
import {SignInData} from '../../Models/signInData';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private authenticationservice: AuthenticationService) {
  }

  submitted = false;
  signInFalse = false;

  LoginForm = new FormGroup({
    uname: new FormControl('', [Validators.required]),
    pword: new FormControl('', [Validators.required])
  });

  // tslint:disable-next-line:typedef
  ngOnInit() {
  }

  // tslint:disable-next-line:typedef
  get l() {
    return this.LoginForm.controls;
  }

  // tslint:disable-next-line:typedef
  onSubmit() {
    this.submitted = true;
    // username and password check
    console.log(this.l.uname.errors);
    if (this.LoginForm.invalid) {
      return;
    }

    const signInData = new SignInData(this.LoginForm.value.uname, this.LoginForm.value.pword);
    this.authenticationservice.authentcate(signInData);

    if (!this.authenticationservice.authentcate(signInData)) {
      this.signInFalse = true;
    } else {
      this.signInFalse = false;
    }
  }


}
