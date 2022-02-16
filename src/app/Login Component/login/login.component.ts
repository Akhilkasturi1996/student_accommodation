import {Component, OnInit} from '@angular/core';
import {FormGroup, FormControl, Validators} from '@angular/forms';
import {AuthenticationService} from '../../services/auth/authentication.service';
import {SignInData} from '../../Models/signInData';
import {UserServicesService} from '../../userService/user-services.service';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {TokenStorageService} from '../../services/tokenStorage/token-storage.service';
import {AuthIntercepter} from '../../services/AuthInterceptor/AuthIntercepter';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private authenticationservice: AuthenticationService,
              private tokenStorageService: TokenStorageService,
              private router: Router) {
  }

  submitted = false;
  signInFalse = false;
  signInError = '';

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
  async onSubmit() {
    this.submitted = true;
    // username and password check
    if (this.LoginForm.invalid) {
      return;
    }

    const signInData = new SignInData(this.LoginForm.value.uname, this.LoginForm.value.pword);
    await this.authenticationservice.loginByUsernamePassword(signInData).subscribe(
      res => {
              if (res.success){
                this.tokenStorageService.saveToken(res.token);
                this.tokenStorageService.saveUser(res.role);
                this.authenticationservice.isAuthenticate = true;
                this.tokenStorageService.saveUserID(this.LoginForm.value.uname);
                this.tokenStorageService.saveStudentType(this.LoginForm.value.uname);
                this.router.navigate(['dashboard']);
              } else {
                this.authenticationservice.isAuthenticate = false;
                this.signInError = res['message'];
                this.signInFalse = true;
              }
               },
      error => {
        console.log(error['error']);
      }
    );
  }


}
